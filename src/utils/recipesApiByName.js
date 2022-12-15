require("dotenv").config();
const { API_KEY } = process.env;
const callApi = require("./api_client");

const recipesApiByName = async (/** @type {string} */ name) => {
    const recipesNames = await callApi(
        "complexSearch",
        `?apiKey=${API_KEY}`,
        "",
        "&addRecipeInformation=true&limit=100"
    );
    let result = recipesNames.results
        .filter((/** @type {{ title: string; }} */ recipe) => {
            return recipe.title.toLowerCase().includes(name.toLowerCase());
        })
        .map((/** @type {{ id: String; image: URL; title: String; diets: Array<String>; healthScore: Number; dishTypes: any; }} */ recipe) => {
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

module.exports = recipesApiByName;
