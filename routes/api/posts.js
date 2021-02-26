const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/user')
const Post = require('../../models/post')
const profile = require('../../models/profile');
const user = require("../../models/user");
 
// @route     POST api/posts
// @desc      Create a post
// @access    Private

router.post("/", [auth, [
    check('title', 'title is required').not().isEmpty(),
    check('text', 'text is required').not().isEmpty(),  
]], async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) };

        try {
            const user = await User.findById(req.user.id).select("-password");
            const post = new Post({
                text: req.body.text,
                title: req.body.title,
                username: user.name,
                avatar: user.avatar,
                user: req.user.id
            })
            await post.save();
            res.json(post);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: "server error" });
        }
});


// @route     GET api/posts
// @desc      Get all posts
// @access    Private

router.get('/', auth,  async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1});
        if(!posts) return res.status(400).json({msg: 'Post not found'})
        res.json(posts);
    } catch (error) {
        if (error.kind === 'ObjectId') { return res.status(400).json({ msg: 'Post not found' }) };
        console.error(error.message);
        res.status(500).json({ msg: "server error" });
    }
})


// @route     GET api/posts/me
// @desc      Get logged in user's posts
// @access    Private

router.get('/me', auth, async (req, res) => {
    try {
        const posts = await Post.find({user: req.user.id}).sort({date: -1});
        if(!posts) return res.status(400).json({msg: 'Post not found'})
        res.json(posts);
    } catch (error) {
        if (error.kind === 'ObjectId') { return res.status(400).json({ msg: 'Post not found' }) };
        console.error(error.message);
        res.status(500).json({ msg: "server error" });
    }
})

// @route    GET api/posts/post/:postID
// @desc     Get post by postID
// @access   Private

router.get('/post/:postID', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postID);
        if (!post) return res.status(400).json({ msg: 'post not found' });
        res.json(post);
    } catch (error) {
        console.error(error.message);
        if (error.kind = 'ObjectId') { return res.status(400).json({ msg: 'no post found' }) };
        res.status(500).json({ msg: 'server error' });
    }
})

// @route     GET api/posts/:userID
// @desc      Get posts by userID
// @access    Private

router.get('/:userID', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userID);
        if(!user) return res.status(400).json({msg: "user doesn't exists"})
        const posts = await Post.find({ user: user.id }).sort({ date: -1 });
        if(!posts) return res.status(400).json({msg: 'Post not found'})
        res.json(posts);
    } catch (error) {
        if (error.kind === 'ObjectId') { return res.status(400).json({ msg: 'Post not found' }) };
        console.error(error.message);
        res.status(500).json({ msg: "server error" });
    }
})


// @route     DELETE api/posts/:postID
// @desc      Delete a post
// @access    Private

router.delete('/:postID', auth, async (req, res) => {
    try {
        // find the post
        const post = await Post.findById(req.params.postID);
        if (!post) return res.status(400).json({ msg: 'Post not found' });

        // check if user owns the post
        if (post.user.toString() === req.user.id) {
            post.remove();
            return res.json({ msg: "Post deleted" });    
            
        } else { return res.status(400).json({ msg: 'User not authorized' }) };

    } catch (error) {
        if (error.kind === 'ObjectId') { return res.status(400).json({ msg: 'Post not found' }) };
        console.error(error.message);
       res.status(500).json({msg: 'server error'})
    }
})


// @route     PUT api/posts/like/:postID
// @desc      Like a post
// @access    Private

router.put('/like/:postID', auth, async (req, res) => {
    try {
        // find the post
        const post = await Post.findById(req.params.postID);
        if (!post) return res.status(400).json({ msg: 'Post not found' });

        // check if user already liked the post
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'already liked the post' });
        }

        // add like
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes)
    } catch (error) {
        if (error.kind === 'ObjectId') { return res.status(400).json({ msg: 'Post not found' }) };
        console.error(error.message);
       res.status(500).json({msg: 'server error'})
    }
})


// @route     PUT api/posts/unlike/:postID
// @desc      Unike a post
// @access    Private

