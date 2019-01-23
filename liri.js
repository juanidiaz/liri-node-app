////// INCLUDING PACKAGES //////

// Include the axios npm package
var axios = require("axios");

// require("dotenv").config();


////// VARIABLES //////

//      CONSTANTS


//      ARRAYS


//      STRINGS/CHAR
var action = process.argv[2]; // Action requested by used
var argument = process.argv[3]; // Argument provided to process the user request

//      NUMBER/INTEGER


//      BOOLEAN


//      OBJECTS
//var spotify = new Spotify(keys.spotify); // Spotify key

///////////////// SPOTIFY /////////////////
// Client ID:     7c03e03564d04d528e06456c6b6c5137
// Client Secret: 


//////////////////////////////


// Get concert infomration on an artist/band name here
function getConcertInfo() {

    var dateFormat = require('dateformat');

    if (!argument) { // If there is no movie provided default into 'Mr. Nobody'
        argument = 'The Who';
    };

    // Replace spaces for ASCI equivalent '%20'
    argument = argument.replace(' ', '%20').toLowerCase();

    //console.log(argument);

    // Build the query URL based on the title provided
    var queryUrl = 'https://rest.bandsintown.com/artists/' + argument + '/events?app_id=codingbootcamp';

    // Run a request with axios to the OMDB API
    axios.get(queryUrl).then(
        function (response) {

            //console.log(queryUrl);

            console.log('');
            console.log('----------------------------------------');
            console.log('-             CONCERT INFO             -');
            console.log('----------------------------------------');

            for (const key in response.data) {
                console.log(' (' + (parseInt(key) + 1) + ')');
                console.log(response.data[key].venue.name);
                console.log(response.data[key].venue.city + ', ' + response.data[0].venue.region + ' (' + response.data[0].venue.country + ')');
                console.log(dateFormat(response.data[key].datetime, "mm/dd/yyyy"));
                console.log('----------------------------------------');
            }
        }
    );
};

// Get the movie info of a movie
function getMovieInfo() {

    if (!argument) { // If there is no movie provided default into 'Mr. Nobody'
        argument = 'Mr. Nobody';
    };

    // Replace spaces for ASCI equivalent '%20'
    argument = argument.replace(' ', '%20').toLowerCase();

    //console.log(argument);

    // Build the query URL based on the title provided
    var queryUrl = 'http://www.omdbapi.com/?t=' + argument + '&y=&plot=short&apikey=trilogy';

    // Run a request with axios to the OMDB API
    axios.get(queryUrl).then(
        function (response) {
            // Clear the console
            console.log('\033[2J');

            console.log(queryUrl);

            // Log all the info
            console.log('');
            console.log('----------------------');
            console.log('-     MOVIE INFO     -');
            console.log('----------------------');
            console.log('Title:                 ' + response.data.Title);
            console.log('Release Year:          ' + response.data.Year);

            // Confirm if the movie has IMDB rating
            if (response.data.Ratings[0].Source === 'Internet Movie Database') {
                console.log('IMDB rating:           ' + response.data.Ratings[0].Value);
            };

            // Confirm if the movie has Rotten Tomatoes rating
            if (response.data.Ratings[1].Source === 'Rotten Tomatoes') {
                console.log('Roten Tomatoes rating: ' + response.data.Ratings[1].Value);
            };

            console.log('Country:               ' + response.data.Country);
            console.log('Language:              ' + response.data.Language);
            console.log('Plot:                  ' + response.data.Plot);
            console.log('Actors:                ' + response.data.Actors);
        }
    );
};

// First step is to define what is the user request
switch (action) {
    // concert-this '<artist/band name here>'
    case 'concert-this':
        getConcertInfo();
        break;

        // spotify-this-song '<song name here>'
    case 'spotify-this-song':

        break;

        // movie-this '<movie name here>'
    case 'movie-this':
        getMovieInfo();
        break;

        // do-what-it-says
    case 'do-what-it-says':

        break;

    default:
        console.log('You REALLY need to tell me what to do!')
        break;
};