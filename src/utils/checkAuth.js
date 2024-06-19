"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var checkAuth = function (request, response, next) {
    var token = (request.headers.authorization || "").replace("Bearer", "");
    if (token) {
        try {
            var decoded = jwt.verify(token, "esco_secret");
            request.id = decoded._id;
            next();
        }
        catch (error) {
            try {
                var decoded = jwt.verify(token, "esco_secret_admin");
                request.id = decoded._id;
                next();
            }
            catch (error) {
                return response.status(200).json({
                    isSuccess: false,
                    message: "Нет доступа",
                    error: error,
                });
            }
        }
    }
    else {
        return response.status(200).json({
            isSuccess: false,
            message: "Нет доступа",
        });
    }
};
exports.default = checkAuth;
