import chaiHttp from 'chai-http';
import chai from 'chai';
import {app} from '../src/server';
import recipeController from '../src/server';

let assert = chai.assert;
let should = chai.should();

chai.use(chaiHttp);



describe('/recipes', () => {
	  describe('recipes GET endpoints', () => {
        it('it should return a list of all recipes', (done) => {
			chai.request(app)
		    .get('/api/recipes')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
		      done();
		    });
	  });
	  });

	  describe('recipes POST enpoints', () => {
      it('it should POST a recipe', (done) => {
        let recipe = {
            'title': 'Post test',
            'id': '5'
        }
        chai.request(app)
            .post('/api/recipes')
            .send(recipe)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
              done();
            });
      });

  });
});








// import pkg from '../package.json';

// import * as src from '../src/test-example';

// describe(pkg.name, function() {
//   it('loads without crashing', () => {
//     assert.equal(src.helloWorld(), "Hi");
//     assert.equal(src.obj.a, "1");
//   });
  
// });
