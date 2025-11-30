import React from "react";
import SectionHeader from "../components/SectionHeader";

const About = () => (
  <div className="container mx-auto px-4 py-8">
    <SectionHeader title="Über Uns" subtitle="Erfahren Sie mehr über unseren Supermarkt und unser Team." />
    <div className="max-w-2xl mx-auto text-lg text-dark/80">
      <p className="mb-4">
        Unser Supermarkt steht seit über 20 Jahren für Qualität, Frische und Kundennähe. Wir legen Wert auf regionale Produkte, nachhaltige Angebote und ein freundliches Einkaufserlebnis.
      </p>
      <p>
        Unser Team freut sich, Sie täglich mit neuen Angeboten und bestem Service zu begrüßen. Ihre Zufriedenheit ist unser Antrieb!
      </p>
    </div>
  </div>
);

export default About;
