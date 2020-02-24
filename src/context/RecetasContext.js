import React, {createContext, useState, useEffect} from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

  const [recetas, guardarRecetas] = useState([]);
  const [busqueda, buscarRecetas] = useState({
    nombre: '',
    categoria: ''
  });

  const [consultar, guardarConsultar] = useState(false);
  const {nombre, categoria} = busqueda;

  useEffect( () => {
    if (consultar) {
      const obtenerRecetas = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

        const recetas = await axios.get(url);
        guardarRecetas(recetas.data.drinks);
      };
      obtenerRecetas();
    }
  }, [busqueda, consultar, nombre, categoria]);

  return (
    <RecetasContext.Provider
      value={{
        recetas,
        buscarRecetas,
        guardarConsultar
      }}
    >
      {props.children}
    </RecetasContext.Provider>
  )
};

RecetasProvider.propTypes = {
  props: PropTypes.object
};

export default RecetasProvider;