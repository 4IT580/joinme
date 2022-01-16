/**
 * @param {import('knex').Knex} knex
 */
export const up = async (knex) => {
  await knex.schema.alterTable('events', (table) => {
    table.boolean('promoted').defaultTo(false)
  })
}

/**
 * @param {import('knex').Knex} knex
 */
export const down = async (knex) => {
  await knex.schema.alterTable('events', (table) => {
    table.dropColumn('promoted')
  })
}
