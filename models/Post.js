const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Post extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
            'vote_count'
          ]
        ]
      });
    });
  }
}

// create fields/columns for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,     //primary key
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
        isURL: true           // verifiying and validating a link
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {            //using the reference property we establish a relationdship between the Post and the User:id by creating a reference to 'user'  (MODEL)
        model: 'user',
        key: 'id'            // this will be the defined as the foreign key
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,     //naming covention (ie) 'post_url'
    modelName: 'post'
  }
);





module.exports = Post;
