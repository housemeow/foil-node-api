import 'babel-polyfill'; // 解決ES6, 7的問題
import server from '../src/app.js';
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('/GET book', () => {
  it('it should GET all the books', (done) => {
    chai.request(server)
        .get('/books' )
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(3);
          done();
        });
  });
});

var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});
