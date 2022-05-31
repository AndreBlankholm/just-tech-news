const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Comment extends Model {}


Comment.init(
  { 
      
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
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
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);
  








  module.exports = Comment;