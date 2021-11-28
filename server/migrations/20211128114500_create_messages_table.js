/**
 * @param {import('knex').Knex} knex
 */
export const up = async (knex) => {
  await knex.schema.createTable('messages', (table) => {
    table.increments('id')
    table.string('text').notNullable()
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.integer('event_id').notNullable().references('id').inTable('events')
    table.integer('user_id').notNullable().references('id').inTable('users')
  })
}

/**
 * @param {import('knex').Knex} knex
 */
export const down = async (knex) => {
  await knex.schema.dropTable('messages')
}
