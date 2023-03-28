const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors= require("cors");
const loginSchema=require("./mongoSchema");
const mongoose=require("mongoose");


mongoose.connect("mongodb+srv://suman:oHy9PfeRXPQ2lfhu@cluster0.xzzuzad.mongodb.net/imagiNet")
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use(express.json());
app.use(cors());


app.post('/api/login', async (req, res) => {
  const { name, mobile, email } = req.body;
  // Validate input
  if (!name || !mobile || !email) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (!/^[0-9]{10}$/.test(mobile)) {
    return res.status(400).json({ message: 'Invalid mobile number.' });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }
  // Create user record and generate JWT token
  const user = { name, mobile, email };
  const token = jwt.sign(user,"suman");
  await loginSchema.create(user)

  res.json({ token });

});

app.get('/get',async(req, res) => {
    try {
        let token=req.headers["x-api-key"]

        let dcodeToken= jwt.verify(token,"suman")
        
        let email = dcodeToken.email

        let checkUser = await loginSchema.findOne({email})

        return res.status(200).send({ status: true, message: "User profile details", data: checkUser })

    } catch (err) {
        return res.status(500).send({ satus: false, message: err.message })
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))