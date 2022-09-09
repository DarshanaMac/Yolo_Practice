/// <reference types="cypress"/>

import gamesPage from "../../pages/gamesPage"

const searchQuery = "Sic Bo"
const filterOption = "Sic Bo"

describe('Verify game page features', () => {

    beforeEach( () => {
        cy.visit("https://hub88.io/games")
    })

    it('Verify search', () => {
        gamesPage.enterSearchQuery(searchQuery)
        gamesPage.elements.gameTitleLabels()
        .should('be.visible')
        .should('have.length', 4)
        .should('contain.text', searchQuery)
    })

    it('Verify filter', () => {
        gamesPage.clickFilterBtn()
        gamesPage.clickFilterOption(filterOption)
        gamesPage.elements.filterButton().should('contain.text', "(1)")
        // gamesPage.elements.gameTitleLabels()
        // .each((item) => {
        //     cy.wrap(item).should('contain.text', filterOption)
        // })
    })
})