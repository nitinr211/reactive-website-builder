// App.js
import React, { useState, useEffect, useRef } from 'react';
import MainMenu from './menu/MainMenu';
import Databases from './databases/Databases';
import FileLoader from './menu/FileLoader';
import Metrics from './metrics/Metrics';
import TextList from './builder/TextList';
import BuilderTable from './BuilderTable';
import axios from 'axios';


function App() {
    const [showDatabases, setShowDatabases] = useState(false);
    const [showFileLoader, setShowFileLoader] = useState(false);
    const [showMetrics, setShowMetrics] = useState(false);
    const [showTextList, setShowTextList] = useState(false); // State for TextList visibility
    const [iframeSrc, setIframeSrc] = useState('http://localhost:3000/output.html');

    useEffect(() => {
        // Load external script
        const loadScript = () => {
            const script = document.createElement('script');
            script.src = '/add.js'; // Replace with the actual path to add.js
            script.type = 'text/javascript';
            script.async = true;
            script.onload = () => console.log('add.js script loaded successfully');
            document.body.appendChild(script);
        };

        loadScript();
        let clickCount = 0;
        let clickTimer = null;

        const handleTripleClick = async () => {
            clickCount++;
           
            if (clickCount === 3) {
                clickCount = 0; // Reset the click count
                clearTimeout(clickTimer); // Clear the timer
                
                try {
                    const response = await axios.get('http://localhost:5000/check-selected');
                    const newShowTextList = response.data.showTextList === 1;
                    setShowTextList(newShowTextList); // Update state with response
                    console.log(`showTextList is now: ${newShowTextList}`);
                } catch (error) {
                    console.error('Error fetching selected status:', error);
                }
            } else {
                // Reset the click count after a short delay
                clearTimeout(clickTimer);
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 500); // 500ms delay between clicks
            }
        
        };


        const handleMessage = (event) => {
            if (event.data.type === 'TRIPLE_CLICK') { try {
                console.log('fuuuu');
                const response = axios.get('http://localhost:5000/check-selected');
                const newShowTextList = response.data.showTextList === 1;
                setShowTextList(newShowTextList); // Update state with response
                console.log(`showTextList is now: ${newShowTextList}`);
            } catch (error) {
                console.error('Error fetching selected status:', error);
            }}
        
            window.addEventListener('message', function(event) {
                if(event.data.event_id === 'my_cors_message'){
                    console.log(event.data.data);
                }
            });

            window.addEventListener('message', handleMessage);
        document.addEventListener('click', handleTripleClick);
       
        return () => {
            document.removeEventListener('click', handleTripleClick);
            window.removeEventListener('message', handleMessage);
            clearTimeout(clickTimer);
        };
    }
    }, []);

    // Handlers to show specific components
    const handleShowDatabases = () => {
        setShowDatabases(true);
        setShowFileLoader(false);
        setShowMetrics(false);
    };

    const handleShowFileLoader = () => {
        setShowDatabases(false);
        setShowFileLoader(true);
        setShowMetrics(false);
    };

    const handleShowMetrics = () => {
        setShowDatabases(false);
        setShowFileLoader(false);
        setShowMetrics(true);
    };

    const handleShowCRM = () => {
        // Set iframeSrc to localhost:8080 when CRM is selected
        setIframeSrc('http://localhost:8080');
        setShowDatabases(false);
        setShowFileLoader(true);
        setShowMetrics(false);
    };

    return (
        <div>
            <MainMenu
                onShowDatabases={handleShowDatabases}
                onShowFileLoader={handleShowFileLoader}
                onShowMetrics={handleShowMetrics}
                onShowCRM={handleShowCRM}
            />
            <div className="app-container">
                {showDatabases && <Databases />}
                {showMetrics && <Metrics />}
                {showFileLoader && (
                    <FileLoader
                        setIframeSrc={setIframeSrc}
                        iframeSrc={iframeSrc}
                        onSetShowTextList={setShowTextList} // Directly set state
                    />
                )}
                {showTextList && <TextList />} 
              
            </div>
        </div>
    );
}

export default App;
