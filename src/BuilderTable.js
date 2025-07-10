import React, { useState, useRef } from 'react';

function BuilderTable() {
  const [isDraggable, setIsDraggable] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isSelected, setIsSelected] = useState(false);
  const dragItem = useRef(null);
  const iframeRef = useRef(null);

  const handleDoubleClick = () => {
    setIsDraggable(true);
    setIsSelected((prev) => !prev);
    if (!isSelected) {
      // Add logic to store to database
      console.log('Object clicked to start dragging');
    } else {
      console.log('Object clicked to stop dragging and save to database');
      savePositionToDatabase(position);
    }
  };

  const handleMouseMove = (e) => {
    if (isDraggable && isSelected && dragItem.current) {
      const rect = iframeRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      setPosition({
        x: Math.max(0, Math.min(offsetX - dragItem.current.offsetWidth / 2, rect.width - dragItem.current.offsetWidth)),
        y: Math.max(0, Math.min(offsetY - dragItem.current.offsetHeight / 2, rect.height - dragItem.current.offsetHeight))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDraggable(false);
  };

  const savePositionToDatabase = (pos) => {
    // Replace with your database logic (e.g., API call)
    console.log('Saving position:', pos);
  };

  return (
    <div>
      <iframe
        ref={iframeRef}
        title="Builder Frame"
        style={{ width: '600px', height: '400px', border: '1px solid #ccc' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
       
      </iframe>
    </div>
  );
}

export default BuilderTable;
