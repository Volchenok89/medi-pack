import axios from 'axios';

const apiBaseUrl = "http://localhost:5000";

export default {
    
    async createUser(user) {
        let response = await axios.post(apiBaseUrl + "/user/signup", user);
        return response.data;
    },

    async validateUser(username, password) {
        
        let response = await axios.post(apiBaseUrl + "/user/login", {
            username: username,
            password: password
        });
        return response.data;
    },

    async getDoctors() {

        let response = await axios.get(apiBaseUrl + "/doctors", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("authToken")
            }
        });
        return response.data;
    },

    async bookAppointment(appointmentData) {

        let response = await axios.post(apiBaseUrl + "/bookappointment", appointmentData, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("authToken")
            }
        });
        return response.data;
    },
    
    async getPatientAppointments(username) {

        let response = await axios.get(apiBaseUrl + "/patient/appointments", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("authToken")
            }
        });
        return response.data;
    },

    async deleteAppointment(appointmentId) {

        let response = await axios.post(apiBaseUrl + "/deleteappointment", {
            appointmentId: appointmentId
        }, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("authToken")
            }
        });
        return response.data;
    },

    async editAppointment(appointmentData) {

        let response = await axios.post(apiBaseUrl + "/editappointment", appointmentData, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("authToken")
            }
        });
        return response.data;
    },

    async getDoctorAppointments(username) {

        let response = await axios.get(apiBaseUrl + "/doctor/appointments", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("authToken")
            }
        });
        return response.data;
    },

    async updateAppointmentStatus(appointmentId, completed) {

        let response = await axios.post(apiBaseUrl + "/editappointmentstatus", {
            completed: completed,
            appointmentId: appointmentId
        }, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("authToken")
            }
        });
        return response.data;
    },

    async getUsers() {

        let response = await axios.get(apiBaseUrl + "/users", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("authToken")
            }
        });
        return response.data;
    },

    async updateUser(userData) {

        let response = await axios.post(apiBaseUrl + "/updateuser", userData, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("authToken")
            }
        });
        return response.data;
    },

    async addProduct(product) {

        let response = await axios.post(apiBaseUrl + "/addpharmacyproduct", product, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("authToken")
            }
        });
        return response.data;
    },

    async getProducts() {

        let response = await axios.get(apiBaseUrl + "/products", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("authToken")
            }
        });
        return response.data;
    },

    async checkout(products) {

        let response = await axios.post(apiBaseUrl + "/checkout", {
            products: products
        }, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("authToken")
            }
        });
        return response.data;
    },

    async getOrders(userId) {

        let response = await axios.get(apiBaseUrl + "/orders", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("authToken")
            }
        });
        return response.data;
    }
}