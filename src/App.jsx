
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Offers from "./pages/Offers";
import Locations from "./pages/Locations";
import Contact from "./pages/Contact";

import AdminLocal from "./pages/AdminLocal";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background text-dark font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ueber" element={<About />} />
            <Route path="/produkte" element={<Products />} />
            <Route path="/angebote" element={<Offers />} />
            <Route path="/standorte" element={<Locations />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/admin-local" element={<AdminLocal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
