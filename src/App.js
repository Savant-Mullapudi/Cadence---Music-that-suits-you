import React, { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import SongsPage from './components/SongsPage/SongsPage';
import ControlCenter from './components/ControlCenter/ControlCenter';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  const handleSongSelect = (song) => {
    setCurrentSong(song);
  };

  const handlePlaylistUpdate = (songs) => {
    setPlaylist(songs);
  };

  const handleNext = () => {
    if (playlist.length > 0 && currentSong) {
      const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % playlist.length;
      setCurrentSong(playlist[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (playlist.length > 0 && currentSong) {
      const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      setCurrentSong(playlist[prevIndex]);
    }
  };

  const navigateToSongs = () => {
    setCurrentPage('songs');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setCurrentSong(null);
  };

  return (
    <div className="App">
      <main className="main-content">
        {currentPage === 'home' && <HomePage onNavigateToSongs={navigateToSongs} />}
        {currentPage === 'songs' && (
          <SongsPage 
            onSongSelect={handleSongSelect} 
            currentSong={currentSong}
            onPlaylistUpdate={handlePlaylistUpdate}
            onNavigateToHome={navigateToHome}
          />
        )}
      </main>

      {/* Only show ControlCenter on songs page */}
      {currentPage === 'songs' && (
        <ControlCenter
          currentSong={currentSong}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
}

export default App;