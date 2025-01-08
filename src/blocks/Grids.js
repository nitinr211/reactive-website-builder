import React from 'react';

const Grid = ({ number }) => {
  return (
    <div className="grid-container">
      <h2>Grid {number}</h2>
      <div className="grid">
        <div className="grid-item">1</div>
        <div className="grid-item">2</div>
        <div className="grid-item">3</div>
        <div className="grid-item">4</div>
        <div className="grid-item">5</div>
        <div className="grid-item">6</div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <Grid number={1} />
      <Grid number={2} />
      <Grid number={3} />
    </div>
  );
}
