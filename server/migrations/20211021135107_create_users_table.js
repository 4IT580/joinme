export const up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('user_name').notNullable()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('email').notNullable()
  })
}

export const down = (knex) => {
  return knex.schema.dropTable('users')
}
