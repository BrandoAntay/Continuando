import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Expand, X } from "lucide-react";
import { useMapData } from "@/hooks/useAdminData";

/**
 * Sección del mapa del parque con vista ampliada modal
 * Permite ver el mapa en tamaño completo sin desbordamiento
 */
export const MapSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mapData } = useMapData();

  // Si el mapa no está activo, no mostrar la sección
  if (!mapData || !mapData.active) {
    return null;
  }

  const mapImage = mapData.image;

  return (
    <section id="mapa" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-park-blue mb-4">
            Mapa del Parque
          </h2>
          <div className="w-24 h-1 bg-park-orange mx-auto rounded mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mira el recorrido y planea tu próxima aventura
          </p>
        </div>

        {/* Container del mapa */}
        <div className="max-w-4xl mx-auto">
          {/* Imagen del mapa en tamaño normal */}
          <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-xl mb-8">
            <img
              src={mapImage}
              alt="Mapa del Parque Zonal Chavín de Huántar"
              className="w-full h-auto object-contain cursor-pointer hover:opacity-90 transition-opacity duration-200"
              style={{
                backgroundColor: "#054986",
                minHeight: "400px",
                maxHeight: "600px",
              }}
              onClick={() => setIsModalOpen(true)}
            />

            {/* Overlay con información */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-semibold mb-2">
                  Recorrido Sugerido
                </h3>
                <p className="text-sm opacity-90">
                  Sigue las rutas marcadas para una experiencia completa
                </p>
              </div>
            </div>
          </div>

          {/* Botón para ver mapa en grande */}
          <div className="text-center">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-park-blue hover:bg-park-blue/90 text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Expand className="mr-2 h-5 w-5" />
                  Ver mapa en grande
                </Button>
              </DialogTrigger>

              {/* Modal con mapa ampliado */}
              <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden">
                {/* Título oculto para accesibilidad */}
                <DialogTitle className="sr-only">
                  Mapa del Parque Zonal Chavín de Huántar - Vista ampliada
                </DialogTitle>

                <div className="relative bg-black">
                  {/* Botón de cerrar personalizado */}
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 rounded-full p-2 transition-all duration-200"
                    aria-label="Cerrar mapa"
                  >
                    <X className="h-6 w-6" />
                  </button>
                  {/* Imagen del mapa en tamaño completo */}
                  <div className="flex items-center justify-center min-h-[80vh]">
                    <img
                      src={mapImage}
                      alt="Mapa del Parque Zonal Chavín de Huántar - Vista ampliada"
                      className="max-w-full max-h-full object-contain"
                      style={{ backgroundColor: "#054986" }}
                    />
                  </div>

                  {/* Información adicional en la parte inferior */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="text-white text-center">
                      <h3 className="text-2xl font-bold mb-2">
                        Mapa Interactivo del Parque
                      </h3>
                      <p className="text-sm opacity-90 max-w-2xl mx-auto">
                        Utiliza las referencias para ubicar las diferentes
                        atracciones, servicios y puntos de interés en todo el
                        parque zonal
                      </p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};
