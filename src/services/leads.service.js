const client = require("../amo-service/client")

const createNewLead = async (entity) => {
  console.log(entity)
  let { pipeline_id, name, email, phone, price, leadName } = entity
  if (!pipeline_id) {
    pipeline_id = '37118529'
  }
  if (!price) {
    price = 0
  }
  const contactEntity = {
    name: name,
    custom_fields_values: [
      {
        field_id: 2405385,
        values: [
          {
            value: phone
          }
        ]
      },
      {
        field_id: 2405387,
        values: [
          {
            value: email
          }
        ]
      },
    ]
  }
  const newContactArray = await client.contacts.create([contactEntity])
  const newContact = newContactArray[0]

  const leadEntity = {
    name: leadName,
    price: Number(price),
    pipeline_id: Number(pipeline_id),
    _embedded: {
      contacts: [{ id: newContact.id }]
    }
  }

  await client.leads.create([leadEntity])
}

module.exports = {
  createNewLead
}