import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminData";
import { AdminSidebar } from "./AdminSidebar";
import { HeroCarouselAdmin } from "./sections/HeroCarouselAdmin";
import { WondersAdmin } from "./sections/WondersAdmin";
import { ZooAdmin } from "./sections/ZooAdmin";
import { PricingAdmin } from "./sections/PricingAdmin";
import { GroupsAdmin } from "./sections/GroupsAdmin";
import { MapAdmin } from "./sections/MapAdmin";

export const AdminLayout = () => {
  const { isAuthenticated, loading } = useAdminAuth();
  const [activeSection, setActiveSection] = useState("hero");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-park-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case "hero":
        return <HeroCarouselAdmin />;
      case "wonders":
        return <WondersAdmin />;
      case "zoo":
        return <ZooAdmin />;
      case "pricing":
        return <PricingAdmin />;
      case "groups":
        return <GroupsAdmin />;
      case "map":
        return <MapAdmin />;
      default:
        return <HeroCarouselAdmin />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">{renderSection()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
