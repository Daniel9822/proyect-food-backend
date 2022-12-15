const { UUIDV4 } = require("sequelize");
const DataType = require("sequelize");

module.exports = (
    /** @type {{ define: (arg0: string, arg1: { id: { type: DataType.IntegerDataTypeConstructor; autoIncrement: boolean; primaryKey: boolean; }; name: { type: DataType.StringDataTypeConstructor; allowNull: boolean; }; }) => void; }} */ sequelize
) => {
    sequelize.define("diet", {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
        },
    });
};
