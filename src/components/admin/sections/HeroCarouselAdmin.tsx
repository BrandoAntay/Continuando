import { useState } from "react";
import { useHeroSlides } from "@/hooks/useAdminData";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Plus, Edit, Trash2, Upload, Camera } from "lucide-react";
import type { HeroSlide } from "@/lib/adminStorage";

export const HeroCarouselAdmin = () => {
  const { slides, add, update, remove } = useHeroSlides();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState({
    image: "",
    subtitle: "",
    title: "",
    description: "",
  });

  const resetForm = () => {
    setFormData({
      image: "",
      subtitle: "",
      title: "",
      description: "",
    });
  };

  const handleAdd = () => {
    if (!formData.image || !formData.title) return;

    add({
      ...formData,
      active: true,
    });

    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEdit = (slide: HeroSlide) => {
    setFormData({
      image: slide.image,
      subtitle: slide.subtitle,
      title: slide.title,
      description: slide.description,
    });
    setEditingSlide(slide);
  };

  const handleUpdate = () => {
    if (!editingSlide || !formData.image || !formData.title) return;

    update(editingSlide.id, formData);
    resetForm();
    setEditingSlide(null);
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
          <h1 className="text-2xl font-bold text-gray-900">
            Carrusel Principal
          </h1>
          <p className="text-gray-600 mt-1">
            Gestiona las imágenes del carrusel principal de la homepage
          </p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
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

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo pequeño:</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subtitle: e.target.value,
                    }))
                  }
                  placeholder="Ej: Parque Zonal"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Título grande:</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Ej: CHAVÍN DE HUÁNTAR"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Texto breve:</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Descripción del slide"
                  rows={3}
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
                  disabled={!formData.image || !formData.title}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Agregar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de slides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-park-orange mb-2">{slide.subtitle}</p>
              <h3 className="font-bold text-park-blue mb-2">{slide.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {slide.description}
              </p>

              {/* Botones de acción */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(slide)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded flex items-center justify-center space-x-1"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded flex items-center justify-center space-x-1">
                      <Trash2 className="w-4 h-4" />
                      <span>Eliminar</span>
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Eliminar imagen?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. La imagen se eliminará
                        permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(slide.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay imágenes en el carrusel. Haz clic en "Agregar" para añadir la
          primera imagen.
        </div>
      )}

      {/* Modal de edición */}
      <Dialog
        open={!!editingSlide}
        onOpenChange={(open) => !open && setEditingSlide(null)}
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

            <div className="space-y-2">
              <Label htmlFor="edit-subtitle">Subtítulo pequeño:</Label>
              <Input
                id="edit-subtitle"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    subtitle: e.target.value,
                  }))
                }
                placeholder="Ej: Parque Zonal"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-title">Título grande:</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Ej: CHAVÍN DE HUÁNTAR"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Texto breve:</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Descripción del slide"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingSlide(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={!formData.image || !formData.title}
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
