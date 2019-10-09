var express = require('express');
var router = express.Router();
let {
  viewBarang,
  actionCreate
} = require("../controllers/barangMasukController")

const auth = require("../middlewares/auth")

router.get("/", auth.isLogin, viewBarang)
router.post("/create", actionCreate)


module.exports = router;
