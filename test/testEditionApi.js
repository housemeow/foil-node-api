import to from 'await-to-js';
import app from '../src/app.js';
import { Language, Edition } from '../src/db_models';
import { createLanguage, createEdition} from './fixture';
import doMigrate from './migration';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('/GET editions', () => {
  before(async ()=> {
    await doMigrate();
    await createLanguage();
  });

  it('一開始的edition應該是空的', done => {
    chai
      .request(app)
      .get('/editions')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      })
  });

  it('應該要能抓到所有的editions', async() => {
    await createLanguage();
    await createEdition();
    const [err, res] = await to(chai
      .request(app)
      .get('/editions'));

    res.should.have.status(200);
    res.body.should.be.a('array');
    res.body.length.should.be.eql(5);
  });
});
