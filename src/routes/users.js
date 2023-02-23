const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const db = require("../database");
const User = db.user;

//endpoint para crear usuario
app.post("/user", async (request, response) => {
  const { body } = request;

  try {
    //validar que el usuario no este creado en la bd
    const existUser = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (existUser)
      return response.status(400).json({ msg: "Usuario ya existe" });

    let userBody = {
      name: body.name,
      age: body.age,
      password: bcrypt.hashSync(body.password, 10),
      guid: uuid(),
      balance: body.balance,
      eyeColor: body.eyeColor,
      gender: body.gender,
      company: body.company,
      email: body.email,
      phone: body.phone,
      address: body.address,
      latitude: body.latitude,
      longitude: body.longitude,
      friends: body.friends,
      favoriteFruit: body.favoriteFruit,
      index: body.index,
      isActive: 1,
    };

    //Crear usuario
    await User.create(userBody);

    response.json({
      name: body.name,
      age: body.age,
      gender: body.gender,
      company: body.company,
      email: body.email,
      phone: body.phone,

    });

  } catch (error) {
    console.log("Error", error);
    response.status(400).json({ msg: "Usuario no creado" });
  }
});

module.exports = app;