describe('User',function(){
    const username = "belnathen12"
    const id = 123
    it('REGISTER',function(){
        cy.request({//REGISTER
            method : 'POST',
            url : 'https://petstore.swagger.io/v2/user',
            body : {
                    "id": id,
                    "username": username,
                    "firstName": "bellmiro",
                    "lastName": "nathen",
                    "email": "string",
                    "password": "bellmiro",
                    "phone": "08197346",
                    "userStatus": 0
            },
            headers : {
                'content-type' : 'application/json'
            }
        }).then(function(res){
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq(id.toString())
        })
    })

    it('LOGIN LOGOUT',function(){
        cy.request({//LOGIN
            method : 'GET',
            url : 'https://petstore.swagger.io/v2/user/login?username=belnathen12&password=bellmiro',
        }).then(function(res){
            expect(res.status).to.eq(200)
        })
        
        .then(function(){//LOGOUT
            cy.request({
                method : 'GET',
                url : 'https://petstore.swagger.io/v2/user/logout',
            }).then(function(res){
                expect(res.status).to.eq(200)
            })
        })
    })

    it('GET PUT DELETE USERNAME',function(){
        cy.request({//GETusername
            method : 'GET',
            url : 'https://petstore.swagger.io/v2/user/' + username,
        }).then(function(res){
            expect(res.status).to.eq(200)
            expect(res.body.username).to.eq(username)
        })

        .then(function(){
            cy.request({//PUTusername
                method : 'PUT',
                url : 'https://petstore.swagger.io/v2/user/' + username,
                body : {
                    "id": id,
                    "username": username,
                    "firstName": "bellmiro",
                    "lastName": "nathen",
                    "email": "string",
                    "password": "bellmiro",
                    "phone": "08197346",
                    "userStatus": 0
                },
                headers : {
                    'content-type' : 'application/json'
                }
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.message).to.eq(id.toString())
            })
        })

        .then(function(){//DELETEusername
            cy.request({
                method : 'DELETE',
                url : 'https://petstore.swagger.io/v2/user/' + username,
            }).then(function(res){
                expect(res.status).to.eq(200)
            })
        })
    })

    it('POST ARRAY POST LIST',function(){
        cy.request({//POST ARRAY
            method : 'POST',
            url : 'https://petstore.swagger.io/v2/user/createWithArray',
            body : [
                {
                "id": 123,
                "username": "belnathen12",
                "firstName": "bellmiro",
                "lastName": "nathen",
                "email": "string",
                "password": "bellmiro",
                "phone": "08197346",
                "userStatus": 0
                }
              ],
            headers : {'content-type' : 'application/json'}
        }).then(function(res){
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq('ok')
        })

        .then(function(){
            cy.request({
                method : 'POST',
                url : 'https://petstore.swagger.io/v2/user/createWithList',
                body : [
                    {
                    "id": 12,
                    "username": "belnathen12",
                    "firstName": "bellmiro",
                    "lastName": "nathen",
                    "email": "string",
                    "password": "bellmiro",
                    "phone": "08197346",
                    "userStatus": 0
                    },
                    {
                    "id": 123,
                    "username": "belnathen123",
                    "firstName": "bellmiro",
                    "lastName": "nathen",
                    "email": "string",
                    "password": "bellmiro",
                    "phone": "08197346",
                    "userStatus": 0
                    },
                    {
                    "id": 1234,
                    "username": "belnathen1234",
                    "firstName": "bellmiro",
                    "lastName": "nathen",
                    "email": "string",
                    "password": "bellmiro",
                    "phone": "08197346",
                    "userStatus": 0
                    }
                  ],
                headers : {
                    'content-type' : 'application/json'
                }
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.message).to.eq('ok')
            })
        })
    })
})