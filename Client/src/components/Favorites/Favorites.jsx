import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../card/Card";
import styles from "./Favorites.module.css";
import { applyFilters, resetFilters } from "../../redux/action";

function Favorites() {
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.myFavorites || []);
  const allCharacters = useSelector((state) => state.allCharacters || []);
  const filters = useSelector(
    (state) =>
      state.filters || {
        gender: null,
        status: null,
        species: null,
        origin: null,
        order: "D",
      },
  );

  // Generar opciones dinámicas basadas en los favoritos reales
  const uniqueValues = useMemo(() => {
    const genders = [
      ...new Set(allCharacters.map((c) => c.gender).filter(Boolean)),
    ];
    const statuses = [
      ...new Set(allCharacters.map((c) => c.status).filter(Boolean)),
    ];
    const species = [
      ...new Set(allCharacters.map((c) => c.species).filter(Boolean)),
    ];
    const origins = [
      ...new Set(allCharacters.map((c) => c.origin?.trim()).filter(Boolean)),
    ];

    return {
      genders: genders.sort(),
      statuses: statuses.sort(),
      species: species.sort(),
      origins: origins.sort(),
    };
  }, [allCharacters]);

  function handleFilterChange(filterType, value) {
    const filterValue = value === "Todos" ? null : value;
    dispatch(applyFilters({ [filterType]: filterValue }));
  }

  function handleReset() {
    dispatch(resetFilters());
  }

  // Traducir valores para mostrar
  const translateValue = (key, value) => {
    const translations = {
      Male: "Masculino",
      Female: "Femenino",
      Genderless: "Sin género",
      unknown: "Desconocido",
      Alive: "Vivo",
      Dead: "Muerto",
      Human: "Humano",
      Alien: "Extraterrestre",
    };
    return translations[value] || value;
  };

  // Verificar si hay filtros activos
  const hasActiveFilters =
    filters.gender || filters.status || filters.species || filters.origin;

  return (
    <div className={styles.containerCb}>
      <div className={styles.containerCa}>
        {/* Filtro por Género */}
        <select
          className={styles.selectFav}
          onChange={(e) => handleFilterChange("gender", e.target.value)}
          value={filters.gender || "Todos"}
        >
          <option value="Todos">Todos los Géneros</option>
          {uniqueValues.genders.map((gender) => (
            <option key={gender} value={gender}>
              {translateValue("gender", gender)}
            </option>
          ))}
        </select>

        {/* Filtro por Estado */}
        <select
          className={styles.selectFav}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          value={filters.status || "Todos"}
        >
          <option value="Todos">Todos los Estados</option>
          {uniqueValues.statuses.map((status) => (
            <option key={status} value={status}>
              {translateValue("status", status)}
            </option>
          ))}
        </select>

        {/* Filtro por Especie */}
        <select
          className={styles.selectFav}
          onChange={(e) => handleFilterChange("species", e.target.value)}
          value={filters.species || "Todos"}
        >
          <option value="Todos">Todas las Especies</option>
          {uniqueValues.species.map((sp) => (
            <option key={sp} value={sp}>
              {translateValue("species", sp)}
            </option>
          ))}
        </select>

        {/* Filtro por Origen */}
        <select
          className={styles.selectFav}
          onChange={(e) => handleFilterChange("origin", e.target.value)}
          value={filters.origin || "Todos"}
        >
          <option value="Todos">Todos los Orígenes</option>
          {uniqueValues.origins.map((origin) => (
            <option key={origin} value={origin}>
              {origin}
            </option>
          ))}
        </select>

        {/* Ordenamiento */}
        <select
          className={styles.selectFav}
          onChange={(e) => handleFilterChange("order", e.target.value)}
          value={filters.order || "D"}
        >
          <option value="D">Más recientes</option>
          <option value="A">Más antiguos</option>
        </select>

        {/* Botón Reset */}
        {hasActiveFilters && (
          <button className={styles.resetBtn} onClick={handleReset}>
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Contador de resultados */}
      <div className={styles.resultsInfo}>
        {myFavorites.length === 0 ? (
          <p>
            No hay favoritos {hasActiveFilters ? "con estos filtros" : "aún"}
          </p>
        ) : (
          <p>
            Mostrando {myFavorites.length} de {allCharacters.length} favoritos
          </p>
        )}
      </div>

      {/* Cards */}
      <div className={styles.cardsGrid}>
        {myFavorites.map((character) => (
          <Card key={character.id} {...character} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
