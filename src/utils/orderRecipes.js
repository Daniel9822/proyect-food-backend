const orderRecipe = (recipes, order) => {
    if (order === "DESC") {
        let orderDesc = recipes.sort((a, b) => {
            if (a.name > b.name) {
                return -1;
            }
            if (a.name < b.name) {
                return 1;
            }
            return 0;
        });
        return orderDesc;
    }
    if (order === "ASC") {
        let orderAsc = recipes.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });
        return orderAsc;
    }
};

module.exports = orderRecipe;
