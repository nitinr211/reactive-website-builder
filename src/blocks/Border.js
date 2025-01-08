import {useState, Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';

export default function App() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = event => {
    if (isActive==false){
    setIsActive(current => !current);
    }

    document.addEventListener('click', this.handleClickOutside, true);
    
    handleClickOutside = event => {
        const domNode = ReactDOM.findDOMNode(this);
    
        if (!domNode || !domNode.contains(event.target) && isActive==true) {
            
                setIsActive(current => !current);
            }
        }
  };

  return (
    <div>
      <div className={isActive ? 'border' : ''} onClick={handleClick}>
        Click
      </div>
    </div>
  );
}