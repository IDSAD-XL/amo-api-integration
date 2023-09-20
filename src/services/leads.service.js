const client = require("../amo-service/client")

const createNewLead = async (entity) => {
  console.log(entity)
  const { name, email, phone, price, leadName } = entity
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
    _embedded: {
      contacts: [{ id: newContact.id }]
    }
  }

  await client.leads.create([leadEntity])
}

module.exports = {
  createNewLead
}