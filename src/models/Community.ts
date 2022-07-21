import { PostFeedDTO } from './dto/PostDTO'
import Entity from './Entity'
import User from './User'

export default interface Community extends Entity {
  name: string
  description?: string

  posts?: Array<PostFeedDTO>
  users?: Array<User>

  creatorUserId?: number
  creatorUser?: User

  userCount?: number;

  // properties for ui
  joined?: boolean
}
