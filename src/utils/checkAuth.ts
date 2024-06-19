const jwt = require("jsonwebtoken");

const checkAuth = (request, response, next) => {
  const token = (request.headers.authorization || "").replace("Bearer", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, "esco_secret");
      request.id = decoded._id;
      next();
    } catch (error) {
      try {
        const decoded = jwt.verify(token, "esco_secret_admin");
        request.id = decoded._id;
        next();
      } catch (error) {
        return response.status(200).json({
          isSuccess: false,
          message: "Нет доступа",
          error: error,
        });
      }
    }
  } else {
    return response.status(200).json({
      isSuccess: false,
      message: "Нет доступа",
    });
  }
};

export default checkAuth;
