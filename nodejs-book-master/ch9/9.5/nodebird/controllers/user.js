const User = require("../models/user");

exports.follow = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      // req.user.id가 followerId, req.params.id가 followingId
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.followingDisconnect = async (req, res, next) => {
  console.log("req");
  console.log(req.user);
  const user = await User.findOne({
    where: { id: req.user.id },
    include: [
      {
        model: User,
        attributes: ["id", "nick"],
        as: "Followers",
      },
      {
        model: User,
        attributes: ["id", "nick"],
        as: "Followings",
      },
    ],
  });
  if (user) {
    console.log("user.Follwings")
    console.log(user.Followings);

    user.removeFollowing(req.params.id);
    
  }
  res.send("no user" + req.params.id);
};
