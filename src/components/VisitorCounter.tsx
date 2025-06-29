import { useVisitorCount } from "@/hooks/use-visitor-count";
import { cn } from "@/lib/utils";

/**
 * Componente de imagen de ancho completo con contador de visitantes
 * Muestra estadísticas obtenidas desde la base de datos MySQL
 */
export const VisitorCounter = () => {
  const { formattedCount, loading, error } = useVisitorCount();

  return (
    <section className="relative w-full h-96 sm:h-[500px] overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/img/background.jpg')",
          backgroundColor: "#00864b", // Color de respaldo del parque
        }}
      />

      {/* Overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-park-blue/80 to-park-green/80" />

      {/* Contenido con estadísticas */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl">
          {/* Primera línea de texto */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            ¡Ya somos parte de tu aventura!
          </h2>

          {/* Segunda línea con contador destacado */}
          <div className="text-lg sm:text-2xl lg:text-3xl font-medium leading-relaxed">
            <span>Más de </span>

            {/* Contador de visitantes desde la base de datos */}
            {loading ? (
              <span className="inline-block">
                <div className="animate-pulse bg-white/30 rounded px-4 py-1 inline-block min-w-[120px] h-8"></div>
              </span>
            ) : error ? (
              <span className="text-red-300">Error al cargar</span>
            ) : (
              <span
                className={cn(
                  "inline-block px-6 py-2 mx-2 rounded-full font-bold text-park-blue bg-white",
                  "shadow-lg transform transition-all duration-300 hover:scale-105",
                  "text-2xl sm:text-3xl lg:text-4xl",
                )}
              >
                {formattedCount}
              </span>
            )}

            <span> personas han vivido la experiencia del parque</span>
          </div>

          {/* Información adicional */}
          <p className="mt-6 text-sm sm:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
            Únete a miles de familias que han descubierto la magia de nuestro
            parque zonal
          </p>
        </div>
      </div>

      {/* Efecto decorativo */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-park-orange via-park-orange-light to-park-orange"></div>
    </section>
  );
};
