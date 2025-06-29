import { useState, useEffect } from "react";
import { MapPin, Users, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGroupImages } from "@/hooks/useAdminData";

export const GroupPricing = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const { groupImages: adminImages } = useGroupImages();

  // Mostrar todas las imágenes del carrusel
  const carouselImages = adminImages.map((image) => ({
    id: image.id,
    src: image.image,
    alt: image.alt,
    caption: image.caption,
  }));

  useEffect(() => {
    if (carouselImages.length === 0) return;

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [carouselImages.length]);

  /**
   * Navega a la imagen anterior (solo si no es la primera)
   */
  const goToPrevious = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  /**
   * Navega a la imagen siguiente (solo si no es la última)
   */
  const goToNext = () => {
    if (currentImage < carouselImages.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  /**
   * Manejo de eventos de arrastre
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    setDragDistance(0);
  };

  const handleGlobalMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const distance = e.clientX - startX;
    setDragDistance(distance);
  };

  const handleGlobalMouseUp = () => {
    if (!isDragging) return;

    const threshold = 50; // Distancia mínima para cambiar slide

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0 && currentImage > 0) {
        // Deslizar hacia la derecha (imagen anterior)
        goToPrevious();
      } else if (dragDistance < 0 && currentImage < carouselImages.length - 1) {
        // Deslizar hacia la izquierda (imagen siguiente)
        goToNext();
      }
    }

    setIsDragging(false);
    setDragDistance(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragDistance(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const distance = e.touches[0].clientX - startX;
    setDragDistance(distance);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const threshold = 50; // Distancia mínima para cambiar slide

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0 && currentImage > 0) {
        // Deslizar hacia la derecha (imagen anterior)
        goToPrevious();
      } else if (dragDistance < 0 && currentImage < carouselImages.length - 1) {
        // Deslizar hacia la izquierda (imagen siguiente)
        goToNext();
      }
    }

    setIsDragging(false);
    setDragDistance(0);
  };

  // Efecto para manejar eventos globales durante el arrastre
  useEffect(() => {
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
  }, [isDragging, startX, dragDistance, currentImage, carouselImages.length]);

  return (
    <section className="py-16 bg-gradient-to-br from-park-blue to-park-blue-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Lado izquierdo - Carrusel */}
          <div className="relative">
            <div
              className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl select-none cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className={cn(
                  "flex h-full transition-transform duration-700 ease-in-out",
                  isDragging && "transition-none",
                )}
                style={{
                  transform: `translateX(calc(-${currentImage * 100}% + ${isDragging ? dragDistance : 0}px))`,
                }}
              >
                {carouselImages.map((image) => (
                  <div
                    key={image.id}
                    className="flex-shrink-0 w-full h-full relative"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      style={{ backgroundColor: "#f29200" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4">
                      <p className="text-white text-sm font-medium text-center">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicadores del carrusel(bolitas)*/}
            <div className="flex justify-center mt-4">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300 mx-1",
                    currentImage === index
                      ? "bg-park-orange scale-125"
                      : "bg-white bg-opacity-50 hover:bg-park-orange",
                  )}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                ¡Junta a 30 personas o más y vive una aventura inolvidable!
              </h2>
              <div className="w-24 h-1 bg-park-orange rounded"></div>
            </div>

            {/* Cosas que incluye el combo*/}
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
              {/* Incluye */}
              <div className="space-y-4 max-w-md order-2 lg:order-1">
                <h3 className="text-xl font-semibold text-park-orange">
                  Incluye:
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-park-orange rounded-full flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg">1. Entrada al parque</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-park-orange rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg">2. Visita al zoológico</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-park-orange rounded-full flex items-center justify-center">
                      <Gamepad2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg">3. Uso de zonas deportivas</span>
                  </div>
                </div>
              </div>

              {/* Precio individual */}
              <div className="flex flex-col items-center justify-center bg-red-600 text-white rounded-full w-36 h-36 shadow-xl shrink-0 order-1 lg:order-2">
                <span className="text-sm font-medium text-center">
                  Tarifa individual
                </span>
                <span className="text-4xl font-bold">S/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
