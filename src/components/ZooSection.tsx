import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAnimals } from "@/hooks/useAdminData";

interface Animal {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  image: string;
}

export const ZooSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const { animals: adminAnimals } = useAnimals();

  // Mostrar todos los animales
  const allAnimals: Animal[] = adminAnimals;

  // Responsive animals per page: 6 on desktop, 3 on mobile/tablet
  const getAnimalsPerPage = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024 ? 3 : 6;
    }
    return 6;
  };

  const [animalsPerPage, setAnimalsPerPage] = useState(getAnimalsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setAnimalsPerPage(getAnimalsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(allAnimals.length / animalsPerPage);
  const startIndex = (currentPage - 1) * animalsPerPage;
  const currentAnimals = allAnimals.slice(
    startIndex,
    startIndex + animalsPerPage,
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    document.getElementById("zoologia")?.scrollIntoView({ behavior: "smooth" });
  };

  // Cierra el visor si se presiona ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCardClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedImageIndex(null);
    }
  };

  return (
    <section id="zoologia" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-park-blue mb-4">
            Zoo y Animales
          </h2>
          <div className="w-24 h-1 bg-park-green mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentAnimals.map((animal, index) => (
            <Card
              key={animal.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-96 cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <div className="relative h-full w-full">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: "#00864b" }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 h-[70%] flex flex-col justify-center">
                  <CardContent className="p-6 w-full">
                    <h3 className="text-xl font-bold text-park-blue mb-2">
                      {animal.name}
                    </h3>
                    <p className="text-sm font-medium text-park-green mb-3 italic">
                      {animal.scientificName}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {animal.description}
                    </p>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(index);
                      }}
                      className="mt-4 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                    >
                      Ver foto
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2"
          >
            Anterior
          </Button>

          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  onClick={() => goToPage(pageNumber)}
                  className={cn(
                    "w-10 h-10 p-0 text-sm",
                    currentPage === pageNumber
                      ? "bg-park-blue hover:bg-park-blue/90 text-white"
                      : "hover:bg-park-blue/10 text-park-blue",
                  )}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2"
          >
            Siguiente
          </Button>
        </div>

        <div className="text-center mt-4 text-sm text-gray-600">
          Mostrando {startIndex + 1}-
          {Math.min(startIndex + animalsPerPage, allAnimals.length)} de{" "}
          {allAnimals.length} animales
        </div>
      </div>

      {/* Modal responsive para imagen ampliada */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
          onClick={handleModalBackdropClick}
        >
          <div className="relative">
            <img
              src={currentAnimals[selectedImageIndex].image}
              alt="Foto ampliada"
              className="max-w-[80vw] max-h-[80vh] w-auto h-auto rounded shadow-lg mx-auto"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Botón cerrar */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="fixed top-4 right-4 z-50 text-white bg-black/60 hover:bg-black/80 rounded-full p-3 text-xl"
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Flecha izquierda */}
            {selectedImageIndex > 0 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                className="absolute left-[-3rem] top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 rounded-full p-3 text-2xl"
                aria-label="Anterior"
              >
                ‹
              </button>
            )}

            {/* Flecha derecha */}
            {selectedImageIndex < currentAnimals.length - 1 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                className="absolute right-[-3rem] top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 rounded-full p-3 text-2xl"
                aria-label="Siguiente"
              >
                ›
              </button>
            )}

            {/* Contador de imagen */}
            <div className="mt-4 text-center text-white text-sm bg-black/50 px-3 py-1 rounded-full mx-auto">
              Imagen {selectedImageIndex + 1} de {currentAnimals.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
