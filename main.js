const express = require('express'),
  ejs = require('ejs'),
  bodyParser = require('body-parser'),
  https = require('https')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  const url = ''
  const url2 = ''

  //   state of market
  let data2 = ''
  let isOpen, asOf
  https.get(url2, (response) => {
    response.on('data', (chunk) => {
      data2 += chunk
    })

    response.on('end', () => {
      const arrData = JSON.parse(data2)
      isOpen = arrData.isOpen
      asOf = arrData.asOf
    })
  })

  let data = ''

  https.get(url, (response) => {
    response.on('data', (chunk) => {
      data += chunk
    })

    response.on('end', () => {
      const arrData = JSON.parse(data)
      res.render('index', { data: arrData, isOpen: isOpen, asOf: asOf })
    })
  })
})

app.listen(process.env.PORT || 3000, () =>
  console.log('server is running at port 3000')
)
