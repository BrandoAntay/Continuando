import { useState } from "react";
import { useMapData } from "@/hooks/useAdminData";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, EyeOff, Eye, Upload } from "lucide-react";

export const MapAdmin = () => {
  const { mapData, update, toggleActive } = useMapData();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
  });

  const handleImageChange = () => {
    if (mapData) {
      setFormData({
        image: mapData.image,
      });
      setIsEditModalOpen(true);
    }
  };

  const handleToggleActive = () => {
    toggleActive();
  };

  const handleUpdate = () => {
    if (!formData.image) return;

    update({
      image: formData.image,
    });

    setIsEditModalOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!mapData) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No hay datos del mapa
          </h2>
          <p className="text-gray-500">
            Ocurrió un error al cargar la información del mapa
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mapa del Parque</h1>
        <p className="text-gray-600 mt-1">
          Gestiona la imagen de la sección Mapa del Parque
        </p>
      </div>

      {/* Card design */}
      <div className="max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={mapData.image || "/placeholder.svg"}
            alt="Mapa del Parque"
            className={`w-full h-64 object-cover ${!mapData.active ? "opacity-50" : ""}`}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
          <div className="p-6">
            <h3 className="text-lg font-bold text-park-blue mb-4">
              Mapa Actual del Parque
            </h3>
            <p className="text-gray-600 mb-6">
              Esta es la imagen que se muestra en la sección "Mapa del Parque"
              de la homepage.
            </p>

            <div className="flex space-x-4">
              <button
                onClick={handleImageChange}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Edit className="w-5 h-5" />
                <span>Cambiar Imagen</span>
              </button>

              <button
                onClick={handleToggleActive}
                className={`font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors ${mapData.active ? "bg-gray-500 hover:bg-gray-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`}
              >
                {mapData.active ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
                <span>{mapData.active ? "Desactivar" : "Activar"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cambiar Imagen del Mapa</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Vista de imagen actual */}
            <div className="space-y-2">
              <Label>Imagen actual</Label>
              <div className="border rounded-lg p-4 bg-gray-50">
                <img
                  src={mapData.image}
                  alt="Mapa actual"
                  className="w-full h-48 object-cover rounded"
                />
              </div>
            </div>

            {/* Upload de nueva imagen */}
            <div className="space-y-2">
              <Label>Seleccionar nueva imagen</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                <div className="text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload-edit"
                  />
                  <label htmlFor="image-upload-edit" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Haz clic para seleccionar una nueva imagen del mapa
                    </p>
                  </label>
                </div>
                {formData.image !== mapData.image && formData.image && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Nueva imagen:</p>
                    <img
                      src={formData.image}
                      alt="Preview nuevo mapa"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setFormData({ image: mapData.image });
                  setIsEditModalOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={!formData.image}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Actualizar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
