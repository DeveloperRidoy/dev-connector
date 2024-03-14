const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/user');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route     POST api/users
// @desc      Users route
// @access    Public

router.post('/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please enter a valid email address').isEmail(),
    check('password', 'please enter a password with 6 or more characters').isLength({min: 6})
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }    
    
    try {
      // extract info from req.body
      const { name, email, password } = req.body;

      // See if user exists
        let user = await User.findOne({ email })
        if (user) { return res.json([{ 'msg': 'user already exists' }]) }
    
      // Get user's gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d:'mm'
        })

      // create new user instance
        user = new User({
          name,
          email,
          avatar,
          password,
        });

      // Encript password
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);

      // Save user
        await user.save()

      // respond with an expirable json webtoken 
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        process.env.jwtSecret,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
        console.error(error.message)
       res.status(500).json({ msg: "server error" });
    }
    
  }
)


// @route     GET api/users
// @desc      Get all users
// @access    Public

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({msg: 'server error'})
  }
}) 
module.exports = router;         