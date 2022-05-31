// import all models
const Post = require('./Post');
const User = require('./User');
const Vote = require('./Vote');

//CREATE ASSOCIATIONS HERE:

User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
 
});


//______________________________Now we need to associate User and Post to one another in a way that when we query Post, we can see a total of how many votes a user creates; 
User.belongsToMany(Post, {  
  through: Vote,    // We state that we want the foreign key to be in VOTE
  as: 'voted_posts',  // and that the name of the VOTE Model should be "voted_posts" when queried on"
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});


module.exports = { User, Post, Vote };
