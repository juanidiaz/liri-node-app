# liri-node-app
> **Cretaed by:**     Juan I Diaz (jdi@idiaz.ca)

> **Date:**           January 2019

## DESCRIPTION
This project is a LIRI (Language Interpretation and Recognition Interface); a command line node app that takes in parameters and gives you back data.

## INSTRUCTIONS
- To run this project you first need to clone this repository and create a `.env` file with a valid client ID and client Scret keys from Spotify. For information how to get these keys visit <https://developer.spotify.com>.

1. Make sure you install all the NPM packages. To do this run:
   - `npm install`

2. Run the application file with the command:
   - `node liri.js [ACTION] ['ARGUMENT"]`

3. The valid arguments are:
   * `concert-this`
   * `spotify-this-song`
   * `movie-this`
   * `do-what-it-says`   

* **"concert-this"** will find the information of the upcoming concert and presentation(s) of the **artist(s)** or **band** you enter as the argument. The data returned will include: *artist(s)/band name, name of the venue, venue location* and *dates of the event*. For example:
    - `node liri.js concert-this Nickelback` or
    - `node liri.js concert-this 'Lady Gaga'` **Use quotes for names with multiple words*

* **"spotify-this-song"** will find the information of the **song title** you enter as the argument. The data returned will include: *artist(s)/band name, song title, a preview link of the song from Spotify* and *the album that the song is from.* For example:
    - `node liri.js spotify-this-song Chumbawamba` or
    - `node liri.js spotify-this-song 'La Bamba'` **Use quotes for names with multiple words*

* **movie-this** will find the information of the **movie** you enter as the argument. The data returned will include: *title of the movie, year the movie came out, IMDB rating of the movie, Rotten Tomatoes rating of the movie, country where the movie was produced, language of the movie, plot of the movie* and *actors in the movie.* For example:
    - `node liri.js movie-this Roma` or
    - `node liri.js movie-this 'The Theory of Everything'` **Use quotes for names with multiple words*

* **do-what-it-says** will take the text inside of `random.txt` and then use it to call one of LIRI's commands. Change the content of this file to perform any of the commands above. For example:
    - `node liri.js concert-this Nickelback` or
    - `node liri.js spotify-this-song Chumbawamba` or
    - `node liri.js movie-this Roma`

# SPECIAL 
## If you use `liriToFile.js` instead of `liri.js` with the arguments explained above, the output of each mode will ALSO be saved *(appended)* into a `log.txt` text file.


## SCREENSHOTS
![Welcome](./assets/images/rps_welcome.png)

![player1 screen](./assets/images/rps_player1.png)

![Welcome](./assets/images/rps_match.png)

![Welcome](./assets/images/rps_viewer.png)

## BUILDING TOOLS
- Javascript and node.js
- NPM packages:
    - AXIOS
    - dotenv
    - node-spotify-api

## QUESTIONS, COMMENTS AND CREDITS
- Concert info courtesy of [Bands In Town](https://www.bandsintown.com/).
- Song track info courtesy of [Spotify](https://www.spotify.com).
- Movie info courtesy of [IMDB](http://www.imdb.com).
- Feel free to contact the developer @ <jdi@idiaz.ca>!