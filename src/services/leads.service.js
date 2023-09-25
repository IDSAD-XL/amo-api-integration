const client = require("../amo-service/client")

const createNewLead = async (entity) => {
  console.log(entity)
  let { pipeline_id, name, email, phone, price, leadName, position, activityScope,  isEntity } = entity
  if (!pipeline_id) {
    pipeline_id = '3865977'
  }
  if (!price) {
    price = 0
  }
  const contactEntity = {
    name: name,
    custom_fields_values: [
      {
        field_id: 35797,
        values: [
          {
            value: phone
          }
        ]
      },
      {
        field_id: 35799,
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
      contacts: [{ id: newContact.id }],
    }
  }

  if (isEntity === true) {
    leadEntity._embedded.tags = [{ id: 489630 }]
  }

  if (position) {
    if (!leadEntity.custom_fields_values) {
      leadEntity.custom_fields_values = []
    }
    leadEntity.custom_fields_values.push({
      field_id: 831220,
      values: [
        {
          value: position
        }
      ]
    })
  }

  if (activityScope) {
    if (!leadEntity.custom_fields_values) {
      leadEntity.custom_fields_values = []
    }
    leadEntity.custom_fields_values.push({
      field_id: 831222,
      values: [
        {
          value: activityScope
        }
      ]
    })
  }

  console.log(leadEntity)

  await client.leads.create([leadEntity])
}

module.exports = {
  createNewLead
}