import 'babel-polyfill'; // 解決ES6, 7的問題
import server from '../bin/test.js';
import doMigrate from './migration';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('migration', () => {
  it('應該要能夠對測試資料庫做migration', function(done) {
    this.timeout(10000);
    doMigrate().then(done);
  });
});

describe('/GET languages', function() {
  beforeEach(done => {
    chai
      .request(server)
      .post('/languages').send({
        abbreviation: 'en',
        description: '英文'
      })
      .end(()=>{});
    chai
      .request(server)
      .post('/languages').send({
        abbreviation: 'tw',
        description: '繁中'
      })
      .end(()=>{});
    chai
    .request(server)
    .post('/languages').send({
      abbreviation: 'jp',
      description: '日文'
    })
    .end(done);
  })
  it('應該能取得所有的languages', function(done) {
    chai
      .request(server)
      .get('/languages')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(3);
        done();
      });
  });
});

var assert = require('assert');
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
