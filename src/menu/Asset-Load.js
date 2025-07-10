import React, { useState, useEffect } from "react";
import axios from "axios";

const PixabaySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=35874843-6af9f31f04929c938522d349f&q=${searchTerm}&image_type=photo`
        );
        setImages(response.data.hits);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchTerm) {
      fetchImages();
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      {images.map((image) => (
        <img key={image.id} src={image.webformatURL} alt={image.tags} />
      ))}
    </div>
  );
};

export default PixabaySearch;
