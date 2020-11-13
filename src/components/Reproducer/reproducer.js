import React, { useState, useEffect } from "react";

const useAudio = path => {
  const [audio] = useState(new Audio(path));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({ path }) => {
  const [playing, toggle] = useAudio(path);

  return (
    <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
  );
};

export default Player;
