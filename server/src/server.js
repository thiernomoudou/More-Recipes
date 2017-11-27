import express from 'express';
import bodyParser from 'body-parser';
import RecipeController from './controllers/recipe-controller';
import recipeService from './services/recipe-services';

const app = express();
const port = process.env.PORT || 5000;
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



//Swagger Docs
import swaggerTools from 'swagger-tools';
// swaggerRouter configuration
let options = {
	swaggerUi: '/swagger.json',
	// controllers: './controllers'
}

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
import swaggerDoc from '../../swagger.json';

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, (middleware)=>{
	// Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
	app.use(middleware.swaggerMetadata());
	 // Validate Swagger requests
	 app.use(middleware.swaggerValidator());
	 // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));
    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

    // start the server
    app.listen(port, () =>{
	  console.log(`Listening on port ${port}`);
	 });

    });





export {app, recipeController};
