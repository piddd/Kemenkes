import { useEffect } from 'react';

/**
 * Toast notification component
 * @param {object} props - Component props
 * @param {string} props.message - Toast message
 * @param {string} props.type - Toast type (success, error, warning, info)
 * @param {function} props.onClose - Close callback
 * @param {number} props.duration - Auto-close duration in ms
 */
export default function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      default: return 'ℹ';
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success': return { bg: '#10b981', border: '#059669' };
      case 'error': return { bg: '#ef4444', border: '#dc2626' };
      case 'warning': return { bg: '#f59e0b', border: '#d97706' };
      default: return { bg: '#3b82f6', border: '#2563eb' };
    }
  };

  const colors = getColors();

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        background: colors.bg,
        color: '#fff',
        padding: '12px 20px',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        minWidth: 300,
        maxWidth: 500,
        animation: 'slideIn 0.3s ease-out',
        border: `2px solid ${colors.border}`
      }}
    >
      <div style={{
        fontSize: 20,
        fontWeight: 'bold',
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '50%'
      }}>
        {getIcon()}
      </div>
      <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>
        {message}
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: 18,
          cursor: 'pointer',
          padding: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.8,
          transition: 'opacity 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.opacity = 1}
        onMouseLeave={(e) => e.target.style.opacity = 0.8}
      >
        ✕
      </button>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
