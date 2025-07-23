import React, { useState, useEffect } from 'react';
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
  const [showTextList, setShowTextList] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('http://localhost:3000/output.html');
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    const baseURL = 'http://34.55.99.124:8080';
    //const baseURL = 'http://localhost:8000';
    const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
    };

    const xsrfToken = getCookie('XSRF-TOKEN');

    if (xsrfToken) {
      console.log('✅ XSRF-TOKEN exists — skipping csrf-cookie & test-cookie');
      setStatus('Already authenticated. Verifying...');

      fetch(`${baseURL}/api/v1/auth-check`, {
        credentials: 'include',
      })
        .then(res => {
          if (!res.ok) throw new Error('Auth check failed');
          return res.json();
        })
        .then(data => {
          console.log('✅ Authenticated user:', data.user);
          setUser(data.user);
          setStatus('Already logged in!');
        })
        .catch(err => {
          console.error('❌ Auth check error:', err);
          setStatus('Auth session expired. Please log in again.');
          window.location.replace('http://krdc.us');
          // optionally redirect to login
        });
    } else {
      console.warn('⚠️ No XSRF-TOKEN found — redirecting to login');
      window.location.replace('http://krdc.us');
    }




    // ✅ Step 3: Load external script
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = '/add.js';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = () => console.log('add.js script loaded successfully');
      document.body.appendChild(script);
    };
    loadScript();

    // ✅ Step 4: Triple click logic
    let clickCount = 0;
    let clickTimer = null;

    const handleTripleClick = async () => {
      clickCount++;
      if (clickCount === 3) {
        clickCount = 0;
        clearTimeout(clickTimer);
        try {
          const response = await axios.get('http://localhost:5000/check-selected');
          const newShowTextList = response.data.showTextList === 1;
          setShowTextList(newShowTextList);
          console.log(`showTextList is now: ${newShowTextList}`);
        } catch (error) {
          console.error('Error fetching selected status:', error);
        }
      } else {
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 500);
      }
    };

    const handleMessage = (event) => {
      if (event.data.type === 'TRIPLE_CLICK') {
        axios.get('http://localhost:5000/check-selected').then(response => {
          const newShowTextList = response.data.showTextList === 1;
          setShowTextList(newShowTextList);
        }).catch(err => console.error('Error fetching selected status:', err));
      }

      if (event.data.event_id === 'my_cors_message') {
        console.log(event.data.data);
      }
    };

    window.addEventListener('message', handleMessage);
    document.addEventListener('click', handleTripleClick);

    return () => {
      document.removeEventListener('click', handleTripleClick);
      window.removeEventListener('message', handleMessage);
      clearTimeout(clickTimer);
    };
  }, []);

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
            onSetShowTextList={setShowTextList}
          />
        )}
        {showTextList && <TextList />}
      </div>
    </div>
  );
}

export default App;
