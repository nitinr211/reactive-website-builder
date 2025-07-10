import React, { useState } from 'react';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div id="mySidenav" className={`sidenav ${isOpen ? 'open' : ''}`}>
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <a href="#">Save/Load</a>
        <a href="#">Components</a>
        <a href="#">Assets</a>
        <a href="#">Add/ Remove Databases</a>
        <a href="#">Graphics/ Animations</a>
        <a href="#">Analytics</a>
        <a href="#">Sign Out</a>
      </div>
      <span style={{ fontSize: 30, cursor: 'pointer' }} onClick={openNav}>
        &#9776; 
      </span>
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
