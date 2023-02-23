const jsonwebtoken = require("jsonwebtoken");

let verifyToken = (request, response, next) => {
  let token = request.get("token");
  try {
    //verifica que el token este activo
    jsonwebtoken.verify(token, "secret_key", async (err, decoded) => {

      if (err) {

        return response.status(401).json({
          ok: false,
          err: "TOKEN NO VALIDO",
        });
      }

      request.user_id = decoded.user_id;
      next();
    });
  } catch (error) {
    response.status(400).json({
      msg: "Firma invalida",
    });
    next();
  }
};
module.exports = verifyToken;