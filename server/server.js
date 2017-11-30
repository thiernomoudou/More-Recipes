import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import routes from './routes';
import db from './database/models';
import middleware from './middleware';


const app = express();

const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.render('index'));

app.use(middleware.api);

app.use('/api/v1/users', routes.userRoutes);
app.use('/api/v1/recipes', routes.recipesRoutes);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
      console.log(process.env.NODE_ENV + '\n Listening on localhost port: 5000');
  }); 
}).catch(e => { console.log(e.message); });



//Swagger Docs
import swaggerTools from 'swagger-tools';
// swaggerRouter configuration
let options = {
	swaggerUi: '/swagger.json',
	// controllers: './controllers'
}

// // The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
// import swaggerDoc from '../../swagger.json';

// // Initialize the Swagger middleware
// swaggerTools.initializeMiddleware(swaggerDoc, (middleware)=>{
// 	// Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
// 	app.use(middleware.swaggerMetadata());
// 	 // Validate Swagger requests
// 	 app.use(middleware.swaggerValidator());
// 	 // Route validated requests to appropriate controller
//     app.use(middleware.swaggerRouter(options));
//     // Serve the Swagger documents and Swagger UI
//     app.use(middleware.swaggerUi());

//     // start the server
//     app.listen(port, () =>{
// 	  console.log(`Listening on port ${port}`);
// 	 });

//     });




export default app;
