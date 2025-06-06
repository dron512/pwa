const { User, Post, Hashtag } = require('../models');

exports.getPosts = async(req,res,next)=>{
  try{
    const posts = await Post.findAll({
      include:{
        model:User,
        attributes:['id','nick']
      },
      order:[['createdAt','DESC']]
    })
    res.json(posts);
  }catch(error){
    console.error(error);
    res.json({message:"게시글 조회 실패"});
  }
}

exports.afterUploadImage = (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
};

exports.uploadPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          });
        })
      );
      await post.addHashtags(result.map((r) => r[0]));
    }
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
