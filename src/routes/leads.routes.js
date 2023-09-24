const { leadsController } = require("../controllers");
const { Router } = require("express");
const router = Router();

router
  .route('/')
  .get((req, res) => {
    console.log('get request')
    res.status(200).send("ok")
  })
  .post(leadsController.newLead)

module.exports = router;