import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Gradebook from './pages/gradebook/Gradebook';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/gradebook" element={<Gradebook />} />
      </Routes>
    </Router>
  );
};

export default App;
