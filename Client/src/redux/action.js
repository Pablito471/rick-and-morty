import axios from "axios";

// Action Types
export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const APPLY_FILTERS = "APPLY_FILTERS";
export const RESET_FILTERS = "RESET_FILTERS";

// Action Creators

export const addFav = (character) => {
  const endpoint = "http://localhost:3001/rickandmorty/fav";
  return async (dispatch) => {
    try {
      console.log("Enviando a favoritos:", character);
      const { data } = await axios.post(endpoint, character);
      console.log("Respuesta del servidor:", data);
      return dispatch({
        type: ADD_FAV,
        payload: data,
      });
    } catch (error) {
      console.error(
        "Error al agregar favorito:",
        error.response?.data || error.message,
      );
      alert(
        "Error al agregar favorito: " +
          (error.response?.data?.error || error.message),
      );
    }
  };
};

export const removeFav = (id) => {
  const endpoint = "http://localhost:3001/rickandmorty/fav/" + id;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint);
      return dispatch({
        type: REMOVE_FAV,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

// Acción unificada para aplicar filtros (permite combinarlos)
export function applyFilters(filterChanges) {
  return {
    type: APPLY_FILTERS,
    payload: filterChanges,
  };
}

// Acción para resetear todos los filtros
export function resetFilters() {
  return {
    type: RESET_FILTERS,
  };
}
