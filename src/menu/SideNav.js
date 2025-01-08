// import React, { useState } from 'react';
// import CustomMenu from './CustomMenu';

// const SideNav = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openNav = () => {
//     setIsOpen(true);
//   };

//   const closeNav = () => {
//     setIsOpen(false);
//   };

//   // Define customMenu object here
//   const customMenu = {
//     links: [
//       { label: 'Save/Load', index: 0 },
//       { label: 'Components', index: 1 },
//       { label: 'Assets', index: 2 },
//       { label: 'Add/Remove Databases', index: 3 },
//       { label: 'Graphics/Animations', index: 4 },
//       { label: 'Analytics', index: 5 },
//       { label: 'Sign Out', index: 6 },
//     ],
//     items: [
//       // Menu configurations for Save/Load
//       [
//         { type: 'slider', label: 'Volume', min: 0, max: 100, defaultValue: 50 },
//         { type: 'input', label: 'Username', placeholder: 'Enter your usernameeee' },
//       ],
//       // Menu configurations for Components
//       [
//         { type: 'slider', label: 'Brightness', min: 0, max: 100, defaultValue: 75 },
//         { type: 'input', label: 'Email', placeholder: 'Enter your email' },
//       ],
//       // Menu configurations for Assets
//       [
//         { type: 'slider', label: 'Contrast', min: 0, max: 100, defaultValue: 25 },
//         { type: 'input', label: 'Password', placeholder: 'Enter your password' },
//       ],
//       // Additional configurations can be added here
//     ],
//   };

//   return (
//     <>
//       <span style={{ fontSize: 30, cursor: 'pointer' }} onClick={openNav}>
//         &#9776; 
//       </span>
//       <CustomMenu customMenu={customMenu} isOpen={isOpen} closeNav={closeNav} />
//       <style>
//         {`
//           body {
//             font-family: "Lato", sans-serif;
//           }

//           .sidenav {
//             height: 100%;
//             width: 0;
//             position: fixed;
//             z-index: 1;
//             top: 0;
//             left: 0;
//             background-color: #111;
//             overflow-x: hidden;
//             transition: 0.5s;
//             padding-top: 60px;
//             text-align: center;
//           }

//           .sidenav.open {
//             width: 20%;
//           }

//           .sidenav a {
//             padding: 8px 8px 8px 32px;
//             text-decoration: none;
//             font-size: 25px;
//             color: #818181;
//             display: block;
//             transition: 0.3s;
//           }

//           .sidenav a:hover {
//             color: #f1f1f1;
//           }

//           .sidenav .closebtn {
//             position: absolute;
//             top: 0;
//             right: 25px;
//             font-size: 36px;
//             margin-left: 50px;
//           }

//           @media screen and (max-height: 450px) {
//             .sidenav {
//               padding-top: 15px;
//             }

//             .sidenav a {
//               font-size: 18px;
//             }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default SideNav;



import React, { useState } from 'react';
import CustomMenu from './CustomMenu';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0); // State to track the current menu

  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  // Define two customMenu objects
  const customMenus = [
    {
      links: [
        { label: 'Save/Load', index: 0 },
        { label: 'Components', index: 1 },
        { label: 'Assets', index: 2 },
        { label: 'Add/Remove Databases', index: 3 },
        { label: 'Graphics/Animations', index: 4 },
        { label: 'Analytics', index: 5 },
        { label: 'Sign Out', index: 6 },
      ],
      items: [
        [
          { type: 'slider', label: 'Volume', min: 0, max: 100, defaultValue: 50 },
          { type: 'input', label: 'Username', placeholder: 'Enter your username' },
        ],
        [
          { type: 'slider', label: 'Brightness', min: 0, max: 100, defaultValue: 75 },
          { type: 'input', label: 'Email', placeholder: 'Enter your email' },
        ],
        [
          { type: 'slider', label: 'Contrast', min: 0, max: 100, defaultValue: 25 },
          { type: 'input', label: 'Password', placeholder: 'Enter your password' },
        ],
      ],
    },
    {
      links: [
        { label: 'Settings', index: 0 },
        { label: 'Profile', index: 1 },
        { label: 'Help', index: 2 },
        { label: 'Back', index: 0},
      ],
      items: [
        [
          { type: 'slider', label: 'Notification Volume', min: 0, max: 100, defaultValue: 70 },
          { type: 'input', label: 'User Role', placeholder: 'Enter your role' },
        ],
        [
          { type: 'input', label: 'New Password', placeholder: 'Enter new password' },
          { type: 'input', label: 'Confirm Password', placeholder: 'Confirm new password' },
        ],
      ],
    },
  ];

  // Function to change menu
  const changeMenu = (index) => {
    setMenuIndex(index);
  };

  return (
    <>
      <span style={{ fontSize: 30, cursor: 'pointer' }} onClick={openNav}>
        &#9776; 
      </span>
      <CustomMenu
        customMenu={customMenus[menuIndex]}
        isOpen={isOpen}
        closeNav={closeNav}
        changeMenu={changeMenu} // Pass the function to change menus
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
