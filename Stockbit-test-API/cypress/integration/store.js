describe('Store', function(){
    it('GET', function(){
        cy.request({
            method : 'GET',
            url : 'https://petstore.swagger.io/v2/store/inventory',
        }).then(function(response){
            expect(response.body).have.property('string')
        })
    })

    it('POST GETID DELETE', function(){
        cy.request({
            method : 'POST',
            url : 'https://petstore.swagger.io/v2/store/order',
            body : {
                'id': 1,
                'petId': 1,
                'quantity': 1,
                'shipDate': '2022-03-25T07:54:47.331Z',
                'status': 'placed',
                'complete': true
            },
            headers : {
                'content-type' : 'application/json'
            }
        }).then(function(response){
            expect(response.body).have.property('id')
        }).then(function(response){
            const postid = response.body.id
            cy.log("post id is : " + postid) 
            cy.request({
                method : 'GET',
                url : 'https://petstore.swagger.io/v2/store/order/' + postid,
            }).then(function(response){
                expect(response.body).have.property('id')
                expect(response.body.id).to.equal(postid)
            })
        }).then(function(response){
            const postid = response.body.id
            cy.log("post id is : " + postid) 
            cy.request({
                method : 'DELETE',
                url : 'https://petstore.swagger.io/v2/store/order/' + postid,
            }).then(function(response){
                expect(response.body).have.property('message')
                expect(response.body.code).to.equal(200)
                expect(response.body.message).to.equal(postid.toString())
            })
        })
    })

  })