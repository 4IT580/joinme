/**
 * @param {import('knex').Knex} knex
 */
export const up = function (knex) {
  return knex.schema.createTable('password_reset_tickets', (table) => {
    table.increments('id')
    table.integer('user_id')
    table.string('secret')
    table.timestamp('requested').defaultTo(knex.fn.now())
    table.boolean('used').defaultTo(false)
  })
}

/**
 * @param {import('knex').Knex} knex
 */
export const down = function (knex) {
  return knex.schema.dropTable('password_reset_tickets')
}
