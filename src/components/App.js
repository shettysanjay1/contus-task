import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepg from './Homepg';
import FilterSearchBar from './components/FilterSearchBar';
import PostCard from './components/PostCard';
// import PostGrid from './components/PostGrid';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepg />} />
        <Route path="/FilterSearchBar" element={<FilterSearchBar />} />
        <Route path="/PostCard" element={<PostCard />} />
        {/* <Route path="/PostGrid" element={<PostGrid />} /> */}
      </Routes>
    </Router>
  );
};

export default App;