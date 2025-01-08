import React, { useState, useEffect } from "react";

function AnimationsLoad() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetch("/blocks")
      .then(response => response.json())
      .then(blocks => setBlocks(blocks));
  }, []);

  return (
    <div className="blocks-container">
      {blocks.map(block => (
        <div className="block" key={block.id}>
          <div className="block-name">{block.itemname}</div>
          <div dangerouslySetInnerHTML={{ __html: block.htmlcode }}></div>
        </div>
      ))}
    </div>
  );
}

export default Blocks;