/**
 * @param {import('knex').Knex} knex
 */
export const up = async (knex) => {
  await knex.schema.createTable('invitations', (table) => {
    table.increments('id')
    table.boolean('accepted')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.integer('event_id').notNullable().references('id').inTable('events')
    table.integer('user_id').notNullable().references('id').inTable('users')
    table.unique(['event_id', 'user_id'])
  })
}

/**
 * @param {import('knex').Knex} knex
 */
export const down = async (knex) => {
  await knex.schema.dropTable('invitations')
}
