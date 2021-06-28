const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

chai.should();
chai.use(chaiHttp);

describe('Posts API with no tags query', () => {
    it('Return status 400 error', (done) => {
        chai.request(app)
            .get('/api/posts')
            .end((err, res) => {
                res.statusCode.should.equal(400);
                res.body.should.be.a('Object');

                const mock = { 'error': "Tags parameter is required" };

                res.body.should.be.eql(mock);
                done();
            });
    });
});


describe('Posts API with invalid sortBy query', () => {
    it('Return status 400 error for sortBy=error', (done) => {
        chai.request(app)
            .get('/api/posts?tags=tech&sortBy=error')
            .end((err, res) => {
                res.statusCode.should.equal(400);
                res.body.should.be.a('Object');

                const mock = { 'error': 'sortBy parameter is invalid' };

                res.body.should.be.eql(mock);
                done();
            });
    });
});


describe('Posts API with invalid direction query', () => {
    it('Return status 400 error for direction=error', (done) => {
        chai.request(app)
            .get('/api/posts?tags=tech&sortBy=likes&direction=error')
            .end((err, res) => {
                res.statusCode.should.equal(400);
                res.body.should.be.a('Object');

                const mock = { 'error': 'direction parameter is invalid' };

                res.body.should.be.eql(mock);
                done();
            });
    });
});


describe('Posts API with a single tag', () => {
    it('Return status 200 response and JSON object', (done) => {
        chai.request(app)
            .get('/api/posts?tags=tech')
            .end((err, res) => {
                res.statusCode.should.equal(200);
                res.body.should.be.a('Object');
                done();
            });
    });
});


describe('Posts API with a multiple tags', () => {
    it('Return status 200 response and JSON object', (done) => {
        chai.request(app)
            .get('/api/posts?tags=tech,health')
            .end((err, res) => {
                res.statusCode.should.equal(200);
                res.body.should.be.a('Object');
                done();
            });
    });
});


describe('Posts API to sortBy id', () => {
    it('Return status 200 response and JSON object', (done) => {
        chai.request(app)
            .get('/api/posts?tags=tech&sortBy=id')
            .end((err, res) => {
                res.statusCode.should.equal(200);
                res.body.should.be.a('Object');
                done();
            });
    });
});


describe('Posts API to sortBy reads', () => {
    it('Return status 200 response and JSON object', (done) => {
        chai.request(app)
            .get('/api/posts?tags=tech&sortBy=reads')
            .end((err, res) => {
                res.statusCode.should.equal(200);
                res.body.should.be.a('Object');
                done();
            });
    });
});


describe('Posts API to sortBy likes', () => {
    it('Return status 200 response and JSON object', (done) => {
        chai.request(app)
            .get('/api/posts?tags=tech&sortBy=likes')
            .end((err, res) => {
                res.statusCode.should.equal(200);
                res.body.should.be.a('Object');
                done();
            });
    });
});


describe('Posts API to sortBy popularity', () => {
    it('Return status 200 response and JSON object', (done) => {
        chai.request(app)
            .get('/api/posts?tags=tech&sortBy=popularity')
            .end((err, res) => {
                res.statusCode.should.equal(200);
                res.body.should.be.a('Object');
                done();
            });
    });
});


describe('Posts API to sort in asc direction', () => {
    it('Return status 200 response and JSON object', (done) => {
        chai.request(app)
            .get('/api/posts?tags=tech&sortBy=popularity&direction=asc')
            .end((err, res) => {
                res.statusCode.should.equal(200);
                res.body.should.be.a('Object');
                done();
            });
    });
});


describe('Posts API to sort in desc direction', () => {
    it('Return status 200 response and JSON object', (done) => {
        chai.request(app)
            .get('/api/posts?tags=tech&sortBy=popularity&direction=desc')
            .end((err, res) => {
                res.statusCode.should.equal(200);
                res.body.should.be.a('Object');
                done();
            });
    });
});
