// Tipos de datos para el sistema de administración
export interface HeroSlide {
  id: number;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  active: boolean;
}

export interface Wonder {
  id: number;
  name: string;
  image: string;
  description: string;
  fullDescription: string;
  active: boolean;
}

export interface Animal {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  image: string;
  active: boolean;
}

export interface PriceOption {
  id: number;
  price: number;
  category: string;
  ageRange: string;
  description?: string;
  color: string;
  active: boolean;
}

export interface GroupImage {
  id: number;
  image: string;
  alt: string;
  caption: string;
  active: boolean;
}

export interface MapData {
  id: number;
  image: string;
  active: boolean;
}

export interface AdminData {
  heroSlides: HeroSlide[];
  wonders: Wonder[];
  animals: Animal[];
  priceOptions: PriceOption[];
  groupImages: GroupImage[];
  mapData: MapData;
}

// Claves para localStorage
const STORAGE_KEYS = {
  ADMIN_DATA: "park_admin_data",
  ADMIN_AUTH: "park_admin_auth",
} as const;

// Datos iniciales del sistema
const INITIAL_DATA: AdminData = {
  heroSlides: [
    {
      id: 1,
      image: "/placeholder.svg",
      subtitle: "Parque Zonal",
      title: "CHAVIN DE HUANTAR",
      description:
        "Ven y descubre algunas de las 7 maravillas del mundo mientras te maravillas con la fauna que habita nuestro parque.",
      active: true,
    },
    {
      id: 2,
      image: "/placeholder.svg",
      subtitle: "Estatuas Famosas",
      title: "FOTOS EPICAS",
      description:
        "¡Conoce a nuestros personajes favoritos! Prepárate para vivir momentos únicos y llevarte los mejores recuerdos.",
      active: true,
    },
    {
      id: 3,
      image: "/placeholder.svg",
      subtitle: "Centro Deportivo",
      title: "RECREACIÓN FAMILIAR",
      description:
        "Demuestra tus habilidades en nuestra amplia loza deportiva, perfecta para partidos de fútbol, vóley y más.",
      active: true,
    },
    {
      id: 4,
      image: "/placeholder.svg",
      subtitle: "Piscina Refrescante",
      title: "UN CHAPUZÓN DE ALEGRÍA",
      description:
        "Sumérgete en la diversión. Nuestra piscina es el lugar perfecto para refrescarte y pasar momentos inolvidables",
      active: true,
    },
    {
      id: 5,
      image: "/placeholder.svg",
      subtitle: "Paseos en Botes",
      title: "NAVEGA Y RELÁJATE",
      description:
        "Relájate y navega en nuestros botes a pedal. Una experiencia tranquila rodeada de naturaleza.",
      active: true,
    },
  ],
  wonders: [
    {
      id: 1,
      name: "Cristo Redentor",
      image: "/placeholder.svg",
      description: "Réplica del",
      fullDescription:
        "Contempla esta icónica estatua que se alza sobre la ciudad de Río de Janeiro. El Cristo Redentor es símbolo de fe y acogida, reconocido mundialmente como una de las nuevas maravillas del mundo.",
      active: true,
    },
    {
      id: 2,
      name: "Machu Picchu",
      image: "/placeholder.svg",
      description: "Réplica de",
      fullDescription:
        "Explora la ciudadela inca más famosa del mundo, suspendida entre las montañas de los Andes. Machu Picchu representa la cumbre de la ingeniería y espiritualidad de la civilización inca.",
      active: true,
    },
    {
      id: 3,
      name: "Gran Muralla China",
      image: "/placeholder.svg",
      description: "Réplica de la",
      fullDescription:
        "Recorre una sección de la fortificación más larga del mundo. La Gran Muralla China es testimonio del ingenio humano y la determinación de proteger una civilización milenaria.",
      active: true,
    },
    {
      id: 4,
      name: "Las Pirámides de Guiza",
      image: "/placeholder.svg",
      description: "Réplicas de",
      fullDescription:
        "Explora las majestuosas Pirámides de Guiza, construidas hace más de 4,500 años como tumbas para los faraones. Estas maravillas del mundo antiguo siguen desafiando al tiempo y revelando el misterio de una civilización que dominó la ingeniería, la astronomía y el arte con una precisión asombrosa.",
      active: true,
    },
  ],
  animals: [
    {
      id: 1,
      name: "León Africano",
      scientificName: "Panthera leo",
      description:
        "El rey de la sabana, conocido por su melena majestuosa y rugido poderoso que puede escucharse a kilómetros de distancia.",
      image: "/placeholder.svg",
      active: true,
    },
    {
      id: 2,
      name: "Jaguar",
      scientificName: "Panthera onca",
      description:
        "El felino más grande de América, excelente nadador y con la mordida más poderosa entre todos los grandes felinos.",
      image: "/placeholder.svg",
      active: true,
    },
    {
      id: 3,
      name: "Oso de Anteojos",
      scientificName: "Tremarctos ornatus",
      description:
        "Único oso nativo de Sudamérica, habita en los bosques andinos y es conocido por las marcas alrededor de sus ojos.",
      image: "/placeholder.svg",
      active: true,
    },
    {
      id: 4,
      name: "Cóndor Andino",
      scientificName: "Vultur gryphus",
      description:
        "Ave nacional del Perú, una de las aves voladoras más grandes del mundo con una envergadura de hasta 3 metros.",
      image: "/placeholder.svg",
      active: true,
    },
    {
      id: 5,
      name: "Vicuña",
      scientificName: "Vicugna vicugna",
      description:
        "Camélido sudamericano que produce la fibra más fina del mundo, símbolo de la fauna andina peruana.",
      image: "/placeholder.svg",
      active: true,
    },
    {
      id: 6,
      name: "Mono Choro",
      scientificName: "Lagothrix lagotricha",
      description:
        "Primate endémico de la Amazonía peruana, conocido por su cola prensil y comportamiento social complejo.",
      image: "/placeholder.svg",
      active: true,
    },
  ],
  priceOptions: [
    {
      id: 1,
      price: 10,
      category: "Adultos",
      ageRange: "18 a 60 años",
      description: "Acceso completo al parque y zoológico",
      color: "#054986",
      active: true,
    },
    {
      id: 2,
      price: 5,
      category: "Niños",
      ageRange: "4 a 17 años",
      description: "Entrada especial para menores",
      color: "#054986",
      active: true,
    },
    {
      id: 3,
      price: 5,
      category: "Tercera Edad",
      ageRange: "60+ años",
      description: "Tarifa preferencial para adultos mayores",
      color: "#054986",
      active: true,
    },
    {
      id: 4,
      price: 5,
      category: "Discapacitados",
      ageRange: "18+ años",
      description: "Descuento especial para discapacitados",
      color: "#00864b",
      active: true,
    },
    {
      id: 5,
      price: 5,
      category: "Piscina Adulto",
      ageRange: "18 a 60 años",
      description: "Entrada para la piscina de adultos",
      color: "#054986",
      active: true,
    },
    {
      id: 6,
      price: 5,
      category: "Piscina Niños",
      ageRange: "4 a 17 años",
      description: "Entrada para la piscina de niños",
      color: "#054986",
      active: true,
    },
  ],
  groupImages: [
    {
      id: 1,
      image: "/placeholder.svg",
      alt: "Grupo disfrutando en el parque",
      caption: "Diversión familiar garantizada",
      active: true,
    },
    {
      id: 2,
      image: "/placeholder.svg",
      alt: "Actividades en el zoológico",
      caption: "Experiencias educativas únicas",
      active: true,
    },
    {
      id: 3,
      image: "/placeholder.svg",
      alt: "Zonas deportivas del parque",
      caption: "Espacios deportivos amplios",
      active: true,
    },
    {
      id: 4,
      image: "/placeholder.svg",
      alt: "Área de picnic grupal",
      caption: "Perfectos para celebraciones",
      active: true,
    },
  ],
  mapData: {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&w=1200&q=80",
    active: true,
  },
};

