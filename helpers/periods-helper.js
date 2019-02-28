const _ = require('lodash');

function getMonthInIsoFormat(year) {
    let periods = [];
    for (const index of _.range(1, 13)) {
        const pe = index > 9 ? `${year}${index}` : `${year}0${index}`;
        periods = [...periods, pe]
    }
    return periods;
}

function getYearsForRandomData() {
    const currentYear = (new Date()).getFullYear();
    const from = currentYear - 10;
    const to = currentYear + 1;
    return _.reverse(_.range(from, to));
}

module.exports = {
    getMonthInIsoFormat,
    getYearsForRandomData
}