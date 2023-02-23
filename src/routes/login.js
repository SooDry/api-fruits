const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const db = require("../database");
const User = db.user;


app.post("/login", async (request, response) => {
  const { body } = request;

  try {
    //Buscar usuario
    let user = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (!user)
      return response
        .status(404)
        .json({ msg: "Usuario o contraseña incorrecta" });

    if (!user.isActive)
      return response.status(404).json({ msg: "Usuario no autorizado" });



    if (!bcrypt.compareSync(body.password, user.password))
      return response
        .status(404)
        .json({ msg: "Usuario o contraseña incorrecta" });

    //Creacion de token para autorizar acceso
    let token = jsonwebtoken.sign(
      { user_guid: user.guid },
      "secret_key",
      {
        expiresIn: "1h",
      }
    );

    response.json({
      success: true,
      token: token,
    });
  } catch (err) {
    console.log(err)
    return response.status(400).json({
      ok: false,
      err,

    });
  }
});

module.exports = app;