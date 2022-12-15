const createDiets = require("../utils/createDiet");
/**
 * @type {Array<String>}
 */
const dietTypes = [
    "gluten free",
    "ketogenic",
    "vegetarian",
    "lacto vegetarian",
    "ovo vegetarian",
    "lacto ovo vegetarian",
    "vegan",
    "pescetarian",
    "paleolithic",
    "primal",
    "low fodmap",
    "whole 30",
    "dairy free",
];

const getDiets = async (/** @type {any} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: string[] | {error: Error}): void; new (): any; }; }; }} */ res) => {
    try {
        let create = await createDiets(dietTypes);
        res.status(200).json(create);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
};

module.exports = getDiets;
