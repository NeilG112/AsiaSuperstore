import React, { useState, useEffect } from "react";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import AdminDashboard from "../admin/AdminDashboard";

const AdminLocal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch("/src/data/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data));
    fetch("/src/data/offers.json")
      .then((res) => res.json())
      .then((data) => setOffers(data));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo: Passwort ist "admin"
    const pw = e.target.elements.password.value;
    if (pw === "admin") setIsLoggedIn(true);
    else alert("Falsches Passwort");
  };

  const handleExport = (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (json) => {
    if (json.categories) setCategories(json.categories);
    if (json.offers) setOffers(json.offers);
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SectionHeader title="Admin-Login" />
        <form onSubmit={handleLogin} className="max-w-sm mx-auto bg-white rounded shadow p-6 flex flex-col gap-4">
          <input name="password" type="password" placeholder="Passwort" className="border rounded px-3 py-2" required />
          <Button type="submit">Login</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminDashboard
        categories={categories}
        offers={offers}
        onExport={handleExport}
        onImport={handleImport}
      />
    </div>
  );
};

export default AdminLocal;
