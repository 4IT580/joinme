/**
 * @param {import('knex').Knex} knex
 */
export const up = function (knex) {
  return knex.schema.createTable('user_activation_tickets', (table) => {
    table.increments('id')
    table.integer('user_id').notNullable().references('id').inTable('users')
    table.string('secret').notNullable()
    table.timestamp('requested').notNullable().defaultTo(knex.fn.now())
    table.boolean('used').notNullable().defaultTo(false)
  })
}

/**
 * @param {import('knex').Knex} knex
 */
export const down = function (knex) {
  return knex.schema.dropTable('user_activation_tickets')
}
