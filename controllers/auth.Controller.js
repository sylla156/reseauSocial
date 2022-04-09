const UserModel = require('../models/user.model.js');


const signUp = async (request, response) => {

    const  data =  request.body;


    try {
        const user = await UserModel.create(data);
        response.send(data)
    }catch(err) {
        response.status(200)
    }
}


module.exports = {signUp};