// Utilidades para el localStorage
export const adminStorage = {
  // Inicializar datos si no existen
  init(): void {
    if (!localStorage.getItem(STORAGE_KEYS.ADMIN_DATA)) {
      localStorage.setItem(
        STORAGE_KEYS.ADMIN_DATA,
        JSON.stringify(INITIAL_DATA),
      );
    }
  },

  // Obtener todos los datos
  getData(): AdminData {
    this.init();
    const data = localStorage.getItem(STORAGE_KEYS.ADMIN_DATA);
    return data ? JSON.parse(data) : INITIAL_DATA;
  },

  // Guardar todos los datos
  setData(data: AdminData): void {
    localStorage.setItem(STORAGE_KEYS.ADMIN_DATA, JSON.stringify(data));
  },

  // Utilidades para autenticación
  setAuth(isAuthenticated: boolean): void {
    localStorage.setItem(
      STORAGE_KEYS.ADMIN_AUTH,
      JSON.stringify({
        isAuthenticated,
        timestamp: Date.now(),
      }),
    );
  },

  getAuth(): boolean {
    const auth = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
    if (!auth) return false;

    const { isAuthenticated, timestamp } = JSON.parse(auth);
    // Verificar si la sesión ha expirado (24 horas)
    const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;

    if (isExpired) {
      this.setAuth(false);
      return false;
    }

    return isAuthenticated;
  },

  clearAuth(): void {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  },

  // Funciones CRUD para cada entidad

  // Hero Slides
  getHeroSlides(): HeroSlide[] {
    return this.getData().heroSlides;
  },

  addHeroSlide(slide: Omit<HeroSlide, "id">): void {
    const data = this.getData();
    const newSlide = { ...slide, id: Date.now() };
    data.heroSlides.push(newSlide);
    this.setData(data);
  },

  updateHeroSlide(id: number, slide: Partial<HeroSlide>): void {
    const data = this.getData();
    const index = data.heroSlides.findIndex((s) => s.id === id);
    if (index !== -1) {
      data.heroSlides[index] = { ...data.heroSlides[index], ...slide };
      this.setData(data);
    }
  },

  deleteHeroSlide(id: number): void {
    const data = this.getData();
    data.heroSlides = data.heroSlides.filter((s) => s.id !== id);
    this.setData(data);
  },

  // Wonders
  getWonders(): Wonder[] {
    return this.getData().wonders;
  },

  addWonder(wonder: Omit<Wonder, "id">): void {
    const data = this.getData();
    const newWonder = { ...wonder, id: Date.now() };
    data.wonders.push(newWonder);
    this.setData(data);
  },

  updateWonder(id: number, wonder: Partial<Wonder>): void {
    const data = this.getData();
    const index = data.wonders.findIndex((w) => w.id === id);
    if (index !== -1) {
      data.wonders[index] = { ...data.wonders[index], ...wonder };
      this.setData(data);
    }
  },

  deleteWonder(id: number): void {
    const data = this.getData();
    data.wonders = data.wonders.filter((w) => w.id !== id);
    this.setData(data);
  },

  // Animals
  getAnimals(): Animal[] {
    return this.getData().animals;
  },

  addAnimal(animal: Omit<Animal, "id">): void {
    const data = this.getData();
    const newAnimal = { ...animal, id: Date.now() };
    data.animals.push(newAnimal);
    this.setData(data);
  },

  updateAnimal(id: number, animal: Partial<Animal>): void {
    const data = this.getData();
    const index = data.animals.findIndex((a) => a.id === id);
    if (index !== -1) {
      data.animals[index] = { ...data.animals[index], ...animal };
      this.setData(data);
    }
  },

  deleteAnimal(id: number): void {
    const data = this.getData();
    data.animals = data.animals.filter((a) => a.id !== id);
    this.setData(data);
  },

  // Price Options
  getPriceOptions(): PriceOption[] {
    return this.getData().priceOptions;
  },

  addPriceOption(option: Omit<PriceOption, "id">): void {
    const data = this.getData();
    const newOption = { ...option, id: Date.now() };
    data.priceOptions.push(newOption);
    this.setData(data);
  },

  updatePriceOption(id: number, option: Partial<PriceOption>): void {
    const data = this.getData();
    const index = data.priceOptions.findIndex((p) => p.id === id);
    if (index !== -1) {
      data.priceOptions[index] = { ...data.priceOptions[index], ...option };
      this.setData(data);
    }
  },

  deletePriceOption(id: number): void {
    const data = this.getData();
    data.priceOptions = data.priceOptions.filter((p) => p.id !== id);
    this.setData(data);
  },

  // Group Images
  getGroupImages(): GroupImage[] {
    return this.getData().groupImages;
  },

  addGroupImage(image: Omit<GroupImage, "id">): void {
    const data = this.getData();
    const newImage = { ...image, id: Date.now() };
    data.groupImages.push(newImage);
    this.setData(data);
  },

  updateGroupImage(id: number, image: Partial<GroupImage>): void {
    const data = this.getData();
    const index = data.groupImages.findIndex((i) => i.id === id);
    if (index !== -1) {
      data.groupImages[index] = { ...data.groupImages[index], ...image };
      this.setData(data);
    }
  },

  deleteGroupImage(id: number): void {
    const data = this.getData();
    data.groupImages = data.groupImages.filter((i) => i.id !== id);
    this.setData(data);
  },

  // Map Data
  getMapData(): MapData {
    return this.getData().mapData;
  },

  updateMapData(mapData: Partial<MapData>): void {
    const data = this.getData();
    data.mapData = { ...data.mapData, ...mapData };
    this.setData(data);
  },
};
