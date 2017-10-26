import express from 'express';
import bodyParser from 'body-parser';
import RecipeController from './controllers/recipe-controller';

const apiRouter = express.Router();
const app = express();
app.use(bodyParser.json());
app.use('api/v1', apiRouter);
const recipeController = new RecipeController(apiRouter);

const server = app.listen(8000, () => {
  // let serverAddress = server.address().address;
  // let host;
  // const port = server.address().port;
  // host = serverAddress;
  // serverAddress = (host === ':::' ? 'localhost' : host);

  console.log('Listening at localhost', 8000);
});
