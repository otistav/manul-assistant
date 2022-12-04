import models from './models'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  models.User.sync({ alter: isDev });
  models.Note.sync({ alter: isDev });
}
export default dbInit;