import { useCallback, useState } from "react";
import { Footer } from "./components/Footer";
import { FleetCatalog } from "./components/FleetCatalog";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MaintenanceSection } from "./components/MaintenanceSection";
import { QuoteModal } from "./components/QuoteModal";
import { QuoteSection } from "./components/QuoteSection";
import { TrustSection } from "./components/TrustSection";
import type { FleetTab, VehicleType } from "./lib/quote";

export default function App() {
  const [fleetTab, setFleetTab] = useState<FleetTab>("platforms");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteVehicle, setQuoteVehicle] = useState<VehicleType>("platform");

  const openQuote = useCallback((vehicle: VehicleType = "platform") => {
    setQuoteVehicle(vehicle);
    setQuoteOpen(true);
  }, []);

  const closeQuote = useCallback(() => {
    setQuoteOpen(false);
  }, []);

  const selectFleetTab = useCallback((tab: FleetTab) => {
    setFleetTab(tab);
    window.setTimeout(() => {
      document
        .getElementById("fleet")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only z-[120] bg-signal px-4 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Перейти к содержимому
      </a>

      <Header onRequestQuote={() => openQuote()} />

      <main id="main-content">
        <Hero onSelectFleet={selectFleetTab} />
        <TrustSection />
        <FleetCatalog
          activeTab={fleetTab}
          onTabChange={setFleetTab}
          onRequestQuote={openQuote}
        />
        <MaintenanceSection />
        <QuoteSection />
      </main>

      <Footer />

      <QuoteModal
        open={quoteOpen}
        onClose={closeQuote}
        initialVehicle={quoteVehicle}
      />
    </div>
  );
}
