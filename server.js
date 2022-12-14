const express = require('express')
const multer  = require('multer')
const {mergePdf}  = require('./merge')
const app = express()
const path = require('path')
const port = 3000
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "template/index.html"))
})

app.post('/merge', upload.array('pdf', 2), async (req, res, next) => {
  console.log(req.files)
  let d = await mergePdf(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
  res.redirect(`http://localhost:3000/static/${d}.pdf`)
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})