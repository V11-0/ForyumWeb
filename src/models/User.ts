import Community from './Community'
import Entity from './Entity'
import Post from './Post'
import Session from './Session'
import Vote from './Vote'

export default interface User extends Entity {
  username: string
  email: string
  password: string
  country: string
  bio?: string

  posts?: Array<Post>
  communities?: Array<Community>
  createdCommunities?: Array<Community>
  votes?: Array<Vote>
  sessions?: Array<Session>
}
