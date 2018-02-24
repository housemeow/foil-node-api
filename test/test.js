import 'babel-polyfill'; // 解決ES6, 7的問題
import server from '../bin/test.js';
import doMigrate from './migration';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('/GET languages', function() {
  before(done=> {
    doMigrate().then(()=> {
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
    });
  });
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

describe('/POST languages', function() {
  before(done=> {
    doMigrate().then(()=> {
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
    });
  });
  it('應該能拿到正確的language', function(done) {
    chai
      .request(server)
      .get('/languages/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.language_id.should.be.eql(1);
        res.body.abbreviation.should.be.eql('en');
        res.body.description.should.be.eql('英文');
        done();
      });
  })
  it('應該能拿到正確的language', function(done) {
    chai
      .request(server)
      .get('/languages/2')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.language_id.should.be.eql(2);
        res.body.abbreviation.should.be.eql('tw');
        res.body.description.should.be.eql('繁中');
        done();
      });
  })
  it('應該能拿到正確的language', function(done) {
    chai
      .request(server)
      .get('/languages/3')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.language_id.should.be.eql(3);
        res.body.abbreviation.should.be.eql('jp');
        res.body.description.should.be.eql('日文');
        done();
      });
  })
});

var assert = require('assert');
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
