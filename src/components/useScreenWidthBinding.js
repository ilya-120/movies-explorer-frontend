import React, { useState, useEffect } from 'react';

export function useScreenWidthBinding(movies) {
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [timer, setTimer] = useState(0);
  const [showMovies, setShowMovies] = useState(12);

  function resizeFunc() {
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      setWinWidth(window.innerWidth);
    }, 1000));
  }

  useEffect(() => {
    window.addEventListener('resize', resizeFunc);
    if (winWidth >= 1280) {
      setShowMovies(12);
    } else if (winWidth >= 636) {
      setShowMovies(8);
    } else if (winWidth >= 0) {
      setShowMovies(5);
    }

    return () => {
      window.removeEventListener('resize', resizeFunc);
    }
  }, [winWidth]);

  function displayMoreMovies() {
    if (winWidth >= 1280) {
      setShowMovies(showMovies + 3);
    } else if (winWidth >= 636) {
      setShowMovies(showMovies + 2);
    } else if (winWidth >= 0) {
      setShowMovies(showMovies + 2);
    }
  }

  let displayedMovies = movies.length > 0 ? movies.slice(0, showMovies) : [];

  return {
    displayedMovies,
    displayMoreMovies,
  }
}
