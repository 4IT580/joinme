/**
 * @param {import('knex').Knex} knex
 */
export const up = async (knex) => {
  await knex.schema.createTable('circles', (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('description').notNullable(false)
    table.string('colour')
    table.integer('owner_id').notNullable().references('id').inTable('users')
  })

  await knex.schema.createTable('circle_memberships', (table) => {
    table.increments('id')
    table.boolean('accepted')
    table.integer('member_id').notNullable().references('id').inTable('users')
    table.integer('circle_id').notNullable().references('id').inTable('circles')
    table.unique(['member_id', 'circle_id'])
  })
}

/**
 * @param {import('knex').Knex} knex
 */
export const down = async (knex) => {
  await knex.schema.dropTable('circles')
  await knex.schema.dropTable('circle_memberships')
}
