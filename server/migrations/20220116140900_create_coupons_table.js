/**
 * @param {import('knex').Knex} knex
 */
export const up = async (knex) => {
  await knex.schema.createTable('coupons', (table) => {
    table.increments('id')
    table.string('value').notNullable()
    table.string('name').notNullable()
    table.string('description').notNullable(false)
    table.integer('event_id').notNullable().references('id').inTable('events')
  })

  await knex.schema.createTable('coupon_user', (table) => {
    table.increments('id')
    table.integer('coupon_id').notNullable().references('id').inTable('coupons')
    table.integer('user_id').notNullable().references('id').inTable('users')
    table.unique(['coupon_id', 'user_id'])
  })
}

/**
 * @param {import('knex').Knex} knex
 */
export const down = async (knex) => {
  await knex.schema.dropTable('coupon_user')
  await knex.schema.dropTable('coupons')
}
