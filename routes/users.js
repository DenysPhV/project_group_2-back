const express = require('express');


const {SECRET_KEY} = process.env;
const router = express.Router();


router.post('/signup', async(req, res, next) => {
   
    
})


<<<<<<< Updated upstream
// login 

router.post("/login", async(req, res, next) => {
   
=======
router.post('/login', async (req, res, next) => {
  try {  
    const {error} = joiLoginSchema.validate(req.body); 
    if(error) {
        throw new BadRequest(error.message);
}
const {email, password} = req.body;
const user = await User.findOne({email});
if(!user){
    throw new Unauthorized("Email or password is wrong")
}
const passwordCompare = await bcrypt.compare(password, user.password);
if(!passwordCompare){
    throw new Unauthorized("Email or password is wrong")
}
    const {_id} = user;
    const payload = {id: _id};
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '2h'});
    await User.findByIdAndUpdate(_id, {token});
    res.json({
        token,
        user: {
         email}
    })

 } catch (error) {
    next(error);
}

>>>>>>> Stashed changes
});

module.exports = router;