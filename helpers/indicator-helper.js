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

function getNumeratorsAndDenominatorsDataElementsByIndicators(indicators) {

    const numeratorDataElements = _.flatMapDeep(_.map(indicators, indicator => {
        const {
            numerator
        } = indicator;
        return getUidsFromIndicatorExpression(numerator)
    })).filter(onlyUniqueItemsOnArray);

    const denominatorDataElements = _.filter(_.flatMapDeep(_.map(indicators, indicator => {
        const {
            denominator
        } = indicator;
        return getUidsFromIndicatorExpression(denominator)
    })).filter(onlyUniqueItemsOnArray), de => {
        return numeratorDataElements.indexOf(de) === -1
    });

    return {
        numeratorDataElements,
        denominatorDataElements
    }
}

function onlyUniqueItemsOnArray(value, index, self) {
    return self.indexOf(value) === index;
}

function getUidsFromIndicatorExpression(expression) {
    var uids = [];
    var matchRegrex = /(\{.*?\})/gi;
    if (expression.match(matchRegrex)) {
        expression.match(matchRegrex).forEach(function (value) {
            uids = uids.concat(
                value
                .replace('{', ':separator:')
                .replace('}', ':separator:')
                .split(':separator:')
                .filter(content => content.length > 0)
            );
        });
    }
    return uids;
}

module.exports = {
    getIndicatorsByGroup,
    getNumeratorsAndDenominatorsDataElementsByIndicators

}