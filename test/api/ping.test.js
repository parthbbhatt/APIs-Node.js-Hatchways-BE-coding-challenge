const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

chai.should();
chai.use(chaiHttp);

describe('Ping API', () => {
    it('Return a JSON', (done) => {
        chai.request(app)
            .get('/api/ping')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                
                const mock = {
                    'success': true
                };

                res.body.should.be.eql(mock);
                done();
            });
    });
});
