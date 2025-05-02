const router = require('express').Router();
const songscontroller = require('../controller/songs.js')
// Get all songs
router.get('/all',songscontroller.getallsongs);
// router.get('/all/:id',songscontroller.getallsongsbyid);
router.post('/add',songscontroller.addsong);
router.get('/bydirector/:music_director',songscontroller.getasongbydirector);
module.exports = router;
