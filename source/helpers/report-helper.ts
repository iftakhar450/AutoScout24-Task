import fs from 'fs';
import csvPaeser from 'csv-parser';
import _ from 'underscore';
import currency from 'currency.js'

/** read  contacts file */
const readContacts = () => {
    try {
        let contacts: any = [];
        fs.createReadStream('./source/uploads/contacts.csv')
            .pipe(csvPaeser())
            .on('data', (data) => contacts.push(data))
            .on('end', () => {
            });
        return contacts;
    } catch (e) {
        return e
    }

}

/**read listing file */
const readlistings = () => {
    try {
        let listings: any = [];
        fs.createReadStream('./source/uploads/listings.csv')
            .pipe(csvPaeser())
            .on('data', (data) => listings.push(data))
            .on('end', () => {
            });

        return listings;

    } catch (e) {
        return e
    }

}


/**Price Formatter */
const EURO = (value: number) => currency(value, { symbol: '€', decimal: ',', separator: '.' });


/** Calcaulate avarage of seller */
const calculateAvarage = (arr: any) => {
    try {
        return _.chain(arr)
            .groupBy('seller_type')
            .map(function (g, k) {
                return {
                    name: k,
                    avarage_price: EURO(_.chain(g)
                        .pluck('price')
                        .reduce(function (x, y) {
                            return Number(x) + Number(y)
                        })
                        .value() / g.length).format()
                };
            }).value();
    } catch (e) {
        return e
    }


}



export default {
    readContacts,
    readlistings,
    EURO,
    calculateAvarage
}

