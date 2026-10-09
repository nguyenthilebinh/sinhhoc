import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Model3DMetadata } from '../../data/modelsData';

interface RenderCanvasProps {
  modelMetadata: Model3DMetadata;
  viewMode: 'solid' | 'wireframe' | 'glass';
  onSelectOrganelle: (orgId: string) => void;
}

const GLBCanvasView: React.FC<RenderCanvasProps> = ({
  modelMetadata,
  viewMode,
  onSelectOrganelle
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const loadedMeshGroupRef = useRef<THREE.Group | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<string>('Đang nạp mô hình 3D...');
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    setLoadingStatus('Đang nạp mô hình 3D...');
    setHasError(false);

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(viewMode === 'wireframe' ? '#09090b' : '#121215');

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 20);

    // 3. Renderer with Filmic Tone Mapping for Vibrant True GLB Colors
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    mountRef.current.appendChild(renderer.domElement);

    // 4. Lighting Setup
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x333333, 1.8);
    scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight1.position.set(15, 25, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight2.position.set(-15, -15, -15);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.2, 50);
    pointLight.position.set(0, 2, 8);
    scene.add(pointLight);

    // 5. GLTFLoader
    const loader = new GLTFLoader();
    const modelGroup = new THREE.Group();
    loadedMeshGroupRef.current = modelGroup;
    scene.add(modelGroup);

    loader.load(
      modelMetadata.glbFile,
      (gltf) => {
        setLoadingStatus('');
        const loadedScene = gltf.scene;

        // Auto-center and fit model into view bounding box
        const bbox = new THREE.Box3().setFromObject(loadedScene);
        const center = bbox.getCenter(new THREE.Vector3());
        const size = bbox.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 11 / (maxDim || 1);

        loadedScene.position.sub(center.multiplyScalar(scale));
        loadedScene.scale.set(scale, scale, scale);

        loadedScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;

            if (viewMode === 'wireframe') {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m: any) => m.wireframe = true);
              } else if (mesh.material) {
                (mesh.material as any).wireframe = true;
              }
            } else if (viewMode === 'glass') {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m: any) => {
                  m.transparent = true;
                  m.opacity = 0.4;
                });
              } else if (mesh.material) {
                (mesh.material as any).transparent = true;
                (mesh.material as any).opacity = 0.4;
              }
            }
          }
        });

        modelGroup.add(loadedScene);
      },
      (progress) => {
        if (progress.total > 0) {
          const pct = Math.round((progress.loaded / progress.total) * 100);
          setLoadingStatus(`Đang nạp mô hình 3D (${pct}%)...`);
        }
      },
      (error) => {
        console.error('Error loading GLB file:', modelMetadata.glbFile, error);
        setLoadingStatus('Không thể tải mô hình 3D.');
        setHasError(true);
      }
    );

    // Raycaster for clicking GLB sub-meshes
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(modelGroup.children, true);

      if (intersects.length > 0) {
        if (modelMetadata.organelles.length > 0) {
          const matchedOrg = modelMetadata.organelles[0];
          onSelectOrganelle(matchedOrg.id);
        }
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);

    // Mouse & Touch Orbit Controls for Mobile
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !modelGroup) return;
      const dx = e.clientX - prevMousePos.x;
      const dy = e.clientY - prevMousePos.y;

      modelGroup.rotation.y += dx * 0.008;
      modelGroup.rotation.x += dy * 0.008;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => { isDragging = false; };

    // Touch events for mobile phones
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !modelGroup || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMousePos.x;
      const dy = e.touches[0].clientY - prevMousePos.y;

      modelGroup.rotation.y += dx * 0.01;
      modelGroup.rotation.x += dy * 0.01;

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => { isDragging = false; };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    renderer.domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging && modelGroup) {
        modelGroup.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('click', handleCanvasClick);
        renderer.domElement.removeEventListener('mousedown', handleMouseDown);
        renderer.domElement.removeEventListener('touchstart', handleTouchStart);
        renderer.dispose();
      }
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
    };
  }, [modelMetadata.id, viewMode]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      {loadingStatus && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(9, 9, 11, 0.85)',
          padding: '12px 24px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-main)',
          fontSize: '0.85rem',
          color: hasError ? '#ef4444' : 'var(--text-main)',
          pointerEvents: 'none'
        }}>
          {loadingStatus}
        </div>
      )}
    </div>
  );
};

