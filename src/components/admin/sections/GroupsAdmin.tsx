import { useState } from "react";
import { useGroupImages } from "@/hooks/useAdminData";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Plus, Edit, Trash2, EyeOff, Upload, Users } from "lucide-react";
import type { GroupImage } from "@/lib/adminStorage";

export const GroupsAdmin = () => {
  const { groupImages, add, update, remove } = useGroupImages();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GroupImage | null>(null);
  const [formData, setFormData] = useState({
    image: "",
    caption: "",
  });

  const resetForm = () => {
    setFormData({
      image: "",
      caption: "",
    });
  };

  const handleAdd = () => {
    if (!formData.image || !formData.caption) return;

    add({
      image: formData.image,
      caption: formData.caption,
      active: true,
    });

    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEdit = (image: GroupImage) => {
    setEditingImage(image);
    setFormData({
      image: image.image,
      caption: image.caption,
    });
  };

  const handleUpdate = () => {
    if (!editingImage || !formData.image || !formData.caption) return;

    update(editingImage.id, {
      image: formData.image,
      caption: formData.caption,
      active: editingImage.active,
    });

    resetForm();
    setEditingImage(null);
  };

  const handleDelete = (id: number) => {
    remove(id);
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

  return (
    <div className="space-y-6">
      {/* Header con botón agregar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grupos Grandes</h1>
          <p className="text-gray-600 mt-1">
            Gestiona las imágenes del carrusel pequeño de Grupos Grandes
          </p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Agregar Nueva Imagen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Upload de imagen */}
              <div className="space-y-2">
                <Label>Seleccionar imagen</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                  <div className="text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload-add"
                    />
                    <label
                      htmlFor="image-upload-add"
                      className="cursor-pointer"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Haz clic para seleccionar una imagen o arrastra aquí
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              {/* Campo Caption */}
              <div className="space-y-2">
                <Label htmlFor="caption-add">Texto de la imagen</Label>
                <Textarea
                  id="caption-add"
                  value={formData.caption}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      caption: e.target.value,
                    }))
                  }
                  placeholder="Texto que aparecerá sobre la imagen en el carrusel"
                  rows={2}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setIsAddModalOpen(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={!formData.image || !formData.caption}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Agregar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de imágenes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Lista de Imágenes del Carrusel Pequeño</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {groupImages.map((image) => (
              <div
                key={image.id}
                className="flex items-center space-x-4 p-4 border rounded-lg bg-white border-gray-200"
              >
                <img
                  src={image.image}
                  alt=""
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{image.caption}</h4>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(image)}
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar imagen?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. La imagen se
                          eliminará permanentemente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(image.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}

            {groupImages.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hay imágenes. Haz clic en "Agregar" para añadir la primera
                imagen.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de edición */}
      <Dialog
        open={!!editingImage}
        onOpenChange={(open) => !open && setEditingImage(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Imagen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Upload de imagen */}
            <div className="space-y-2">
              <Label>Cambiar imagen</Label>
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
                      Haz clic para cambiar la imagen
                    </p>
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-4">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Campo Caption */}
            <div className="space-y-2">
              <Label htmlFor="caption-edit">Texto de la imagen</Label>
              <Textarea
                id="caption-edit"
                value={formData.caption}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, caption: e.target.value }))
                }
                placeholder="Texto que aparecerá sobre la imagen en el carrusel"
                rows={2}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setEditingImage(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={!formData.image || !formData.caption}
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
