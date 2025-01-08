import React, { useState } from 'react';

function Parent() {
  const [containers, setContainers] = useState([
    { id: 1, items: [] },
    { id: 2, items: [] },
    { id: 3, items: [] },
  ]);

  const addItemToContainer = (itemId, containerId) => {
    setContainers((prevState) => {
      const containerIndex = prevState.findIndex(
        (container) => container.id === containerId
      );
      if (containerIndex === -1) {
        return prevState;
      }

      const updatedContainer = {
        ...prevState[containerIndex],
        items: [...prevState[containerIndex].items, itemId],
      };

      return [
        ...prevState.slice(0, containerIndex),
        updatedContainer,
        ...prevState.slice(containerIndex + 1),
      ];
    });
  };

  const removeItemFromContainer = (itemId, containerId) => {
    setContainers((prevState) => {
      const containerIndex = prevState.findIndex(
        (container) => container.id === containerId
      );
      if (containerIndex === -1) {
        return prevState;
      }

      const itemIndex = prevState[containerIndex].items.findIndex(
        (item) => item.id === itemId
      );
      if (itemIndex === -1) {
        return prevState;
      }

      const updatedContainer = {
        ...prevState[containerIndex],
        items: [
          ...prevState[containerIndex].items.slice(0, itemIndex),
          ...prevState[containerIndex].items.slice(itemIndex + 1),
        ],
      };

      return [
        ...prevState.slice(0, containerIndex),
        updatedContainer,
        ...prevState.slice(containerIndex + 1),
      ];
    });
  };

  return (
    <div className="parent">
      {containers.map((container) => (
        <div className="container" key={container.id}>
          {container.items.map((item) => (
            <Child
              key={item.id}
              id={item.id}
              containerId={container.id}
              addItemToContainer={addItemToContainer}
              removeItemFromContainer={removeItemFromContainer}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Child({
  id,
  containerId,
  addItemToContainer,
  removeItemFromContainer,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentContainer, setCurrentContainer] = useState(containerId);

  const handleDragStart = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnd = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrag = (event) => {
    event.preventDefault();
    if (isDragging) {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const containerId = event.target.getAttribute('data-container-id');
    setCurrentContainer(containerId);
    addItemToContainer(id, containerId);
  };

  return (
    <div
      className="child"
      style={{ position: 'absolute', top: position.y, left: position.x }}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      onDrop={handleDrop}
      data-container-id={currentContainer}
    >
      <button onClick={() => removeItemFromContainer(id
