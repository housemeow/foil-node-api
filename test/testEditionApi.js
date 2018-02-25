import server from '../bin/test.js';
import { Language } from '../src/db_models';
import doMigrate from './migration';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

async function createFixture() {
  return new Promise(resolve => {
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
    .end(resolve);
  })
}

describe('/GET editions', () => {
  before(async ()=> {
    await doMigrate();
    await createFixture();
  });

  it('一開始的edition應該是空的', done => {
    chai
      .request(server)
      .get('/editions')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      })
  });
});
