import React, { useState } from 'react';

function Blocks() {
  const [flexBoxes, setFlexBoxes] = useState([]);

  const addFlexBox = () => {
    setFlexBoxes([...flexBoxes, { height: 200, grids: [] }]);
  };

  const handleHeightChange = (index, e) => {
    const newFlexBoxes = [...flexBoxes];
    newFlexBoxes[index].height = parseInt(e.target.value);
    setFlexBoxes(newFlexBoxes);
  };

  const addGrid = (index) => {
    const newFlexBoxes = [...flexBoxes];
    newFlexBoxes[index].grids.push({ name: '', items: [] });
    setFlexBoxes(newFlexBoxes);
  };

  const handleGridNameChange = (boxIndex, gridIndex, e) => {
    const newFlexBoxes = [...flexBoxes];
    newFlexBoxes[boxIndex].grids[gridIndex].name = e.target.value;
    setFlexBoxes(newFlexBoxes);
  };

  const addGridItem = (boxIndex, gridIndex) => {
    const newFlexBoxes = [...flexBoxes];
    newFlexBoxes[boxIndex].grids[gridIndex].items.push('');
    setFlexBoxes(newFlexBoxes);
  };

  const handleGridItemClick = (boxIndex, gridIndex, itemIndex, e) => {
    const newFlexBoxes = [...flexBoxes];
    newFlexBoxes[boxIndex].grids[gridIndex].items[itemIndex] = e.target.value;
    setFlexBoxes(newFlexBoxes);
  };

  return (
    <div>
      <button onClick={addFlexBox}>Add Section</button>
      {flexBoxes.map((box, boxIndex) => (
        <div key={boxIndex} style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
          <div style={{name: box.name, height: box.height, border: '1px solid black', marginBottom: 5 }}>
            <label>
             
              <input
                type="string"
                placeholder="Section Name"
                value={box.name}
                onChange={(e) => handleHeightChange(boxIndex, e)}
               
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                value={box.height}
                onChange={(e) => handleHeightChange(boxIndex, e)}
              />
            </label>
          </div>
          {box.grids.map((grid, gridIndex) => (
            <div key={gridIndex} style={{ marginBottom: 10 }}>
              <input
                type="text"
                placeholder="Grid Name"
                value={grid.name}
                onChange={(e) => handleGridNameChange(boxIndex, gridIndex, e)}
              />
               <input
                type="number"
                placeholder="Width"
                value={grid.width}
                onChange={(e) => handleGridNameChange(boxIndex, gridIndex, e)}
              />
              <button onClick={() => addGridItem(boxIndex, gridIndex)}>Add Grid Item</button>
              {grid.items.map((item, itemIndex) => (
                <input
                  key={itemIndex}
                  type="text"
                  placeholder="Grid Item"
                  value={item}
                  onChange={(e) => handleGridItemClick(boxIndex, gridIndex, itemIndex, e)}
                />
              ))}
            </div>
          ))}
          <button onClick={() => addGrid(boxIndex)}>Add Grid</button>
        </div>
      ))}
    </div>
  );
}

export default Blocks;
