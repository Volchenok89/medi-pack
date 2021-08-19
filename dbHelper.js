const config = require('./config');
const {MongoClient, ObjectId} = require('mongodb');
const mongoClientOptions = { useUnifiedTopology: true, useNewUrlParser: true };

var dbConnection = null;

module.exports.createUser = async (user) => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('users').insertOne(user);
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
};

module.exports.getUser = async (username, password) => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('users').findOne({
            username: username,
            password: password
        });
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
};

module.exports.getUserByUsername = async (username) => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('users').findOne({
            username: username
        });
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports.getDoctors = async () => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('users').find({
            userType: "doctor"
        }).toArray();
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports.bookAppointment = async (appointment) => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('appointments').insertOne(appointment);
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports.appointmentSlotOccupied = async (doctorUsername, date, time) => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('appointments').findOne({
            doctorUsername: doctorUsername,
            date: date,
            time: time
        });
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports.getAppointment = async (appointmentId) => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('appointments').findOne({
            _id: new ObjectId(appointmentId)
        });
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports.getPatientAppointments = async (username) => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('appointments').aggregate([
            {
                $match: 
                {
                    patientUsername: username 
                }
            },
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'doctorUsername',
                    foreignField: 'username',
                    as: 'doctorDetails'
                }
            }
        ]).toArray();
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports.deleteAppointment = async (appointmentId) => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('appointments').deleteOne({
            _id: new ObjectId(appointmentId)
        });
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports.updateAppointment = async (appointment) => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('appointments').updateOne(
            {
                _id: new ObjectId(appointment.appointmentId)
            },
            {
                $set: {
                    date: appointment.date,
                    time: appointment.time,
                    details: appointment.details
                }
            }
        );
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports.getDoctorAppointments = async (username) => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('appointments').aggregate([
            {
                $match: 
                {
                    doctorUsername: username 
                }
            },
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'patientUsername',
                    foreignField: 'username',
                    as: 'patientDetails'
                }
            }
        ]).toArray();
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports.updateAppointmentStatus = async (appointmentId, completed) => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('appointments').updateOne(
            {
                _id: new ObjectId(appointmentId)
            },
            {
                $set: {
                    completed: completed
                }
            }
        );
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports.getUsers = async () => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('users').find().toArray();
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports.updateUser = async (userData) => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('users').updateOne(
            {
                _id: new ObjectId(userData.userId)
            },
            {
                $set: {
                    username: userData.username,
                    password: userData.password,
                    phone: userData.phone,
                    address: userData.address
                }
            }
        );
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports.addProduct = async (product) => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('products').insertOne(product);
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports.getProducts = async () => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('products').find().toArray();
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports.insertOrder = async (order) => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('orders').insertOne(order);
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports.getOrders = async (userId) => {

    let db;
    try {
        db = await getDB();
        
        let result = await db.collection('orders').find({
            userId: userId
        }).toArray();
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

const getDB = async () => {

    try {
        if (dbConnection === null) {
            dbConnection = await MongoClient.connect(config.dbConnectionString, mongoClientOptions);
        }
        return dbConnection.db(config.dbName);
    }
    catch (error) {
        throw new Error(error.message);
    }
};