import Knex from 'knex'
import config from '../../knexfile.js'
import { knexSnakeCaseMappers } from './mappers.js'

/**
 * @type {import('knex').Knex}
 */
let connection = null

/**
 * @returns {import('knex').Knex}
 */
export const db = () => {
  if (!connection) {
    connection = Knex({
      ...config,
      ...knexSnakeCaseMappers(),
    })
  }

  return connection
}
