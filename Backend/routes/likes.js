import express from 'express'
import LikesController from '../controller/likes.js'

const router = express.Router()

router.get('/',LikesController.getLikes );
router.post('/',LikesController.createLikes );
router.delete('/:likes_id',LikesController.deleteLikeById );
  
export default router