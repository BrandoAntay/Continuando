import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/hooks/useAdminData";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Camera,
  Globe,
  PawPrint,
  DollarSign,
  Users,
  Map,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const AdminSidebar = ({
  activeSection,
  onSectionChange,
}: AdminSidebarProps) => {
  const { logout } = useAdminAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      id: "hero",
      label: "Carrusel Principal",
      icon: Camera,
      description: "Gestionar slides del carrusel",
    },
    {
      id: "wonders",
      label: "Maravillas del Mundo",
      icon: Globe,
      description: "Administrar maravillas",
    },
    {
      id: "zoo",
      label: "Zoo y Animales",
      icon: PawPrint,
      description: "Gestionar animales del zoo",
    },
    {
      id: "pricing",
      label: "Costos de Entrada",
      icon: DollarSign,
      description: "Administrar precios",
    },
    {
      id: "groups",
      label: "Grupos Grandes",
      icon: Users,
      description: "Gestionar imágenes grupales",
    },
    {
      id: "map",
      label: "Mapa del Parque",
      icon: Map,
      description: "Administrar mapa",
    },
  ];

  const handleLogout = () => {
    logout();
    setIsMobileOpen(false);
  };

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-6 right-4 z-50">
        <Button
          onClick={() => setIsMobileOpen(true)}
          size="sm"
          className="bg-park-blue hover:bg-park-blue-dark text-white shadow-lg"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:relative w-80 h-screen bg-white border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header - Fixed height */}
        <div className="flex-shrink-0 h-20 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-park-blue rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-park-blue">
                  Parque Zonal
                </h1>
                <p className="text-xs text-gray-600">Panel Administrativo</p>
              </div>
            </div>

            {/* Close button for mobile */}
            <Button
              onClick={() => setIsMobileOpen(false)}
              size="sm"
              variant="ghost"
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation - Scrollable middle section */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={cn(
                  "w-full flex items-start p-3 rounded-lg text-left transition-all duration-200",
                  isActive
                    ? "bg-park-blue text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 mt-0.5 mr-3 flex-shrink-0",
                    isActive ? "text-white" : "text-gray-500",
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "font-medium text-sm",
                      isActive ? "text-white" : "text-gray-900",
                    )}
                  >
                    {item.label}
                  </p>
                  <p
                    className={cn(
                      "text-xs mt-0.5",
                      isActive ? "text-white/80" : "text-gray-500",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer - Always at bottom */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 text-gray-700 border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </Button>

          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">v1.0.0 - Sistema de gestión</p>
          </div>
        </div>
      </div>
    </>
  );
};
