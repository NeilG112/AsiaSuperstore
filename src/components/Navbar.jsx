import React from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/ueber", label: "Über Uns" },
  { to: "/produkte", label: "Produkte" },
  { to: "/angebote", label: "Wöchentliche Angebote" },
  { to: "/standorte", label: "Standorte" },
  { to: "/kontakt", label: "Kontakt" }
];

const Navbar = () => (
  <header className="bg-primary text-white shadow sticky top-0 z-50">
    <nav className="container mx-auto flex items-center justify-between py-3 px-4">
      <Link to="/" className="text-2xl font-display font-bold tracking-tight">Supermarkt</Link>
      <ul className="flex gap-4">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded transition-colors ${isActive ? "bg-secondary text-dark" : "hover:bg-secondary/80"}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

export default Navbar;
