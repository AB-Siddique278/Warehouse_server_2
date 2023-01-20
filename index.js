const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const { query } = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

/* --- MongoDB ---- */




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6hfog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
  try {
    const serviceCollection = client.db('fruits').collection('service');


    app.get('/service', async (req, res) => {

      const email = req.query.email;
      const query = { email: email };

      const cursor = serviceCollection.find(query);
      const service = await cursor.toArray();
      res.send(service);

  });

      // Allitems
  app.get('/allitems', async (req, res) => {
     
      
      const query = {};

      const cursor = serviceCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);

  });


  app.get('/service:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
  });


  //post items
  app.post('/service', async (req, res) => {
      const newSevice = req.body;
      const result = await serviceCollection.insertOne(newSevice)
      res.send(result);
  });

  //update items

  app.put('/service:id', async (req, res) => {
      const id = req.params.id;
      const updateItem = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
          $set: {
              quantity: updateItem.quantity
          }
      };
      const result = await serviceCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
  })


  //Delete items
  app.delete('/service/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await serviceCollection.deleteOne(query);
      res.send(result);

  });



  //quantaty

  app.put('/service:id', async (req, res) => {
      const id = req.params.id;
      const updateItem = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
          $set: {
              quantity: updateItem.quantity
          }
      };
      const result = await serviceCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
  })



  } finally {
  }
}

run().catch(console.log);

//Basic server start
app.get("/", async (req, res) => {
  res.send("Fruits Basket server is running");
});

app.listen(port, () => console.log(`Fruits Basket running on ${port}`));




