import chai from "chai";
import sinon from "sinon";
import supertest from "supertest";
import "../src/config/LoaderEnvironmentVariable";
import app from "../src/config/Server"


global.expect = chai.expect;
global.sinon = sinon;
global.assert = chai.assert
global.request = supertest(app);