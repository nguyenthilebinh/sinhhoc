import React from 'react';

export const TeacherProfilePage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '40px 16px', maxWidth: '800px' }}>
      {/* Teacher Profile Card - Uses unified responsive design system */}
      <div className="clean-card mobile-padding-sm" style={{ padding: '36px' }}>
        <div className="grid-teacher">
          {/* Avatar Image */}
          <div>
            <img
              src="./teacher_avatar.jpg"
              alt="Giáo Viên Nguyễn Thị Lệ Bình"
              style={{
                width: '100%',
                maxHeight: '220px',
                aspectRatio: '1',
                borderRadius: 'var(--radius-lg)',
                objectFit: 'cover',
                border: '1px solid var(--border-main)',
                boxShadow: 'var(--shadow-card)'
              }}
            />
          </div>

          {/* Teacher Details */}
          <div>
            <span className="btn-clean" style={{ marginBottom: '12px', fontSize: '0.8rem', padding: '4px 10px' }}>
              🔬 Giáo Viên Bộ Môn Sinh Học
            </span>
            <h1 style={{ fontSize: '2.0rem', marginBottom: '8px', color: 'var(--text-main)' }}>
              Cô Nguyễn Thị Lệ Bình
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '24px' }}>
              🏫 Trường THPT Cheguevara
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* SĐT */}
              <div className="clean-card" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '14px', background: 'var(--bg-surface)' }}>
                <div style={{ fontSize: '1.4rem' }}>📞</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Số Điện Thoại (SĐT)</div>
                  <div style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 700 }}>0942 249 419</div>
                </div>
              </div>

              {/* Zalo */}
              <div className="clean-card" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '14px', background: 'var(--bg-surface)' }}>
                <div style={{ fontSize: '1.4rem' }}>💬</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tài Khoản Zalo</div>
                  <div style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 700 }}>0942 249 419</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
