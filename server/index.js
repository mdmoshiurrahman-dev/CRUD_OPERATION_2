import express from "express";
import "dotenv/config";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
const app = express();
app.use(cors());
app.use(express.json());
const port = "5000";
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

const client = new MongoClient(process.env.MONGODB_CONNECT);
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const connectedClient = await connectToMongoDB();
const database = connectedClient.db("crud_operation_recap");
const usersDataCollections = database.collection("users");
//! read all data from database
app.get("/", async (req, res) => {
  const cursor = usersDataCollections.find({});
  const data = await cursor.toArray();
  res.send(data);
});
//! read a specific (id wise) data from database
app.get("/:id", async (req, res) => {
  const query = await new ObjectId(req.params.id);
  const userData = await usersDataCollections.findOne(query);
  res.send(userData);
});
//! get data from front-end and create data into database
app.post("/", async (req, res) => {
  const data = req.body;
  const result = await usersDataCollections.insertOne(data);
  res.send(result);
});
//! delete a specific data from database using user id
app.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const result = await usersDataCollections.deleteOne(query);
  res.send(result);
});
//! update one user
app.patch("/:id", async(req, res) => {
  const filter = { _id: new ObjectId(req.params.id) };
  const updateData = req.body;
  console.log(updateData)
  const options = { upsert: true };
  const updateUser = {
    $set: {
      name: updateData.name,
      email: updateData.email,
    },
  };
  const result = await usersDataCollections.updateOne(filter, updateUser, options);
  res.send(result)
});
//*So i have learned --> Create,read,delete (CRD)
