const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5000;
const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/project');
const reportRoutes = require('./routes/report');
const uri = 'mongodb+srv://Kanban-User:ZAQ%212wsx@kanban-arkwo.mongodb.net/time-reporting-app?retryWrites=true&w=majority'

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established succesfully")
})

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/reports', reportRoutes);


app.listen(PORT, function(){
    console.log("Server is running on port: " + PORT);
});