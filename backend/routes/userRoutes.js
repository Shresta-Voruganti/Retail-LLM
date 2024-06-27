import express from "express";
import { createUser, loginUser, logOutCurrentUser , getAllUsers,getCurrentUserProfile,updateCurentUserProfile,deleteUserById,getUserById,updateUserById } from "../controllers/userController.js";
import  {authenticate, authorizeAdmin} from '../middlewares/authMiddleware.js';





const router=express.Router();

router.route('/').post(createUser).get(authenticate,authorizeAdmin, getAllUsers);

router.post("/auth",loginUser)
router.post('/logout', logOutCurrentUser)


router.route('/profile').get(authenticate,getCurrentUserProfile).put(authenticate,updateCurentUserProfile);


//admin route
router.route('/:id').delete(authenticate,authorizeAdmin,deleteUserById).get(authenticate,authorizeAdmin,getUserById).put(authenticate,authorizeAdmin,updateUserById)
export default router;