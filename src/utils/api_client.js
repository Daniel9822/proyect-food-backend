// @ts-nocheck
const axios = require("axios");

// https://api.spoonacular.com/recipes/{id}/information

const URL = "https://api.spoonacular.com/recipes/";

/**
 * 
 * @param {string} [path]    
 * @param {string|number} api Api-key para la autentificacion
 * @param {string} [query] para hacer alguna busqueda especifica Ej: buscar por name
 * @param {string} info para buscar alguna receta en especifico por ejemplo por name
 * @returns { Promise Array } 
 */
const callApi = async (path, api, query = "", info = '') => {
    console.log(`${URL}${path}${query}${api}${info}`);
    const res = await axios.get(`${URL}${path}${query}${api}${info}`);
    return res.data;
};

module.exports = callApi;
