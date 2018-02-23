import "babel-polyfill"; // 解決ES6, 7的問題
import server from "../bin/test.js";
import to from 'await-to-js';
import runner from "node-pg-migrate";
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
chai.use(chaiHttp);
const DB_URL = `postgres://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const db = require('../db')(DB_URL);

describe("migration", () => {
  it("應該要能夠對測試資料庫做migration", function(done) {
    this.timeout(10000);

    db.query('DROP SCHEMA public CASCADE').then(data=> {
      return db.query('CREATE SCHEMA public');
    }).then(data => {
      return db.query('GRANT ALL ON SCHEMA public TO foil');
    }).then(data => {
      return db.query('GRANT ALL ON SCHEMA public TO public');
    }).then(data=> {
      runner({
        dryRun: false,
        database_url: DB_URL,
        dir: "migrations",
        ignorePattern: "",
        schema: "public",
        migrations_schema: undefined,
        migrations_table: "pgmigrations",
        count: undefined,
        timestamp: false,
        file: undefined,
        checkOrder: true,
        typeShorthands: {},
        create_schema: false,
        create_migrations_schema: false,
        direction: "up",
        noLock: false
      }).then(data => {
        console.log('migraion 成功');
        done();
      }).catch(error => {
        console.log('migration 失敗', error);
        done();
      });
    })
  });
});

describe("/GET languages", () => {
  it("應該能取得所有的languages", function(done) {
    chai
      .request(server)
      .get("/languages")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(0);
        done();
      });
  });
});

var assert = require("assert");
describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
