// @ts-ignore
const { Recipe, Diet } = require("../db");
const recipesByApi = require("../utils/recipesByApi");
const recipesApiByName = require("../utils/recipesApiByName");
const recipesApiById = require("../utils/recipesApiById");
const { Op } = require("sequelize");

const getRecipes = async (
    /** @type {any} */ req,
    /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: any[]): void; new (): any; }; }; }} */ res
) => {
    try {
        let result = await recipesByApi();
        let db = await Recipe.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return db
            ? res.status(200).json([...db, ...result])
            : res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            // @ts-ignore
            message: 'Error al recibir las recetas'
        });
    }
};

const recipeByName = async (
    /** @type {{ query: { name: String; }; }} */ req,
    /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: any; }): void; new (): any; }; }; }} */ res
) => {
    const { name } = req.query;

    try {
        const recipes = await recipesApiByName(name);
        const recipesDB = await Recipe.findAll({
            where: {
                name: { [Op.iLike]: `%${name}%` } 
            }
        })
        if (!recipes.length) {
            throw new Error(
                `No se encontraron recetas con el nombre de ${name}`
            );
        } else {
            console.log(recipes)
            res.status(200).json([...recipesDB ,...recipes]);
        }
    } catch (error) {
        res.status(404).json({
            error: error.message,
        });
    }
};

const getRecipeById = async (
    /** @type {{ params: { id: string; }; }} */ req,
    /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: any; }): void; new (): any; }; }; }} */ res
) => {
    const { id } = req.params;

    try {
        if (
            /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/.test(
                id
            )
        ) {
            let findDb = await Recipe.findByPk(id, {
                include: {
                    model: Diet,
                    atributes: ["name"],
                    through: {
                        attributes: [] //comprobacion que se hace (mediante los atributos)
                    }
                },
            });
            return res.status(200).json(findDb);
        }
        const recipeById = await recipesApiById(id);
        if (!recipeById)
            throw new Error(`No existe ninguna receta con el id ${id}`);
        return res.status(200).json(recipeById);
    } catch (error) {
        res.status(404).json({
            error: error.message,
        });
    }
};

const postRecipes = async (
    /** @type {{ body: { name: String; summary: Text; stepByStep: String; healthScore: Number; dietTypes: Array; image: URL; }; }} */ req,
    /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: any; }): void; new (): any; }; }; json: (arg0: { message: string; }) => any; }} */ res
) => {
    const { name, summary, instructions, healthScore, dietTypes, image } =
        req.body;

    try {
        if (!name || !summary || !dietTypes || !image)
            throw new Error("Faltan campos requeridos");
        const [result, create] = await Recipe.findOrCreate({
            where: {
                name: name[0].toUpperCase() + name.substring(1),
                summary,
                image,
                instructions,
                healthScore,
                dietTypes,
            },
        });
        if (create) {
            let dietTypesDb = await Diet.findAll({
                where: { name: dietTypes },
            });
            result.addDiet(dietTypesDb);
            return res.status(200).json(result);
        }
        return res.json({
            message: `Ya existe la receta ${name}`,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};


module.exports = {
    getRecipes,
    recipeByName,
    getRecipeById,
    postRecipes,
};
