const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2323
//This code establishes the connection to the mongo database with connection string
//generated after after connecting to the cluster on mongo atlas site
//'favRapper' is the name of the database created.
const dbConnectionStr = 'mongodb+srv://Ben:PsIbO28DR2Hrgllj@cluster0.y1kynh1.mongodb.net/?retryWrites=true&w=majority'
const dbName = 'rappers';

MongoClient.connect( dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`connected to ${dbName} Database`)
        db = client.db(dbName)
    })
   

//These are the packages we use after requiring from express
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



//THE BLOCKS OF CODE BELOW ARE THE API THAT PERFORM THE CRUD OPERATIONS
//POST - C(CREATE)
//GET - R(READ/RETRIEVE)
//PUT - R(UPDATE)
//DELETE - D(DELETE)

//This get api is responsible for finding the collection(it's like a table in SQL)
//called rappers,it also finds the documents(data) within the collection and stores
//the data in an Array.
//It then passes the array to another array called info inside the index.ejs
//the index.ejs is then sent to the client as response.
//the / represents the home page.
app.get('/', (request, response)=>{
    db.collection('rappers').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

//This post api is responsible for creating or inserting a new document inside the
//favRapper database when a user enters the names of a rapper into the input fields
//in the form within the index.ejs file
app.post('/addRapper', (request, response) => {
    db.collection('rappers').insertOne(request.body)
    .then(result => {
        console.log('Rapper Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})


//When a user deletes a rapper from the list, the event listener on the delete 
//is triggered a function run which grabs the stagename and birth name of the rapper to 
//be deleted and passes into into the fetch request in the same function.
//When the names get to this api, theyre compared to the names in the favRapper DB
//if a particular document's name matches with the names in 'request.body.stageNameS'
//that document will be deleted from the database. 
app.delete('/deleteRapper', (request, response) =>{
    db.collection('rappers').deleteOne({stageName: request.body.stageNameS})
    .then(result => {
        console.log('Rapper Deleted')
        response.json('Rapper Deleted')
    })
    .catch(error => console.error(error))
})

//This listen api enables this server to listen for requests from the client
//side/machines.
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

