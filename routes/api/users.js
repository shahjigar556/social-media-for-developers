const app = require("express");
const router = app.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { Users, validateUser } = require("../../models/Users");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route POST api/users
// @desc Register user
// @public

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    const message = error.details[0].message;
    return res.status(400).json({ error: message });
  }
  // see if  user exists
  const { name, email, password } = req.body;

  try {
    console.log(mongoose.connection.readyState);
    let user = await Users.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Username Already exists" });
    }

    const avatar = gravatar.url(
      email,
      {
        s: "200",
        r: "pg",
        d: "mm",
      },
      false
    );

    console.log(avatar);

    user = new Users({
      name,
      email,
      password,
      avatar,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, config.get("jwtKey"));

    res.json({ token });
  } catch (ex) {
    console.log(ex.message);
    return res.status(500).send("server error");
  }
});

module.exports = router;
