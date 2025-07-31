import React, { useState, useEffect } from 'react';
import CustomMenu from './CustomMenu';




const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
  const [customMenus, setCustomMenus] = useState([]);

  const openNav = () => setIsOpen(true);
  const closeNav = () => setIsOpen(false);
  const changeMenu = (index) => setMenuIndex(index);

  useEffect(() => {
    fetch('/tool/items.json') // This must be in your /public folder
      .then(res => res.json())
      .then(data => {
        console.log('Loaded menus:', data);
        setCustomMenus(data);
      })
      .catch(console.error);
  }, []);

  if (!customMenus.length) return null;

  const safeMenu = customMenus[menuIndex] || customMenus[0];

  return (
    <>
      <span style={{ fontSize: 30, cursor: 'pointer' }} onClick={openNav}>
        &#9776;
      </span>
      <CustomMenu
        customMenu={safeMenu}
        isOpen={isOpen}
        closeNav={closeNav}
        changeMenu={changeMenu}
      />
      <style>
        {`
          body {
            font-family: "Lato", sans-serif;
          }

          .sidenav {
            height: 100%;
            width: 0;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            background-color: #111;
            overflow-x: hidden;
            transition: 0.5s;
            padding-top: 60px;
            text-align: center;
          }

          .sidenav.open {
            width: 20%;
          }

          .sidenav a {
            padding: 8px 8px 8px 32px;
            text-decoration: none;
            font-size: 25px;
            color: #818181;
            display: block;
            transition: 0.3s;
          }

          .sidenav a:hover {
            color: #f1f1f1;
          }

          .sidenav .closebtn {
            position: absolute;
            top: 0;
            right: 25px;
            font-size: 36px;
            margin-left: 50px;
          }

          @media screen and (max-height: 450px) {
            .sidenav {
              padding-top: 15px;
            }

            .sidenav a {
              font-size: 18px;
            }
          }
        `}
      </style>
    </>
  );
};

export default SideNav;
