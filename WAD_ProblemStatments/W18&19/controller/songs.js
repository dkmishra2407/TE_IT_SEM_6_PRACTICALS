const song = require('../models/song.js');

module.exports.getallsongs = async (req, res) => {
    try{
        const songs = await song.find();

        if(songs.length === 0){
            const songi = [
                {
                  name: 'Tum Hi Ho',
                  film: 'Aashiqui 2',
                  music_director: 'Mithoon',
                  singer: 'Arijit Singh'
                },
                {
                  name: 'Kesariya',
                  film: 'Brahmastra',
                  music_director: 'Pritam',
                  singer: 'Arijit Singh'
                },
                {
                  name: 'Channa Mereya',
                  film: 'Ae Dil Hai Mushkil',
                  music_director: 'Pritam',
                  singer: 'Arijit Singh'
                },
                {
                  name: 'Agar Tum Saath Ho',
                  film: 'Tamasha',
                  music_director: 'A.R. Rahman',
                  singer: 'Alka Yagnik'
                },
                {
                  name: 'Jhoome Jo Pathaan',
                  film: 'Pathaan',
                  music_director: 'Vishal-Shekhar',
                  singer: 'Arijit Singh'
                }
              ];

              await song.insertMany(songi);
        }
        const songs1 = await song.find();
        res.status(200).json({
            message: "All songs fetched successfully",
            data: songs1
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

module.exports.addsong = async (req, res) => {
    try{
        const {name,film,music_director,singer} = req.body;
        if(!name || !film || !music_director || !singer){
            return res.status(400).json({
                message: "Please provide all the fields"
            })
        }

        const songExists = await song.findOne({name});
        
        if(songExists){
            return res.status(400).json({
                message: "Song already exists"
            })
        }

        const new_song = new song({
            name,
            film,
            music_director,
            singer
        });
        await new_song.save();
        res.status(201).json({
            message: "Song added successfully",
            data: new_song
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

module.exports.getasongbydirector = async (req, res) => {
    try{
        const {music_director} = req.params;
        const songs = await song.find({music_director:music_director});
        if(songs.length === 0){
            return res.status(404).json({
                message: "No songs found"
            })
        }
        res.status(200).json({
            message: "Songs fetched successfully",
            data: songs
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

module.exports.deletesong = async (req, res) => {
    try{
        const name = req.params;
        const song = await song.findOneAndDelete({name:name});
        if(!song){
            return res.status(404).json({
                message: "Song not found"
            })
        }
        res.status(200).json({
            message: "Song deleted successfully",
            data: song
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

