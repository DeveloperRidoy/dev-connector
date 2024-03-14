const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const axios = require('axios');
const Profile = require('../../models/profile');
const Post = require('../../models/post');
// const User = require('../../models/user');
const { check, validationResult } = require('express-validator');
const User = require('../../models/user');

// @route     GET api/profile/me
// @desc      Get current user's data
// @access    Private

router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
        if (!profile) { return res.status(400).json({ msg: 'there is no profile for this user' }) }
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({msg: 'server error'})
    }
});

// @route     POST api/profile
// @desc      Create or update profile
// @access    Private

router.post('/', [
    auth, [
        check('status', 'statuc required').exists(),
        check('skills', 'skills required').exists()
    ]
], async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }
        
        // extract info from body
        const {
            company, website, location, bio, status, gitusername, skills, youtube, facebook, twitter, linkedin, instagram
        } = req.body

        // build profile object
        const profileFields = {};
        profileFields.user = req.user.id

        if (company) { profileFields.company = company };
        if (website) { profileFields.website = website };     
        if (location) { profileFields.location = location };
        if (bio) { profileFields.bio = bio };
        if (gitusername) { profileFields.gitusername = gitusername };
        if (status) { profileFields.status = status };
        if (skills) { profileFields.skills = skills.split(',').map(skill => skill.trim()) };

        // build social object
        profileFields.social = {}; 

        if (facebook) { profileFields.social.facebook = facebook };
        if (youtube) { profileFields.social.youtube = youtube };
        if (twitter) { profileFields.social.twitter = twitter };
        if (linkedin) { profileFields.social.linkedin = linkedin };
        if (instagram) { profileFields.social.instagram = instagram };
         
        // add or update profile
        try {
            await Profile.updateOne(
                { user: req.user.id },
                { $set: profileFields },
                { upsert: true }
            )
            const profile = await Profile.findOne({ user: req.user.id });
            return res.json(profile);

        } catch (error) {
            console.error(error.message);
            res.status(500).json({msg: 'server error'})
        }

})


// @route     GET api/profile
// @desc      Get all profiles
// @access    Public

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        return res.json(profiles)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:'server error'})
    }
})

// @route     GET api/profile/user/:userID
// @desc      Get profile by userID
// @access    Public

router.get('/user/:userID', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.userID }).populate('user', ['name', 'avatar'])
        
        if (!profile) return res.status(400).json({ msg: 'there is no profile for this user' })
        
        return res.json(profile)
    } catch (err) {
        console.error('error kind:',err.kind, 'error message:', err.message);
        if (err.kind === 'ObjectId') return res.status(400).json({ msg: 'there is no profile for this user' })
        res.status(500).json({msg:'server error'})
    }
})

// @route     DELETE api/profile
// @desc      Delete profile, user and posts
// @access    Private

router.delete('/', auth, async (req, res) => {
    try {
        //remove user's post
        await Post.deleteMany({user: req.user.id})
        // Delete profile
        await Profile.findOneAndDelete({ user: req.user.id })
        
        // Delete user
        await User.findOneAndDelete({ _id: req.user.id })
        
        return res.json({msg: 'user deleted'})
    } catch (err) {
        console.error('error kind:',err.kind, 'error message:', err.message);
        res.status(500).json({msg:'server error'})
    }
})      


// @route     PUT api/profile/experience
// @desc      Add profile experience
// @access    Private

router.put('/experience', [auth, [
    check('title', 'title is required').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty(),
]], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        // extract info from req.body
        const { title, company, location, from, to, current, description } = req.body
        
        const newExp = { title, company, location, from, to, current, description };

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            if (!profile) return res.status(400).json({ msg: 'no profile for this user' });
            profile.experience.unshift(newExp)

            await profile.save();
            res.json(profile)
        } catch (error) {
            console.error(error.message);
            res.status(500).json({msg: 'server error'})
        }
})
// @route     DELETE api/profile/experience/exp_ID
// @desc      Delete profile experience
// @access    Private

router.put('/experience/:exp_ID', auth, async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            if (!profile) return res.status(400).json({ msg: 'no profile for this user' });
            
            // Get index of experience to delete
            const removeIndex = profile.experience.map(exp => exp.id).indexOf(req.params.exp_ID);

            // remove the experience
            profile.experience.splice(removeIndex, 1);

            // save the updated experience
            await profile.save();

            res.json(profile)
        } catch (error) {
            console.error(error.message);
            res.status(500).json({msg: 'server error'})
        }
})
// @route     PUT api/profile/education
// @desc      Add profile education
// @access    Private

router.put('/education', [auth, [
    check('school', 'school is required').not().isEmpty(),
    check('degree', 'degree is required').not().isEmpty(),
    check('fieldOfStudy', 'fieldOfStudy is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty(),
]], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        // extract info from req.body
        const { school, degree, fieldOfStudy, from, to, current, description } = req.body
        
        const newEdu = { school, degree, fieldOfStudy, from, to, current, description };

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            if (!profile) return res.status(400).json({ msg: 'no profile for this user' });
            profile.education.unshift(newEdu)

            await profile.save();
            res.json(profile)
        } catch (error) {
            console.error(error.message);
            res.status(500).json({msg: 'server error'})
        }
})
// @route     DELETE api/profile/education/edu_ID
// @desc      Delete profile education
// @access    Private

router.put('/education/:edu_ID', auth, async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            if (!profile) return res.status(400).json({ msg: 'no profile for this user' });
            
            // Get index of experience to delete
            const removeIndex = profile.education.map(edu => edu.id).indexOf(req.params.edu_ID);

            // remove the experience
            profile.education.splice(removeIndex, 1);

            // save the updated experience
            await profile.save();

            res.json(profile)
        } catch (error) {
            console.error(error.message);
            res.status(500).json({msg: 'server error'})
        }
})

// @route     GET api/profile/github/:username
// @desc      Get user repos from Github
// @access    Public

router.get('/github/:username', async (req, res) => {
    try {
        const url = `https://api.github.com/users/${req.params.username}/repos`;
        const options = {
          headers: {
            "user-agent": "node.js",
          },
          params: {
            per_page: 5,
            sort: "created:asc",
            client_id: process.env.githubClientId,
            client_secret: process.env.githubClientSecret,
          },
        };
        const response = await axios.get(url, options);
        const repos = response.data
        res.json(repos)
    } catch (error) {
        if (error.message === "Request failed with status code 404") {
          return res.status(404).json({ msg: `No github user with tha name of ${req.params.username}` });
        };
        res.status(500).json({msg: 'server error'})
    }
})
module.exports = router;



