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
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="40" cy="40" r="18" fill="#00BCD4"/>
              <circle cx="80" cy="40" r="18" fill="#00BCD4"/>
              <circle cx="40" cy="80" r="18" fill="#00BCD4"/>
              <circle cx="80" cy="80" r="18" fill="#CDDC39"/>
            </svg>
          </div>
          <h1 className="app-title">Kemenkes</h1>
        </div>

        <div className="system-info">
          <h2>SISTEM INFORMASI INSPEKSI SANITASI KAPAL</h2>
          <p>MINISTRY OF HEALTH REPUBLIC OF INDONESIA</p>
        </div>

        <div className="tap-to-start">
          <div className="tap-icon">👆</div>
          <div className="tap-text">Ketuk untuk memulai</div>
          <div className="tap-subtext">Tap to start</div>
        </div>

        <div className="footer-info">
          <p>BKK Tanjung Pinang</p>
          <p className="version">v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
