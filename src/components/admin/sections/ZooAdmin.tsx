import { useState } from "react";
import { useAnimals } from "@/hooks/useAdminData";
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
import { Plus, Edit, Trash2, EyeOff, Upload, PawPrint } from "lucide-react";
import type { Animal } from "@/lib/adminStorage";

export const ZooAdmin = () => {
  const { animals, add, update, remove } = useAnimals();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    scientificName: "",
    description: "",
    image: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      scientificName: "",
      description: "",
      image: "",
    });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.scientificName || !formData.image) return;

    add({
      ...formData,
      active: true,
    });

    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEdit = (animal: Animal) => {
    setFormData({
      name: animal.name,
      scientificName: animal.scientificName,
      description: animal.description,
      image: animal.image,
    });
    setEditingAnimal(animal);
  };

  const handleUpdate = () => {
    if (
      !editingAnimal ||
      !formData.name ||
      !formData.scientificName ||
      !formData.image
    )
      return;

    update(editingAnimal.id, formData);
    resetForm();
    setEditingAnimal(null);
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
          <h1 className="text-2xl font-bold text-gray-900">Zoo y Animales</h1>
          <p className="text-gray-600 mt-1">
            Gestiona las tarjetas de la galería de Zoo y Animales
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
              <DialogTitle>Agregar Nuevo Animal</DialogTitle>
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

              <div className="space-y-2">
                <Label htmlFor="name">Nombre común</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Ej: León Africano"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scientificName">Nombre científico</Label>
                <Input
                  id="scientificName"
                  value={formData.scientificName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      scientificName: e.target.value,
                    }))
                  }
                  placeholder="Ej: Panthera leo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Breve descripción del animal
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Descripción del animal, sus características y hábitat"
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
                  disabled={
                    !formData.name ||
                    !formData.scientificName ||
                    !formData.image
                  }
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Agregar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de tarjetas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PawPrint className="w-5 h-5 text-blue-600" />
            <span>Lista de Tarjetas de Animales</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {animals.map((animal) => (
              <div
                key={animal.id}
                className="flex items-center space-x-4 p-4 border rounded-lg bg-white border-gray-200"
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{animal.name}</h4>
                  <p className="text-sm text-gray-600 italic">
                    {animal.scientificName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {animal.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(animal)}
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
                        <AlertDialogTitle>¿Eliminar tarjeta?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. La tarjeta se
                          eliminará permanentemente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(animal.id)}
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

            {animals.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hay animales. Haz clic en "Agregar" para añadir el primer
                animal.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de edición */}
      <Dialog
        open={!!editingAnimal}
        onOpenChange={(open) => !open && setEditingAnimal(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Animal</DialogTitle>
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
              <Label htmlFor="edit-name">Nombre común</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Ej: León Africano"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-scientificName">Nombre científico</Label>
              <Input
                id="edit-scientificName"
                value={formData.scientificName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    scientificName: e.target.value,
                  }))
                }
                placeholder="Ej: Panthera leo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">
                Breve descripción del animal
              </Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Descripción del animal, sus características y hábitat"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setEditingAnimal(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={
                  !formData.name || !formData.scientificName || !formData.image
                }
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
