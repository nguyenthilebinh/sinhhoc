import React from 'react';
import { BookOpen, Github, CheckCircle2, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      marginTop: '80px',
      borderTop: '1px solid var(--border-subtle)',
      background: 'rgba(9, 13, 22, 0.95)',
      padding: '40px 0 24px 0'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '32px',
          marginBottom: '32px'
        }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#fff' }}>BioLab Interactive</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Nền tảng học tập Sinh học tương tác 2D cho học sinh THPT. Giúp biến những kiến thức lý thuyết trong sách giáo khoa thành trải nghiệm khám phá trực quan và sinh động.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '1.0rem', marginBottom: '12px', color: '#fff' }}>Nguồn Kiến Thức Chuẩn</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="var(--accent-emerald)" /> Sinh học 10 (sinh-10.pdf)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="var(--accent-cyan)" /> Sinh học 11 (sinh-11.pdf)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="var(--accent-purple)" /> Sinh học 12 (sinh-12.pdf)
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.0rem', marginBottom: '12px', color: '#fff' }}>Triết Lý Sản Phẩm</h4>
            <ul style={{ paddingLeft: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Khám phá ➔ Đọc ➔ Tương tác ➔ Thấu hiểu</li>
              <li>Tương tác 2D nhẹ nhàng, không gây sao nhãng</li>
              <li>Đối chiếu trực tiếp với trang sách PDF gốc</li>
            </ul>
          </div>
        </div>

        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8rem',
          color: 'var(--text-dim)'
        }}>
          <div>
            © {new Date().getFullYear()} BioLab Interactive Textbook. Sẵn sàng Deploy GitHub Pages.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={14} color="var(--accent-emerald)" /> Localhost & GitHub Pages Ready
          </div>
        </div>
      </div>
    </footer>
  );
};
