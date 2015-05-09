var chai = require('chai');
chai.should();
var expect = chai.expect;

var config = require("../lib/defaultConfig");

describe('owncli', function () {

    describe('defaultConfig', function () {

        it('should be a object', function () {
            expect(config).to.be.an('object');
        });

        it('should have a name property', function () {
            expect(config.name).to.be.a('string');
        });

        it('should have a version property', function () {
            expect(config.version).to.be.a('string');
        });

        it('should have a sliceArgs property', function () {
            expect(config.sliceArgs).to.be.a('number');
        });

        it('should have a tasks property', function () {
            expect(config.tasks).to.be.a('string');
        });

    });
});
