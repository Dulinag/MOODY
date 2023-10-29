import express from 'express';

import ArtistsController from '../controller/artists.js'

const router = express.Router()

router.get('/',ArtistsController.getArtists);
router.get('/:id', ArtistsController.getArtistById);
router.post('/', ArtistsController.createArtist);
router.put('/:id',ArtistsController.updateArtistsById );
router.delete('/:id',ArtistsController.deleteArtistsById );

export default router;