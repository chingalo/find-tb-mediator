const request = require('request');
const Promise = require('promise');
const _ = require('lodash');

async function getIndicatorsByGroup(serverUrl, headers, indicatorGroupId) {
    const url = `${serverUrl}/api/indicatorGroups/${indicatorGroupId}.json?fields=indicators[id,name,numerator,denominator]`;
    return new Promise(resolve => {
        request({
                headers,
                uri: url,
                method: 'GET'
            },
            (error, response, body) => {
                if (!error && response && response.statusCode === 200) {
                    body = JSON.parse(body);
                    const {
                        indicators
                    } = body;
                    resolve(
                        indicators
                    );
                } else {
                    resolve([]);
                }
            }
        );
    })
}

function getUidsFromIndicatorExpression(expression) {
    var uids = [];
    var matchRegrex = /(\{.*?\})/gi;
    expression.match(matchRegrex).forEach(function (value) {
        uids = uids.concat(
            value
            .replace('{', ':separator:')
            .replace('}', ':separator:')
            .split(':separator:')
            .filter(content => content.length > 0)
        );
    });
    return uids;
}

module.exports = {
    getIndicatorsByGroup,

}