import { useState, useEffect } from "react";
import {
  adminStorage,
  type AdminData,
  type HeroSlide,
  type Wonder,
  type Animal,
  type PriceOption,
  type GroupImage,
  type MapData,
} from "@/lib/adminStorage";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = adminStorage.getAuth();
    setIsAuthenticated(auth);
    setLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    // Credenciales hardcodeadas para demo
    if (email === "admin@parque.com" && password === "admin123") {
      adminStorage.setAuth(true);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    adminStorage.clearAuth();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, login, logout };
}

export function useAdminData() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshData = () => {
    const adminData = adminStorage.getData();
    setData(adminData);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return { data, loading, refreshData };
}

export function useHeroSlides() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);

  const refresh = () => {
    setSlides(adminStorage.getHeroSlides());
  };

  useEffect(() => {
    refresh();

    // Listen for storage changes to sync across components/tabs
    const handleStorageChange = () => {
      refresh();
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event for same-tab updates
    window.addEventListener("adminDataChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("adminDataChange", handleStorageChange);
    };
  }, []);

  const add = (slide: Omit<HeroSlide, "id">) => {
    adminStorage.addHeroSlide(slide);
    refresh();
    // Trigger custom event for same-tab updates
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  const update = (id: number, slide: Partial<HeroSlide>) => {
    adminStorage.updateHeroSlide(id, slide);
    refresh();
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  const remove = (id: number) => {
    adminStorage.deleteHeroSlide(id);
    refresh();
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  return { slides, add, update, remove, refresh };
}

export function useWonders() {
  const [wonders, setWonders] = useState<Wonder[]>([]);

  const refresh = () => {
    setWonders(adminStorage.getWonders());
  };

  useEffect(() => {
    refresh();

    const handleStorageChange = () => {
      refresh();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("adminDataChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("adminDataChange", handleStorageChange);
    };
  }, []);

  const add = (wonder: Omit<Wonder, "id">) => {
    adminStorage.addWonder(wonder);
    refresh();
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  const update = (id: number, wonder: Partial<Wonder>) => {
    adminStorage.updateWonder(id, wonder);
    refresh();
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  const remove = (id: number) => {
    adminStorage.deleteWonder(id);
    refresh();
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  return { wonders, add, update, remove, refresh };
}

export function useAnimals() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  const refresh = () => {
    setAnimals(adminStorage.getAnimals());
  };

  useEffect(() => {
    refresh();

    const handleStorageChange = () => {
      refresh();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("adminDataChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("adminDataChange", handleStorageChange);
    };
  }, []);

  const add = (animal: Omit<Animal, "id">) => {
    adminStorage.addAnimal(animal);
    refresh();
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  const update = (id: number, animal: Partial<Animal>) => {
    adminStorage.updateAnimal(id, animal);
    refresh();
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  const remove = (id: number) => {
    adminStorage.deleteAnimal(id);
    refresh();
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  return { animals, add, update, remove, refresh };
}

export function usePriceOptions() {
  const [priceOptions, setPriceOptions] = useState<PriceOption[]>([]);

  const refresh = () => {
    setPriceOptions(adminStorage.getPriceOptions());
  };

  useEffect(() => {
    refresh();

    const handleStorageChange = () => {
      refresh();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("adminDataChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("adminDataChange", handleStorageChange);
    };
  }, []);

  const add = (option: Omit<PriceOption, "id">) => {
    adminStorage.addPriceOption(option);
    refresh();
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  const update = (id: number, option: Partial<PriceOption>) => {
    adminStorage.updatePriceOption(id, option);
    refresh();
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  const remove = (id: number) => {
    adminStorage.deletePriceOption(id);
    refresh();
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  return { priceOptions, add, update, remove, refresh };
}

export function useGroupImages() {
  const [groupImages, setGroupImages] = useState<GroupImage[]>([]);

  const refresh = () => {
    setGroupImages(adminStorage.getGroupImages());
  };

  useEffect(() => {
    refresh();

    const handleStorageChange = () => {
      refresh();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("adminDataChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("adminDataChange", handleStorageChange);
    };
  }, []);

  const add = (image: Omit<GroupImage, "id">) => {
    adminStorage.addGroupImage(image);
    refresh();
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  const update = (id: number, image: Partial<GroupImage>) => {
    adminStorage.updateGroupImage(id, image);
    refresh();
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  const remove = (id: number) => {
    adminStorage.deleteGroupImage(id);
    refresh();
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  return { groupImages, add, update, remove, refresh };
}

export function useMapData() {
  const [mapData, setMapData] = useState<MapData | null>(null);

  const refresh = () => {
    setMapData(adminStorage.getMapData());
  };

  useEffect(() => {
    refresh();

    const handleStorageChange = () => {
      refresh();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("adminDataChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("adminDataChange", handleStorageChange);
    };
  }, []);

  const update = (data: Partial<MapData>) => {
    adminStorage.updateMapData(data);
    refresh();
    window.dispatchEvent(new CustomEvent("adminDataChange"));
  };

  const toggleActive = () => {
    if (mapData) {
      update({ active: !mapData.active });
    }
  };

  return { mapData, update, toggleActive, refresh };
}
