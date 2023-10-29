import express from 'express'
import cors from "cors";
import jwt from 'jsonwebtoken';
// import userRoute from './routes/users';
import artistRouter from './routes/artists.js'
import songsRouter from './routes/songs.js'
// import commentRoute from './routes/comments';
// import genreRoute from './routes/genres';
// import songRoute from './routes/songs';
// import likeRoute from './routes/likes';


// const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET; // Load access token secret from environment variables

// const verifyToken = (req, res, next) => {
//   const token = req.headers['authorization']; // Get the token from the Authorization header

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

// // Verify the token
//   try {
//     const decodedToken = jwt.verify(token, accessTokenSecret);
//     req.user = decodedToken; // Attach the decoded token to the request object

//     next(); // Continue to the next middleware function
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

const app = express();
app.use(express.json())
app.use(cors());


// app.use('/users', userRoute)
// app.use('/comments', commentRoute)


// app.use('/genres', genreRoute)
// app.use('/likes', likeRoute)

// app.use('/songs', songRoute)
// app.use(verifyToken);



app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ Wohooo</h1>')
})

//middleware

//Routes
app.use('/artists', artistRouter)
app.use('/songs', songsRouter)
//genre get

//user get

//song routes

//artists

//likes

app.listen(5000, () =>{
    console.log(" 🚀 Server has started on port 5000")
});