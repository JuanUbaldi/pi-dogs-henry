const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Dog",
    {
      Id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },

      min_height: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
        },
      },
      max_height: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
        },
      },
      min_weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
        },
      },
      max_weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
        },
      },
      min_lifeSpan: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
        },
      },

      max_lifeSpan: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
        },
      },
      isCreated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },

    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
