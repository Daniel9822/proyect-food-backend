const filterRecipes = (
    /** @type {any[]} */ recipes,
    /** @type {any} */ dietFilter
) => {
    let result = recipes.filter((rec) => {
        if (rec.dietTypes.includes(dietFilter)) {
            return true;
        }
    });

    return result;
};

module.exports = filterRecipes;
