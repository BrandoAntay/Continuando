import { useState } from "react";
import { useMapData } from "@/hooks/useAdminData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Edit, EyeOff, Upload, Map } from "lucide-react";

export const MapAdmin = () => {
  const { mapData, update, toggleActive } = useMapData();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
  });

  const handleEdit = () => {
    if (mapData) {
      setFormData({
        image: mapData.image,
      });
      setIsEditModalOpen(true);
    }
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
          <Map className="w-12 h-12 text-gray-400 mx-auto mb-4" />
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

      {/* Card del mapa */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Map className="w-5 h-5 text-blue-600" />
            <span>Imagen del Mapa</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "flex items-center space-x-4 p-4 border rounded-lg",
              mapData.active
                ? "bg-white border-gray-200"
                : "bg-gray-100 border-gray-300",
            )}
          >
            <img
              src={mapData.image}
              alt="Mapa del parque"
              className={cn(
                "w-24 h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity",
                !mapData.active && "grayscale",
              )}
              onClick={() =>
                window.open(
                  `/mapa-grande?img=${encodeURIComponent(mapData.image)}`,
                  "_blank",
                )
              }
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Mapa del Parque</h4>
              <p className="text-sm text-gray-600">
                Imagen principal del mapa del parque zonal
              </p>
              <p
                className={cn(
                  "text-xs mt-1",
                  mapData.active ? "text-green-600" : "text-gray-500",
                )}
              >
                Estado: {mapData.active ? "Visible" : "Oculto"}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={handleEdit}>
                <Edit className="w-4 h-4" />
                Editar
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <EyeOff className="w-4 h-4" />
                    Desactivar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {mapData.active ? "¿Desactivar mapa?" : "¿Activar mapa?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {mapData.active
                        ? "La imagen se desactivará y no se mostrará en la sección Mapa del Parque. Se colocará de color gris."
                        : "La imagen volverá a mostrarse en la sección Mapa del Parque."}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={toggleActive}>
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de edición */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Mapa del Parque</DialogTitle>
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
