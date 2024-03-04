// import express
const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
//Initailizing
const app = new express();
const multer = require('multer');
const db = require('./Connection/Database');
const registermodel = require('./registerdetails');
const ratingmodel = require('./ratingdetails');
const typemodel = require('./type');
const { userRouter } = require('./src/routes/user.route');
require('dotenv').config();
const upload = require('./upload');
const fs = require('fs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
    cookieSession({
        signed: false,
        secure: false,
        httpOnly: false,
    })
);
//Api Creation
app.get('/', (request, response) => {
    response.send('hai udith');
});

app.use('/user', userRouter);

//For Submit button
app.post('/new', upload.single('image'), (request, response) => {
    // Assuming 'image' is the key used in FormData for the file
    console.log(request.body); // The form fields
    console.log(request.file); // The uploaded file
  
    // Read the image file and convert it to base64
    const imageBuffer = fs.readFileSync(request.file.path);
    const base64Image = imageBuffer.toString('base64');

     
  
    // Save the data to the database using your model (registermodel)
    new registermodel({
      restuarantid: request.body.restuarantid,
      restuarant: request.body.restuarant,
      cuisine: request.body.cuisine,
      type: request.body.type,
      rating: request.body.rating,
      contactno: request.body.contactno,
      manager: request.body.manager,
      nooftables: request.body.nooftables,
      country: request.body.country,
      state: request.body.state,
      district: request.body.district,
      userid: request.body.userid,
      password: request.body.password,
      status: request.body.status,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      image: base64Image, // Save the base64 representation of the image
    }).save();
  
    // Remove the temporary file created by multer
    fs.unlinkSync(request.file.path);
  
    response.send('Record Successfully Saved');
});
  

//for viewing
app.get('/view', async (request, response) => {
    var data = await registermodel.find();
    response.send(data);
});
//for delete
app.put('/remove/:id', async (request, response) => {
    let id = request.params.id;
    await registermodel.findByIdAndUpdate(id, { $set: { status: 'INACTIVE' } });
    response.send('Record deleted');
});

app.put('/sedit/:id', async (request, response) => {
    let id = request.params.id;
    await registermodel.findByIdAndUpdate(id, request.body);
    response.send('Record Deleted');
});

//rating submit rate
app.post('/rate', (request, response) => {
    console.log(request.body);
    new ratingmodel(request.body).save();
    response.send('Record Sucessfully Saved');
});
//type submit
app.post('/type', (request, response) => {
    console.log(request.body);
    new typemodel(request.body).save();
    response.send('Record Sucessfully Saved');
});
// for retriving data

app.get('/rview', async (request, response) => {
    const result = await ratingmodel.aggregate([
        {
            $lookup: {
                from: 'registers', // Name of the other collection
                localField: 'rating', // field of item
                foreignField: '_id', //field of category
                as: 'stud',
            },
        },
    ]);
    response.send(result);
});

app.get('/search', async (request, response) => {
const query = request.params.query; // Access the route parameter correctly
try {
const result = await registermodel
.find({district: {$regex: query, $options: 'i'}})
.limit(10)
.select('-_id'); // Exclude _id field, you can include/exclude fields as nee
response.json(result); } catch (error) {
response.status(500).json({ message: error.message });
}
});

//for type
app.get('/tview', async (request, response) => {
    var data = await typemodel.find();
    response.send(data);
});

//Assign Port
app.listen(3005, (request, response) => {
    console.log('Port is running in 3005');
});
