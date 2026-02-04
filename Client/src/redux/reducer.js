// reducer.js
import { ADD_FAV, REMOVE_FAV, APPLY_FILTERS, RESET_FILTERS } from "./action";

// Estado inicial con filtros activos
const initialState = {
  myFavorites: [],
  allCharacters: [],
  filters: {
    gender: null,
    status: null,
    species: null,
    origin: null,
    order: "D", // D = descendente (por defecto), A = ascendente
  },
};

// Función auxiliar para aplicar todos los filtros
function applyAllFilters(characters, filters) {
  let result = [...characters];

  // Filtrar por género
  if (filters.gender) {
    result = result.filter((char) => char.gender === filters.gender);
  }

  // Filtrar por estado
  if (filters.status) {
    result = result.filter((char) => char.status === filters.status);
  }

  // Filtrar por especie
  if (filters.species) {
    result = result.filter((char) => char.species === filters.species);
  }

  // Filtrar por origen
  if (filters.origin) {
    result = result.filter((char) => char.origin === filters.origin);
  }

  // Ordenar
  result.sort((a, b) => (filters.order === "A" ? a.id - b.id : b.id - a.id));

  return result;
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FAV:
      return {
        ...state,
        myFavorites: applyAllFilters(action.payload, state.filters),
        allCharacters: action.payload,
      };

    case REMOVE_FAV:
      // Actualizar allCharacters también cuando se elimina
      const updatedAllCharacters = state.allCharacters.filter((char) =>
        action.payload.some((p) => p.id === char.id),
      );
      return {
        ...state,
        myFavorites: applyAllFilters(action.payload, state.filters),
        allCharacters: action.payload,
      };

    case APPLY_FILTERS:
      const newFilters = { ...state.filters, ...action.payload };
      return {
        ...state,
        filters: newFilters,
        myFavorites: applyAllFilters(state.allCharacters, newFilters),
      };

    case RESET_FILTERS:
      const defaultFilters = {
        gender: null,
        status: null,
        species: null,
        origin: null,
        order: "D",
      };
      return {
        ...state,
        filters: defaultFilters,
        myFavorites: applyAllFilters(state.allCharacters, defaultFilters),
      };

    default:
      return state;
  }
}

export default reducer;

//9. Al final, se exporta el reducer como el valor predeterminado del módulo para que pueda ser utilizado en otros archivos de la aplicación.
