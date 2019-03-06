const _ = require('lodash');

const {
    getRandomDataElementValues,
    getRandomEvent,
    uploadRandomEvents
} = require('./helpers/index');

const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + new Buffer('admin:district').toString('base64')
};
const serverUrl = 'https://amr.dhis2.site/cdp_cx3';
//const organisationUnitIds = ["DiszpKrYNg8", "g8upMTyEZGZ"];
const organisationUnitIds = getOus();
const program = "PI7qwgoIpq8";
const programStage = "CcPf9cIg1zc"

startApp();

async function startApp() {
    for (const organisationUnitId of organisationUnitIds) {
        const events = []
        for (let index = 0; index < 30; index++) {
            const dataValues = getRandomDataElementValues(program);
            const event = getRandomEvent(organisationUnitId, program, programStage, dataValues);
            events.push(event);
        }
        console.log(`Uploading ${events.length} events for ${organisationUnitId}`);
        const {
            httpStatus,
            httpStatusCode,
            imported,
            updated,
            deleted,
            ignored
        } = await uploadRandomEvents(serverUrl, headers, {
            events
        });
        console.log(JSON.stringify({
            httpStatus,
            httpStatusCode,
            imported,
            updated,
            deleted,
            ignored
        }))
    }
}

function getOus() {
    return ["GvFqTavdpGE", "rx9ubw0UCqj", "FLjwMPWLrL2", "jNb63DIHuwU", "y5hLlID8ihI", "UGVLYrO63mR", "Wr8kmywwseZ", "WAjjFMDJKcx", "rZxk3S0qN63", "VfZnZ6UKyn8", "vRC0stJ5y9Q", "AXZq6q7Dr6E", "EJoI3HArJ2W", "E497Rk80ivZ", "wByqtWCCuDJ", "K3k64jslIlL", "sK498nBOLfQ", "ZpE2POxvl9P", "Q23tMsKOoO6", "jfV49JGnYKF", "r4W2vzlmPhm", "Ioxjc2KBjWd", "qqF8jshIs66", "eRg3KZyWUSJ", "ei21lW7hFPX", "jGYT5U5qJP6", "ctMepV9p92I", "r93q83kZoR9", "E9oBVjyEaCe", "tGf942oWszb", "i7qaYfmGVDr", "k1Y0oNqPlmy", "TSyzvBiovKh", "azRICFoILuh", "jhtj3eQa1pM", "KR0jLuFOB3d", "NLN0MvWv9tl", "VrDA0Hn4Xc6", "l2kZRcJjomr", "jk1TtiBM5hz", "Umh4HKqqFp6", "vELbGdEphPd", "RzgSFJ9E46G", "GjWQK6UA4FO", "CTOMXJg41hz", "AlG0apJE5cm", "yh1PrRTboyg", "cJkZLwhL8RP", "egv5Es0QlQP", "uROAmk9ymNE", "JiEz2VDLwHY", "kRWIof0qPJj", "m73lWmo5BDG", "mwN7QuEfT8m", "RTixJpRqS4C", "mGmu0GJ5neg", "DcmSvQd5N8c", "bM4Ky73uMao", "S7KwVLbFlss", "pMEnu7BjqMz", "rozv5QUSE7a", "k6DIO9LIEk9", "ltF8BmYAXpQ", "w3vRmEz3J7t", "lOv6IFgr6Fs", "Z9ny6QeqsgX", "hLGkoHmvBgI", "KvE0PYQzXMM", "kLNQT4KQ9hT", "ptc0SQi05E4", "Qu0QOykPdcD", "EuoA3Crpqts", "Pae8DR7VmcL", "YWXXO0XMkQe", "bqtZrXoryDF", "hyLU8ivDJDi", "xt08cuqf1ys", "am6EFqHGKeU", "fA43H8Ds0Ja", "PC3Ag91n82e", "kMTHqMgenme", "KQFAul3T9xz", "ZsjXrmZS59z", "aBfyTU5Wgds", "UOJlcpPnBat", "rm60vuHyQXj", "mzsOsz0NwNY", "CvBAqD6RzLZ", "DiszpKrYNg8", "al4GkB6X2X3", "hoJ0Do9loZl", "wwM3YPvBKu2", "aSnKB1sWaz4", "p9ZtyC3LQ9f", "WOk7efLlLSj", "IHa6fsNWsOZ", "QsAwd531Cpd", "g8upMTyEZGZ", "tSBcgrTDdB8", "KfUCAQoOIae", "wtdBuXDwZYQ", "PuZOFApTSeo", "H0OkaM4ReRK", "DqfiI6NVnB1", "lvxIJAb2QJo", "prNiMdHuaaU", "Tht0fnjagHi", "roQ2l7TX0eZ", "jCnyQOKQBFX", "W2KnxOMvmgE", "kEkU53NrFmy", "kFur7xPhpH9", "erqWTArTsyJ", "gfWvbbgdjoS", "KYXbIQBQgP1", "bG0PlyD0iP3", "UugO8xDeLQD", "Ykx8Ovui7g0", "tZxqVn3xNrA", "AnXoUM1tfNT", "nX05QLraDhO", "QDoO5r6Sae7", "dx4NOnoGtE7", "RhJbg8UD75Q", "EFTcruJcNmZ"]

}