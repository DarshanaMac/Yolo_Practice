/// <reference types="Cypress"/>

const baseURL = "https://gorest.co.in";

describe('Go REST API Tests', () => {
    //Global access token
    let accessToken = '007526d9efdbc07e084ff7a6d4cfcc90588fbe20641c00faebf45a7f3b2eaf33'
    let randomText = ""
    let testEmail = ""

    // Get operations - verify Id=19 & Name =Gertie MacGyver
    it('fetches Users - GET', () => {
        cy.request('/public/v2/users/19').as('getUserRequest')
        cy.get('@getUserRequest').then(user => {
            expect(user.status).to.eq(200)
            expect(user.duration).to.be.lessThan(500)
                    cy.wrap(user.body).should('deep.include', {
                        id: 19,
                        name: 'Gertie MacGyver'
                    })
        })
    })


    // POST operation - 
    it.only('create user test', () => {
        var pattern = "8fb0ded2030eb603ba01dca828500a98854d549e1e09c7e9b429fedbe63ab07f"
        for (var i = 0; i < 10; i++)
        randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@gmail.com'

        cy.fixture('createuser').then((payload) =>{
            
            //1. create user (POST)
            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                body: {
                    "name": payload.name,
                    "gender": payload.gender,
                    "email": testEmail,
                    "status":payload.status
                }
   
            }).then((res)=>{
                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(201)
                expect(res.body.data).has.property('email', testEmail)
                expect(res.body.data).has.property('name',payload.name)
                expect(res.body.data).has.property('status',payload.status)
                expect(res.body.data).has.property('gender',payload.gender)
                cy.log("user id is: " + res.body.data.id)

                // GET operation - Verify created data
                cy.request({
                    method: 'GET',
                    url: 'https://gorest.co.in/public/v1/users/'+res.body.data.id,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then((res)=>{
                    expect(res.status).to.eq(200)
                    expect(res.body.data).has.property('id', res.body.data.id)
                    expect(res.body.data).has.property('name',payload.name)
                    expect(res.body.data).has.property('status',payload.status)
                    expect(res.body.data).has.property('email', testEmail)
                })
            })
        

        })

    })

})