import express from 'express';
import { register, authUser } from '../controllers/User';


const router = express.Router()

router.route('/').post(register)
router.route('/login').post(authUser)


export = router;
