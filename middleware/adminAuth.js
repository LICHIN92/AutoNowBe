import Jwt from 'jsonwebtoken'

const AdminAuth = async (req, res, next) => {
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
        console.log(decode);
        if (!decode.Role && decode.Mobile !== '8086200861') {
            console.log('you are admin');
            return res.status(403).json('access denied');

        }
        console.log('you are admin');
        next()

    } catch (error) {
        console.log(error);
        return res.status(401).json('Invalid or expired token');
    }
}

export { AdminAuth }