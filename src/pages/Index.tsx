import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { WondersSection } from "@/components/WondersSection";
import { VisitorCounter } from "@/components/VisitorCounter";
import { ZooSection } from "@/components/ZooSection";
import { PricingSection } from "@/components/PricingSection";
import { GroupPricing } from "@/components/GroupPricing";
import { MapSection } from "@/components/MapSection";
import { Footer } from "@/components/Footer";

/**
 * Página principal del Parque Zonal Chavín de Huántar
 * Contiene todas las secciones principales organizadas según los requerimientos:
 * 1. Barra de navegación fija
 * 2. Carrusel principal de imágenes
 * 3. Sección de Maravillas del Mundo
 * 4. Contador de visitantes
 * 5. Sección del zoológico y animales
 * 6. Precios de entrada
 * 7. Precios grupales
 * 8. Mapa del parque
 * 9. Pie de página
 */
const Index = () => {
  return (
    <div className="min-h-screen">
      {/* 1. Barra de navegación fija y responsiva */}
      <Navbar />

      {/* 2. Carrusel principal que ocupa toda la ventana */}
      <HeroCarousel />

      {/* 3. Sección de Maravillas del Mundo con carrusel deslizable */}
      <WondersSection />

      {/* 4. Imagen de ancho completo con contador de visitantes */}
      <VisitorCounter />

      {/* 5. Sección del zoológico con galería paginada */}
      <ZooSection />

      {/* 6. Sección de precios con tarjetas interactivas */}
      <PricingSection />

      {/* 7. Sección de precios grupales con carrusel */}
      <GroupPricing />

      {/* 8. Sección del mapa con vista expandible */}
      <MapSection />

      {/* 9. Pie de página con información completa */}
      <Footer />
    </div>
  );
};

export default Index;
