import Entity from './Entity'
import PostMedia from './PostMedia'
import User from './User'
import Vote from './Vote'

export default interface Post extends Entity {
  Title: string
  Text?: string

  Medias?: Array<PostMedia>

  CreatorUserId: string
  CreatorUser?: User

  CommunityId: string
  Community: object

  Votes?: Array<Vote>
}
