const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


router.get('/', (req, res) => {
    Post.findAll({
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => { //render homepage template
        // pass a single post object into the homepage template
        console.log(dbPostData[0]);  // console log so we can see it in command line (bash)
        const posts = dbPostData.map(post => post.get({ plain: true }));  // this will loop over each Sequelize object into a serialized version of itself/(the one we constructed) saving and posting a new (post) array.
        res.render('homepage', {posts});
      })
      .catch(err => {
        console.log(err);
        console.log('problem with the .then(dbPostData) in home-routes.js')
        res.status(500).json(err);
      });
  });


  module.exports = router;