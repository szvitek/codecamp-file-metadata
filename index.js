const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const upload = multer();
const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  try {
    const { originalname: name, mimetype: type, size } = req.file;

    return res.json({
      name,
      type,
      size,
    });
  } catch (error) {
    console.error;
    res.json({
      error: error.message,
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
