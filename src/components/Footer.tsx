import { Facebook, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Componente de pie de página con información del parque
 * Contiene tres columnas: información general, horarios/dirección y redes sociales
 */
export const Footer = () => {
  /**
   * Maneja el clic en la dirección para abrir Google Maps
   */
  const handleDirectionClick = () => {
    window.open("https://maps.app.goo.gl/gsVzN7DUxTxf54ZK6", "_blank");
  };

  /**
   * Maneja el clic en Facebook
   */
  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/brandolee.antaycorimaya", "_blank");
  };

  return (
    <footer className="bg-park-blue text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid de tres columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Primera columna - Información del parque */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 text-park-orange">
              Parque Zonal
            </h3>
            <p className="text-gray-200 leading-relaxed text-sm">
              Descubre un mundo de aventuras donde la naturaleza, la historia y
              la diversión se encuentran en perfecta armonía. El Parque Zonal
              Chavín de Huántar te invita a vivir experiencias únicas rodeado de
              las réplicas de algunas maravillas del mundo y una increíble
              diversidad de fauna silvestre.
            </p>

            {/* Logo adicional */}
            <div className="mt-6 flex items-center justify-center md:justify-start">
              <img
                src="/img/LOGO.svg"
                alt="Logo Parque Zonal"
                className="h-12 w-12 mr-3"
              />
              <div>
                <p className="font-semibold text-park-orange">
                  Chavín de Huántar
                </p>
                <p className="text-xs text-gray-300">Quilmaná - Cañete</p>
              </div>
                {/* Imagen de la Municipalidad de Quilmaná */}
              <div className="mt-4 cursor-pointer" onClick={() => window.open("https://www.muniquilmana.gob.pe", "_blank")}>
                <img
                  src="/img/LOGO-MUNI-QUILMANA.png"
                  alt="Municipalidad Distrital de Quilmaná"
                  className="w-[180px] h-auto object-contain"
                  />
                  </div>
            </div>
          </div>

          {/* Segunda columna - Horarios y dirección */}
          <div className="text-center">
            {/* Horarios */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-park-orange flex items-center justify-center">
                <Clock className="mr-2 h-5 w-5" />
                Horarios
              </h3>
              <div className="space-y-2 text-sm text-gray-200">
                <p className="flex items-center justify-center">
                  <span className="font-medium">Lunes a Viernes:</span>
                  <span className="ml-2">8:00 AM - 5:00 PM</span>
                </p>
                <p className="flex items-center justify-center">
                  <span className="font-medium">Sábados y Domingos:</span>
                  <span className="ml-2">8:00 AM - 5:00 PM</span>
                </p>
                <p className="flex items-center justify-center">
                  <span className="font-medium">Feriados:</span>
                  <span className="ml-2">8:00 AM - 5:00 PM</span>
                </p>
              </div>
            </div>

            {/* Dirección */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-park-orange flex items-center justify-center">
                <MapPin className="mr-2 h-5 w-5" />
                Dirección
              </h3>
              <Button
                variant="link"
                onClick={handleDirectionClick}
                className="text-gray-200 hover:text-park-orange p-0 h-auto text-sm leading-relaxed transition-colors duration-200"
              >
                Parque zonal Chavín De Huántar
                <br />
                Quilmaná 15715
              </Button>
            </div>
          </div>

          {/* Tercera columna - Redes sociales */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-6 text-park-orange">
              Síguenos
            </h3>

            {/* Botón de Facebook */}
            <div className="flex justify-center md:justify-end">
              <Button
                variant="outline"
                size="lg"
                onClick={handleFacebookClick}
                className="bg-transparent border-2 border-park-orange text-park-orange hover:bg-park-orange hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <Facebook className="mr-2 h-5 w-5" />
                Facebook
              </Button>
            </div>

            {/* Información adicional de contacto */}
            <div className="mt-8 text-sm text-gray-200">
              <p className="mb-2">📞 Información y reservas:</p>
              <p className="text-park-orange font-medium">Próximamente</p>

              <div className="mt-4 pt-4 border-t border-gray-600">
                <p className="text-xs">
                  Mantente conectado para conocer nuestras
                </p>
                <p className="text-xs text-park-orange">
                  promociones y eventos especiales
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-600 mt-12 pt-8">
          {/* Copyright y enlaces legales */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <div className="mb-4 md:mb-0">
              <p>
                &copy; 2025 Parque Zonal Chavín de Huántar. Todos los derechos
                reservados.
              </p>
            </div>

            <div className="flex space-x-6">
              <button className="hover:text-park-orange transition-colors duration-200">
                Términos y Condiciones
              </button>
              <button className="hover:text-park-orange transition-colors duration-200">
                Política de Privacidad
              </button>
            </div>
          </div>

          {/* Mensaje adicional */}
          <div className="text-center mt-6 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-400">
              Un lugar donde la aventura, la educación y la conservación se unen
              para crear experiencias inolvidables
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
