import * as cheerio from 'cheerio';
import axios from 'axios';

export class Crawler {

    constructor(crawledUrl) {
        this.crawledUrl = crawledUrl;
        this.url = new URL(crawledUrl);
        this.hostname = this.url.hostname;
        this.origin = this.url.origin;
    }

    async find() {
        try {
            const { data } = await axios.get(this.crawledUrl);
            const $ = cheerio.load(data);
            const linkObjects = $('a');
            const links = [];
            linkObjects.each((index, element) => {
                let href = $(element).attr('href');
                let noHref = (href === undefined);
                href = noHref ? "" : href;
                links.push({
                    tag: $.html(element),
                    html: $(element).html(),
                    text: $(element).text(), // get the text
                    href: $(element).attr('href'), // get the href attribute
                    // rel: $(element).attr('rel') || false,//Required. Specifies the relationship between the current document and the linked document
                    // title: $(element).attr('title') || false,
                    // onClick: $(element).attr('onClick') || false,
                    // target: $(element).attr('target') || false,
                    // type: $(element).attr('type') || false,//media_type	Specifies the media type of the linked document
                    // media: $(element).attr('media') || false,//media_query	Specifies on what device the linked document will be displayed
                    // class: $(element).attr('class') || false,
                    // style: $(element).attr('style') || false,

                    isRelativeUrl: !this.isAbsoluteUrl(href),
                    isAbsoluteUrl: this.isAbsoluteUrl(href),
                    isLinkInternal: this.isLinkInternal(href),
                    hash: this.getHash(href),
                    url: this.hanldeRelativeUrl(href),
                    attributes: $(element).attr(),
                    noHref: noHref
                });
            });
            return Promise.resolve(links);
            // return links;
        } catch (error) {
            console.log(error);
            return Promise.reject(error.message);
        }
    }

    hanldeRelativeUrl(url) {
        if (this.isAbsoluteUrl(url)) return url;
        if (url.startsWith('/')) return this.origin + url;
        if (url.startsWith('/') === false) return this.origin + '/' + url;
        return this.crawledUrl + '/' + url;
    }

    isAbsoluteUrl(url){
        if(url === undefined) return false;
        return (url.indexOf(this.hostname) !== -1 || url.startsWith('http'));
    }

    hasHash(url){
        if(url === undefined) return false;
        return (url.indexOf('#') !== -1);
    }

    getHash(url){
        if(this.hasHash(url)){
            return '#' + url.split('#')[1];
        }
        return false;
    }

    isLinkInternal(url){
        const u = this.hanldeRelativeUrl(url);
        const nu = new URL(u);
        return nu.origin == this.origin;
    }



}