export const Cell3DStudio: React.FC = () => {
  const [models, setModels] = useState<Model3DMetadata[]>([]);
  const [selectedModelId, setSelectedModelId] = useState<string>('animal_cell');
  const [viewMode, setViewMode] = useState<'solid' | 'wireframe' | 'glass'>('solid');
  const [activeOrganelleId, setActiveOrganelleId] = useState<string>('nucleus');

  useEffect(() => {
    fetch('./document/3Dmodel/models_manifest.json')
      .then(res => res.json())
      .then((data: Model3DMetadata[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setModels(data);
          setSelectedModelId(data[0].id);
          if (data[0].organelles.length > 0) {
            setActiveOrganelleId(data[0].organelles[0].id);
          }
        }
      })
      .catch(err => console.error('Error fetching models_manifest.json:', err));
  }, []);

  const activeModel = models.find(m => m.id === selectedModelId) || models[0];
  if (!activeModel) {
    return (
      <div className="clean-card" style={{ padding: '24px', textAlign: 'center' }}>
        Đang nạp mô hình 3D...
      </div>
    );
  }

  const activeOrganelle = activeModel.organelles.find(o => o.id === activeOrganelleId) || activeModel.organelles[0];

  return (
    <div className="clean-card mobile-padding-sm" style={{ padding: '24px', margin: '20px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Mô Hình 3D</h2>

        {/* View Mode Controls */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['solid', 'wireframe', 'glass'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`btn-clean ${viewMode === mode ? 'btn-clean-active' : ''}`}
            >
              {mode === 'solid' ? 'Màu Sắc Gốc' : mode === 'wireframe' ? 'Khung Dây' : 'X-Ray'}
            </button>
          ))}
        </div>
      </div>

      {/* Model Selection Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        {models.map(model => {
          const isSelected = selectedModelId === model.id;

          return (
            <div
              key={model.id}
              onClick={() => {
                setSelectedModelId(model.id);
                setActiveOrganelleId(model.organelles[0]?.id || '');
              }}
              className={`clean-card clean-card-interactive`}
              style={{
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderColor: isSelected ? 'var(--border-highlight)' : 'var(--border-main)',
                background: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)'
              }}
            >
              <img
                src={model.previewImage}
                alt={model.name}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-sm)',
                  objectFit: 'cover',
                  border: '1px solid var(--border-main)'
                }}
              />

              <div style={{ flex: 1, overflow: 'hidden' }}>
                <span className="btn-clean" style={{ padding: '2px 6px', fontSize: '0.65rem', marginBottom: '2px' }}>
                  {model.category.split(' ')[0]}
                </span>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {model.name}
                </h4>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3D View & Inspector Responsive Grid */}
      <div className="grid-3d-studio">
        {/* Three.js GLB Canvas Container */}
        <div className="canvas-container-responsive" style={{
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: '1px solid var(--border-main)',
          position: 'relative',
          background: 'var(--bg-surface)'
        }}>
          <GLBCanvasView
            modelMetadata={activeModel}
            viewMode={viewMode}
            onSelectOrganelle={(orgId) => setActiveOrganelleId(orgId)}
          />
        </div>

        {/* Organelle Inspector Panel */}
        <div style={{
          padding: '20px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-main)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {activeModel.category}
              </span>
            </div>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{activeModel.name}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
              {activeModel.description}
            </p>

            {activeOrganelle && (
              <div style={{
                padding: '14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-strong)',
                marginBottom: '16px'
              }}>
                <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '4px', color: 'var(--text-main)' }}>
                  🔬 {activeOrganelle.name}
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {activeOrganelle.description}
                </p>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', borderTop: '1px solid var(--border-main)', paddingTop: '6px' }}>
                  ⚡ <strong>Chức năng:</strong> {activeOrganelle.function}
                </div>
              </div>
            )}
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Cấu trúc chính trong mô hình này:
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {activeModel.organelles.map(org => (
                <button
                  key={org.id}
                  onClick={() => setActiveOrganelleId(org.id)}
                  className={`btn-clean ${activeOrganelle?.id === org.id ? 'btn-clean-active' : ''}`}
                  style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                >
                  {org.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
