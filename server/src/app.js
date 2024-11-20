import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import connectPgSimple from 'connect-pg-simple';
import './config/passport.js';
import authRoute from './features/auth/authRoutes.js';
import listRoute from './features/list/listRoutes.js';
import contactUsRoute from './features/contactUs/contactUsRoutes.js';
import isAuthenticated from './middlewares/authMiddleware.js';
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';
import userRoute from './features/user/userRoutes.js';
import questionRoute from './features/questions/questionRoutes.js';

const PgSession = connectPgSimple(session);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: 'http://localhost:5173', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);

// Configure session middleware
app.use(
  session({
    store: new PgSession({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour
      secure: false, // making this true ensures setting cookies in HTTPS only.
      // rolling: true, // reset the sid on every request
    },
  }),
);

// Initialize passport and session handling
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    req.session.lastActivity = Date.now();
    req.session.cookie.maxAge = 60 * 60 * 1000;
  }
  next();
});

app.use(loggerMiddleware);

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/list', isAuthenticated, listRoute);
app.use('/contact-us', contactUsRoute);
app.use('/question', questionRoute);

app.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'This is a protected route.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
