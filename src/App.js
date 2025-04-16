import React from "react";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Navbar from "./com/Navbar";
import ScrollText from "./pages/ScrollText";
import GuestBook from './pages/GuestBook';

function App() {
  return (
    <Router basename="/test">
      <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/scrolltext" element={<ScrollText />} />
            <Route path="/guestbook" element={<GuestBook />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
