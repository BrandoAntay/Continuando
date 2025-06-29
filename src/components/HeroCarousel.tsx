import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useHeroSlides } from "@/hooks/useAdminData";

/**
 * Carrusel principal de imágenes con información del parque
 * Cambia automáticamente cada 5 segundos y permite navegación manual
 */
export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { slides: allSlides } = useHeroSlides();

  // Mostrar todos los slides del carrusel
  const slides = allSlides;

  /**
   * Efecto para cambio automático de slides cada 5 segundos
   */
  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Si no hay slides, mostrar mensaje después de que todos los hooks se hayan ejecutado
  if (slides.length === 0) {
    return (
      <div className="h-screen w-full bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-2">
            No hay slides disponibles
          </h2>
          <p className="text-gray-500">
            Configure slides en el panel de administración
          </p>
        </div>
      </div>
    );
  }

  /**
   * Navega al slide anterior
   */
  const goToPrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  /**
   * Navega al slide siguiente
   */
  const goToNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  /**
   * Navega directamente a un slide específico
   */
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  /**
   * Manejo de eventos de arrastre
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragDistance(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const distance = e.clientX - startX;
    setDragDistance(distance);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const threshold = 50; // Distancia mínima para cambiar slide

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0 && currentSlide > 0) {
        // Deslizar hacia la derecha (slide anterior)
        goToPrevious();
      } else if (dragDistance < 0 && currentSlide < slides.length - 1) {
        // Deslizar hacia la izquierda (slide siguiente)
        goToNext();
      }
    }

    setIsDragging(false);
    setDragDistance(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragDistance(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const distance = e.touches[0].clientX - startX;
    setDragDistance(distance);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={carouselRef}
    >
      {/* Container de las imágenes */}
      <div
        className={cn(
          "flex h-full transition-transform duration-700 ease-in-out",
          isDragging && "transition-none",
        )}
        style={{
          transform: `translateX(calc(-${currentSlide * 100}% + ${isDragging ? dragDistance : 0}px))`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative flex-shrink-0 w-full h-full">
            {/* Imagen de fondo */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundColor: index % 2 === 0 ? "#054986" : "#f29200",
              }}
            />

            {/* Overlay para mejor legibilidad del texto */}
            <div className="absolute inset-0 bg-black bg-opacity-40" />

            {/* Contenido del slide */}
            <div className="relative h-full flex items-center">
              <div className="text-left text-white px-4 sm:px-6 lg:px-8 max-w-2xl ml-4 sm:ml-8 lg:ml-16">
                {/* Subtítulo */}
                <p className="text-sm sm:text-lg font-light mb-2 tracking-wide uppercase opacity-90">
                  {slide.subtitle}
                </p>

                {/* Título principal */}
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>

                {/* Descripción */}
                <p className="text-sm sm:text-lg mb-8 leading-relaxed opacity-90 max-w-xl text-justify pr-4">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Botones de navegación */}
      {currentSlide > 0 && (
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {currentSlide < slides.length - 1 && (
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
          aria-label="Slide siguiente"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Indicadores de slide */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentSlide === index
                ? "bg-white scale-110"
                : "bg-white bg-opacity-50 hover:bg-opacity-75",
            )}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
