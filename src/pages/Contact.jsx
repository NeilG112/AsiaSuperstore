import React from "react";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";

const Contact = () => (
  <div className="container mx-auto px-4 py-8">
    <SectionHeader title="Kontakt" subtitle="Wir freuen uns auf Ihre Nachricht!" />
    <form className="max-w-xl mx-auto bg-white rounded shadow p-6 flex flex-col gap-4">
      <input
        type="text"
        name="name"
        placeholder="Ihr Name"
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Ihre E-Mail"
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <textarea
        name="message"
        placeholder="Ihre Nachricht"
        rows={5}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <Button type="submit">Absenden</Button>
    </form>
  </div>
);

export default Contact;
