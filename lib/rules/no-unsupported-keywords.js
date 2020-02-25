"use strict";

var findExpectCall = require('../util/find-expect-call');
var keywords = require('../util/keywords');

function checkExpression(context, expression, allKeywords) {

  var expectCall = findExpectCall(expression.object);
  if (!expectCall) {
    return;
  }

  var source = context.getSourceCode();
  var expectText = source.getText(expectCall);
  var property = expression.property;
  var calleeText = source.getText(expression);
  var assertionText = calleeText.substr(expectText.length + 1);

  var keywords = assertionText.split(/[.\s]/).filter(function (k) {
    return !!k;
  });
  for (var i = 0; i < keywords.length; i++) {
    var keyword = keywords[i];
    if (!{}.hasOwnProperty.call(allKeywords, keyword)) {
      return context.report({
        node: property,
        message: '"' + assertionText + '" contains unknown keyword "' + keyword + '"'
      });
    }
  }

  return;
}

module.exports = {
  meta: {
    type: 'problem',
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          allowKeywords: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          allowSinonChai: {
            type: 'boolean'
          },
          allowChaiAsPromised: {
            type: 'boolean'
          },
          allowChaiDOM: {
            type: 'boolean'
          }
        }
      }
    ]
  },
  create: function (context) {
    var options = context.options[0] || {};
    var allKeywords = keywords.CHAI.concat(
      options.allowKeywords || [],
      options.allowSinonChai ? keywords.SINON : [],
      options.allowChaiAsPromised ? keywords.CHAI_AS_PROMISED : [],
      options.allowChaiDOM ? keywords.CHAI_DOM : []
    ).reduce(function (acc, curr) {
      acc[curr] = true;
      return acc;
    }, {});

    return {
      ExpressionStatement: function (node) {
        var expression = node.expression;
        if (expression.type === 'CallExpression') {
          var callee = expression.callee;
          if (callee.type !== 'MemberExpression') {
            return;
          }
          return checkExpression(context, callee, allKeywords);
        }
        if (expression.type === 'MemberExpression') {
          return checkExpression(context, expression, allKeywords);
        }

        return;
      }
    };
  }
};
