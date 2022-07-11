import Entity from './Entity'
import User from './User'

export default interface Session extends Entity {
  token: string
  userAgent: string

  userId: number
  user: User
}
