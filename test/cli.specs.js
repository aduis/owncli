var chai = require('chai');
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);
var expect = chai.expect;

var cli = require("../lib/cli");
var print = require('../lib/print');
var validate = require('../lib/validate');

describe('owncli', function () {

    describe('cli', function () {

        var printStub;
        var validateStub;

        beforeEach(function () {
            printStub = sinon.stub(print, "help");
            validateStub = sinon.spy(validate, "options");
        });

        afterEach(function () {
            printStub.restore();
            validateStub.restore();
        });

        it('should have options object', function () {
            expect(cli.options).to.be.an('object');
        });

        it('should have args object', function () {
            expect(cli.args).to.be.an('array');
        });

        it('should have tasks object', function () {
            expect(cli.tasks).to.be.an('object');
        });

        it('should have a execute method', function () {
            expect(cli.execute).to.be.a('function');
        });

        it('should execute the callback when done', function () {
            var callback = sinon.stub();
            cli.execute(callback);
            callback.should.have.been.called;
        });

        it('should print the help when the short option is set', function () {
            cli.options.h = true;
            cli.execute();
            printStub.should.have.been.called;
        });

        it('should print the help when the option is set', function () {
            cli.options.help = true;
            cli.execute();
            printStub.should.have.been.called;
        });

        it('should execute a task', function () {
            var cb = sinon.stub();
            cli.args = ['test'];
            cli.tasks = {
                test: {
                    execute: function (o, c) {
                        c();
                    }
                }
            };
            cli.execute(cb);
            cb.should.have.been.called;
        });

        it('should execute a task with a sub command', function () {
            var cb = sinon.stub();
            cli.args = ['test', 'lala'];
            cli.tasks = {
                test: {
                    commands: {
                        lala: {
                            execute: function (o, c) {
                                c();
                            }
                        }
                    }
                }
            };
            cli.execute(cb);
            cb.should.have.been.called;
        });


    });
});
