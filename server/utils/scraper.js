const axios = require('axios');
const cheerio = require('cheerio');

const scrapeMetadata = async (url) => {
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        const $ = cheerio.load(data);
        
        const getMetaTag = (name) => 
            $(`meta[property="${name}"]`).attr('content') || 
            $(`meta[name="${name}"]`).attr('content') || 
            '';

        const metadata = {
            title: getMetaTag('og:title') || $('title').text() || '',
            description: getMetaTag('og:description') || getMetaTag('description') || '',
            image: getMetaTag('og:image') || '',
            siteName: getMetaTag('og:site_name') || ''
        };

        return metadata;
    } catch (error) {
        console.error('Scraping Error:', error.message);
        return {
            title: '',
            description: '',
            image: '',
            siteName: ''
        };
    }
};

module.exports = scrapeMetadata;
