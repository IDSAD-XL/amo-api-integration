const { leadsController } = require("../controllers");
const { Router } = require("express");
const multer = require('multer');
const upload = multer();
const router = Router();

router
  .route('/')
  .get((req, res) => {
    res.sendStatus(200)
  })
  .post(upload.none(), leadsController.newLead)

module.exports = router;