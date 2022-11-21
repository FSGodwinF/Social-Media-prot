const router = require("express").Router();
const Posts  = require("../models/Post");
const User  = require("../models/User");

//Create a post
router.post("/", async(req, res)=>{
    const newPost =  new Posts(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        return res.status(500).json(err);
    }
})
//update a post

router.put("/:id", async(req, res)=>{
    
    try{
        const post =  await Posts.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).send("The post has been updated")
        }else{
            res.status(403).json("You can only update your post")
        }
    }catch(err){
        res.status(500).json(err);
    }
    
});
//like and dislike a post
router.put("/:id/like", async(req, res)=>{
    try{
        const post =  await Posts.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("Liked")
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json("Disliked")
        }
    }catch(err){
        res.status(500).json(err); 
    }
    

})
//delete a post
router.delete("/:id", async(req, res)=>{
    
    try{
        const post =  await Posts.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).send("The post has been deleted")
        }else{
            res.status(403).json("You can only delete your post")
        }
    }catch(err){
        res.status(500).json(err);
    }
    
});
//get a post
router.get("/:id", async(req, res)=>{
    try{
        const post = await Posts.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})
//get timeline posts
router.get("/timeline/:userId", async(req, res)=>{
   
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Posts.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId)=>{
                return Posts.find({userId: friendId })
            })
        );
       res.status(200).json(userPosts.concat(...friendPosts))     
    }catch(err){
        res.status(500).json(err)
    }
});
// get all the posts of the user
router.get("/profile/:username", async(req, res)=>{
   
    try{
        const user = await User.findOne({username: req.params.username})
        const posts = await Posts.find({userId: user._id});
        res.status(200).json(posts);   
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
});


module.exports = router;