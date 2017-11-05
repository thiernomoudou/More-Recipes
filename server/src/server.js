import express from 'express';
import bodyParser from 'body-parser';
import RecipeController from './controllers/recipe-controller';
import recipeService from './services/recipe-services';

const app = express();
const apiRouter = express.Router();
app.use(bodyParser.json());

app.use('/api', apiRouter);

const recipeController = new RecipeController(apiRouter);
const thirdRecipe = recipeService.addRecipe({'recipe': 'cassava'});

// app.get('/', (req, res) => {
//   res.send('hello world');
// });


const port = 8010;
app.listen(port, () =>{
  console.log(`Listening on port ${port}`);
});
