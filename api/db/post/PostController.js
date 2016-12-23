const models = require('../../config/db.connect.js');

module.exports = {
  getAllPosts: (req, res, next) => {
    models.Post.findAll({})
    .then(posts => res.json(posts))
    .catch(err => {
      res.json(err);
      throw err;  
    });
  },
  getOnePost: (req, res, next) => {
    models.Post.find({
      where: {
        id: req.params.postId
      }
    })
    .then(post => res.json(post))
    .catch(err => {
      res.json(err);
      throw err;
    });
  },
  getPostsByUser: (req, res, next) => {
    models.Post.findAll({
      where: { userId: req.params.userId }
    })
    .then(posts => {
      if (!Array.isArray(posts)) posts = [posts];
      res.json(posts);
    })
    .catch(err => {
      res.json(err);
      throw err;
    })
  },
  getPostsByTag: (req, res, next) => {
    models.Post.findAll({
      include: [{ 
        model: Tag,
        where: { tagId: req.params.tagId }
      }],
    })
    .then(posts => {
      if (!Array.isArray(posts)) posts = [posts];
      res.json(posts);      
    })
    .catch(err => {
      res.json(err);
      throw err;
    })
  },
  createPost: (req, res, next) => {
    let tempTag = [];
    models.Tag.findOrCreate({
      where: {
        name: req.body.tag
      },
      defaults: {
        name: req.body.tag
      }
    })
    .then(result => {
      tempTag = tempTag.push(result[0]);
      return models.Post.create({
        content: req.body.content,
        description: req.body.description,
        format: req.body.format,
        private: req.body.private,
        UserId: req.body.userId
      })
    })
    .then(result => {
      return result.addTag(tempTag);
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
      throw err;
    })
  },
  updatePost: (req, res, next) => {
    models.Post.findOne({
      where: { id: req.params.postId}
    })
    .then(post => {
      if (!post) res.json('post not found');
      else {
        post.content = req.body.content,
        post.description = req.body.description,
        post.format = req.body.format,
        post.private = req.body.private,
        post.UserId = req.body.userId        
      }
      return post.save();
    })
    .then(post => res.json(post))
    .catch(err => {
      res.json(err);
      throw err;
    });
  },
  respondToPost: (req, res, next) => {
    models.User_Emoji_Post.create({
      UserId: req.body.userId,
      EmojiId: req.body.emojiId,
      PostId: req.body.postId
    })
    .then(emoji => res.json(emoji))
    .catch(err => {
      res.json(err);
      throw err;
    })
  }
}
