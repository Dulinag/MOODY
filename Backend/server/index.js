const express = require("express");
const app = express();

const userRoute = require('./routes/users')
const artistRoute = require('./routes/artists')
const commentRoute = require('./routes/comments')
const genreRoute = require('./routes/genres')
const songRoute = require('./routes/songs')
const likeRoute = require('./routes/likes')


app.use('/users', userRoute)
app.use('/comments', commentRoute)

app.use('/artists', artistRoute)
app.use('/genres', genreRoute)
app.use('/likes', likeRoute)

app.use('/songs', songRoute)





//middlewear




//Routes//

//genre get


//user get

 

  //song routes


//artists

//likes




app.listen(5000, () =>{

    console.log("Server has started on port 5000")
});