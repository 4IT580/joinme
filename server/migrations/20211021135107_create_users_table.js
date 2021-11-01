/**
 * @param {import('knex').Knex} knex
 */
export const up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('username').notNullable()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.boolean('activated').notNullable().defaultTo(false)
  })
}

/**
 * @param {import('knex').Knex} knex
 */
export const down = (knex) => {
  return knex.schema.dropTable('users')
}
