const express = require('express');
const app = express();
const db = require("../database");
const Usuario = db.user;
const users = require('../seed/generated.json');
const verifyToken = require('../middleware/autentication');

app.post('/generated/', verifyToken, async function (req, res) {

  try {
    const saveUsers = await Usuario.bulkCreate(users)

    res.json(saveUsers)

  } catch (error) {
    res.status(400).json({
      error: "No se han podido crear los registros"
    })

  }

});

async function saveUsers(user) {
  try {

    await Usuario.create(user);

  } catch (error) {

    console.log("Error", error);
  }

}
app.get('/generated/totals/:company', verifyToken, async function (req, res) {
  let { company } = req.params
  const getUsers = await Usuario.findAll({
    raw: true,
    where: {

      company: company.toUpperCase()
    }
  })
  if (getUsers.length === 0)
    return res.status(400).json({
      error: "No hay usuarios para esa compañia"
    })
  let sumBalance = []
  let age_counter = {}
  let gender_counter = {}

  getUsers.forEach(user => {
    const balance = user.balance
    const numberBalance = balance.split("$")[1]
    const replaceComma = numberBalance.replace(",", "")
    const numberReplace = replaceComma.replace(",", ".")

    sumBalance.push(numberReplace);
    if (!age_counter.hasOwnProperty(user.age)) {
      age_counter[user.age] = 0
    }
    age_counter[user.age] += 1;

    if (!gender_counter.hasOwnProperty(user.gender)) {
      gender_counter[user.gender] = 0
    }
    gender_counter[user.gender] += 1;

  });
  let total = sumBalance.reduce((a, b) => Number(a) + Number(b), 0);

  console.log(total);
  console.log(sumBalance);
  res.json({
    totalAge: age_counter,
    totalGender: gender_counter,
    totalBalance: total

  })
})
app.get('/generated/', verifyToken, async function (req, res) {
  const getUsers = await Usuario.findAll({
    raw: true,
  })
  let users = []
  getUsers.forEach(user => {
    const userFilter = {
      id: user.id,
      isActive: user.isActive,
      age: user.age,
      gender: user.gender,
      latitude: user.latitude,
      longitude: user.longitude,
      friends: user.friends,

    }
    users.push(userFilter)

  });
  res.json(users)
});

app.get('/generated/fruits/', verifyToken, async function (req, res) {
  const getUsers = await Usuario.findAll({
    raw: true,
  })
  let fruits_counter = {};
  getUsers.forEach((user) => {
    if (!fruits_counter.hasOwnProperty(user.favoriteFruit)) {
      fruits_counter[user.favoriteFruit] = 0
    }
    fruits_counter[user.favoriteFruit] += 1;
  });
  res.json({
    totalFruits: fruits_counter,
    totalPersons: getUsers.length
  })
});

module.exports = app;