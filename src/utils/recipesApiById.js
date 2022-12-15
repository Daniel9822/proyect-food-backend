require("dotenv").config();
const { API_KEY } = process.env;
const callApi = require("./api_client");

/**
 * Busca una receta por id y devuelve la receta encontrada
 * @param {string} id id de una receta en particular   
 * @returns {Promise <Object>}
 */
const recipesApiById = async (/** @type {string} */ id) => {
    let recipeId = await callApi(id, `?apiKey=${API_KEY}`, "/information/");
    return recipeId
};

module.exports = recipesApiById
