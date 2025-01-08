import React, { useState } from "react";
import axios from 'axios';
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser'
import {Rnd} from 'react-rnd';
const fs = require('fs');

class ImageList extends React.Component {


  
  constructor(props){
    super(props);
    this.state = {
      item: [],
      borders: [],
      isMenuVisible: false
      }}


componentDidMount() {

  axios.get('http://localhost/select-image-data.php')
  .then(res => {
    const obj = res.data;
    const objupdates= JSON.parse("[" + obj + "]");
    const itemsWithMenuOpen = objupdates.map(item => ({ ...item, isOpen: false, isEditable: false}));
    this.setState({ item: itemsWithMenuOpen });
    })
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

handleTransparencyChange = (event, index) => {
  this.setState(() => {
    const selectedTransparency = event.target.value;
    const items = this.state.item;
    items[index].transparency = selectedTransparency;
    console.log(items[index].color);
    return { item: items };
  });
}




  handleEffectChange = (event, index) => {
      this.setState(() => {
        const selectedEffect = event.target.value;
        const items = this.state.item;
        items[index].effect = selectedEffect;
        return { items: items };
      });
    };
  

  
  toggleMenu = (index) => {
    const newItems = [...this.state.item];
    newItems[index].isOpen = !newItems[index].isOpen;
    this.setState({ item: newItems });
  }


   
      // handleChange = (event, index) => {
      //   this.setState((state) => {
      //   const items = state.item.map((item, i) =>
      //   i === index ? event.target.innerText : item
      //   );
      //   return { items };
      //   });
      //   };
        
    
//<li
  //                    style={{ fontSize: this.fontSize }}
    //                  onClick={(event) => this.handleClick(event, index)}
      //                onBlur={() => this.handleBlur(index)}
        //              onInput={(event) => this.handleChange(event, index)}
          //            contentEditable={!item}
            //          className={this.state.borders[index] ? 'border' : ''}
              //      ></li>
//onMinusClick={() => this.handleQuantityChange(item.id, -1)} onPlusClick={() => this.handleQuantityChange(item.id, 1)} quantity={item.quantity}

              render() {

                const itemlist= this.state.item;
                

                 if (this.state.item.length === 0) {
                   return null;
                }
                var top = 248;
                var left=700;
                    return (
                     
                   
                     <div>
                          <ul>
                              {itemlist.map((record, index) => <Rnd onDragStop={this.eventLogger}> <li key={index} style={{ fontSize: itemlist[index].fontsize, fontFamily: itemlist[index].font, color: itemlist[index].color}} onDoubleClick={() => {this.toggleMenu(index);}}>{ReactHtmlParser(record.itemcode)} 
                              
                              
                              
                              <Menu handleColorChange={(event) => this.handleColorChange(event, index)} isOpen={record.isOpen}/>
</li>
                              <div>
                                
                                
                     
                     
                             </div>
                              
                              
                              </Rnd>)}
                          </ul>
                      </div>
                        
                    );
                 }
              }


   
  //  eventLogger = (e, data) => {
  //     console.log(data.x);
  //     axios.post('http://localhost/insert-flurry-web-data.php',{itemid: 'random',  xposition: data.x, yposition: data.y})
  //     .then(function(response){
  //         console.log(response);
  //   }).catch(function (error) {
  //         console.log(error);
  //   }); 
  //   };


    // function handleMenuClick(index) {
    //   // Toggle the open/closed state of the clicked menu
    //   const newIsOpen = [...isOpen];
    //   newIsOpen[index] = !newIsOpen[index];
    //   setIsOpen(newIsOpen);
    // }
  
    // function handleBlur() {
    //   // Close all menus when one of them loses focus
    //   setIsOpen(isOpen.map(() => false));
    // }
  //onBlur={handleBlur}
   



         

  const Menu = ({handleTransparencyChange, handleEffectChange, isOpen, handleColorChange}) => {


    return(
      <div>
      {isOpen && (
      <div> 
      <span></span>
 
      <select onChange={(event) => handleEffectChange(event)}>
        <option value="Stripes">Horizontal Stripes</option>
        <option value="HStripes">Horizontal Stripes</option>
        <option value="RGB">RGB Switch</option>
      </select>
      <input type="range" id="slider" name="slider" min="0" max="100" value="50" onChange={(event) => handleTransparencyChange(event)}> </input>
      <input type='color' onChange={(event) => handleColorChange(event)}></input>
    </div>
      )}
    </div>
  );
}

// function StaticHtml(isOpen) {
//   //  {render({ itemCode: item.itemCode })}

//   return (
//    // <div onBlur={handleBlur}>
//    <div>
     
//       {isOpen && (
//         <div>
//           {/* {items.map((item) => (
//             <div key={item.id} className="menu-item">
             
//             </div>
//           ))}
//           */}
//         </div>
//       )}
//     </div>
//   );
// }

// function exportItemsAsArray(items) {
//   let itemsArray = [];
//   items.forEach((item) => {
//     itemsArray.push(item.itemCode);
//   });
//   return itemsArray;
// }



export default ImageList;  