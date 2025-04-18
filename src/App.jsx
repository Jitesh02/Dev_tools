import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Color from "./Pages/Color";
import Contact from "./Pages/Contact";
import Navbar from "./components/Navbar";
import ImageColorPicker from "./Pages/ImageColorPicker";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Color />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/picker" element={<ImageColorPicker />} />
      </Routes>
    </Router>
  );
};

export default App;