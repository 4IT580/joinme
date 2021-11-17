/**
 * @param {import('knex').Knex} knex
 */
export const up = async (knex) => {
  await knex.schema.createTable('events', (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('place').notNullable().defaultTo('')
    table.string('description').notNullable().defaultTo('')
    table.dateTime('from')
    table.dateTime('to')
    table.boolean('public').notNullable().defaultTo(false)
    table.integer('user_id').notNullable().references('id').inTable('users')
  })

  await knex.schema.createTable('events_users', (table) => {
    table.increments('id')
    table.integer('event_id').notNullable().references('id').inTable('events')
    table.integer('user_id').notNullable().references('id').inTable('users')
  })
}

/**
 * @param {import('knex').Knex} knex
 */
export const down = async (knex) => {
  await knex.schema.dropTable('events_users')
  await knex.schema.dropTable('events')
}
