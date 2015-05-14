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

        before(function(done){
            run = runner();
            done();
        });

        it('should be a function', function () {
            expect(run).to.be.a('function');
        });

        it('should have a exec function', function () {
            expect(run.echo).to.be.a('function');
        });

        it('should have a exec function', function () {
            expect(run.get).to.be.a('function');
        });

        it('should have a exec function', function () {
            expect(run.set).to.be.a('function');
        });

        it('should have a exec function', function () {
            expect(run.semver).to.be.a('function');
        });

        it('should have a exec function', function () {
            expect(run.as).to.be.a('function');
        });

        it('should have a exec function', function () {
            expect(run.to).to.be.a('function');
        });

        it('should have a exec function', function () {
            expect(run.in).to.be.a('function');
        });

        it('should have a exec function', function () {
            expect(run.from).to.be.a('function');
        });

    });

    describe('runner exec', function () {

        var execStub;
        before(function(done){
            execStub = sinon.stub(shell, "exec");
            runner().exec('grunt test').go(function(err, results){
                done();
            });
        });

        it('should run grunt test as a command', function () {
            execStub.should.have.been.called;
        });

        after(function(){
            execStub.restore();
        });

    });

    describe('runner echo', function () {

        var echoStub;
        before(function(done){
            echoStub = sinon.stub(shell, "echo");
            runner().echo('hello123').go(function(err, results){
                done();
            });
        });

        it('should run grunt test as a command', function () {
            echoStub.should.have.been.called;
        });

        after(function(){
            echoStub.restore();
        });

    });

    describe('runner as with invalid preaction', function () {

        var error;
        var options = {};
        before(function(done){
            runner(options).as('hello123').go(function(err, results){
                console.log(err);
                console.log(results);
                error = err;
                done();
            });
        });

        it('should return an error', function () {
            error.should.equal('previous action undefined is not allowed for action as');
        });

    });

    describe('runner as with valid preaction', function () {

        var options = { significance: 'patch' };
        before(function(done){
            runner(options).semver('0.15.0').as('hello123').go(function(err, results){
                done();
            });
        });

        it('options should have hello123 property', function () {
            options.should.have.property('hello123');
        });

    });


    describe('runner to with invalid preaction', function () {

        var error;
        var options = {};
        before(function(done){
            runner(options).to('hello123').go(function(err, results){
                console.log(err);
                console.log(results);
                error = err;
                done();
            });
        });

        it('should return an error', function () {
            error.should.equal('previous action undefined is not allowed for action to');
        });

    });

    describe('runner to with valid preaction', function () {

        var readFileStub;
        var writeFileStub;
        var options = {  };
        before(function(done){

            readFileStub = sinon.stub(jf, "readFile");
            writeFileStub = sinon.stub(jf, "writeFile");
            runner(options).set('version').in('package.json').to('hello123').go(function(err, results){
                done();
            });
        });

        it('should read json file', function () {
            readFileStub.should.have.been.called;
        });

        it('should save json file', function () {
            writeFileStub.should.have.been.called;
        });

        after(function(){
            readFileStub.restore();
            writeFileStub.restore();
        });

    });


});
