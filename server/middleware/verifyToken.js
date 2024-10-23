import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    // Get the Authorization header or the access_token from cookies
    const authHeader = req.headers['authorization'];
    console.log('cookie token',JSON.stringify(req.cookies.ACCESS_TOKEN))
    const cookieToken = req.cookies.ACCESS_TOKEN; // Get token from cookies if available;
    // Get token from cookies if available
    console.log(`acces token`,cookieToken)
    let token;
    // If Authorization header exists and starts with Bearer, extract the token
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } 
    // Otherwise, use the token from cookies if available
    else if (cookieToken) {
        token = cookieToken;
    }

    // Check if token is present
    if (!token) {
        return res.status(401).json({ success: false, message: 'Authorization token not provided or invalid' });
    }

    console.log(`Token received:`, token);

    // Verify the token
    try {
        const decode = jwt.decode(token);
        console.log(`Decoded data: ${JSON.stringify(decode)}`);

        if (decode.type === "access_token") {
            try {
                const access_verification = jwt.verify(token, process.env.access_token);
                console.log(`Access token verified`);
                req.access_verification = access_verification;
                next();
            } catch (error) {
                console.log("Error in access token verification:", error.message);
                return res.status(401).json({ success: false, message: 'Access token expired', error: error.message });
            }
        }

        if (decode.type === "refresh_token") {
            try {
                const refresh_verification = jwt.verify(token, process.env.refresh_token);
                console.log(`Refresh token verified`);
                req.refresh_verification = refresh_verification;
                next();
            } catch (error) {
                console.log("Error in refresh token verification:", error.message);
                return res.status(401).json({ success: false, message: 'Refresh token expired', error: error.message });
            }
        }
    } catch (error) {
        console.log(`Token verification failed: ${error.message}`);
        return res.status(401).json({ success: false, message: 'Token is invalid', error: error.message });
    }
};

export { verifyToken };
