const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route     GET api/auth
// @desc      Check if user exists. return user info as json if exists.
// @access    Private

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id }, { password: 0 })
        res.json({user})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({msg: 'server error'})
    }
});

// @route     POST api/auth
// @desc      User login authentication.return jwt token on successful login
// @access    Private

router.post('/', [
    check('email', 'please enter a valid email address').isEmail(),
    check('password', 'password required').exists()
], async (req, res) => {
        const isError = validationResult(req)
        if (!isError.isEmpty()) { return res.status(400).json({errors: isError.array()}) }  
        
        // extract information from req.border
        const { email, password } = req.body
        
        try {
            // check if user with the provide email exists or not
            const user = await User.findOne({ email })
            if (!user) { return res.status(400).json({ msg: 'invalid credentials' }) }
        
            // check if password matches
            const passwordMatched = await bcrypt.compare(password, user.password)
            if (!passwordMatched) { res.status(400).json({ msg: 'invalid credentials' }) }
            
            // return token on successful authentication 
            const payload = {
                user: {
                    id: user.id
                }
            }
            
            jwt.sign(
              payload,
              process.env.jwtSecret,
              { expiresIn: 360000 },
              (err, token) => {
                if (err) throw err;
                res.json({ msg: "login successful", token, user });
              }
            );
        } catch (error) {
            console.log(error.message)
            res.status(500).json({msg: 'server error'})
        }
})

   

module.exports = router;
