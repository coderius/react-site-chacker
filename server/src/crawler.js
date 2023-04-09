import * as cheerio from 'cheerio';
import axios from 'axios';

export class Crawler {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async find() {
        try {
            const { data } = await axios.get(this.baseUrl);
            const $ = cheerio.load(data);
            const linkObjects = $('a');
            const links = [];
            linkObjects.each((index, element) => {
                links.push({
                    //text: $(element).text(), // get the text
                    href: $(element).attr('href'), // get the href attribute
                });
            });
            return await Promise.resolve(links);
            // return links;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}