const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  film: {
    type: String,
    required: true,
  },
  music_director: {
    type: String,
  },
  singer: {
    type: String,
  },
});

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
