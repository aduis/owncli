var chai = require('chai');
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);
var expect = chai.expect;

var shell = require('shelljs');
var jf = require('jsonfile');

var runner = require("../lib/runner");

describe('owncli', function () {

    describe('runner', function () {

        it('should be a function', function () {
            expect(runner).to.be.a('function');
        });

    });

    describe('runner function', function () {

        var run;

        before(function (done) {
            run = runner();
            done();
        });

        describe('exec', function () {

            var execStub;
            before(function (done) {
                execStub = sinon.stub(shell, "exec", function(command, options, callback){
                    callback(0, command);
                });
                runner().exec('grunt test').go(function (err, results) {
                    done();
                });
            });

            it('should run grunt test as a command', function () {
                execStub.should.have.been.called;
            });

            after(function () {
                execStub.restore();
            });

        });

        describe('echo', function () {

            var echoStub;
            before(function (done) {
                echoStub = sinon.stub(shell, "echo", function(command){
                    return 'bla';
                });
                runner().echo('bla').go(function (err, results) {
                    done();
                });
            });

            it('should run grunt test as a command', function () {
                echoStub.should.have.been.called;
            });

            after(function () {
                echoStub.restore();
            });

        });

        describe('as', function () {

            var options = { significance: 'patch', oldVersion: '0.15.0' };
            before(function (done) {
                runner(options).semver('oldVersion').as('hello123').go(function (err, results) {
                    done();
                });
            });

            it('options should have hello123 property', function () {
                options.should.have.property('hello123');
            });

        });

        describe('from', function () {

            var options = { significance: 'patch', oldVersion: '0.15.0' };
            before(function (done) {
                runner(options).get('oldVersion').from('package.json').as('hello123').go(function (err, results) {
                    done();
                });
            });

            it('options should have hello123 property', function () {
                options.should.have.property('hello123');
            });

        });


        describe('to', function () {

            var readFileStub;
            var writeFileStub;
            var options = {};
            before(function (done) {

                readFileStub = sinon.stub(jf, "readFile", function(file, callback){
                    callback(null, { version: '0.16.0' });
                });
                writeFileStub = sinon.stub(jf, "writeFile", function(file, data, options, callback){
                   callback(null, 'ok');
                });
                runner(options).set('version').in('package.json').to('hello123').go(function (err, results) {
                    done();
                });
            });

            it('should read json file', function () {
                readFileStub.should.have.been.called;
            });

            it('should save json file', function () {
                writeFileStub.should.have.been.called;
            });

            after(function () {
                readFileStub.restore();
                writeFileStub.restore();
            });

        });

    });

});
