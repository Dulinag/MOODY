import express from 'express'
import PlaylistsController from '../controller/playlists.js'

const router = express.Router()

router.get('/',PlaylistsController.getPlaylists );
  
export default router