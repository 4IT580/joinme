/**
 * @param {import('knex').Knex} knex
 */
export const up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.binary('photo')
    table.string('city')
    table.string('description')
    table.string('interests')
  })
}

/**
 * @param {import('knex').Knex} knex
 */
export const down = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('photo')
    table.dropColumn('city')
    table.dropColumn('description')
    table.dropColumn('interests')
  })
}
