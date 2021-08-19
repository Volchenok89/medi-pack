const dbHelper = require('./dbHelper');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
var cors = require('cors');
const config = require('./config');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.tokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } 
    else {
        res.sendStatus(401);
    }
};

app.post('/user/signup', async function (req, res) {
    

    try {
        let result = await dbHelper.getUserByUsername(req.body.username);

        if (result != null) {
            
            res.send({
                status: "success",
                created: "username taken"
            });
        }
        else {

            let result = await dbHelper.createUser(req.body);

            res.send({
                status: "success",
                created: "created",
                userId: result.insertedId
            });
        }
    }
    catch (error) {
        res.send({
            status: "error",
        });
    }
});

app.post('/user/login', async function (req, res) {

    try {
        let result = await dbHelper.getUser(req.body.username, req.body.password);
        
        if (result != null) {

            const accessToken = jwt.sign({ username: req.body.username,  userType: result.userType, userId: result._id }, config.tokenSecret, {
                expiresIn: '365d' // expires in 365 days
            });

            res.send({
                status: "success",
                userType: result.userType,
                userId: result._id,
                valid: true,
                token: accessToken
            });
        }
        else {
            res.send({
                status: "success",
                valid: false
            });
        }
    }
    catch (error) {
        res.send({
            status: "error",
        });
    }
});

app.get('/doctors', authenticateJWT, async (req, res) => {

    try {
        let result = await dbHelper.getDoctors();
        
        res.send({
            status: "success",
            doctors: result
        });
    }
    catch (error) {
        res.send({
            status: "error",
            error: error.message
        });
    }
});

app.post('/bookappointment', authenticateJWT, async (req, res) => {

    try {
        
        let appointments = await dbHelper.appointmentSlotOccupied(req.body.doctorUsername, req.body.date, req.body.time);
        
        if (appointments != null) {
            res.send({
                status: "success",
                appointment: "already taken"
            });
            return;
        }

        let data = req.body;
        data.patientUsername = req.user.username;
        await dbHelper.bookAppointment(data);

        res.send({
            status: "success",
            appointment: "created"
        });
    }
    catch (error) {
        res.send({
            status: "error",
            error: error.message
        });
    }
});

app.get('/patient/appointments', authenticateJWT, async (req, res) => {

    try {

        let result = await dbHelper.getPatientAppointments(req.user.username);
        res.send({
            status: "success",
            appointments: result
        });
    }
    catch (error) {
        res.send({
            status: "error",
            error: error.message
        });
    }
});

app.post('/deleteappointment', authenticateJWT, async (req, res) => {

    try {

        await dbHelper.deleteAppointment(req.body.appointmentId);
        res.send({
            status: "success"
        });
    }
    catch (error) {
        res.send({
            status: "error",
            error: error.message
        });
    }
});

app.post("/editappointment", authenticateJWT, async (req, res) => {

    try {

        let appointment = await dbHelper.getAppointment(req.body.appointmentId);

        let appointments = await dbHelper.appointmentSlotOccupied(appointment.doctorUsername, req.body.date, req.body.time);
        
        if (appointments != null && appointment._id != req.body.appointmentId) {
            res.send({
                status: "success",
                appointment: "already taken"
            });
            return;
        }

        await dbHelper.updateAppointment(req.body);
        res.send({
            status: "success",
            appointment: "updated"
        });
    }
    catch (error) {
        res.send({
            status: "error",
            error: error.message
        });
    }
});

app.get("/doctor/appointments", authenticateJWT, async (req, res) => {

    try {

        let result = await dbHelper.getDoctorAppointments(req.user.username);
        res.send({
            status: "success",
            appointments: result
        });
    }
    catch (error) {
        res.send({
            status: "error",
            error: error.message
        });
    }
});

app.post("/editappointmentstatus", authenticateJWT, async (req, res) => {

    try {

        let result = await dbHelper.updateAppointmentStatus(req.body.appointmentId, req.body.completed);
        res.send({
            status: "success",
            appointments: result
        });
    }
    catch (error) {
        res.send({
            status: "error",
            error: error.message
        });
    }
});

app.get("/users", authenticateJWT, async (req, res) => {

    if (req.user.userType !== "superuser") {
        res.send(401);
        return;
    }

    try {
        let result = await dbHelper.getUsers();
        
        res.send({
            status: "success",
            users: result
        });
    }
    catch (error) {
        res.send({
            status: "error",
            error: error.message
        });
    }
});

app.post("/updateuser", authenticateJWT, async (req, res) => {

    if (req.user.userType !== "superuser") {
        res.send(401);
        return;
    }

    try {
        await dbHelper.updateUser(req.body);
        
        res.send({
            status: "success",
            user: "updated"
        });
    }
    catch (error) {
        res.send({
            status: "error",
            error: error.message
        });
    }
});

app.post("/addpharmacyproduct", authenticateJWT, async (req, res) => {

    if (req.user.userType !== "superuser") {
        res.send(401);
        return;
    }

    try {
        await dbHelper.addProduct(req.body);
        
        res.send({
            status: "success",
            product: "added"
        });
    }
    catch (error) {
        res.send({
            status: "error",
            error: error.message
        });
    }
});

app.get("/products", authenticateJWT, async (req, res) => {

    try {
        let products = await dbHelper.getProducts();
        
        res.send({
            status: "success",
            products: products
        });
    }
    catch (error) {
        res.send({
            status: "error",
            error: error.message
        });
    }
});

app.post("/checkout", authenticateJWT, async (req, res) => {

    try {
        let orderData = req.body;
        orderData.userId = req.user.userId;
        await dbHelper.insertOrder(orderData);

        res.send({
            status: "success",
        });
    }
    catch (error) {
        res.send({
            status: "error",
            error: error.message
        });
    }
});

app.get("/orders", authenticateJWT, async (req, res) => {

    try {
        let result = await dbHelper.getOrders(req.user.userId);

        res.send({
            status: "success",
            orders: result
        });
    }
    catch (error) {
        res.send({
            status: "error",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server started on port " + PORT);
});