const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vote extends Model {}

Vote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // What needs to go here?
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {            //using the reference property we establish a relationdship between the Post and the User:id by creating a reference to 'user'  (MODEL)
          model: 'user',
          key: 'id'            // this will be the defined as the foreign key
        }
      },

      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {            //using the reference property we establish a relationdship between the Post and the User:id by creating a reference to 'user'  (MODEL)
          model: 'post',
          key: 'id'            // this will be the defined as the foreign key
        }
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'vote'
  }
);

module.exports = Vote;