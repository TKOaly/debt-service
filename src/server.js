#!/usr/bin/env node

require('dotenv').config()
const express = require('express')
const path = require('path')
const request = require('request-promise')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(process.env.DB_FILE)
const cp = require('cookie-parser')

const PORT = Number(process.env.PORT || 8080) 

const app = express()
app.use(cp())
app.use('/public', express.static(path.resolve(__dirname, 'public')))
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.get('/', checkLogin, (req, res) => {
  const stmt = db.prepare('SELECT * FROM debt WHERE email = ?')
  stmt.run(req.user.email)
  const arr = []
  stmt.each(
    (err, row) => {
      if (err) {
        console.log(err)
        res.status(500).send('Internal server error')
      }
      arr.push(row)
    },
    () => {
      res.render('app', { debt: arr, userScreenName: req.user.screenName, userServiceUrl: process.env.USER_SERVICE_URL, serviceIdentifier: process.env.SERVICE_ID })
    }
  )
})

async function checkLogin(req, res, next) {
  const token = req.cookies['token']
  if (!token) {
    return res.redirect(
      `${process.env.USER_SERVICE_URL}?serviceIdentifier=${
        process.env.SERVICE_ID
      }`
    )
  }
  const opts = {
    headers: {
      Authorization: 'Bearer ' + token,
      Service: process.env.SERVICE_ID
    }
  }
  try {
    const result = await request(
      `${process.env.USER_SERVICE_URL}/api/users/me`,
      opts
    ).then(JSON.parse)
    req.user = result.payload
    next()
  } catch (e) {
    console.log(e)
    return res.redirect(
      `${process.env.USER_SERVICE_URL}?serviceIdentifier=${
        process.env.SERVICE_ID
      }`
    )
  }
}

app.listen(PORT, () => console.log('Listening on ', PORT))
