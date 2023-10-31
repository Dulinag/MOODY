import express from 'express'
import SongsController from '../controller/songs.js'

const router = express.Router()

router.get('/',SongsController.getSongs );
router.post('/', SongsController.createSongs );
router.get('/:id',SongsController.getSongById );
router.put('/:id', SongsController.updateSongById );
router.delete('/:id',SongsController.deleteSongById );

export default router