// @ts-ignore
const { Diet } = require("../db");

/**
 * crea las dietas en la base de datos si no existe
 * @param {Array<String>} dietTypes tipos de dietas que acepta la api
 * @returns {Promise <string[]>} 
 */
const createDiets = async (dietTypes) => {
    dietTypes.forEach(async ( /** @type {String} */ diet) => {
        await Diet.findOrCreate({
            where: {
                name: diet,
            },
        });
    });

    let result = await Diet.findAll();
    return result;
};

module.exports = createDiets;
