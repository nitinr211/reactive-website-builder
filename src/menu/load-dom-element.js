import React, { useState, useEffect } from "react";
import axios from "axios";

function ElementList() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    axios.get("/elements")
      .then(response => setElements(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleElementDrag = (event, element) => {
    event.dataTransfer.setData("text/plain", element.id);
  };

  const handleDrop = (event, position) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    axios.post("/move_element.php", { id: id, position: position })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div className="element-list">
      <h2>Elements:</h2>
      <ul>
        {elements.map(element => (
          <li
            key={element.id}
            draggable={true}
            onDragStart={event => handleElementDrag(event, element)}
            onDrop={event => handleDrop(event, element.position)}
            onDragOver={event => event.preventDefault()}
          >
            {element.itemname}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ElementList;
