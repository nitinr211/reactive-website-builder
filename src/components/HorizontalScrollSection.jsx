import React from 'react';
import './HorizontalScrollSection.css';


const tileData = [
    { imageUrl: 'tile1.jpg', title: 'Tile 1', description: 'Description for Tile 1' },
    { imageUrl: 'tile2.jpg', title: 'Tile 2', description: 'Description for Tile 2' },
    { imageUrl: 'tile3.jpg', title: 'Tile 3', description: 'Description for Tile 3' },
    // Add more tile data as needed
];


function HorizontalScrollSection({ tileData }) {
    
    return (
        <div className="horizontal-scroll-section">
            <div className="tile-container">
                {/* {tileData.map((tile, index) => ( */}
                    {/* <div className="tile" key={index}> */}
                        {/* <img src={tile.imageUrl} alt={tile.title} />
                        <h2>{tile.title}</h2>
                        <p>{tile.description}</p> */}
                    {/* </div>
                {/* ))} */}
            </div> 
        </div>
    );
}

export default HorizontalScrollSection;
