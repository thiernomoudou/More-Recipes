import express from 'express';
import bodyParser from 'body-parser';
import RecipeController from './controllers/recipe-controller';
import recipeService from './services/recipe-services';

const app = express();
const apiRouter = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', apiRouter);

const recipeController = new RecipeController(apiRouter);
const thirdRecipe = recipeService.addRecipe({'recipe': 'cassava'});
const fouthRecipe = recipeService.addRecipe({recipe: 'milk'});

app.get('/', (req, res) => {
  res.send('Welcome to recipe api');
});


const port = 8010;
app.listen(port, () =>{
  console.log(`Listening on port ${port}`);
});

export {app, recipeController};
