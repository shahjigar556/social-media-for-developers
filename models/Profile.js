const mongoose=require('mongoose');
const Joi=require('joi');
const ProfileSchema=mongoose.Schema({
  user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
  },  // linking the user data in profile
  company:{
      type:String
  },
  website:{
      type:String
  },
  location:{
      type:String
  },
  status:{
      type:String,
      required:true
  },
  skills:{
      type:[String],  // array of Strings for skills
      required:true,
  },
  bio:{
      type:String
  },
  githubusername:{
     type:String
  },
  experience:[
      {
          title:{
              type:String,
              required:true
          },
          company:{
              type:String,
              required:true,
          },
          location:{
              type:String
          },
          from:{
              type:String,
              required:true
          },
          to:{
              type:String,
          },
          current:{
              type:Boolean,
              default:false
          },
          description:{
              type:String
          }
      }
  ],
  education:[
      {
          school:{
              type:String,
              required:true
          },
          degree:{
              type:String
          },
          fieldofstudy: {
            type: String,
            required: true
          },
          from: {
            type: String,
            required: true
          },
          to: {
            type: String
          },
          current: {
            type: Boolean,
            default: false
          },
          description: {
            type: String
          }
      }
  ],
  social:{
      youtube:{
          type:String
      },
      twitter: {
        type: String
      },
      facebook: {
        type: String
      },
      linkedin: {
        type: String
      },
      instagram: {
        type: String
      }
  },
  date:{
      type:Date,
      default:Date.now
  }

})

function validateProfile(user){
    const schema=Joi.object({
        skills:Joi.string().required(),
        status:Joi.string().required(),
        company:Joi.string(),
        location:Joi.string(),
        website:Joi.string(),
        bio:Joi.string(),
        githubusername:Joi.string(),
        youtube:Joi.string(),
        twitter:Joi.string(),
        facebook:Joi.string(),
        linkedin:Joi.string(),
        instagram:Joi.string(),
    })
    return schema.validate(user);
}

function validateExperience(exp){
  
    const schema=Joi.object({
        title:Joi.string().required(),
        company:Joi.string().required(),
        from :Joi.string().required(),
        to:Joi.string(),
        current:Joi.boolean(),
        location:Joi.string(),
        description:Joi.string()
    })
    console.log(schema.validate(exp))
    return schema.validate(exp)
}

function validateEducation(edu){
    const schema=Joi.object({
        school:Joi.string().required(),
        degree:Joi.string(),
        fieldofstudy:Joi.string().required(),
        from:Joi.string().required(),
        to:Joi.string(),
        current:Joi.boolean(),
        description:Joi.string(),
    })
    return schema.validate(edu)
}
const Profile=mongoose.model('profile',ProfileSchema);

module.exports.Profile=Profile;
module.exports.validateProfile=validateProfile;
module.exports.validateExperience=validateExperience;
module.exports.validateEducation=validateEducation;