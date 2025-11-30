import React from "react";

const Footer = () => (
  <footer className="bg-dark text-white py-6 mt-8">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
      <div className="mb-2 md:mb-0 font-display text-lg">Supermarkt &copy; {new Date().getFullYear()}</div>
      <div className="flex gap-4 text-sm">
        <a href="/impressum" className="hover:underline">Impressum</a>
        <a href="/datenschutz" className="hover:underline">Datenschutz</a>
      </div>
    </div>
  </footer>
);

export default Footer;
