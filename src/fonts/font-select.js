import React from 'react';







export default function FontSelect({ fonts, handleFontChange }) {
    const options = fonts.map((font) => (
      <option key={font} value={font}>
        {font}
      </option>
    ));
  
    return <>{options}</>;
  }
  