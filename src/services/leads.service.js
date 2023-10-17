const client = require("../amo-service/client")

const addCustomField = (entity, fieldId, value) => {
  if (!entity.custom_fields_values) {
    entity.custom_fields_values = []
  }
  entity.custom_fields_values.push({
    field_id: fieldId,
    values: [
      {
        value: value
      }
    ]
  })
}

const createNewLead = async (entity) => {
  console.log(entity)
  let {
    pipeline_id,
    name,
    email,
    phone,
    price,
    leadName,
    position,
    activityScope,
    isEntity,
    leadTags,
    course,
    utm_source,
    utm_campaign,
    utm_content,
    utm_medium,
    utm_term
  } = entity

  if (!pipeline_id) {
    pipeline_id = '3865977'
  }

  if (!price) {
    price = 0
  }

  const contactEntity = {
    name: name,
  }

  if (email) {
    addCustomField(contactEntity, 35799, email)
  }

  if (phone) {
    addCustomField(contactEntity, 35797, phone)
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

  if (isEntity === 'yes') {
    if (!leadEntity._embedded.tags) {
      leadEntity._embedded.tags = []
    }
    leadEntity._embedded.tags.push({ id: 489630 })
  }

  if (leadTags) {
    if (!leadEntity._embedded.tags) {
      leadEntity._embedded.tags = []
    }
    const splitTags = leadTags.split(',')
    for (const tagItem of splitTags) {
      leadEntity._embedded.tags.push({ id: Number(tagItem) })
    }
  }

  if (position) {
    addCustomField(leadEntity, 831220, position)
  }

  if (activityScope) {
    addCustomField(leadEntity, 831222, activityScope)
  }

  if (course) {
    addCustomField(leadEntity, 682039, course)
  }

  if (utm_source) {
    addCustomField(leadEntity, 37593, utm_source)
  }

  if (utm_campaign) {
    addCustomField(leadEntity, 37597, utm_campaign)
  }

  if (utm_content) {
    addCustomField(leadEntity, 69717, utm_content)
  }

  if (utm_medium) {
    addCustomField(leadEntity, 37595, utm_medium)
  }

  if (utm_term) {
    addCustomField(leadEntity, 69719, utm_term)
  }

  await client.leads.create([leadEntity])
}

module.exports = {
  createNewLead
}