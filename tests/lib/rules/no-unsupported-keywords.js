'use strict';

var rule = require('../../../lib/rules/no-unsupported-keywords');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('no-unsupported-keywords', rule, {
  valid: [{
    code: `
      it("works as expected", function() {
        expect(true).to.be.ok;
      });
      `
  }, {
    code: `
      it("works as expected", function() {
        expect(true)
        .to.be.ok;
      });
    `
  }, {
    code: 'foobar;'
  }, {
    code: 'foobar();'
  }, {
    code: 'foobar.ok();'
  }, {
    code: 'expect(obj);'
  }, {
    code: 'expect(obj).ok;'
  }, {
    code: 'expect(something).to.equal(somethingElse);'
  }],

  invalid: [{
    code: `
      it("fails as expected", function() {
        expect(true).to.be.foo();
      });
    `,
    errors: [{
      message: '"to.be.foo" contains unknown keyword "foo"'
    }]
  }, {
    code: `
      it("fails as expected", function() {
        expect(true).foo();
      });
    `,
    errors: [{
      message: '"foo" contains unknown keyword "foo"'
    }]
  }, {
    code: `
      it("fails as expected", function() {
        expect(true).foo;
      });
    `,
    errors: [{
      message: '"foo" contains unknown keyword "foo"'
    }]
  }, {
    code: `
      it("fails as expected", function() {
        expect(true).to.not.zing.be.false();
      });
    `,
    errors: [{
      message: '"to.not.zing.be.false" contains unknown keyword "zing"'
    }]
  }, {
    code: `
      it("fails as expected", function() {
        expect(true).to.not.zing.be.false;
      });
    `,
    errors: [{
      message: '"to.not.zing.be.false" contains unknown keyword "zing"'
    }]
  }]
});

ruleTester.run('no-unsupported-keywords with options', rule, {
  valid: [{
    options: [{allowKeywords: ['zing', 'foo']}],
    code: `
      it("works as expected", function() {
        expect(result).to.be.foo();
        expect(result).to.zing.be.ok;
      });
    `
  }, {
    options: [{allowSinonChai: true}],
    code: `
      it("works as expected", function() {
        expect(result).to.have.returned(foo);
        expect(result).to.have.been.called;
      });
    `
  }, {
    options: [{allowChaiAsPromised: true}],
    code: `
      it("works as expected", function() {
        expect(result).to.eventually.be.ok;
      });
    `
  }],

  invalid: [{
    options: [{allowKeywords:['zing', 'foo']}],
    code: `
      it("fails as expected", function() {
        expect(result).to.be.foo();
        expect(result).to.bar.be.ok;
      });
    `,
    errors: [{
      message: '"to.bar.be.ok" contains unknown keyword "bar"'
    }]
  }]
});
