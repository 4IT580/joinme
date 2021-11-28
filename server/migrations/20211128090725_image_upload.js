/**
 * @param {import('knex').Knex} knex
 */
export const up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
      table.dropColumn('photo')
      table.
  })
}

/**
 * @param {import('knex').Knex} knex
 */
export const down = function (knex) {}
