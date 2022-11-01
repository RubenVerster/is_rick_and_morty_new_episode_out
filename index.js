const puppeteer = require('puppeteer');

(async () => {

    const episode = process.argv.slice(2)[0];
    console.log(episode);
    const browser = await puppeteer.launch(
        {
            headless: false,
        }
    );
    const page = await browser.newPage();
    await page.goto('https://thepiratebay.party/top/208');

    const links = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('td > a'));
        return anchors.map(anchor => anchor.href);
    });

    filteredLinks = links.filter(link => link.includes(episode));

    if (filteredLinks.length > 0) {

        await page.goto(filteredLinks[0]);
    }

    if (filteredLinks.length == 0) {
        //close browser
        console.log('Not out yet...')
        await browser.close();
    }
})();