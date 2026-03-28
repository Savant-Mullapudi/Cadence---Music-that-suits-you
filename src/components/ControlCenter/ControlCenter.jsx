import React, { useState, useRef, useEffect } from 'react';
import './ControlCenter.css';

function ControlCenter({ currentSong, onNext, onPrevious }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.file;
      audioRef.current.load();
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [currentSong]);

  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
  const handleLoadedMetadata = () => setDuration(audioRef.current.duration);

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    audioRef.current.volume = vol;
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.7;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleRewind = () => {
    if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };

  const handleForward = () => {
    if (audioRef.current) audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
  };

  const handleEnded = () => { setIsPlaying(false); onNext(); };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPct = duration ? (currentTime / duration) * 100 : 0;
  const volumePct = isMuted ? 0 : volume * 100;

  const volumeIcon = isMuted || volume === 0 ? '🔇' : volume < 0.4 ? '🔈' : volume < 0.7 ? '🔉' : '🔊';

  return (
    <div className="cc">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Progress bar — spans full width at very top */}
      <div className="cc-progress-track" onClick={(e) => {
        if (!duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        const time = pct * duration;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
      }}>
        <div className="cc-progress-fill" style={{ width: `${progressPct}%` }} />
        <div className="cc-progress-thumb" style={{ left: `${progressPct}%` }} />
      </div>

      <div className="cc-body">
        {/* Left — Now Playing */}
        <div className="cc-now-playing">
          {currentSong ? (
            <>
              <div className="cc-cover-wrap">
                <img src={currentSong.cover} alt={currentSong.title} className="cc-cover" />
                {isPlaying && <div className="cc-cover-ring" />}
              </div>
              <div className="cc-track-info">
                <span className="cc-track-title">{currentSong.title}</span>
                <span className="cc-track-artist">{currentSong.artist}</span>
              </div>
            </>
          ) : (
            <div className="cc-idle">
              <div className="cc-idle-disc" />
              <span className="cc-idle-text">Select a track</span>
            </div>
          )}
        </div>

        {/* Center — Controls */}
        <div className="cc-controls">
          <button className="cc-btn cc-btn-sm" onClick={handleRewind} title="Rewind 10s">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/><text x="7.5" y="15" fontSize="6" fontWeight="bold" fill="currentColor">10</text></svg>
          </button>

          <button className="cc-btn cc-btn-sm" onClick={onPrevious} title="Previous">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>

          <button className="cc-btn cc-btn-play" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          <button className="cc-btn cc-btn-sm" onClick={onNext} title="Next">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
          </button>

          <button className="cc-btn cc-btn-sm" onClick={handleForward} title="Forward 10s">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/><text x="7.5" y="15" fontSize="6" fontWeight="bold" fill="currentColor">10</text></svg>
          </button>
        </div>

        {/* Right — Time + Volume */}
        <div className="cc-right">
          <div className="cc-times">
            <span className="cc-time">{formatTime(currentTime)}</span>
            <span className="cc-time-sep">/</span>
            <span className="cc-time cc-time-total">{formatTime(duration)}</span>
          </div>

          <div className="cc-volume">
            <button className="cc-vol-icon" onClick={toggleMute} title="Toggle mute">
              {volumeIcon}
            </button>
            <div className="cc-vol-track" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const vol = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
              setVolume(vol);
              audioRef.current.volume = vol;
              setIsMuted(vol === 0);
            }}>
              <div className="cc-vol-fill" style={{ width: `${volumePct}%` }} />
              <div className="cc-vol-thumb" style={{ left: `${volumePct}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlCenter;