'use strict';

const rule = require('../../../lib/rules/no-unsupported-keywords');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester();
ruleTester.run('no-unsupported-keywords', rule, {
  valid: [{
    code: `
      it("works with regular chai keywords", function() {
        expect(true).to.be.ok;
      });
      `
  }, {
    code: `
      it("works with regular chai keywords and line break", function() {
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
      it("fails as expected with non-keyword as chained method", function() {
        expect(true).to.be.foo();
      });
    `,
    errors: [{
      message: '"to.be.foo" contains unknown keyword "foo"'
    }]
  }, {
    code: `
      it("fails as expected with non-keyword as method", function() {
        expect(true).foo();
      });
    `,
    errors: [{
      message: '"foo" contains unknown keyword "foo"'
    }]
  }, {
    code: `
      it("fails as expected with non-keyword as chained property", function() {
        expect(true).to.be.foo;
      });
    `,
    errors: [{
      message: '"to.be.foo" contains unknown keyword "foo"'
    }]
  }, {
    code: `
      it("fails as expected with non-keyword as property", function() {
        expect(true).foo;
      });
    `,
    errors: [{
      message: '"foo" contains unknown keyword "foo"'
    }]
  }, {
    code: `
      it("fails as expected with keyword in middle of method chain", function() {
        expect(true).to.not.zing.be.false();
      });
    `,
    errors: [{
      message: '"to.not.zing.be.false" contains unknown keyword "zing"'
    }]
  }, {
    code: `
      it("fails as expected with keyword in middle of property chain", function() {
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
      it("works as expected with \`allowKeywords\`", function() {
        expect(result).to.be.foo();
        expect(result).to.zing.be.ok;
      });
    `
  }, {
    options: [{allowSinonChai: true}],
    code: `
      it("works as expected with \`allowSinonChai\`", function() {
        expect(result).to.have.returned(foo);
        expect(result).to.have.been.called;
      });
    `
  }, {
    options: [{allowChaiAsPromised: true}],
    code: `
      it("works as expected with \`allowChaiAsPromised\`", function() {
        expect(result).to.eventually.be.ok;
        expect(result).to.be.rejectedWith(foo);
      });
    `
  }, {
    options: [{allowChaiAsPromised: true}],
    code: `
    it("works as expected with \`allowChaiAsPromised\` method in a return", function() {
      return expect(
        someMethod
      ).to.be.rejectedWith(TypeError);
    });
    `
  }, {
    options: [{allowChaiAsPromised: true}],
    code: `
    it("works as expected with \`allowChaiAsPromised\` property in a return", function() {
      return expect(
        someMethod
      ).to.eventually.be.ok;
    });
    `
  }, {
    options: [{allowChaiDOM: true}],
    code: `
    it("works as expected with \`allowChaiDOM\`", function() {
      expect(result).to.have.text('abc');
      expect(result).not.be.displayed;
    });
    `
  }],

  invalid: [{
    options: [{allowKeywords:['zing', 'foo']}],
    code: `
      it("fails as expected with keyword missing among \`allowKeywords\`", function() {
        expect(result).to.be.foo();
        expect(result).to.bar.be.ok;
      });
    `,
    errors: [{
      message: '"to.bar.be.ok" contains unknown keyword "bar"'
    }]
  }, {
    code: `
      it("fails as expected when \`allowKeywords\` is missing", function() {
        expect(result).to.be.foo();
        expect(result).to.zing.be.ok;
      });
    `,
    errors: [{
      message: '"to.be.foo" contains unknown keyword "foo"'
    }, {
      message: '"to.zing.be.ok" contains unknown keyword "zing"'
    }]
  }, {
    code: `
      it("fails as expected when \`allowSinonChai\` is missing", function() {
        expect(result).to.have.returned(foo);
        expect(result).to.have.been.called;
      });
    `,
    errors: [{
      message: '"to.have.returned" contains unknown keyword "returned"'
    }, {
      message: '"to.have.been.called" contains unknown keyword "called"'
    }]
  }, {
    code: `
      it("fails as expected when \`allowChaiAsPromised\` is missing", function() {
        expect(result).to.eventually.be.ok;
        expect(result).to.be.rejectedWith(foo);
      });
    `,
    errors: [{
      message: '"to.eventually.be.ok" contains unknown keyword "eventually"'
    }, {
      message: '"to.be.rejectedWith" contains unknown keyword "rejectedWith"'
    }]
  }, {
    code: `
    it("fails as expected in a return method when \`allowChaiAsPromised\` is missing", function() {
      return expect(
        someMethod
      ).to.be.rejectedWith(TypeError);
    });
    `,
    errors: [{
      message: '"to.be.rejectedWith" contains unknown keyword "rejectedWith"'
    }]
  }, {
    code: `
    it("fails as expected in a return property when \`allowChaiAsPromised\` is missing", function() {
      return expect(
        someMethod
      ).to.eventually.be.ok;
    });
    `,
    errors: [{
      message: '"to.eventually.be.ok" contains unknown keyword "eventually"'
    }]
  }, {
    code: `
    it("fails as expected when \`allowChaiDOM\` is missing", function() {
      expect(result).to.have.text('abc');
      expect(result).not.be.displayed;
    });
    `,
    errors: [{
      message: '"to.have.text" contains unknown keyword "text"'
    }, {
      message: '"not.be.displayed" contains unknown keyword "displayed"'
    }]
  }]
});
