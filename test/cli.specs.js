var chai = require('chai');
var expect = chai.expect;
var cli = require("../lib/cli");

describe('owncli', function () {
    describe('cli', function () {
        it('should have options object', function () {
            expect(cli.options).to.be.an('object');
        });

        it('should have args object', function () {
            expect(cli.args).to.be.an('object');
        });

        it('should have tasks object', function () {
            expect(cli.args).to.be.an('object');
        });

        it('should have a execute method', function () {
            expect(cli.execute).to.be.a('function');
        });
    });
});
