import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Color from "./Pages/Color";
import Contact from "./Pages/Contact";
import Navbar from "./components/Navbar";
import ImageColorPicker from "./Pages/ImageColorPicker";
import NavBar from "./components/HeadBar";
import JsonFormatter from "./Pages/JsonFormatter";
import XmlFormatter from "./Pages/XmlFormatter";
import CodeFormatter from "./Pages/CodeFormatter";
import TextFormatter from "./Pages/TextFormatter";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Color />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/picker" element={<ImageColorPicker />} />
        <Route path="/json" element={<JsonFormatter />} />
        <Route path="/xml" element={<XmlFormatter />} />
        <Route path="/code" element={<CodeFormatter />} />
        <Route path="/text" element={<TextFormatter />} />
        <Route path="/demo" element={<NavBar />} />

      </Routes>
    </Router>
  );
};

export default App;