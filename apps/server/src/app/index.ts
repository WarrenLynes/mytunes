import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import errorMiddleware from './middleware/error.middleware';
const fetch = require('node-fetch');
const request = require('request');
const querystring = require('querystring');
const path = require('path');
const cors = require('cors');

function randomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default class App {
  public app: express.Application;
  private stateKey = 'spotify_auth_key';

  constructor() {
    this.app = express();

    this.initializeMiddleWares();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`bounce-api - ${process.env.PORT}`);
    });

    //OAUTH REDIRECT
    this.app.get('/login', function(req, res) {
      const state = randomString(16);

      res.cookie(process.env.SPOTIFY_STATE_KEY, state);

      res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: process.env.SPOTIFY_CLIENT_ID,
          scope: process.env.SPOTIFY_CLIENT_SCOPES,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
          state: state,
          show_dialog: true
      }));
    });

    //OAUTH REDIRECT CALLBACK
    //EXCHANGE CODE FOR TOKEN
    this.app.get('/auth-granted', (req, res) => {
      const code = req.query.code;
      const state = req.query.state || null;
      const storedState = req.cookies ? req.cookies[process.env.SPOTIFY_STATE_KEY] : null;

      if (state === null || state !== storedState) {
        res.redirect('/#' +
          querystring.stringify({
            error: 'state_mismatch'
          }));
      } else {
        res.clearCookie(process.env.SPOTIFY_STATE_KEY);
        const authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          form: {
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            grant_type: 'authorization_code'
          },
          headers: {
            'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
          },
          json: true
        };

        request.post(authOptions, function(error, response, body) {
          if (!error && response.statusCode === 200) {

            const access_token = body.access_token,
              refresh_token = body.refresh_token;

            const options = {
              url: 'https://api.spotify.com/v1/me',
              headers: { 'Authorization': 'Bearer ' + access_token },
              json: true
            };

            // use the access token to access the Spotify Web API
            request.get(options, function(geterror, getresponse, getbody) {
              console.log(getbody);
            });

            // we can also pass the token to the browser to make requests from there
            res.redirect('/#' +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token
              }));
          } else {
            res.redirect('/#' +
              querystring.stringify({
                error: 'invalid_token'
              }));
          }
        });
      }
    });

    this.app.get('/api/me/tracks', (req: any, res: any, next: any) => {
      const options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': req.headers['authorization'] },
        json: true
      };

      request.get(options, (error, response, body) => {
        req.user = body;
        next();
      });
    }, async(req:any, res:any, next:any) => {
      const access_token = req.headers['authorization'];
      const options = {
        method: 'get',
        headers: { 'Authorization': access_token },
        json: true
      };
      const result = await fetch('https://api.spotify.com/v1/me/tracks?limit=50', options).then((x) => x.json());

      res.send(result);
    });

    this.app.get('/api/me/playlists', async (req: any, res: any, next: any) => {
      const access_token = req.headers['authorization'];
      const user = await fetch('https://api.spotify.com/v1/me', {
        method: 'get',
        headers: { 'Authorization': req.headers['authorization'] },
        json: true
      }).then((x) => x.json());

      console.log(user.id);
      const playlists = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`,{
        method: 'get',
        headers: { 'Authorization': access_token },
        json: true
      }).then(x => x.json());


      res.json(playlists.items);
    });

    this.app.get('/api/me/playlists/:id/tracks', (req: any, res: any, next: any) => {
      const options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': req.headers['authorization'] },
        json: true
      };

      request.get(options, (error, response, body) => {
        req.user = body;
        next();
      });
    }, (req: any, res: any, next) => {
      const access_token = req.headers['authorization'];
      const options = {
        url: `https://api.spotify.com/v1/users/${req.user.id}/playlists/${req.params.id}/tracks`,
        headers: { 'Authorization': access_token },
        json: true
      };

      request.get(options, (error, response, body) => {
        res.send(body.items);
      });
    });

    this.app.use(express.static(path.join(__dirname, '../../../dist/apps/dashboard')));
    this.app.use('/*', express.static(path.join(__dirname, '../../../dist/apps/dashboard/index.html')))
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddleWares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use('/', morgan('dev'));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}
