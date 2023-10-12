const express = require("express");
const app = express();
const cors = require("cors"); // Import the cors package

const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET; // Load access token secret from environment variables




const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  try {
    const decodedToken = jwt.verify(token, accessTokenSecret);
    req.user = decodedToken; // Attach the decoded token to the request object

    next(); // Continue to the next middleware function
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

app.use(cors());


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
app.use(verifyToken);





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