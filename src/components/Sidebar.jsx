export default function Sidebar({ currentStep, progress, onStepClick, isOpen, onClose }) {
  const steps = [
    { num: 1, label: 'Data Umum', icon: '📝' },
    { num: 2, label: 'Sanitasi', icon: '🚢' },
    { num: 3, label: 'Air Minum', icon: '💧' },
    { num: 4, label: 'Pangan', icon: '🍽️' },
    { num: 5, label: 'Limbah', icon: '♻️' },
    { num: 6, label: 'Radiasi', icon: '☢️' },
    { num: 7, label: 'Vektor', icon: '🐀' },
    { num: 8, label: 'Laporan', icon: '📋' },
    { num: 9, label: 'Submit & TTD', icon: '✍️' },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <button className="sidebar-close" onClick={onClose} aria-label="Close Menu">
        ✕
      </button>
      
      <div className="sidebar-brand">
        <img 
          src="/kemenkes.png" 
          alt="Kemenkes" 
          className="sidebar-logo"
          onError={(e) => e.target.style.display='none'} 
        />
        <div className="sidebar-title">
          <h1>SSCEC/SSCC</h1>
          <p>Ship Sanitation</p>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-label">Progress: {progress}%</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{width: `${progress}%`}}></div>
        </div>
      </div>

      <div className="sidebar-label">LANGKAH</div>
      {steps.map(step => (
        <button
          key={step.num}
          className={`sidebar-item ${currentStep === step.num ? 'active' : ''} ${currentStep > step.num ? 'completed' : ''}`}
          onClick={() => onStepClick(step.num)}
        >
          <span className="step-num">{step.num}</span>
          <span className="icon">{step.icon}</span>
          <span>{step.label}</span>
        </button>
      ))}
    </div>
  );
}
