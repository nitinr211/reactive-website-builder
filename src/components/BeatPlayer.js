import React, { useState } from 'react';

// Define a beat object structure for clarity and future expansion
const beats = [
  {
    id: "7845",
    title: "**ROD WAVE TYPE BEAT** ICY HEART",
    genre: "20 Plays",
    price: "$19.99",
    image: "https://i0.wp.com/hstlrs.store/wp-content/uploads/edd/2022/07/icy.jpg?resize=75%2C75&ssl=1",
    audioSrc: "./wp-content/uploads/edd/2022/07/Rod-Wave-Type-Beat-2022-Icy-Heart.mp3",
  },
  // Add other beats following the same structure
];

function BeatPlayer() {
  const [currentBeat, setCurrentBeat] = useState(beats[0]);

  // Function to change the current beat
  const selectBeat = (beat) => {
    setCurrentBeat(beat);
  };

  return (
    <div id="mediawrapper">
      <audio id="mejs" style={{ width: '100%' }} preload="none" controls src={currentBeat.audioSrc}>
        Your browser does not support the audio element.
      </audio>
      <div>
        {beats.map((beat) => (
          <button key={beat.id} onClick={() => selectBeat(beat)}>
            <img src={beat.image} alt={beat.title} width="60" height="60" />
            {beat.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BeatPlayer;
