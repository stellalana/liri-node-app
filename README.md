# liri-node-app
## Liri Bot

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

Technologies and libraries include - Spotify, Bands In Town, and OMDB APIs, moment, javascript, json, node, an ignore file, and use of local environments for security.

Available commands users can enter:
1) concert-this
2) spotify-this-song
3) movie-this
4) do-what-it-says

### Concerts
concert-this allows users to enter the name of an artist and return up to 5 upcoming venues the artist will be playing and the concert dates.
![concert command image](/liriPics/concert-this band.png?raw=true)

### Spotify
spotify-this-song allows users to enter the name of a song and return the artists, song name, link to song, and album.

### Movies
movie-this allows users to enter the name of a movie and return release year, ratings, production countries, languages, plot, and actors.

### Random
do-what-it-says showcases an ability to read commands from a text file and use it with a command. For the purposes of this project it will return the results for spotify-this-song, song name: "I Want it That Way." One can easily update the file random.txt to set this command to another task and submission.

## How To Run on Your Machine
1) Clone repository
2) Install npm packages according to the included json
3) Request your own Spotify API ID and Key here: https://developer.spotify.com/dashboard/login
4) Once you have acquired your Spotify ID and Key, create a file named ".env" in the folder. In this file add these lines:

  SPOTIFY_ID="your id here"

  SPOTIFY_SECRET="your key here"

