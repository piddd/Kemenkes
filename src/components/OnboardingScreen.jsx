import { useState } from 'react';

export default function OnboardingScreen({ onComplete }) {
  const [isReady, setIsReady] = useState(false);

  const handleStart = () => {
    setIsReady(true);
    setTimeout(() => onComplete(), 300);
  };

  return (
    <div className="onboarding-screen" onClick={handleStart}>
      <div className="onboarding-content">
        <div className="logo-container">
          <div className="logo-kemenkes">
            <img 
              src="/logo-karantina-terbaru.png" 
              alt="Kemenkes BKK Tanjung Pinang" 
              style={{width: '200px', height: 'auto', borderRadius: '4px'}}
            />
          </div>
        </div>

        <div className="system-info">
          <h2>FORMULIR INSPEKSI SANITASI KAPAL</h2>
          <p>MINISTRY OF HEALTH REPUBLIC OF INDONESIA</p>
        </div>

        <div className="tap-to-start">
          <div className="tap-icon">👆</div>
          <div className="tap-text">Ketuk untuk memulai</div>
          <div className="tap-subtext">Tap to start</div>
        </div>

        <div className="footer-info">
          <p>Balai Kekarantinaan Kesehatan Kelas I Tanjungpinang</p>
          <p className="version">v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
