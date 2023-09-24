const catchAsync = require("../utils/catchAsync");
const leadService = require("../services/leads.service")

const newLead = catchAsync(async (req, res) => {
  if (req.body?.test === 'test') {
    res.sendStatus(200)
    return
  }
  await leadService.createNewLead(req.body)
  res.sendStatus(200)
})

module.exports = {
  newLead
}