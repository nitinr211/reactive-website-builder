import React, { useState } from 'react';

function MatchComponentsWithIcons() {
  const [matchedItems, setMatchedItems] = useState([]);

  const handleFileSelection = async () => {
    try {
      const [componentsDirHandle, iconsDirHandle] = await window.showDirectoryPicker();

      const componentFiles = await getFilesFromDirectory(componentsDirHandle);
      const iconFiles = await getFilesFromDirectory(iconsDirHandle);

      const components = componentFiles.map(file => file.name.replace('.js', ''));
      const icons = iconFiles.map(file => file.name);

      const matchedItems = matchIconsWithComponents(components, icons);
      setMatchedItems(matchedItems);
    } catch (error) {
      console.error('Error selecting directories:', error);
    }
  };

  const getFilesFromDirectory = async (directoryHandle) => {
    const files = [];
    for await (const [name, handle] of directoryHandle.entries()) {
      if (handle.kind === 'file') {
        files.push(handle);
      }
    }
    return files;
  };

  const matchIconsWithComponents = (components, icons) => {
    return components.map(component => {
      const matchingIcons = icons.filter(icon => icon.toLowerCase().includes(component.toLowerCase()));
      return { component, icons: matchingIcons };
    });
  };

  return (
    <div>
      <h2>Match Components with Icons</h2>
      <button onClick={handleFileSelection}>Select Directories</button>
      <ul>
        {matchedItems.map((item, index) => (
          <li key={index}>
            <p>Component: {item.component}</p>
            <p>Icons: {item.icons.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchComponentsWithIcons;
