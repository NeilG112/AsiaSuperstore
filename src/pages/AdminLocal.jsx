import React, { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";

const AdminLocal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [file, setFile] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple demo login, replace with real auth in production
    setIsLoggedIn(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        alert("Import erfolgreich! (Demo)");
        // Hier könnten Sie die Daten im State speichern oder an ein Backend senden
      } catch {
        alert("Ungültige JSON-Datei.");
      }
    };
    reader.readAsText(file);
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

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SectionHeader title="Admin-Login" />
        <form onSubmit={handleLogin} className="max-w-sm mx-auto bg-white rounded shadow p-6 flex flex-col gap-4">
          <input type="password" placeholder="Passwort" className="border rounded px-3 py-2" required />
          <Button type="submit">Login</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader title="Admin-Panel (Lokal)" />
      <div className="bg-white rounded shadow p-6 max-w-xl mx-auto flex flex-col gap-4">
        <div>
          <label className="block mb-2 font-semibold">JSON Import</label>
          <input type="file" accept="application/json" onChange={handleFileChange} />
          <Button className="mt-2" onClick={handleImport}>Importieren</Button>
        </div>
        <div>
          <label className="block mb-2 font-semibold">JSON Export</label>
          <Button onClick={() => handleExport({}, "export.json")}>Exportieren (Demo)</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLocal;
