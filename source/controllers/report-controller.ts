import { Request, Response, NextFunction } from 'express';
import _ from 'underscore';
import helper from './../helpers/report-helper'

const NAMESPACE = 'Report Controller';

/** Reading listing and Contacts */
let contacts: any = helper.readContacts();
let listings: any = helper.readlistings();

/**Average Listing Selling Price per Seller Type Report Function */
const reportOne = async (req: Request, res: Response, next: NextFunction) => {
    if (listings && listings.length > 0) {
        return res.status(200).json(helper.calculateAvarage(listings))

    } else {
        return res.status(200).json({ message: 'Listing file have no data' })

    }
}

/** Percentual distribution of available cars by Make */
const reportTwo = async (req: Request, res: Response, next: NextFunction) => {
    let percent_make: any = [];
    let groups = _.groupBy(listings, 'make');
    Object.keys(groups).forEach(element => {
        let obj = {
            make: element,
            percentage: Math.round((groups[element].length / listings.length) * 100) + '%',
        }
        percent_make.push(obj);
    });
    return res.status(200).json(percent_make)
}

/**Average price of the 30% most contacted listings */
const reportThree = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: 'Average price of the 30% most contacted listings' })
}


/** Group by function for listing contacts */
const groupByListingContacts = (data: any, keys: any) => {
    let groupedListingCount = keys.map((key: any) => {
        return Object.values(data.data.reduce((result: any, obj: any) => {
            let objKey = obj[key]
            let detail = _.where(listings, { id: objKey })[0];
            result[objKey] = result[objKey] || { count: 0, id: objKey, make: detail.make, price: helper.EURO(detail.price).format(), mileage: detail.mileage };
            result[objKey].count += 1;
            return result
        }, {}))
    })
    groupedListingCount[0].sort(function (a: any, b: any) { return b.count - a.count });
    let finalResult = groupedListingCount[0].slice(0, 5);
    return finalResult;
}

/**The Top 5 most contacted listings per Month */
const reportFour = async (req: Request, res: Response, next: NextFunction) => {
    let array: any = contacts;
    let response: any = [];
    // grouping the contacts array by month 
    let contacts_group = array.reduce(function (r: any, o: any) {
        let d: any = new Date(Number(o.contact_date)).toISOString();
        let date = d.split(('-'));
        (r[date[1]]) ? r[date[1]].data.push(o) : r[date[1]] = { group: String(date[1] + '-' + date[0]), data: [o] };
        return r;
    }, {});

    // mapping with listing list with contact list  to get the top five contacted listing per month
    let result = Object.keys(contacts_group).map(function (k) { return contacts_group[k]; });
    result.forEach(element => {
        let countListing = groupByListingContacts(element, ["listing_id"]);
        let obj = {
            month: element.group,
            data: countListing
        }
        response.push(obj);
    });
    return res.status(200).json(response);
}


export default {
    reportOne,
    reportTwo,
    reportThree,
    reportFour
};