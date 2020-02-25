"use strict";

const findExpectCall = require('../util/find-expect-call');
const keywords = require('../util/keywords');

function checkExpression(context, expression, allKeywords) {

  const expectCall = findExpectCall(expression.object);
  if (!expectCall) {
    return;
  }

  const source = context.getSourceCode();
  const expectText = source.getText(expectCall);
  const {property} = expression;
  const calleeText = source.getText(expression);
  const assertionText = calleeText.substr(expectText.length + 1);

  const keywords = assertionText.split(/[.\s]/).filter(function (k) {
    return !!k;
  });
  for (const keyword of keywords) {
    if (!allKeywords.has(keyword)) {
      return context.report({
        node: property,
        message: `"${assertionText}" contains unknown keyword "${keyword}"`
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
  create (context) {
    const options = context.options[0] || {};
    const allKeywords = new Set(keywords.CHAI.concat(
      options.allowKeywords || [],
      options.allowSinonChai ? keywords.SINON : [],
      options.allowChaiAsPromised ? keywords.CHAI_AS_PROMISED : [],
      options.allowChaiDOM ? keywords.CHAI_DOM : []
    ));

    function checkByExpressionType (expression) {
      if (expression.type === 'CallExpression') {
        const {callee} = expression;
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

    return {
      'ReturnStatement[argument]' (node) {
        const expression = node.argument;
        return checkByExpressionType(expression);
      },
      ExpressionStatement (node) {
        const {expression} = node;
        return checkByExpressionType(expression);
      }
    };
  }
};
