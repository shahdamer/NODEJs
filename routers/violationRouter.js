const express = require('express');
const violationController = require ("../controllers/violationController");
const router = express.Router();

const {verifyToken} = require ("../middlewear/auth")
const {verifyRoles} = require ("../middlewear/verifyRole")
router.use(verifyToken)

router.post('/violation',verifyRoles('Officer'),violationController.submitViolation);
router.get('/violation',verifyRoles('Driver'),violationController.viewViolation);
router.delete('/violation/:id',verifyRoles('Officer'),violationController.deleteViolation)

module.exports=router;