import React, {createContext, useState, useEffect} from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

// Creación de context
export const CategoriasContext = createContext();

// Provides es donde se encuentran las funciones y state
const CategoriasProvider = (props) => {
  // Crear el state del context
  const [categorias, guardarCategorias] = useState([]);

  useEffect( () => {
    const obtenerCategorias = async () => {
     const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

     const categorias = await axios.get(url);
     guardarCategorias(categorias.data.drinks);
    };
  obtenerCategorias();
  }, []);

  return (
   <CategoriasContext.Provider
     value={{
       categorias
     }}
   >
     {props.children}
   </CategoriasContext.Provider>
  )
};

CategoriasProvider.propTypes = {
  props: PropTypes.object
};

export default CategoriasProvider;
