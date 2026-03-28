import React, { useState } from 'react';
import './SongsPage.css';

function SongsPage({ onSongSelect, currentSong, onPlaylistUpdate, onNavigateToHome }) {
  const [songs] = useState([
    { id: 1,  title: 'Shape of You',          artist: 'Ed Sheeran',                      file: '/songs/Shape of You.mp3',          cover: '/covers/SoY Cover.jpeg',       duration: '3:52' },
    { id: 2,  title: 'Despacito',              artist: 'Luis Fonsi ft. Daddy Yankee',     file: '/songs/Despacito.mp3',             cover: '/covers/Despacito Cover.jpeg',  duration: '4:40' },
    { id: 3,  title: 'See You Again',          artist: 'Wiz Khalifa ft. Charlie Puth',   file: '/songs/See You Again.mp3',         cover: '/covers/SYA Cover.jpeg',        duration: '3:57' },
    { id: 4,  title: 'Roar',                   artist: 'Katy Perry',                      file: '/songs/Roar.mp3',                  cover: '/covers/Roar Cover.jpeg',       duration: '3:50' },
    { id: 5,  title: 'Sorry',                  artist: 'Justin Bieber',                   file: '/songs/Sorry.mp3',                 cover: '/covers/Sorry Cover.jpeg',      duration: '3:18' },
    { id: 6,  title: 'Waka Waka',              artist: 'Shakira',                         file: '/songs/Waka Waka.mp3',             cover: '/covers/Waka Waka Cover.jpeg',  duration: '3:30' },
    { id: 7,  title: 'Perfect',                artist: 'Ed Sheeran',                      file: '/songs/Perfect.mp3',               cover: '/covers/Perfect Cover.jpeg',    duration: '4:20' },
    { id: 8,  title: 'Sugar',                  artist: 'Maroon 5',                        file: '/songs/Sugar.mp3',                 cover: '/covers/Sugar Cover.jpeg',      duration: '3:51' },
    { id: 9,  title: "We Don't Talk Anymore",  artist: 'Charlie Puth ft. Selena Gomez',  file: "/songs/We Don't Talk Anymore.mp3", cover: '/covers/WDTA Cover.jpeg',       duration: '3:38' },
    { id: 10, title: 'One Love',               artist: 'Blue',                            file: '/songs/One Love.mp3',              cover: '/covers/One Love Cover.jpeg',   duration: '3:30' },
  ]);

  const [hoveredId, setHoveredId] = useState(null);

  React.useEffect(() => {
    if (onPlaylistUpdate) onPlaylistUpdate(songs);
  }, [songs, onPlaylistUpdate]);

  return (
    <div className="songs-page">
      {/* Ambient background */}
      <div className="sp-orb sp-orb-1" />
      <div className="sp-orb sp-orb-2" />
      <div className="grain" />

      {/* Header */}
      <header className="sp-header">
        <button className="back-btn" onClick={onNavigateToHome}>
          <span className="back-arrow">←</span>
          <span>Home</span>
        </button>

        <div className="sp-title-block">
          <span className="sp-eyebrow">♪ Global Hits</span>
          <h1 className="sp-title">My Collection</h1>
        </div>

        <div className="sp-meta">
          <span>{songs.length} tracks</span>
        </div>
      </header>

      {/* Track list */}
      <main className="sp-main">
        <div className="track-list">
          {/* Column labels */}
          <div className="track-cols-label">
            <span className="col-num">#</span>
            <span className="col-title">Title</span>
            <span className="col-artist">Artist</span>
            <span className="col-dur">Duration</span>
          </div>

          <div className="track-divider" />

          {songs.map((song, index) => {
            const isActive = currentSong?.id === song.id;
            const isHovered = hoveredId === song.id;

            return (
              <div
                key={song.id}
                className={`track-row ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
                onClick={() => onSongSelect(song)}
                onMouseEnter={() => setHoveredId(song.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Index / Play indicator */}
                <span className="col-num">
                  {isActive ? (
                    <span className="playing-bars">
                      <span /><span /><span />
                    </span>
                  ) : (
                    <span className="track-index">
                      {isHovered ? '▶' : String(index + 1).padStart(2, '0')}
                    </span>
                  )}
                </span>

                {/* Cover + Title */}
                <div className="col-title">
                  <div className="track-cover-wrap">
                    <img src={song.cover} alt={song.title} className="track-cover" />
                    {isActive && <div className="cover-glow" />}
                  </div>
                  <span className="track-name">{song.title}</span>
                </div>

                {/* Artist */}
                <span className="col-artist track-artist">{song.artist}</span>

                {/* Duration */}
                <span className="col-dur track-dur">{song.duration}</span>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default SongsPage;