import "babel-polyfill"; // 解決ES6, 7的問題
import server from "../bin/test.js";
import to from 'await-to-js';
import doMigrate from './migration';
require('dotenv').config({ path: '.env.test' });

let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
chai.use(chaiHttp);
const DB_URL = `postgres://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const db = require('../src/db.js')(DB_URL);

describe("migration", () => {
  it("應該要能夠對測試資料庫做migration", function(done) {
    this.timeout(10000);

    doMigrate().then(data => {
      console.log('migraion 成功');
      done();
    }).catch(error => {
      console.log('migration 失敗', error);
    });
  });
});

describe("/GET languages", function() {
  it("應該能取得所有的languages", async function() {
    chai
      .request(server)
      .get("/languages")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(0);
      });
  });
});

var assert = require("assert");
describe("Array", () => {
  describe("#indexOf()", () => {
    it("should return -1 when the value is not present", function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
