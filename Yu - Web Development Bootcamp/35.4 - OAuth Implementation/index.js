import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

env.config();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  host: process.env.CLIENT_HOST,
  user: process.env.CLIENT_USER,
  password: process.env.CLIENT_PASSWORD,
  database: process.env.CLIENT_DATABASE,
  port: process.env.CLIENT_PORT
});
db.connect();

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.get('/logout', (req, res) => {
  req.logout(err => {
    err ? console.log(err) : res.redirect('/');
  });
});

app.get('/secrets', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('secrets.ejs');
  } else {
    res.redirect('/login');
  }
});

app.get('/auth/google',
  passport.authenticate('google', {
  scope: ['profile', 'email']
  }
));

app.get('/auth/google/secrets',
  passport.authenticate('google', {
    successRedirect: '/secrets',
    failureRedirect: '/login'
  })
);

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/secrets',
    failureRedirect: '/login',
  })
);

app.post('/register', async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query('SELECT * FROM users WHERE email = $1',
    [email]
    );

    if (checkResult.rows.length > 0) {
      req.redirect('/login');
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
        } else {
          const result = await db.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log('success');
            res.redirect('/secrets');
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

passport.use(
  'local',
  new Strategy(
    async function verify(username, password, cb) {
      try {
        const result = await db.query('SELECT * FROM users WHERE email = ($1) ',
        [username]
        );

        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              console.error('Error comparing passwords:', err);
              return cb(err);
            } else {
              if (valid) {
                return cb(null, user);
              } else {
                return cb(null, false);
              };
            };
          });
        } else {
          return cb('User not found');
        };
      } catch (err) {
        console.log(err);
      };
  })
);

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/secrets',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const result = await db.query('SELECT * FROM users WHERE email = ($1)',
        [profile.email]
        );
        if (result.rows.length == 0) {
          const newUser = await db.query('INSERT INTO users (email, password) VALUES ($1, $2);',
          [profile.email, 'Google Sign-In']
          );
          cb(null, newUser.rows[0]);
        } else {
          cb(null, result.rows[0]);
        };
      } catch (err) {
        cb(err);
      };
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
