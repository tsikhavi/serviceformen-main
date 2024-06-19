// import { roles } from "./rbac";
import 'dotenv/config'
import { Roles } from "./rbac";

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token is required.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

const checkPermissions = (requiredPermissions) => {
    return (req, res, next) => {
        const token = req.headers.authorization;
    
        if (!token) {
            return res.status(200).json({
                isSuccess: false,
                message: "Нет доступа",
            });
        }
    
        try {
            const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            req.user = user;
            req.id = user._id;

            if (user && user.roles) {
                if (user.roles !== Roles.Admin && !requiredPermissions.includes(user.roles)) {
                    return res.status(200).json({
                        isSuccess: false,
                        message: "Нет доступа",
                    });
                }
    
                req.models = user.models || []
                req.isAdmin = (user.roles === Roles.Admin)
        
                next();
    
            } else {
                return res.status(200).json({
                    isSuccess: false,
                    message: "Нет доступа",
                });
            }

        } catch (error) {
            return res.status(200).json({
                isSuccess: false,
                message: "Нет доступа",
            });
        }
    };
};

export {
    verifyToken,
    checkPermissions
};
