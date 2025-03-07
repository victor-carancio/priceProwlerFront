import { GameType, StoreTypes } from "./@types/global.d";

export const capitalizeEachWord = (sentence: string) => {
  return sentence
    .toLowerCase() // Convertir todo a minúsculas
    .replace(/\b\w/g, (match) => match.toUpperCase()); // Convertir la primera letra de cada palabra
};

export const Months: { [key: string]: string } = {
  "0": "enero",
  "1": "febrero",
  "2": "marzo",
  "3": "abril",
  "4": "mayo",
  "5": "junio",
  "6": "julio",
  "7": "agosto",
  "8": "septiembre",
  "9": "octubre",
  "10": "noviembre",
  "11": "diciembre",
};

export const sortOptions = [
  { value: "price-asc", label: "Precio (Bajo - Alto)" },
  { value: "price-desc", label: "Precio (Alto - Bajo)" },
  { value: "alphabetical-asc", label: "Alfabético (A-Z)" },
  { value: "alphabetical-desc", label: "Alfabético (Z-A)" },
];

export const getImgGame = (game: GameType) => {
  if (!game?.stores || !Array.isArray(game.stores)) {
    return "img/defult.jpg";
  }

  const correctStore = game.stores.find((store) => store.game_id === game.id);

  if (!correctStore) {
    return "img/defult.jpg";
  }

  const { store, info_game } = correctStore;

  const storeImage: Record<StoreTypes, string> = {
    [StoreTypes.STEAM_STORE]: "",
    [StoreTypes.EPIC_STORE]: "?h=352&amp;quality=medium&amp;resize=1&amp;w=264", //"?h=352&amp;quality=medium&amp;resize=1&amp;w=264", "?resize=1&w=460&h=215&quality=medium"
    [StoreTypes.XBOX_STORE]: "?q=100&h=352&w=265",
  };

  return `${info_game.imgStore}${storeImage[store as StoreTypes]}`;
};
