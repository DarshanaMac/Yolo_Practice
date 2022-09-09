class gamesPage
{
    elements = {
        searchInput: () => cy.get('.form > .jsx-203636932'),
        gameTitleLabels: () => cy.get('.information'),
        filterButton: () => cy.xpath('//button[text()="Filter"]'),
        filterOptionChkBx: (option) => cy.xpath('//label[text()="'+option+'"]/input')
    }

    enterSearchQuery(query)
    {
        this.elements.searchInput().should('be.visible').should('be.enabled').type(query)
    }

    clickFilterBtn()
    {
        this.elements.filterButton().should('be.enabled').click()
    }

    clickFilterOption(option)
    {
        this.elements.filterOptionChkBx(option).should('be.enabled').click({force:true})
    }
}

module.exports = new gamesPage()

require('cypress-xpath')