import Community from './Community'
import Entity from './Entity'
import Post from './Post'
import Session from './Session'
import Vote from './Vote'

export default interface User extends Entity {
  Username: string
  Email: string
  Password: string
  Country: string
  Bio?: string

  Posts?: Array<Post>
  Communities?: Array<Community>
  CreatedCommunities?: Array<Community>
  Votes?: Array<Vote>
  Sessions?: Array<Session>
}
