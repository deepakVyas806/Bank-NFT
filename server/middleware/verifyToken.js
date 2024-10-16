import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    // Get the Authorization header
    const authHeader = req.headers['authorization'];

    // Check if Authorization header is provided and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authorization token not provided or invalid' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];
    console.log(`Token received:`, token);

    // Verify the token
    try {
        if (!token) {
            return res.status(401).json({ success: false, message: 'Token is missing' });
        }

        // Verify the access token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'AdiAdi');
        console.log('Decoded at middleware stage:', decoded);

        // Attach the decoded data to the request object
        req.decode = decoded;

        // Call the next middleware or route handler
        return next();
    } catch (error) {
        // Handle JWT verification errors
        console.log(`Token verification failed: ${error.message}`);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token has expired', error: error.message });
        } else {
            return res.status(401).json({ success: false, message: 'Token is invalid', error: error.message });
        }
    }
};

export { verifyToken };
