const { leadsController } = require("../controllers");
const { Router } = require("express");
const router = Router();

router
  .route('/')
  .post(leadsController.newLead)

module.exports = router;