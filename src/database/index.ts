import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()
  Object.assign(defaultOptions, {
    database:
      process.env.NODE_ENV === 'test' ? 'NLW_test' : defaultOptions.database
  })
  return createConnection()
}
