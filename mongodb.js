const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
console.log(id.id.length);
console.log(id.getTimestamp());
console.log(id.toHexString().length);

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database');
    }
    const db = client.db(databaseName);
    console.log('Connected correctly!');
    //#region Create
    db.collection('users').insertOne({
        _id:id,
        name:'Parul',
        age : 27
    },(error,result)=>{
        if(error){
            return console.log('Unable to insert user');
        }
        console.log(result.ops);

    });
    db.collection('users').insertMany([
        {
            name: 'Rahul',
            age: 10
        }, {
            name: 'John',
            age: 44
        }
    ],(error,result)=>{
        if(error){
            return console.log('Cannot insert multiple items');
        }
        console.log(result.ops);

    });

    db.collection('players').insertMany([
        {
            name: 'John',
            sport: 'Badminton'
        }, {
            name: 'Lisa',
            sport: 'VolleyBall'
        }, {
            name: 'Teresa',
            sport: 'Cricket'
        }
    ],(error,result)=>{
        if(error){
            return console.log('Error Submitting multiple IDs');
        }
        console.log(result.ops);
    });
    //#endregion


    //#region Read
    db.collection('users').findOne({_id: new ObjectID('5cbe9a02e26c0b13702c16e3')},(error,user)=>{
        if(error){
            return console.log('Unable to fetch user');
        }
      console.log(user);
    })
    db.collection('users').find({age : 27}).toArray((error,users)=>{
        console.log(users);
    });
    db.collection('players').findOne({_id : new ObjectID('5cbdb7bfea34f71d606ad5aa')},(error,player)=>{
        if(error){
            return console.log('Unable to fetch player');
        }
        console.log(player);
    })
    db.collection('players').find({sport :'Cricket'}).toArray((error,players)=>{
        if(error){
            return console.log('Unable to fetch player');
        }
        console.log(players);
    })
    //#endregion

    //#region Update
       db.collection('users').updateOne({_id: new ObjectID('5cbdb57036b9301c2060da91')},{
           $inc :{
               age :77
           }
       })
       .then(result=>{
          console.log(result);
       })
       .catch(err=>console.log(err))

    db.collection('users').updateMany({ age: 27 }, {
        $set: {
            age: 31
        }
    }).then(res => console.log(res)
    )
        .catch(e => console.log(e)
        )
    //#endregion

    //#region Delete
    db.collection('users').deleteMany({ age: 31 })
    .then(res => { console.log(res) })
    .catch(e => console.log(e))
   //#endregion
});