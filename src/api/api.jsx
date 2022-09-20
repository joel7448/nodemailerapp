import axios from "axios"


const instance = axios.create({
    baseURL: 'https://nodemailerapp-backend.herokuapp.com',
   
  });

export default instance