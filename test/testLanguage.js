import server from '../bin/test.js';
import doMigrate from './migration';
import Language from '../src/db_models/language';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

async function createFixture() {
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

describe('/GET languages', () => {
  before(async () => {
    await doMigrate()
    await createFixture();
  });
  it('應該能取得所有的languages', done => {
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

describe('/POST languages', () => {
  before(async ()=> {
    await doMigrate();
    await createFixture();
  });
  it('應該能拿到正確的language', done => {
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
  it('應該能拿到正確的language', done => {
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
  it('應該能拿到正確的language', done => {
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

describe('/PUT languages', () => {
  before(async ()=> {
    await doMigrate();
    await Language.add({
      abbreviation: 'en',
      description: '英文'
    });
  })

  it('應該要能更新語言資訊', done => {
    chai
      .request(server)
      .put('/languages/1')
      .send({abbreviation: 'tw', description: '繁中'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.abbreviation.should.be.eql('tw');
        res.body.description.should.be.eql('繁中');
        done();
      })
  })
})

describe('language db model', () => {
  before(async ()=> {
    await doMigrate();
    await Language.add({
      abbreviation: 'en',
      description: '英文'
    });
  })

  beforeEach(async()=> {
    await Language.deleteAll();
  })

  it('應該要能刪除所有語言', done => {
    chai
      .request(server)
      .get('/languages')
      .end((err, res) => {
        res.body.length.should.be.eql(0);
        done();
      })
  })
})
