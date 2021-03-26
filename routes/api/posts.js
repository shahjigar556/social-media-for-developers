const app=require('express')
const router=app.Router();
const {Post}=require('../../models/Posts');
const {Users}=require('../../models/Users');
const auth=require('../../middleware/auth');

// @POST api/posts
// @desc  Post an Post
// @Private

router.post('/',auth,async (req,res)=>{
    try {
        const user=await Users.findById(req.user.id).select('-password');
        let newPost=new Post({
            user:req.user.id,
            text:req.body.text,
            name:user.name,
            avatar:user.avatar
        })

        newPost=await newPost.save();
        console.log(newPost);
        res.json(newPost);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

//GET api/posts
//DESC Get all routes
//Private

router.get('/',auth,async (req,res)=>{
    try {
        const posts=await Post.find().sort({Date:-1}); // sort in descending order
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})

//  GET api/posts/:post_id
//  DESC Get posts by Post id
//  Private

router.get('/:post_id',auth,async(req,res)=>{
    try {
        if(!req.params.post_id.match(/^[0-9a-fA-F]{24}$/)){
           return res.status(400).json({msg:"Post Not found"});
        }
        let post=await Post.findById(req.params.post_id);
        if(!post){
            return res.status(400).json({msg:"Post Not found"});
        }
      res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

// DELETE api/posts/:post_id
// DESC Delete a post by post_id
// Private

router.delete('/:post_id',auth,async (req,res)=>{
 try {
     const post=await Post.findById(req.params.post_id);
     if(post.user!=req.user.id){
         return res.status(400).json({msg:"Not authorized"});
     }
     // post is of the user
     await Post.findByIdAndDelete(req.params.post_id);
     res.json({msg:"Post deleted"});
     
 } catch (err) {
     console.error(err.message);
     res.status(500).send("server error");
 }
})

//@PUT api/posts/like/:post_id
//@DESC Adding Like to a Post
//Private

router.put('/like/:post_id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.post_id);
        if(!post)
           return res.status(400).json({msg:"No post found"});
        
        // if user has already has liked the post dont count
        if((post.likes.filter(like=>like.user==req.user.id)).length>0){
            return res.status(400).json({msg:"Post Already Liked"});
        }

        // post is not liked
        post.likes.unshift({user:req.user.id});
        await post.save();
        res.json(post.likes); 

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
})
//@PUT api/posts/dislike/:post_id
//@DESC Removing Like to a Post
//Private

router.put('/dislike/:post_id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.post_id);
        if(!post)
           return res.status(400).json({masg:"No such Post found"});
        // check if the user can dislike
        if((post.likes.filter(like=>like.user==req.user.id)).length==0)
            return res.status(400).json({msg:"First Like the post"});
        post.likes=post.likes.filter(like=>like.user!=req.user.id);
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

//@PUT api/posts/comments/:post_id
//@DESC Adding a comment to The database
//Private
router.put('/comments/:post_id',auth,async (req,res)=>{
    try {
        if(!req.params.post_id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({msg:"Post Not found"});
         }
        const post=await Post.findById(req.params.post_id);
        if(!post)
            return res.status(400).json({msg:"No such post found"});

        // post found
        const user=await Users.findById(req.user.id);
        const newComment={
            user:req.user.id,
            name:user.name,
            avatar:user.avatar,
            text:req.body.text
        }
        post.comments.unshift(newComment); 
        console.log(post.comments);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

//@DELETE api/posts/delete_comments/:post_id
//@DESC Deleting a comment to The database
//Private
router.delete('/delete_comments/:post_id/:comment_id',auth,async (req,res)=>{
try {
      
       if(!req.params.post_id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).json({msg:"Post Not found"});
     }
     const post=await Post.findById(req.params.post_id);
     if(!post)
         return res.status(400).json({msg:"No such Post found"});
     
     if(!req.params.comment_id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({msg:"Comment Not found"});
     }
     if((post.comments.filter(comment=>comment._id==req.params.comment_id).length)==0){
         return res.status(400).json({msg:"Comment Not found"});
     }
   
     //comment exists
     const [comment]=post.comments.filter(c=>c.id==req.params.comment_id);
   
     if(comment.user!=req.user.id)
         return res.status(401).json({msg:"cannot delete someone else comment"});

    post.comments=post.comments.filter(c=>c._id!=req.params.comment_id);
    await post.save();
    res.json(post.comments);
} catch (err) {
    console.error(err.message)
    res.status(500).send("Internal server error");
}
})


module.exports=router;
