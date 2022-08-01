import Community from '../Community'
import { PostFeedDTO } from './PostDTO'

export interface UserInfoDTO {
  username: string
  country: string
  bio: string

  communities: Array<Community>
  posts: Array<PostFeedDTO>
}
