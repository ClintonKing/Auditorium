// Dependencies
var ExecLimiter = require("../lib")
  , assert = require("assert")
  ;

// Create the exec limiter
var el = new ExecLimiter(10);

describe("errors", function () {
    var command = "ls";

    it("spawn: " + command + " - should finish gracefully", function (done) {
        el.add(command, [], done);
    });

    it("exec: " + command + " - should finish gracefully", function (done) {
        el.add(command, done);
    });
});

describe("stdout", function () {
    var command = "ls";

    it("spawn: " + command + " - should not have stdout by default", function (done) {
        el.add(command, [], function (err, stdout) {
            assert.equal(stdout, "");
            done(err);
        });
    });

    it("spawn: " + command + " - should have stdout by default", function (done) {
        el.add(command, [], { ignoreStdout: false }, function (err, stdout) {
            assert.notEqual(stdout, "");
            done(err);
        });
    });

    it("exec: " + command + " - should have stdout", function (done) {
        el.add(command, function (err, stdout) {
            assert.equal(typeof stdout, "string");
            done(err);
        });
    });
});

describe("exec vs. spawn", function () {
    // All tests must finish in less than 4 seconds
    this.timeout(4000);

    var tts = 2
      , command = "sleep"
      ;

    it("spawn: " + command + " " + tts + " - should wait at least " + tts + " seconds before it finishes", function (done) {
        var start = Date.now();
        el.add(command, [tts], function (err) {
            var end = Date.now();
            done(end - start < tts * 1000 ? "did not finish in more than " + tts + " seconds" : undefined);
        });
    });

    it("exec: " + command + " " + tts + " - should wait at least " + tts + " seconds before it finishes", function (done) {
        var start = Date.now();
        el.add(command + " " + tts, function (err) {
            var end = Date.now();
            done(end - start < tts * 1000 ? "did not finish in more than " + tts + " seconds" : undefined);
        });
    });
});

describe("environment", function () {

    // All tests must finish in less than 4 seconds
    this.timeout(4000);

    var name = "TEST_VAR"
      , value = "test_value"
      , command = "printenv"
      ;

    it("spawn: " + command + " - should not return an error if variables are passed correctly", function (done) {
        var env = {};
        env[name] = value;
        el.add(command, [name], { env: env }, done);
    });

    it("exec: " + command + " - should not return an error if variables are passed correctly", function (done) {
        var env = {};
        env[name] = value;
        el.add(command + " " + name, { env: env }, done);
    });
});
