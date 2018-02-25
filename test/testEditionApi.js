import to from 'await-to-js';
import server from '../bin/test.js';
// import Language from '../src/db_models/language';
// import Edition from '../src/db_models/edition';
import { Language, Edition } from '../src/db_models';
import doMigrate from './migration';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

async function createLanguageFixture() {
  await Language.add({
    abbreviation: 'en',
    description: '英文'
  });
  await Language.add({
    abbreviation: 'tw',
    description: '繁中'
  });
  await Language.add({
    abbreviation: 'jp',
    description: '日文'
  });
}

async function createEditionFixture() {
  await Edition.add({
    language_id: 1,
    abbreviation: 'ed1',
    name: 'enEdition1',
  });

  await Edition.add({
    language_id: 2,
    abbreviation: 'ed1',
    name: 'twEdition1',
  });
  await Edition.add({
    language_id: 3,
    abbreviation: 'ed1',
    name: 'jpEdition1',
  });


  await Edition.add({
    language_id: 2,
    abbreviation: 'ed2',
    name: 'twEdition2',
  });

  const [err, edition ] =
  await Edition.add({
    language_id: 3,
    abbreviation: 'ed2',
    name: 'jpEdition2',
  });
}

describe('/GET editions', () => {
  before(async ()=> {
    await doMigrate();
    await createLanguageFixture();
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

  it('應該要能抓到所有的editions', async() => {
    await createLanguageFixture();
    await createEditionFixture();
    const [err, res] = await to(chai
      .request(server)
      .get('/editions'));

    res.should.have.status(200);
    res.body.should.be.a('array');
    res.body.length.should.be.eql(5);
  });
});
