import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { addFav, removeFav } from "../../redux/action";
import styles from "./Card.module.css";

function Card(props) {
  // Desestructuramos las propiedades recibidas
  const { id, name, image, onClose, status, species, gender, origin } = props;
  // Obtener la ubicación actual
  const location = useLocation();
  // Definimos los estados iniciales

  const [isFav, setIsFav] = useState(false);

  // Manejador del evento de favorito
  const handleFavorite = () => {
    console.log("handleFavorite ejecutado, isFav:", isFav);
    if (isFav) {
      setIsFav(false);
      props.removeFav(id);
    } else {
      setIsFav(true);
      // Solo enviamos los datos necesarios para la API
      const characterData = {
        id,
        name,
        status,
        species,
        gender,
        origin,
        image,
      };
      console.log("Datos del personaje a enviar:", characterData);
      props.addFav(characterData);
    }
  };

  // Comprobamos si el personaje actual es un favorito
  useEffect(() => {
    const isFavorite = props.myFavorites.some((fav) => fav.id === id);
    setIsFav(isFavorite);
  }, [props.myFavorites, id]);

  return (
    <div className={styles.containerC}>
      <button className={styles.button2C} onClick={handleFavorite}></button>

      {/* Botón de cerrar solo se muestra si no estamos en la ruta de "favorites" */}
      {!location.pathname.includes("/favorites") && (
        <div className={styles.divButtonC}>
          <button className={styles.button1C} onClick={() => onClose(id)}>
            X
          </button>
        </div>
      )}
      <h3>ID: {id}</h3>
      <h3>Nombre: {name} 🦸‍♂️</h3>

      {/* Enlace a la página de detalle */}
      <Link to={`/detail/${id}`}>
        <img className={styles.imgC} src={image} alt="" />
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  myFavorites: state.myFavorites,
});

const mapDispatchToProps = (dispatch) => ({
  addFav: (character) => dispatch(addFav(character)),
  removeFav: (id) => dispatch(removeFav(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);

/*-  mapStateToProps  es una función que mapea el estado global de Redux a las propiedades del componente  Card . En este caso, estamos obteniendo la lista de favoritos del estado y asignándola a la propiedad  myFavorites . 
-  mapDispatchToProps  es una función que mapea las acciones de Redux a las propiedades del componente  Card . Aquí estamos asignando las acciones  addFav  y  removeFav  a las propiedades  addFav  y  removeFav , respectivamente. 
- Utilizamos la función  connect  de  react-redux  para conectar el componente  Card  con el estado global de Redux y las acciones. Esto permite que el componente acceda al estado y las acciones a través de sus propiedades. */
