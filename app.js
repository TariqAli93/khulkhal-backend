import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

function generateRandomName(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result +=
      characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const storage = multer.diskStorage({
  destination: './attachment/',
  filename: (req, file, cb) => {
    cb(
      null,
      generateRandomName(10) + Date.now().toString() +
      path.extname(file.originalname)
    );
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('file');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}




// initialize the app
const app = express()

// use middlewares
app.use(express.json())
app.use(cors({ credentials: true, origin: true }))
dotenv.config()



// import routes
import UsersRoutes from './routes/users.js'
import CategoriesRoutes from './routes/categories.js'
import ProductsRoute from './routes/products.js'
import OrdersRoute from './routes/orders.js'


// use routes
UsersRoutes(app)
CategoriesRoutes(app)
ProductsRoute(app)
OrdersRoute(app)


app.post('/api/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      if (req.file == undefined) {
        res.send('Error: No File Selected!');
      } else {
        res.send(req.file);
      }
    }
  });
});

app.delete('/api/image/:file', (req, res) => {
  fs.unlink(`./attachment/${req.params.file}`, (err) => {

    if (err) {
      console.error(err)
      return
    }
  });
});

app.get("/api/image/:file", function (request, response) {
  let file = request.params.file;
  var tempFile = `./attachment/${file}`;

  fs.readFile(tempFile, function (err, data) {
    response.send(data);
  });
});



// start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`)
})