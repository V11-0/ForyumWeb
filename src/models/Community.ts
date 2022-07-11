import Entity from './Entity'
import Post from './Post'
import User from './User'

export default interface Community extends Entity {
  name: string
  description?: string

  posts?: Array<Post>
  users?: Array<User>

  creatorUserId: number
  creatorUser: User
}
