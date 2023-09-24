const catchAsync = require("../utils/catchAsync");
const leadService = require("../services/leads.service")

const newLead = catchAsync(async (req, res) => {
  await leadService.createNewLead(req.body)
  res.sendStatus(200)
})

module.exports = {
  newLead
}