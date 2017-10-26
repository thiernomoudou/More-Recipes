import resource from 'resource-router-middleware';
import recipes from '../models/recipes';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'recipe',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let recipe = recipes.find( recipe => recipe.id===id ),
			err = recipe ? null : 'Not found';
		callback(err, recipe);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		res.json(recipes);
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		body.id = recipes.length.toString(36);
		recipes.push(body);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	read({ recipe }, res) {
		res.json(recipe);
	},

	/** PUT /:id - Update a given entity */
	update({ recipe, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				recipe[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ recipe }, res) {
		recipes.splice(recipes.indexOf(recipe), 1);
		res.sendStatus(204);
	}
});
