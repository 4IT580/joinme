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

export const transaction = async (callback) => {
  return db()
    .transaction(async (trx) => {
      return await callback(trx)
    })
    .catch((e) => {
      throw e
    })
    .then((res) => {
      return res
    })
}

export const migrate = async () => {
  const [_, migrations] = await db().migrate.latest()

  for (const migration of migrations) {
    console.info('Executing migration "%s"', migration)
  }
}
