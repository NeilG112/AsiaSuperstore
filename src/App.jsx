
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
const AdminCMS = () => (
  <div className="container mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold mb-4">Netlify CMS Admin</h2>
    <iframe
      src="/admin/index.html"
      title="Netlify CMS"
      className="w-full min-h-[80vh] border rounded"
      style={{ background: "#fff" }}
    />
    <p className="mt-4 text-sm text-gray-500">Hinweis: Funktioniert nur nach Deployment auf Netlify oder mit lokalem CMS-Build.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background text-dark font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ueber-uns" element={<About />} />
            <Route path="/produkte" element={<Products />} />
            <Route path="/woechentliche-angebote" element={<Offers />} />
            <Route path="/standorte" element={<Locations />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/admin-local" element={<AdminLocal />} />
            <Route path="/admin" element={<AdminCMS />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
