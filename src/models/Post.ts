import Entity from './Entity'
import PostMedia from './PostMedia'
import User from './User'
import Vote from './Vote'

export default interface Post extends Entity {
  title: string
  text?: string

  medias?: Array<PostMedia>

  creatorUserId: string
  creatorUser?: User

  communityId: string
  community: object

  votes?: Array<Vote>
}
