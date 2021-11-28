/**
 * @param {import('knex').Knex} knex
 */
export const up = async (knex) => {
  await knex.schema.createTable('images', (table) => {
    table.increments('id')
    table.string('path').notNullable().unique().index()
    table.string('filename')
    table.string('mimetype')
    table.string('encoding')
  })

  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('photo')
    table.integer('photo_id').references('id').inTable('images')
  })

  await knex.schema.alterTable('events', (table) => {
    table.integer('photo_id').references('id').inTable('images')
  })
}

/**
 * @param {import('knex').Knex} knex
 */
export const down = async (knex) => {
  await knex.schema.dropTable('images')

  await knex.schema.alterTable('events', (table) => {
    table.dropColumn('photo_id')
  })

  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('photo_id')
    table.binary('photo')
  })
}
