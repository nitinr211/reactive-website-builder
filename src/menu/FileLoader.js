import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import SideNav from './SideNav';
import './NavMenu.css';
import axios from 'axios';

const FileLoader = ({ iframeSrc, setIframeSrc, onSetShowTextList }) => {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [showTextList, setShowTextList] = useState(false); 
    const iframeRef = React.createRef();

    // Define URLs for different editors
    const indexHtml1Url = 'http://localhost:7001';
    const indexHtml2Url = 'http://localhost:7000';
    const indexPhpUrl = 'http://localhost:8000';


    useEffect(() => {
        const handleMessage = async (event) => {
            // Validate message type
            if (event.data.type === 'TRIPLE_CLICK') {
                console.log('Message received from iframe:', event.data.payload);

                try {
                    // Make a request to the server
                    const response = await axios.get('http://localhost:5000/check-selected');
                    const newShowTextList = response.data.showTextList === 1;

                    // Update the parent App's state using the callback
                    onSetShowTextList(newShowTextList);
                } catch (error) {
                    console.error('Error fetching selected status:', error);
                }
            }
        };

        // Attach the event listener
        window.addEventListener('message', handleMessage);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [onSetShowTextList])

    
    const removeElementFromServer = (arId) => {
        console.log(arId);
        axios
            .post('http://localhost:5000/remove-element', { id: arId })
            .then((response) => {
                console.log('Element removed:', response.data);
                if (response.data.showTextList) {
                    setShowTextList(true); // Update local state
                    onSetShowTextList(true); // Notify App about the change
                }
            })
            .catch((error) => {
                console.error('Error removing element:', error);
            });
    };

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    return (
        <div>
            <button onClick={() => setIframeSrc(indexPhpUrl)}>Web Editor</button>
            <button onClick={() => setIframeSrc(indexHtml1Url)}>Photo Editor</button>
            <button onClick={() => setIframeSrc(indexHtml2Url)}>Video Editor</button>
            <button onClick={() => setIframeSrc(indexHtml2Url)}>Graphics Engine</button>

            <iframe
                ref={iframeRef}
                src={iframeSrc}
                 sandbox="allow-scripts allow-same-origin"
                style={{ width: '100%', height: '800px', border: 'none' }}
                title="Content Viewer"
                onLoad={handleIframeLoad}
            />
        </div>
    );
};

export default FileLoader;
