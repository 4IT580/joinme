export const up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('handle').notNullable()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
  })
}

export const down = (knex) => {
  return knex.schema.dropTable('users')
}
