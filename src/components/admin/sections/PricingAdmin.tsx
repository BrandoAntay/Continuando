import { useState } from "react";
import { usePriceOptions } from "@/hooks/useAdminData";
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
import { cn } from "@/lib/utils";
import { Plus, Edit, Trash2, EyeOff, DollarSign } from "lucide-react";
import type { PriceOption } from "@/lib/adminStorage";

const colorOptions = [
  { value: "#054986", label: "Azul del Parque" },
  { value: "#00864b", label: "Verde del Parque" },
  { value: "#f29200", label: "Naranja del Parque" },
  { value: "#dc2626", label: "Rojo" },
  { value: "#7c3aed", label: "Púrpura" },
  { value: "#059669", label: "Verde Esmeralda" },
];

export const PricingAdmin = () => {
  const { priceOptions, add, update, remove } = usePriceOptions();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingOption, setEditingOption] = useState<PriceOption | null>(null);
  const [formData, setFormData] = useState({
    price: "",
    category: "",
    ageRange: "",
    color: "#054986",
  });

  const resetForm = () => {
    setFormData({
      price: "",
      category: "",
      ageRange: "",
      color: "#054986",
    });
  };

  const handleAdd = () => {
    if (!formData.price || !formData.category || !formData.ageRange) return;

    add({
      ...formData,
      price: parseFloat(formData.price),
      description: `Entrada para ${formData.category.toLowerCase()}`,
      active: true,
    });

    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEdit = (option: PriceOption) => {
    setFormData({
      price: option.price.toString(),
      category: option.category,
      ageRange: option.ageRange,
      color: option.color,
    });
    setEditingOption(option);
  };

  const handleUpdate = () => {
    if (
      !editingOption ||
      !formData.price ||
      !formData.category ||
      !formData.ageRange
    )
      return;

    update(editingOption.id, {
      ...formData,
      price: parseFloat(formData.price),
    });
    resetForm();
    setEditingOption(null);
  };

  const handleDelete = (id: number) => {
    remove(id);
  };

  const formatPrice = (price: number) => {
    return `S/ ${price.toFixed(1)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header con botón agregar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Costos de Entrada
          </h1>
          <p className="text-gray-600 mt-1">
            Gestiona las cards de Costos de Entrada y Actividades
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
              <DialogTitle>Agregar Nueva Categoría de Precio</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  placeholder="10.0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  placeholder="Ej: Adultos"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ageRange">Edad</Label>
                <Input
                  id="ageRange"
                  value={formData.ageRange}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ageRange: e.target.value,
                    }))
                  }
                  placeholder="Ej: 18 a 60 años"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Color del círculo</Label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((colorOption) => (
                    <button
                      key={colorOption.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          color: colorOption.value,
                        }))
                      }
                      className={cn(
                        "flex items-center space-x-2 p-3 rounded border-2 transition-all",
                        formData.color === colorOption.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300",
                      )}
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: colorOption.value }}
                      />
                      <span className="text-sm">{colorOption.label}</span>
                    </button>
                  ))}
                </div>
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
                    !formData.price || !formData.category || !formData.ageRange
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

      {/* Lista de cards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <span>Lista de Cards de Precios</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {priceOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-4 p-4 border rounded-lg bg-white border-gray-200"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: option.color }}
                >
                  {formatPrice(option.price)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {option.category}
                  </h4>
                  <p className="text-sm text-gray-600">{option.ageRange}</p>
                  {option.description && (
                    <p className="text-xs text-gray-500 mt-1">
                      {option.description}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(option)}
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
                        <AlertDialogTitle>¿Eliminar card?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. La card se eliminará
                          permanentemente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(option.id)}
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

            {priceOptions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hay precios. Haz clic en "Agregar" para añadir el primer
                precio.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de edición */}
      <Dialog
        open={!!editingOption}
        onOpenChange={(open) => !open && setEditingOption(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Precio</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-price">Precio</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.1"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
                placeholder="10.0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-category">Categoría</Label>
              <Input
                id="edit-category"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                placeholder="Ej: Adultos"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-ageRange">Edad</Label>
              <Input
                id="edit-ageRange"
                value={formData.ageRange}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ageRange: e.target.value,
                  }))
                }
                placeholder="Ej: 18 a 60 años"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Color del círculo</Label>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((colorOption) => (
                  <button
                    key={colorOption.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        color: colorOption.value,
                      }))
                    }
                    className={cn(
                      "flex items-center space-x-2 p-3 rounded border-2 transition-all",
                      formData.color === colorOption.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: colorOption.value }}
                    />
                    <span className="text-sm">{colorOption.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setEditingOption(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={
                  !formData.price || !formData.category || !formData.ageRange
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
