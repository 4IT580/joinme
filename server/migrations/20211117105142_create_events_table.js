/**
 * @param {import('knex').Knex} knex
 */
export const up = function (knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('place').notNullable().defaultTo('')
    table.string('description').notNullable().defaultTo('')
    table.dateTime('from')
    table.dateTime('to')
    table.boolean('public').notNullable().defaultTo(false)
    table.integer('user_id').notNullable().references('id').inTable('users')
  })
}

/**
 * @param {import('knex').Knex} knex
 */
export const down = function (knex) {
  return knex.schema.dropTable('events')
}
