import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Shield, User } from "lucide-react";

export default function AdminLogin() {
  const { isAuthenticated, login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simular delay de autenticación
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = login(email, password);

    if (!success) {
      setError("Credenciales incorrectas. Use admin@parque.com / admin123");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-park-blue via-park-blue-dark to-park-green flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
            {/* Columna izquierda - Imagen */}
            <div className="relative bg-gradient-to-br from-park-orange to-park-orange-light p-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/10"></div>

              {/* Logo del parque */}
              <div className="relative z-10 text-center text-white">
                <div className="w-32 h-32 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Shield className="w-16 h-16 text-white" />
                </div>

                <h1 className="text-3xl font-bold mb-2">Parque Zonal</h1>
                <h2 className="text-xl mb-4">Chavín de Huántar</h2>
                <p className="text-white/90 text-sm max-w-sm">
                  Panel de administración para gestionar contenido del parque
                  sin necesidad de código
                </p>
              </div>

              {/* Decoración */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-8 left-8 w-16 h-16 bg-white/10 rounded-full"></div>
            </div>

            {/* Columna derecha - Formulario */}
            <div className="p-8 flex items-center justify-center bg-white">
              <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-park-blue rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-park-blue mb-2">
                    Acceso Administrativo
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Ingrese sus credenciales para gestionar el contenido
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Campo de email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-park-blue font-medium"
                    >
                      Correo electrónico
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@parque.com"
                      required
                      className="border-gray-300 focus:border-park-blue focus:ring-park-blue"
                    />
                  </div>

                  {/* Campo de contraseña */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-park-blue font-medium"
                    >
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingrese su contraseña"
                        required
                        className="border-gray-300 focus:border-park-blue focus:ring-park-blue pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  {/* Credenciales de demo */}
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-xs text-blue-600 mb-1">
                      <strong>Credenciales de demo:</strong>
                    </p>
                    <p className="text-xs text-blue-600">
                      Email: admin@parque.com
                    </p>
                    <p className="text-xs text-blue-600">
                      Contraseña: admin123
                    </p>
                  </div>

                  {/* Botón de login */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-park-blue hover:bg-park-blue-dark text-white py-2.5 text-sm font-medium"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Verificando...</span>
                      </div>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </Button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Panel administrativo del Parque Zonal Chavín de Huántar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
