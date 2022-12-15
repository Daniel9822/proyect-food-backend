const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (/** @type {{ define: (arg0: string, arg1: { id: { type: DataTypes.AbstractDataTypeConstructor; defaultValue: DataTypes.AbstractDataTypeConstructor; primaryKey: boolean; }; name: { type: DataTypes.StringDataTypeConstructor; allowNull: boolean; }; dietTypes: { type: DataTypes.ArrayDataType<DataTypes.StringDataTypeConstructor>; allowNull: boolean; }; summary: { type: DataTypes.TextDataTypeConstructor; allowNull: boolean; }; healthScore: { type: DataTypes.IntegerDataTypeConstructor; }; image: { type: DataTypes.StringDataTypeConstructor; allowNull: boolean; validate: { isUrl: boolean; }; }; stepByStep: { type: DataTypes.TextDataTypeConstructor; }; }) => void; }} */ sequelize) => {
    // defino el modelo
    sequelize.define("recipe", {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dietTypes: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        healthScore: {
            type: DataTypes.INTEGER,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },
        instructions: {
            type: DataTypes.TEXT,
        },
    });
};
