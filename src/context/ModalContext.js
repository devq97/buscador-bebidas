import React, {createContext, useState, useEffect} from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

export const ModalContext = createContext();

const ModalProvider = (props) => {

  const [idReceta, guardarIdReceta] = useState(null);
  const [informacion, guardarReceta] = useState({});

  useEffect( () => {
    const obtenerDetalleReceta = async () => {
      if(!idReceta) return null;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

      const detalle = await axios.get(url);
      guardarReceta(detalle.data.drinks[0]);
    };
    obtenerDetalleReceta();
  }, [idReceta]);

  return (
    <ModalContext.Provider
      value={{
        informacion,
        guardarIdReceta,
        guardarReceta
      }}
    >
      {props.children}
    </ModalContext.Provider>
  )
};

ModalProvider.propTypes = {
  props: PropTypes.object
};

export default ModalProvider;