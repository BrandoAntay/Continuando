import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useWonders } from "@/hooks/useAdminData";

/**
 * Interfaz para definir la estructura de una maravilla
 */
interface Wonder {
  id: number;
  name: string;
  image: string;
  description: string;
  fullDescription: string;
}

/**
 * Sección de Maravillas del Mundo con carrusel deslizable
 * Permite navegación con click y arrastre, redirige a páginas de detalle
 */
export const WondersSection = () => {
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const { wonders: allWonders } = useWonders();

  // Mostrar todas las maravillas
  const wonders: Wonder[] = allWonders;

  /**
   * Inicia el proceso de arrastre del carrusel
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX);
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  /**
   * Maneja el clic en una tarjeta de maravilla
   * Solo redirige si no hubo movimiento de arrastre
   */
  const handleWonderClick = (wonder: Wonder, e: React.MouseEvent) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    navigate(`/maravilla/${wonder.id}`, { state: { wonder } });
  };

  /**
   * Navega el carrusel hacia la dirección especificada
   */
  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 320;
    const newScrollLeft =
      direction === "left"
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;

    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  /**
   * Maneja eventos globales para el drag
   */
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !carouselRef.current) return;
      e.preventDefault();
      setHasMoved(true);
      const deltaX = e.pageX - startX;
      carouselRef.current.scrollLeft = scrollLeft - deltaX;
    };

    const handleGlobalMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove);
        document.removeEventListener("mouseup", handleGlobalMouseUp);
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
      };
    }
  }, [isDragging, startX, scrollLeft]);

  return (
    <section id="maravillas" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-park-blue mb-4">
            Maravillas del Mundo
          </h2>
          <div className="w-24 h-1 bg-park-orange mx-auto rounded"></div>
        </div>

        {/* Container del carrusel con botones de navegación y padding extra para evitar cortes */}
        <div className="relative py-8">
          {/* Botón izquierdo */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50 border-gray-200"
            onClick={() => scrollCarousel("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Carrusel deslizable con padding vertical para acomodar el efecto hover */}
          <div
            ref={carouselRef}
            className={cn(
              "flex overflow-x-auto scrollbar-hide space-x-6 px-12 select-none py-6",
              isDragging ? "cursor-grabbing" : "cursor-grab",
            )}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseDown={handleMouseDown}
          >
            {wonders.map((wonder) => (
              <Card
                key={wonder.id}
                className={cn(
                  "flex-shrink-0 w-80 sm:w-96 transform transition-all duration-300 border-0 shadow-lg",
                  !isDragging &&
                    "hover:scale-105 hover:shadow-xl cursor-pointer",
                )}
                onClick={(e) => handleWonderClick(wonder, e)}
                onDragStart={(e) => e.preventDefault()}
              >
                <CardContent className="p-0">
                  {/* Imagen de la maravilla */}
                  <div className="relative h-64 overflow-hidden rounded-t-lg">
                    <img
                      src={wonder.image}
                      alt={wonder.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 pointer-events-none"
                      style={{ backgroundColor: "#054986" }}
                      draggable={false}
                    />
                  </div>

                  {/* Información de la maravilla */}
                  <div className="p-6 text-center">
                    <p className="text-sm text-gray-600 mb-1">
                      {wonder.description}
                    </p>
                    <h3 className="text-xl font-bold text-park-blue">
                      {wonder.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Botón derecho */}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50 border-gray-200"
            onClick={() => scrollCarousel("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Indicador de deslizamiento */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Desliza horizontalmente para ver más maravillas
          </p>
        </div>
      </div>
    </section>
  );
};
