// @ts-nocheck
require("dotenv").config();
const { API_KEY } = process.env;
const callApi = require("./api_client");

/**
 * 
 * @returns {Promise Object }
 */
const recipesByApi = async () => {
    let data = await callApi(
        "complexSearch",
        `?apiKey=${API_KEY}`,
        "",
        "&addRecipeInformation=true&number=100"
    );

    /**
     * @type {Array}
     */
    let result = data.results.map((/** @type {{ id: Number; image: URL; title: String; diets: Array<String>; healthScore: Number; dishTypes: Array<String>; }} */ recipe) => {
        return {
            id: recipe.id,
            image: recipe.image,
            name: recipe.title,
            dietTypes: recipe.diets,
            healthScore: recipe.healthScore,
            dishTypes: recipe.dishTypes,
        };
    });
    return result;
};

module.exports = recipesByApi;
