import axios from "axios"; // Importamos el módulo axios para hacer peticiones HTTP
import { useState, useEffect } from "react"; // Importamos los hooks useState y useEffect de React
import { useParams } from "react-router-dom"; // Importamos el hook useParams de React Router
import styles from "./Detail.module.css"; // Importamos los estilos CSS
import PATHROUTES from "../helpers/PathRoutes";
import { Link } from "react-router-dom";

const Detail = () => {
  const { id } = useParams(); // Obtenemos el parámetro 'id' de la URL usando el hook useParams
  const [character, setCharacter] = useState({}); // Creamos un estado para almacenar los datos del personaje
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/rickandmorty/character/${id}`)
      .then((response) => {
        if (response.data.name) {
          setCharacter(response.data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert("Error al cargar los datos");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const onClose = () => {
    // Definimos una función para cerrar la tarjeta del personaje
    setCharacter({}); // Actualizamos el estado para borrar los datos del personaje
  };

  return (
    <div className={styles.containerDt}>
      <Link to={PATHROUTES.HOME}>
        <div className={styles.divButtonDt}>
          {/* Botón para cerrar la tarjeta */}
          <button className={styles.buttonDt} onClick={() => onClose(id)}>
            X
          </button>
        </div>
      </Link>
      {loading ? (
        <h3>Cargando...</h3>
      ) : character.name ? (
        <>
          {/* Mostramos el nombre */}
          <h3>NOMBRE: {character.name} 🦸‍♂️</h3>
          {/* Mostramos el estado */}
          <h3>ESTADO: {character.status} ☠</h3>
          {/* Mostramos la especie */}
          <h3>ESPECIE: {character.species} 👽</h3>
          {/* Mostramos el género */}
          <h3>GÉNERO: {character.gender} 👫</h3>
          {/* Mostramos el nombre del origen */}
          <h3>ORIGEN: {character.origin?.name} 🌎</h3>
          {/* Mostramos la imagen */}
          <img className={styles.imgDt} src={character.image} alt="" />
        </>
      ) : null}
    </div>
  );
};

export default Detail;
