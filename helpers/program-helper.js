const _ = require('lodash');

function getRandomDataElementValues(program) {
    const dataValues = [];
    const mapper = getDataValuesMapper()[program];
    Object.keys(mapper).map(dataElement => {
        const possibleValues = mapper[dataElement];
        const index = _.random(possibleValues.length - 1);
        const value = possibleValues[index];
        dataValues.push({
            dataElement,
            value
        })
    });
    return dataValues;
}

function getDataValuesMapper() {
    return {
        "PI7qwgoIpq8": {
            "EdOZNERIYoY": ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", "D1", "D2", "D3", "D4"],
            "GMAytcZ8rSS": ["666267", "624994", "677264", "716169", "716180", "652557", "716176", "674808", "631790", "737211", "716201", "716068"],
            "iub3GujHXio": ["121222", "121225"],
            "AjobiiAJ4Hf": ["Test Device 1", "Test Device 2", " Test Device 3", " Test Device 4", " Test Device 5", "Test Device 6"],
            "pEb95XdWbp8": ["ERROR", "NO RESULT", "INVALID"],
            "kXBEGo3trnC": ["5011", "5007", "2126", "2035", "5017", "2008"],
            "fbLpwqEtnbW": ["VECT01", "VECT02", "VECT03", "VECT04", "VECT05", "VECT06", "VECT07"],
            "t44aSEowiRi": ["Signal loss detected in the amplification curve", "Probe check failed. Probe check value was below the minimum", "Probe check failed. Probe check value of 0 for reading number 2 was below the valid level.", "Syringe pressure reading exceeds the protocol limit"],
            "kNvZlY9FuVw": ["634590192", "636705319"],
            "xlSNfzdzC7d": ["CC67F7A2A6BF825A64BE100155D91E96", "EB82C69C43EA181D1500DFA0B795922D", "DE095D52618FF7EE7BF4C2DD8D8C0BF9", "9B2CE83CBAC130D24E7C89BAECC59F3A", "36092BF735E94F5BFD68F1FBB6D663D9", "9E5CD5E0F6584E9269B8FFBF9A496D41", "89D6AB19A90F7587C8338BB3C2051DE3", "0EA67212D04D4851F8DA477014DDFA99", "C257A97FA11EBDA3003D72C19BB533DD", "BD8028826E7F9DA47B8518A3B5386497", "E1BAF15B75DC689B84F2E967D91FD6E6", "9F3EC2518D792E46E0C250782B9BA291", "AE6682887FE2E1EEC2EE69B57A0D4344", "5BE9FBBDA796CE1D386A565DF68BD263"],
            "UiNSA0pucx5": ["A56749CCCB301CA28604EB3935E64FD5", "261EF4AFCD5F11F9DB5CE3435C284331", "307622C8D2233B0D547DBF237B87B230", "87CF2E20FB1459A30F6E4F45D92F5787", "B4A4F0524387D1FA5220D143E0DDDA35", "127F31DBFBA6E19534F55E2169E3CEF8", "54CC3E3CD1977C26532CE533B9DBE7D7", "46264C45DA41F0E444A1D5F28442D2D6", "2B719A822582B7CE6132877E13CC21D2", "5F1ACC83407D691DD1A456ED49FB7F9F"],
            "ZNwpWM0xDtS": ["2019-03-06T12:39:44.648Z", "2018-03-06T12:39:44.648Z", "2018-03-06T12:39:44.648Z"]
        }
    }
}

module.exports = {
    getRandomDataElementValues
}