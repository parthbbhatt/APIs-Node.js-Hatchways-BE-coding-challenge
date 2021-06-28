const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Invalid API call', () => {
    it('Return status 404 error as resource not found', (done) => {
        chai.request(app)
            .get('/api/error')
            .end((err, res) => {
                res.statusCode.should.equal(404);
                done();
            });
    });
});
