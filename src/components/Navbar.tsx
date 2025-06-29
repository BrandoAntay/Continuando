import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Componente de barra de navegación fija y responsiva
 * Incluye logo en la izquierda y menú de navegación en la derecha
 */
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Elementos del menú de navegación
  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Maravillas", path: "/maravillas" },
    { name: "Zoologia", path: "/zoologia" },
    { name: "Tarifario", path: "/tarifario" },
    { name: "Mapa", path: "/mapa" },
  ];

  /**
   * Maneja el clic en un elemento del menú
   * Para "Inicio", hace scroll al top, para otros navega a la sección correspondiente
   */
  const handleMenuClick = (path: string, name: string) => {
    if (path === "/") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Para las otras secciones, hacer scroll a la sección correspondiente en la página principal
      const sectionId = name.toLowerCase().replace(/[^a-z]/g, "");
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo del parque en la esquina izquierda */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/img/logo parque.png"
                alt="Logo Parque Zonal"
                className="h-12 w-12 object-contain"
              />
              <span className="hidden sm:block text-lg font-semibold text-park-blue">
                Parque Zonal
                    Quilmana
              </span>
            </Link>
          </div>

          {/* Menú de navegación para pantallas grandes */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item.path, item.name)}
                  className={cn(
                    "text-gray-700 hover:text-park-orange transition-colors duration-200",
                    "px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50",
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Botón de menú móvil */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item.path, item.name)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-park-orange hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
