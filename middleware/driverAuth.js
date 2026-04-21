import Jwt from 'jsonwebtoken'
import Driver from '../models/Driver.js';


const driverAuth = async (req, res, next) => {
    console.log(req.headers);

    const authHeader = req.headers['authorization']
    if (!authHeader) {
        console.log('authorization header is missing');
        return res.status(401).json(`authorization header is missing`)
    }
    const token = authHeader.split(' ')[1]
    console.log(token);
    if (!token) {
        console.log('no token');
        return res.status(401).json('No token is provided, authorization is denied')
    }
    try {
        const decode = Jwt.verify(token, process.env.jwt_secret_key)
        // console.log(decode);
        const id = decode.id
        const driver = await Driver.findById(id)
        // console.log(driver);
        console.log('ohhh')
        req.id = driver._id
        req.driver = driver
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json('Invalid or expired token');
    }
}

export { driverAuth }