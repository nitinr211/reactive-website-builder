import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Blocks from './blocks/blocks';
import SideNav from './menu/SideNav';
import App from './App';
import PixabaySearch from './assets/Asset-Load';

function MainRouter() {
  return (
    <Router>
      <div className="main-container">
       
        <App />
        <SideNav />
            <Routes>
        <Route path="/save-load">
         
        </Route>
        <Route path="/components">
         
        </Route>
        <Route path="/assets" Component={PixabaySearch}>
        
        </Route>
        <Route path="/databases">
       
        </Route>
        <Route path="/graphics">
         
        </Route>
        <Route path="/analytics">
          
        </Route>
        <Route path="/sign-out">
          
        </Route>
      </Routes>
      </div>
    </Router>
  
  );
};

export default MainRouter;