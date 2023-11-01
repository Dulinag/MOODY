import express from 'express'
import GenresController from '../controller/genres.js'

const router = express.Router()

router.get('/',GenresController.getGenres );
router.get('/:genre_id',GenresController.getGenreById );
router.post('/', GenresController.createGenres );
router.put('/:genre_id', GenresController.updateGenreById );
router.delete('/:genre_id', GenresController.deleteGenreById );

export default router