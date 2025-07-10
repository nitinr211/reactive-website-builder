import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FlexMenu from './FlexMenu'
const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const Label = styled.span`
  font-size: 18px;
  color: #333;
`;

function FlexBoxWithLabel(props) {
  const { label, children } = props;

  return (
    <FlexBox>
      <Label>{label}</Label>
      {children}
      <FlexMenu/>
      <Parent containers={containers} addItemToContainer={addItemToContainer} removeItemFromContainer={removeItemFromContainer} /> {/* Render the Parent component with the new props */}
    </FlexBox>
  );
}

FlexBoxWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};








export default FlexBoxWithLabel;


// import React from 'react';
// import FlexBoxWithLabel from './FlexBoxWithLabel';

// function MyComponent() {
//   return (
//     <FlexBoxWithLabel label="My Flexbox">
//       <div>Child element 1</div>
//       <div>Child element 2</div>
//       <div>Child element 3</div>
//     </FlexBoxWithLabel>
//   );
// }
