import React, { useState } from "react";
import axios from 'axios';
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser'
import {Rnd} from 'react-rnd';
import FontSelect from '../fonts/font-select';
import { relative } from "path";



const fs = require('fs');

class TextList extends React.Component {


  
  constructor(props){
    super(props);
   
    this.state = {
      item: [],
      borders: [],
      isMenuVisible: false,
      
      }
      this.liContainers = [];
    }
 
  


  componentDidMount() {
    axios.get('http://localhost:9000/reactive-website-builder/APIs/select-text-data.php?selected=1')
      .then(res => {
        // Log the response to check the format
        console.log(res.data);
  
        // Assuming res.data is an array or an object you can map over
        const objupdates = Array.isArray(res.data) ? res.data : [res.data]; // Ensure it's an array
        const itemsWithMenuOpen = objupdates.map(item => ({
          ...item,
          isOpen: false,
          isEditable: false
        }));
  

        console.log(itemsWithMenuOpen);

        this.liContainers = itemsWithMenuOpen.map(() => React.createRef());
        this.setState({ item: itemsWithMenuOpen });
      })
      .catch(error => {
        console.error(error);
      });
  }
  


  
 handleTextShrink = (index) => {
  this.setState(() => {
    // Decrease the font size of the item at the given index
    const items = this.state.item;
    items[index].fontsize = Math.max(items[index].fontsize - 10, 8);
    return { item: items };
  });
}

handleColorChange = (event, index) => {
  this.setState(() => {
    const selectedColor = event.target.value;
    const items = this.state.item;
    items[index].color = selectedColor;
    console.log(items[index].color);
    return { item: items };
  });
}



  handleTextGrow = (index) => {
  this.setState(() => {
  // Increase the font size of the item at the given index
  const items = this.state.item;
  items[index].fontsize = parseInt(items[index].fontsize, 10) + 10;
  return { items: items};
  });
  }


  handleFontChange = (event, index) => {
      this.setState(() => {
        const selectedFont = event.target.value;
        const items = this.state.item;
        items[index].font = selectedFont;
        return { items: items };
      });
    };
  


 
  toggleMenu = (index) => {
    const newItems = [...this.state.item];
    newItems[index].isOpen = !newItems[index].isOpen;
    this.setState({ item: newItems });
  }

  toggleEditable = (index) => {
    const newItems = [...this.state.item];
    newItems[index].isEditable = !newItems[index].isEditable;
    this.setState({ item: newItems });
  }

  handleTripleClick = (index) => {
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
    }
  
    this.clickCounter = (this.clickCounter || 0) + 1;
  
    if (this.clickCounter === 3) {
      // Toggle 'isTripleClicked' state on the third click
      const newItems = [...this.state.item];
      newItems[index].isTripleClicked = !newItems[index].isTripleClicked;
      this.setState({ item: newItems });
      this.clickCounter = 0; // Reset counter after the third click
    } else {
      // Reset the click counter if no third click occurs within a set time
      this.clickTimeout = setTimeout(() => {
        this.clickCounter = 0;
      }, 500); // Adjust timeout as needed for triple-click detection
    }
  };

  handleListResize(index) {
    const liContainer = this.liContainers[index].current;
    const minWidth = liContainer.clientWidth;
    const minHeight = liContainer.clientHeight;
    console.log(`minWidth: ${minWidth}, minHeight: ${minHeight}`);
  }
  
   
  
handleStorage = (index) => {
  // Remove the item from the itemlist
  const newItems = [...this.state.item];
  const removedItem = newItems.splice(index, 1)[0]; // Get the removed item for processing
  this.setState({ item: newItems });

  // Write the `itemcode` from the removed item to an HTML file
  if (removedItem && removedItem.itemcode) {
    const htmlContent = `<li data-arr-id= ${removedItem.itemid} style=\"font-size: ${removedItem.fontsize}; font-family: ${removedItem.font}; color: ${removedItem.color};\">${removedItem.itemcode}</li>`;

    // Assuming Node.js is being used for server-side operations
    axios.post('http://localhost:5000/write-to-file', {
      content: htmlContent,
    })
    .then(response => {
      console.log('File written successfully:', response.data);
    })
    .catch(error => {
      console.error('Error writing file:', error);
    });
  }
};



render() {
  const itemlist = this.state.item;
  const rndStyle = {
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // border: '1px solid #ddd',
    // background: '#f0f0f0',
  };
  if (this.state.item.length === 0) {
    return null;
  }

  var top = 248;
  var left = 700;

  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, overflow: 'auto' }}>
      <ul>
        {itemlist.map((record, index) => {
          console.log(`record ${index}.isOpen: ${record.isOpen}`);
          console.log(`record ${index}.isResizable: ${record.isOpen ? 'true' : 'false'}`);
          return (
            <Rnd
              key={index}
              bounds=".app-container"
              style={rndStyle}
              minWidth={this.liContainers[index].current?.clientWidth}
              minHeight={this.liContainers[index].current?.clientHeight}
             
              
              onDragStop={record.isOpen ? this.eventLogger : null}
              resizable={record.isOpen ? {
                edges: {
                  top: true,
                  right: true,
                  bottom: true,
                  left: true,
                },
              } : false}
              resizeHandleWrapperStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              
            >
              <li
                
                ref={this.liContainers[index]}
                key={index}
                
                style={{
                  fontSize: itemlist[index].fontsize,
                  fontFamily: itemlist[index].font,
                  color: itemlist[index].color,
                  width: "100%",
                  listStyleType:"none",
                  padding: "10px",
                  boxSizing: "border-box",
                  position: "relative",
                  border: '2px dotted black',
                  outline: 'none'
                  
                }}
                onClick={() => {
                  // Call the handleTripleClick function
                  this.handleTripleClick(index);
                  
                  // Additional logic for handling storage or toggling the isDoubleClicked state
                  if (itemlist[index].isTripleClicked) {
                    // If it's already double-clicked (active), call handleStorage
                    this.handleStorage(index);
                  } else {
                    // Toggle the isDoubleClicked state
                    this.toggleEditable(index);
                  }
                }}
                
               
              >
                {ReactHtmlParser(record.itemcode)}

             
              </li>

              <div></div>
            </Rnd>
          );
        })}
      </ul>
    </div>
  );
}
}

  const Menu = ({ handleTextGrow, handleTextShrink, handleFontChange, isOpen, handleColorChange,  }) => {
    const outlineStyle = {
      outline: '0.5px solid black',
      borderRadius: '10px',
    };
    
    const fontList = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia'];
    const selectedFont = fontList[0];
    return (
      <div contentEditable={false}>
        {isOpen && (
          <div>
            
            <button onClick={handleTextShrink}>-</button>
            <span></span>
            <button onClick={handleTextGrow}>+</button>
            <select style={outlineStyle} value={selectedFont} onChange={handleFontChange}>
              <FontSelect fonts={fontList} handleFontChange={handleFontChange} />
            </select>
            
            <input type='color' onChange={(event) => handleColorChange(event)}></input>
            <button>X</button>
          </div>
        )}
      </div>
    );
  };
  
 

export default TextList;  