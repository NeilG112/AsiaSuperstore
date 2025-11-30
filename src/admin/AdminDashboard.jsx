import React, { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";

const AdminDashboard = ({ categories, offers, onExport, onImport }) => {
  const [importFile, setImportFile] = useState(null);

  const handleFileChange = (e) => {
    setImportFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (!importFile) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        onImport(json);
        alert("Import erfolgreich!");
      } catch {
        alert("Ungültige JSON-Datei.");
      }
    };
    reader.readAsText(importFile);
  };

  return (
    <div className="bg-white rounded shadow p-6 max-w-2xl mx-auto flex flex-col gap-6">
      <SectionHeader title="Admin Dashboard (Lokal)" />
      <div>
        <label className="block mb-2 font-semibold">JSON Import</label>
        <input type="file" accept="application/json" onChange={handleFileChange} />
        <Button className="mt-2" onClick={handleImport}>Importieren</Button>
      </div>
      <div>
        <label className="block mb-2 font-semibold">JSON Export</label>
        <Button onClick={() => onExport({ categories, offers }, "export.json")}>Exportieren</Button>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2">Kategorien</h3>
        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto max-h-40">{JSON.stringify(categories, null, 2)}</pre>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2">Angebote</h3>
        <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto max-h-40">{JSON.stringify(offers, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AdminDashboard;
