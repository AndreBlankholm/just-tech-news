const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Post extends Model {}


// create fields/columns for Post model
Post.init(
    {

      id: {
        type: DataTypes.INTEGER,  //primary key
        allowNull: false,
        primaryKey: true,
        autoIncrement: true   
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      post_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true   // verifiying and validating a link
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {    //using the reference property we establish a relationdship between the Post and the User:id by creating a reference to 'user'  (MODEL)
          model: 'user',
          key: 'id'  // this will be the defined as the foreign key
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }

  );




  module.exports = Post;