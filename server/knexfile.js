import path from 'path'

export default {
  client: 'sqlite3',
  connection: {
    filename: path.join(process.cwd(), 'db.sqlite3'),
  },
  migrations: {
    tableName: 'migrations',
  },
  useNullAsDefault: true,
}
