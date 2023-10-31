import express from 'express'
import CommentsController from '../controller/comments.js'

const router = express.Router()

router.post('/', CommentsController.createCommentForUser);
router.put('/:comment_id', CommentsController.updateComment );
router.get('/:comment_id', CommentsController.getCommentById );
router.delete('/:comment_id', CommentsController.deleteCommentById);
  
export default router