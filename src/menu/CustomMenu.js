import React from 'react';

class CustomMenu extends React.Component {
  render() {
    const { customMenu, isOpen, closeNav, changeMenu } = this.props;
    const { links, items } = customMenu;

    return (
      <div className={`sidenav ${isOpen ? 'open' : ''}`}>
        <a href="#" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        
        {/* Render the links for changing menus */}
        {links.map(link => (
          <a key={link.index} href="#" onClick={() => changeMenu(link.index)}>
            {link.label}
          </a>
        ))}
        
        {/* Render the current menu items */}
        {/* <div className="menu-items">
          {items.map(item => this.renderComponent(item))}
        </div> */}

        <div className="menu-items">
         {items.flat().map(item => this.renderComponent(item))}
        </div>
      </div>
    );
  } 

  renderComponent(item) {
  const labelStyle = { color: 'white', display: 'block', marginBottom: '5px' };

  switch (item.type) {
    case 'slider':
      return (
        <div key={item.label} style={{ margin: '10px 0' }}>
          <label style={labelStyle}>{item.label}</label>
          <input
            type="range"
            min={item.min}
            max={item.max}
            defaultValue={item.defaultValue}
          />
        </div>
      );
    case 'input':
      return (
        <div key={item.label} style={{ margin: '10px 0' }}>
          <label style={labelStyle}>{item.label}</label>
          <input type="text" placeholder={item.placeholder} />
        </div>
      );
    default:
      return null;
  }
}
}

export default CustomMenu;
