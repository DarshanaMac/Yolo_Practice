/// <reference types="cypress"/>

//Load page objects
import gamesPage from "../../pages/gamesPage"

//test data
const searchQuery = "Sic Bo"
const filterOption = "Sic Bo"

describe('Verify game page features', () => {

    //Load initial page
    beforeEach( () => {
        cy.visit("https://hub88.io/games")
    })

    // 1st test - search games
    it('Verify search', () => {
        gamesPage.enterSearchQuery(searchQuery)
        gamesPage.elements.gameTitleLabels()
        .should('be.visible')
        .should('have.length', 4)
        .should('contain.text', searchQuery)
    })

    // 2nd test - filter games
    it('Verify filter', () => {
        gamesPage.clickFilterBtn()
        gamesPage.clickFilterOption(filterOption)
        gamesPage.elements.filterButton().should('contain.text', "(1)")
      
    })
})