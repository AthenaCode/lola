const Library = require('../models/LibraryModel');

class LibraryController {
  constructor() {
    this.library = {};
  }
  // findSongByNameandArtist
  // findSongsByArtist
  // findSongsByAlbum

  getAll(done) {
    done(null, this.library.songs);
  }

  createLibrary(user, done) {
    this.library = new Library({
      user: user,
      songs: []
    });
    this.library.save(err => {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  }

  findLibrary(user, done) {
    Library.findOne({ user }, (err, library) => {
      if (err) {
        done(err);
      } else {
        this.library = library;
        done(null, library);
      }
    });
  }

  addSong(newSong, done) {
    console.log('LIBRARY CONTROLLER - this.library before adding song:', this.library);
    let exists = false;
    for (let song of this.library.songs) {
      if (song.title === newSong.title) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      console.log(newSong.title, 'hasn\'t been added to the library yet');
      this.library.songs.push(newSong);
      this.library.save(err => {
        if (err) {
          done(err);
        } else {
          console.log('LIBRARY CONTROLLER - this.library after adding song:', this.library);
          done(false);
        }
      });
    } else { // song is already in library
      // 	should let the user know the song is already in the db!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      done(true);
    }
  }
}

module.exports = LibraryController;
