const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
    driver = new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
    await driver.quit();
})

describe('Test the Movie App', () =>{    
    test('add a movie', async ()=>{
        await driver.get('http://localhost:3000')
        await driver.findElement(By.id('add-movie-input')).sendKeys('Tron: Legacy',Key.RETURN);
        const movie = await driver.wait(until.elementLocated(By.css('#movies-list li label')),1000)

        expect(await movie.getText()).toBe('Tron: Legacy')
    })
    test('delete movie', async ()=>{
        let deletedMovie = await driver.findElement(By.className('delete-btn'))

        await deletedMovie.click()

        let message = await driver.findElement(By.id('message')).isDisplayed()

        await driver.sleep(2000)

        expect(message).toBe(true)
        
    })
})