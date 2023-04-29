// const { validation } = require('../../middlewear/validation');
// const authValidation = require('./auth.validation');
const authController = require('../controllers/authController');
const router = require('express').Router();
const {verifyToken} = require ("../middlewear/auth")

router.get('/',(req,res)=>{
  res.json({message: "auth module"});
})

router.get('/signin',authController.signin);
router.use(verifyToken)
router.post('/logout',authController.logout);
router.put('/password',authController.updatePassword)
 
module.exports=router;