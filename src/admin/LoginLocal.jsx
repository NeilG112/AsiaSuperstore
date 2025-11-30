import React, { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";

const LoginLocal = ({ onLogin }) => {
  const [pw, setPw] = useState("");
  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader title="Lokaler Admin-Login" />
      <form
        onSubmit={e => {
          e.preventDefault();
          if (pw === "admin") onLogin();
          else alert("Falsches Passwort");
        }}
        className="max-w-sm mx-auto bg-white rounded shadow p-6 flex flex-col gap-4"
      >
        <input
          type="password"
          placeholder="Passwort"
          className="border rounded px-3 py-2"
          value={pw}
          onChange={e => setPw(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginLocal;
