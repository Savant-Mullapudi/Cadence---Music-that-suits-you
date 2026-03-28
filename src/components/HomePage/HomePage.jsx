import React, { useEffect, useRef } from 'react';
import './HomePage.css';

function HomePage({ onNavigateToSongs }) {
  const vinylRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      if (vinylRef.current) {
        vinylRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) rotate(0deg)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="homepage">
      {/* Ambient background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Noise grain overlay */}
      <div className="grain" />

      <div className="layout">

        {/* Left column — text content */}
        <div className="left-col">
          <div className="eyebrow">
            <span className="dot" />
            Now Playing — Cadence
          </div>

          <h1 className="headline">
            <span className="headline-line">Music</span>
            <span className="headline-line accent">that</span>
            <span className="headline-line">suits you.</span>
          </h1>

          <p className="descriptor">
            A personal playlist I built out of pure passion. 10 hand-picked 
            global anthems from artists like Ed Sheeran, Shakira, Justin Bieber 
            & more. My own little corner of great music.
          </p>

          <div className="stats-row">
            <div className="stat">
              <span className="stat-num">10</span>
              <span className="stat-label">Tracks</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">8</span>
              <span className="stat-label">Artists</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">~37</span>
              <span className="stat-label">Minutes</span>
            </div>
          </div>

          <button className="cta-button" onClick={onNavigateToSongs}>
            <span className="cta-text">Open Collection</span>
            <span className="cta-arrow">→</span>
          </button>
        </div>

        {/* Right column — vinyl visual */}
        <div className="right-col">
          <div className="vinyl-scene" ref={vinylRef}>
            <div className="vinyl-disc">
              <div className="vinyl-grooves" />
              <div className="vinyl-label">
                <img src="/music logo.png" alt="Cadence" className="label-logo" />
                <span className="label-name">CADENCE</span>
              </div>
              <div className="vinyl-shine" />
            </div>
            <div className="vinyl-shadow" />
          </div>

          {/* Floating song pills */}
          <div className="pill pill-1">🎵 Shape of You</div>
          <div className="pill pill-2">🎶 Despacito</div>
          <div className="pill pill-3">🎵 Waka Waka</div>
        </div>

      </div>

      {/* Bottom ticker */}
      <div className="ticker-bar">
        <div className="ticker-track">
          {['Shape of You', 'Despacito', 'See You Again', 'Roar', 'Sorry',
            'Waka Waka', 'Perfect', 'Sugar', "We Don't Talk Anymore", 'One Love',
            'Shape of You', 'Despacito', 'See You Again', 'Roar', 'Sorry',
            'Waka Waka', 'Perfect', 'Sugar', "We Don't Talk Anymore", 'One Love'
          ].map((title, i) => (
            <span key={i} className="ticker-item">
              ♪ {title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;