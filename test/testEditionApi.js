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

describe('POST /editions', () => {
  before(async() => {
    await doMigrate();
    await createLanguage();
  });

  it('應該要能建立版本', async() => {
    const [, res] =await to(chai
      .request(app)
      .post('/editions')
      .send({
        language_id: 1,
        abbreviation: 'ed1',
        name: 'EN_ED1'
      }));
    res.should.have.status(200);

    const [err, edition] = await Edition.get(1);
    console.log('err, edition', err, edition);
    edition.edition_id.should.be.eql(1);
    edition.edition_base_id.should.be.eql(1);
    edition.abbreviation.should.be.eql('ed1');
    edition.icon.should.be.eql('default.png');
    edition.name.should.be.eql('EN_ED1');
  });
});

describe('GET /editions/?', () => {
  before(async() => {
    await doMigrate();
    await createLanguage();
  });

  it('應該要能抓到對應的edition', async() => {
    let [, edition] = await Edition.add({
      language_id: 1,
      abbreviation: 'ed1',
      name: 'EN_ED1'
    });
    let [, res] = await to(chai
      .request(app)
      .get('/editions/1'));
    res.should.have.status(200);
    res.body.edition_id.should.be.eql(1);
    res.body.edition_base_id.should.be.eql(edition.edition_base_id);
    res.body.abbreviation.should.be.eql('ed1');
    res.body.icon.should.be.eql('default.png');
    res.body.name.should.be.eql('EN_ED1');

    [, edition] = await Edition.add({
      language_id: 2,
      abbreviation: 'ed1',
      name: 'TW_ED1'
    });
    [, res] = await to(chai
      .request(app)
      .get('/editions/2'));
    res.should.have.status(200);
    res.body.edition_id.should.be.eql(2);
    res.body.edition_base_id.should.be.eql(edition.edition_base_id);
    res.body.abbreviation.should.be.eql('ed1');
    res.body.icon.should.be.eql('default.png');
    res.body.name.should.be.eql('TW_ED1');

    [, edition] = await Edition.add({
      language_id: 1,
      abbreviation: 'ed2',
      name: 'EN_ED2'
    });
    [, res] = await to(chai
      .request(app)
      .get('/editions/3'));
    res.should.have.status(200);
    res.body.edition_id.should.be.eql(3);
    res.body.edition_base_id.should.be.eql(edition.edition_base_id);
    res.body.abbreviation.should.be.eql('ed2');
    res.body.icon.should.be.eql('default.png');
    res.body.name.should.be.eql('EN_ED2');
  });

  it('抓不到的edition應該會回傳錯誤', async() => {
    const [err] = await to(chai
      .request(app)
      .get('/editions/123'));
    err.should.have.status(403);
  });
});

describe('PUT /editions/?', ()=> {
  beforeEach(async () => {
    await doMigrate();
    await createLanguage();
    await createEdition();
  });

  it('應該要能夠修改edition的資訊', async () => {
    const [err, res] = await to(chai
      .request(app)
      .put('/editions/1')
      .send({
        edition_base_id: 1,
        abbreviation: 'new abbreviation',
        name: 'new name'
      }));
    res.should.have.status(200);
    res.body.edition_id.should.be.eql(1);
    res.body.edition_base_id.should.be.eql(1);
    res.body.abbreviation.should.be.eql('new abbreviation');
    res.body.name.should.be.eql('new name');

    const [, enEdition1] = await Edition.get(1);
    enEdition1.edition_id.should.be.eql(1);
    enEdition1.edition_base_id.should.be.eql(1);
    enEdition1.abbreviation.should.be.eql('new abbreviation');
    enEdition1.name.should.be.eql('new name');

    const [, twEdition1] = await Edition.get(2);
    twEdition1.edition_id.should.be.eql(2);
    twEdition1.edition_base_id.should.be.eql(1);
    twEdition1.abbreviation.should.be.eql('new abbreviation');
    twEdition1.name.should.be.eql('twEdition1');

    const [, jpEdition1] = await Edition.get(3);
    jpEdition1.edition_id.should.be.eql(3);
    jpEdition1.edition_base_id.should.be.eql(1);
    jpEdition1.abbreviation.should.be.eql('new abbreviation');
    jpEdition1.name.should.be.eql('jpEdition1');
  });

  it('edition_base縮寫不能重複', async() => {
    const [err, res] = await to(chai
      .request(app)
      .put('/editions/1')
      .send({
        edition_base_id: 1,
        abbreviation: 'ed2'
      }));
    err.should.have.status(403);
    err.response.text.should.be.eql('Key (abbreviation)=(ed2) already exists.')

    const [, edition] = await Edition.get(1);
    edition.edition_id.should.be.eql(1);
    edition.edition_base_id.should.be.eql(1);
    edition.abbreviation.should.be.eql('ed1');
    edition.name.should.be.eql('enEdition1');
  })
})
