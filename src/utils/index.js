const sql = require('../db/connection')

exports.addUser = (username, password, email) => {
    try {
        const user = {username: username,
                    email: email}
        const passInput = [password, username];
        sql.query("insert into users set ?; ", user)// insert into users set username = "username", pass = "password"
        sql.query("insert into passwords set pass = ?, userID = (select id from users where username = ?)", passInput)
    } catch (error) {
        console.log(error)
    }
}

exports.addMovie = async (title, genre, actor) =>{
    try {
        const movie = {
            title: title,
            genre: genre,
            actor: actor
        }
        await sql.query("insert into movies set ?", movie, (err, results) => {
            if (err) return console.error(err);
            console.log(results)
        })
    } catch (error) {
        console.log(error)
    }
}

exports.whatMovies = async () =>{
    try {
        sql.query("select * from movies")
    } catch (error) {
        console.log(error)
    }
}

exports.planToWatch = async (title, user, pass) =>{
    try {
        const entry = [title, user, pass];
        sql.query("insert into watchlist set movieID = (select id from movies where title = ?), userID = (select id from users inner join passwords on users.id = passwords.userID where users.username = ? AND passwords.pass = ?)", entry)
    } catch (error) {
        console.log(error)
    }
}

exports.watchList = async (username, password) =>{
    try {
        const user = [username, password];
        sql.query("select title, genre, actor, watched from watchlist inner join movies on watchlist.movieID = movies.id where userID = (select id from users inner join passwords on users.id = passwords.userID where users.username = ? AND passwords.pass = ?)", user, (err, results) => {
            if (err) return console.error(err);
            console.log(results)})
    } catch (error) {
        console.log(error)
    }
}

exports.movieWatched = (username, password, title) =>{
    try {
        const input = [username, password, title];
        sql.query("update watchlist set watched = 'true' where userID = (select id from users inner join passwords on users.id = passwords.userID where users.username = ? AND passwords.pass = ?) AND title = ?", input, (err,results) =>{
            if (err) return console.error(err);
            console.log(results)
        })
    } catch (error) {
        console.log(error)
    }
}

exports.remove = (username, password, title) => {
    try {
        const input = [username, password, title];
        sql.query("delete from watchlist where userID = (select id from users inner join passwords on users.id = passwords.userID where users.username = ? AND passwords.pass = ?) AND title = ?", input, (err, results)=>{
            if (err) return console.error(err);
            console.log(results)
        })
    } catch (error) {
        console.log(error)
    }
}