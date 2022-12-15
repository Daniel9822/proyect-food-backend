const { Router } = require("express");
const getDiets = require("../controllers/Diet.controller");
const {
    getRecipes,
    recipeByName,
    getRecipeById,
    postRecipes,
} = require("../controllers/recipes.controller");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.get("/", getRecipes);
router.get("/recipes", recipeByName);
router.post("/recipes", postRecipes);
router.get("/diets", getDiets);
router.get("/recipes/:id", getRecipeById);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
