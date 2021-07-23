require("./db/connection");
const yargs = require("yargs");
const command = process.argv[2];
const user = yargs.argv.user;
const pass = yargs.argv.pass;
const email = yargs.argv.email;
const title = yargs.argv.title;
const actor = yargs.argv.actor;
const {addUser, addMovie, planToWatch, watchList, movieWatched, remove} = require("./utils/index")

const app = () => {
    if (command === 'add user') {
        addUser(user, pass, email);
    } else if (command === 'add movie') {
        addMovie(title, genre, actor);
    } else if (command === 'planToWatch'){
        planToWatch(title, user, pass);
    } else if (command === 'watchList') {
        watchList(user, pass);
    } else if(command === 'movieWatched'){
        movieWatched(user, pass, title);
    } else if (command === 'remove') {
        remove(user, pass, title);
    } else {
        console.log("You have not selected a valid command. To add a user, 'add user' --user --pass; to include a new movie to the movie database, 'add movie' --title --genre --actor.")
        console.log("To add a movie to your plan to watch list, 'planToWatch' --title --user -- pass")
        console.log("To check your watchlist, 'watchList' --user --pass")
        console.log("To update a movie in your plan-to-watch list, 'movieWatched' --user --pass --title")
        console.log("To remove a movie from your plan-to-watch list, 'remove' --user --pass --title")
    }
}

app();