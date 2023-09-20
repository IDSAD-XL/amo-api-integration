const { leadsController } = require("../controllers");
const { Router } = require("express");
const router = Router();

router
  .route('/')
  .get(leadsController.newLead)
  .post(leadsController.newLead)

module.exports = router;