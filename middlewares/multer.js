var multer = require('multer');
var path = require('path');
var crypto = require('crypto');

var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname));
    })
  }
});

var upload = multer({ storage: storage });

module.exports = upload;
