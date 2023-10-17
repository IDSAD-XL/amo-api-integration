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
  //console.log(entity)
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

  //ID доски в AMO
  if (!pipeline_id) {
    pipeline_id = '3865977'
  }

  if (!price) {
    price = 0
  }

  //Контакт
  const contactEntity = {
    name: name,
  }

  //Почта
  if (email) {
    addCustomField(contactEntity, 35799, email)
  }

  //Номер телефона
  if (phone) {
    addCustomField(contactEntity, 35797, phone)
  }

  const newContactArray = await client.contacts.create([contactEntity])
  const newContact = newContactArray[0]

  //Лид
  const leadEntity = {
    name: leadName,
    price: Number(price),
    pipeline_id: Number(pipeline_id),
    _embedded: {
      contacts: [{ id: newContact.id }],
      tags: [{ id: 484324 }] // SE Online
    }
  }

  //Юрлицо
  if (isEntity === 'yes') {
    if (!leadEntity._embedded.tags) {
      leadEntity._embedded.tags = []
    }
    leadEntity._embedded.tags.push({ id: 489630 })
  }

  //Кастомные теги
  if (leadTags) {
    if (!leadEntity._embedded.tags) {
      leadEntity._embedded.tags = []
    }
    const splitTags = leadTags.split(',')
    for (const tagItem of splitTags) {
      leadEntity._embedded.tags.push({ id: Number(tagItem) })
    }
  }

  //Должность
  if (position) {
    addCustomField(leadEntity, 831562, position)
  }

  //Сфера деятельности
  if (activityScope) {
    addCustomField(leadEntity, 831564, activityScope)
  }

  //Курс
  if (course) {
    addCustomField(leadEntity, 682039, course)
  }

  //Метка
  if (utm_source) {
    addCustomField(leadEntity, 37593, utm_source)
  }

  //Метка
  if (utm_campaign) {
    addCustomField(leadEntity, 37597, utm_campaign)
  }

  //Метка
  if (utm_content) {
    addCustomField(leadEntity, 69717, utm_content)
  }

  //Метка
  if (utm_medium) {
    addCustomField(leadEntity, 37595, utm_medium)
  }

  //Метка
  if (utm_term) {
    addCustomField(leadEntity, 69719, utm_term)
  }

  await client.leads.create([leadEntity])
}

module.exports = {
  createNewLead
}