var chai = require('chai');
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);
var expect = chai.expect;

var print = require("../lib/print");
var figlet = require("figlet");

describe('owncli', function () {

    describe('print.help', function () {

        var helpStub;
        var logStub;
        var figStub;

        beforeEach(function(){
            helpStub = sinon.spy(print, "help");
            logStub = sinon.stub(console, "log");
            figStub = sinon.stub(figlet, "textSync",function(n){return n;});
        });

        afterEach(function(){
            helpStub.restore();
            logStub.restore();
            figStub.restore();
        });

        it('should print a help with name and version when no params given', function () {
            print.help({name:'test1',version:1}, {}, {});
            logStub.should.have.been.calledWith(print.msgs.version,'test1',1);
        });

        it('should print a help with name and version when no params given', function () {
            print.help({name:'test2',version:2}, { tasks:'a'}, {});
            logStub.should.have.been.calledWith(print.msgs.version,'test2',2);
        });

    });
});
