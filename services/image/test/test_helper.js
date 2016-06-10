var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');

global.expect = chai.expect;
global.sinon = sinon;

chai.use(chaiAsPromised);