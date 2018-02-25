import app from '../src/app.js';
import to from 'await-to-js';
import doMigrate from './migration';
import { Language } from '../src/db_models';
import { createLanguage } from './fixture';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('/GET languages', () => {
  before(async () => {
    await doMigrate()
    await createLanguage();
  });
  it('應該能取得所有的languages', done => {
    chai
      .request(app)
      .get('/languages')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(3);
        done();
      });
  });
});

describe('/GET languages/?', () => {
  before(async () => {
    await doMigrate()
    await createLanguage();
  });

  it('應該能利用language_id取得對應的language', async() => {
    const language1Res = await chai
      .request(app)
      .get('/languages/1');

    language1Res.should.have.status(200);
    language1Res.body.should.be.a('object');
    language1Res.body.language_id.should.be.eql(1);
    language1Res.body.abbreviation.should.be.eql('en');
    language1Res.body.description.should.be.eql('英文');

    const language2Res = await chai
      .request(app)
      .get('/languages/2');

    language2Res.should.have.status(200);
    language2Res.body.should.be.a('object');
    language2Res.body.language_id.should.be.eql(2);
    language2Res.body.abbreviation.should.be.eql('tw');
    language2Res.body.description.should.be.eql('繁中');

    const language3Res = await chai
      .request(app)
      .get('/languages/3');

    language3Res.should.have.status(200);
    language3Res.body.should.be.a('object');
    language3Res.body.language_id.should.be.eql(3);
    language3Res.body.abbreviation.should.be.eql('jp');
    language3Res.body.description.should.be.eql('日文');
  });

  it('抓不存在的語言會錯誤', async () => {
    const [err, languageNotExistRes] = await to(chai
      .request(app)
      .get('/languages/5'));
    err.should.have.status(403);
  });
});

describe('/POST languages', () => {
  before(async ()=> {
    await doMigrate();
  });
  it('應該能拿到正確的language', async () => {
    await chai
      .request(app)
      .post('/languages')
      .send({
        abbreviation: 'en',
        description: '英文'
      });
    await chai
      .request(app)
      .post('/languages')
      .send({
        abbreviation: 'tw',
        description: '繁中'
      });
    await chai
      .request(app)
      .post('/languages')
      .send({
        abbreviation: 'jp',
        description: '日文'
      });
    const [, languageEn] = await Language.get(1);
    languageEn.should.be.a('object');
    languageEn.language_id.should.be.eql(1);
    languageEn.abbreviation.should.be.eql('en');
    languageEn.description.should.be.eql('英文');

    const[, languageTw] = await Language.get(2);
    languageTw.should.be.a('object');
    languageTw.language_id.should.be.eql(2);
    languageTw.abbreviation.should.be.eql('tw');
    languageTw.description.should.be.eql('繁中');

    const [, languageJp] = await Language.get(3);
    languageJp.should.be.a('object');
    languageJp.language_id.should.be.eql(3);
    languageJp.abbreviation.should.be.eql('jp');
    languageJp.description.should.be.eql('日文');
  });

  it('language的abbreviation, description不能重複', async() => {
    const [abbreviationErr, ] = await to(chai
      .request(app)
      .post('/languages')
      .send({
        abbreviation: 'tw',
        description: '繁中'
      }));
    abbreviationErr.should.have.status(403);
    abbreviationErr.response.text.should.be.eql('Key (abbreviation)=(tw) already exists.');
  });
});

describe('/PUT languages', () => {
  before(async ()=> {
    await doMigrate();
    await Language.add({
      abbreviation: 'en',
      description: '英文'
    });
    await Language.add({
      abbreviation: 'tw',
      description: '繁中'
    });
  })

  it('應該要能更新語言資訊', done => {
    chai
      .request(app)
      .put('/languages/1')
      .send({abbreviation: 'jp', description: '日文'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.abbreviation.should.be.eql('jp');
        res.body.description.should.be.eql('日文');
        done();
      })
  });

  it('abbreviation不能重複', async () => {
    const [err] = await to(chai
      .request(app)
      .put('/languages/1')
      .send({abbreviation: 'tw', description: '繁中'}));

    err.should.have.status(403);
    err.response.text.should.be.eql('Key (abbreviation)=(tw) already exists.');
  });
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
      .request(app)
      .get('/languages')
      .end((err, res) => {
        res.body.length.should.be.eql(0);
        done();
      })
  })
})
