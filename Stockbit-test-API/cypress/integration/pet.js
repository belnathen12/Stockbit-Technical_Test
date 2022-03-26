describe('PET', function(){
    it('POST PUT GETID DELETE', function(){//POST
        cy.request({
            method : 'POST',
            url : 'https://petstore.swagger.io/v2/pet',
            body : {
                    'id': 123,
                    'category': {
                      'id': 123,
                      'name': 'yeji'
                    },
                    'name': 'yeji',
                    'photoUrls': [
                      'https://cdns.klimg.com/kapanlagi.com/p/yejiitzy1.jpg'
                    ],
                    'tags': [
                      {
                        'id': 123,
                        'name': 'string'
                      }
                    ],
                    'status': 'available'
            },
            headers : {
                'content-type' : 'application/json'
            }
        }).then(function(response){
            expect(response.body).have.property('id')
        })

        .then(function(response){ //PUT
            const petid = response.body.id
            cy.log('pet id is : ' + petid) 
            cy.request({
                method : 'PUT',
                url : 'https://petstore.swagger.io/v2/pet',
                body : {
                    'id': 123,
                    'category': {
                      'id': 123,
                      'name': 'yeji'
                    },
                    'name': 'yeji',
                    'photoUrls': [
                      'https://cdns.klimg.com/kapanlagi.com/p/yejiitzy1.jpg'
                    ],
                    'tags': [
                      {
                        'id': 123,
                        'name': 'string'
                      }
                    ],
                    'status': 'available'
                    },
                    headers : {
                        'content-type' : 'application/json'
                    }
            }).then(function(response){
                expect(response.body).have.property('id')
                expect(response.body.id).to.equal(petid)
            })
        })
        
        .then(function(response){//GET
            const petid = response.body.id
            cy.log('pet id is : ' + petid) 
            cy.request({
                method : 'GET',
                url : 'https://petstore.swagger.io/v2/pet/' + petid,
            }).then(function(response){
                expect(response.body).have.property('id')
                expect(response.body.id).to.equal(petid)
            })
        })
        
        .then(function(response){//DELETE
            const petid = response.body.id
            cy.log("pet id is : " + petid) 
            cy.request({
                method : 'DELETE',
                url : 'https://petstore.swagger.io/v2/pet/' + petid,
            }).then(function(response){
                expect(response.body).have.property('message')
                expect(response.body.code).to.equal(200)
                expect(response.body.message).to.equal(petid.toString())
            })
        })
    })
    it('POSTFILE', function () {
        const fileName = 'image.jpg';
        const method = 'POST';
        const url = 'https://petstore.swagger.io/v2/pet/123/uploadImage';
        const fileType = 'image/jpeg';

        // Get file from fixtures as binary
        cy.fixture(fileName, 'binary').then( (imageBin) => {

            // File in binary format gets converted to blob so it can be sent as Form data
            const blob = Cypress.Blob.binaryStringToBlob(imageBin, fileType);

                // Build up the form
                const formData = new FormData();
                formData.set('file', blob, fileName); //adding a file to the form
                
                // Perform the request
                cy.form_request(method, url, formData, function (response) {
                    expect(response.status).to.eq(200);
                });
            
        })
    })

    it('GETBYSTATUS',function(){//GETBYSTATUS
        cy.request({
            method : 'GET',
            url : 'https://petstore.swagger.io/v2/pet/findByStatus?status=available',
        }).then(function(response){
            expect(response.status).to.eq(200);
        })
    })

    it('POST POSTwithParamtoEdit', function(){
        cy.request({//POST
            method : 'POST',
            url : 'https://petstore.swagger.io/v2/pet',
            body : {
                    'id': 12,
                    'category': {
                      'id': 12,
                      'name': 'yeji'
                    },
                    'name': 'yeji',
                    'photoUrls': [
                      'https://cdns.klimg.com/kapanlagi.com/p/yejiitzy1.jpg'
                    ],
                    'tags': [
                      {
                        'id': 12,
                        'name': 'string'
                      }
                    ],
                    'status': 'available'
            },
            headers : {
                'content-type' : 'application/json'
            }
        }).then(function(response){
            expect(response.body).have.property('id')
            expect(response.status).to.eq(200)
        })

        cy.request({
            method : 'POST',
            url : 'https://petstore.swagger.io/v2/pet/12?name=test&status=sold',
            // headers : {'content-type' : 'application/x-www-form-urlencoded'},
        }).then(function(response){
            expect(response.status).to.eq(200)
            expect(response.body.message).to.equal('12')
        })
    })

})