router.put('/unlike/:postID', auth, async (req, res) => {
    try {
        // find the post
        const post = await Post.findById(req.params.postID);
        if (!post) return res.status(400).json({ msg: 'Post not found' });

        // disable unlike if user didn't like the post in the first place
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: "Post has not yet been liked" });
        }

        // find index of the lke to delete
        const deleteIndex = post.likes.findIndex(like => like.user.toString() === req.user.id);

        // unlike post
        post.likes.splice(deleteIndex, 1);
        await post.save();
        res.json(post.likes)

    } catch (error) {
        if (error.kind === 'ObjectId') { return res.status(400).json({ msg: 'Post not found' }) };
        console.error(error.message);
       res.status(500).json({msg: 'server error'})
    }
})
 
// @route     PUT api/posts/comment/:postID
// @desc      Add comment on a post
// @access    Private

router.post('/comment/:postID', [auth, [
    check('text', 'text is required').not().isEmpty(),
    check('username', 'username is required').not().isEmpty(),
    check('avatar', 'avatar is required ').not().isEmpty()
]], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) };
    try {
        // find the post
        const post = await Post.findById(req.params.postID);
        if (!post) return res.status(400).json({ msg: 'Post not found' });
        
        // add comment
        const newComment = {
            user: req.user.id, 
            text: req.body.text,
            username: req.body.username,
            avatar: req.body.avatar
        }
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);

    } catch (error) {
        if (error.kind === 'ObjectId') { return res.status(400).json({ msg: 'Post not found' }) };
        console.error(error.message);
       res.status(500).json({msg: 'server error'})
    }
})

// @route     put api/posts/comment/:postID/:commentID
// @desc      Update a comment on a post
// @access    Private

router.put('/comment/:postID/:commentID', auth, async (req, res) => {
    try {
        // find the post
        const post = await Post.findById(req.params.postID);
        if (!post) return res.status(400).json({ msg: 'Post not found' });

        // see if comment exists
        const comment = post.comments.find(comment => comment.id.toString() === req.params.commentID);
        if (!comment) return res.status(400).json({ msg: 'comment does not exist' });

        // see if user owns the comment 
        if (comment.user.toString() !== req.user.id) return res.status(401).json({ msg: 'user not authorized', commentUser: comment.user, reqUserID: req.user.id });

        // Update the comment
        const commentIndex = post.comments.findIndex(comment => comment.id.toString() === req.params.commentID);
        post.comments[commentIndex].text = req.body.text;
        post.comments[commentIndex].date = Date.now();
        await post.save();
        return res.json(post.comments);

    } catch (error) {
        if (error.kind === 'ObjectId') { return res.status(400).json({ msg: 'Resource not found' }) };
        console.error(error.message);
       res.status(500).json({msg: 'server error'})
    }
})


// @route     DELETE api/posts/comment/:postID/:commentID
// @desc      Delete a comment on a post
// @access    Private
 
router.delete('/comment/:postID/:commentID', auth, async (req, res) => {
    try {
        // find the post
        const post = await Post.findById(req.params.postID);
        if (!post) return res.status(400).json({ msg: 'Post not found' });

        // see if comment exists
        const comment = post.comments.find(comment => comment.id.toString() === req.params.commentID);
        if (!comment) return res.status(400).json({ msg: 'comment does not exist' });

        // see if user owns the comment 
        if (comment.user.toString() !== req.user.id) return res.status(401).json({ msg: 'user not authorized', commentUser: comment.user, reqUserID: req.user.id });

        // delete the comment
        const deleteIndex = post.comments.findIndex(comment => comment.id.toString() === req.params.commentID);
        post.comments.splice(deleteIndex, 1);
        await post.save();
        return res.json(post.comments);

    } catch (error) {
        if (error.kind === 'ObjectId') { return res.status(400).json({ msg: 'Resource not found' }) };
        console.error(error.message);
       res.status(500).json({msg: 'server error'})
    }
})
  

module.exports = router;