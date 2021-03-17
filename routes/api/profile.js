const app = require("express");
const router = app.Router();
const auth = require("../../middleware/auth");
const {
  Profile,
  validateProfile,
  validateExperience,
  validateEducation,
} = require("../../models/Profile");
const { Users } = require("../../models/Users");
const {Post}=require('../../models/Posts')

// @GET api/profile/me
// @desc  accesing the profile of the user
// @Private

router.get("/me", auth, async (req, res) => {
  // user is authenticated
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("users", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "No Profile Present" });
    }
    res.json(profile);
  } catch (ex) {
    console.log(ex.message);
    return res.status(500).send("server error");
  }
});

//   @POST api/profile
//   @desc creating or updating the profile
//   @Private

router.post("/", auth, async (req, res) => {
  //validate data
  // const { error } = validateProfile(req.body);
  // console.log(error);
  // if (error) {
  //   const message = error.details[0].message;
  //   return res.status(400).json(message);
  // }

  const {
    company,
    website,
    location,
    status,
    bio,
    githubusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
    skills,
  } = req.body;

  const ProfileFields = {};
  ProfileFields.user = req.user.id;
  if (company) ProfileFields.company = company;
  if (website) ProfileFields.website = website;
  if (location) ProfileFields.location = location;
  if (status) ProfileFields.status = status;
  if (bio) ProfileFields.bio = bio;
  if (githubusername) ProfileFields.githubusername = githubusername;

  // covert skills to array
  if (skills) {
    ProfileFields.skills = skills.split(",").map((skill) => skill.trim());
  }
  ProfileFields.social = {};
  if (youtube) ProfileFields.social.youtube = youtube;
  if (twitter) ProfileFields.social.twitter = twitter;
  if (facebook) ProfileFields.social.facebook = facebook;
  if (linkedin) ProfileFields.social.linkedin = linkedin;
  if (instagram) ProfileFields.social.instagram = instagram;


  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      // update the profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: ProfileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // create the profile
    profile = new Profile(ProfileFields);
    profile = await profile.save();

    return res.json(profile);
  } catch (ex) {
    console.log(ex.message);
    return res.status(500).send("Internal server error");
  }
});

//   @GET api/profile
//   @desc Getting all the profiles
//   @Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    if (!profiles) {
      return res.status(400).json({ msg: "No profiles available" });
    }
    res.json(profiles);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server error");
  }
});

//   @GET api/profile/user/:user_id
//   @desc Getting all the profiles
//   @Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const id = req.params.user_id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ msg: "No profile present" });
    }
    const profile = await Profile.findOne({ user: req.params.user_id });
    if (!profile) {
      return res.status(400).json({ msg: "No profile found" });
    }
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server error");
  }
});

//   @DELETE api/profile
//   @desc Deleting profile,user,post
//   @Private

router.delete("/", auth, async (req, res) => {
  try {
    const id = req.user.id;
    await Profile.findOneAndRemove({ user: id });
    await Users.findOneAndRemove({ _id: id }); 
    await Post.deleteMany({user:req.user.id});
    res.json({ msg: "User deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server error");
  }
});

//   @PUT api/profile/experience
//   @desc Adding experience of the user
//   @Private

router.put("/experience", auth, async (req, res) => {
  const id = req.user.id;

  try {
    const profile = await Profile.findOne({ user: id });
    if (!profile) {
      return res.status(400).json({ msg: "First Complete the profile" });
    }
    // profile exists
    let { title, company, from, to, current, location, description } = req.body;

    // converting current to boolean
    if (current === "true") current = true;
    else current = false;

    req.body.current = current;
    // validating the data
    // const { error } = validateExperience(req.body);
    // console.log(error);
    // if (error) {
    //   const message = error.details[0].message;
    //   return res.status(400).json({ error: message });
    // }

    const newExp = {
      title,
      company,
      from,
      to,
      current, 
      location,
      description,
    };

    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//   @DELETE api/profile/experience/:exp_id
//   @desc Deleting experience of the user
//   @Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "Please make a profile first" });
    }
    const exp_id = req.params.exp_id;
    if (!exp_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ msg: "No experience Found!" });
    }
    profile.experience = profile.experience.filter(
      (item) => item._id != exp_id
    );
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//   @PUT api/profile/education
//   @desc Adding education of the user
//   @Private

router.put("/education", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      // no profile
      return res.status(400).json({ msg: "First create a profile" });
    }
    req.body.current = req.body.current == "true" ? true : false;
    let {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    // const { error } = validateEducation(req.body);
    // if (error) {
    //   const message = error.details[0].message;
    //   return res.status(400).json({ error: message });
    // }

    // data is valid
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    profile.education.unshift(newEdu);
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("server error");
  }
});


//   @DELETE api/profile/education/:edu_id
//   @desc Deleting education of the user
//   @Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "Please make a profile first" });
    }
    const edu_id = req.params.edu_id;
    if (!edu_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ msg: "No education Found!" });
    }
    profile.education = profile.education.filter(
      (item) => item._id != edu_id
    );
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
