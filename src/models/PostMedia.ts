import Entity from './Entity'
import Post from './Post'

export enum MediaType {
  Image,
  Video
}

export default interface PostMedia extends Entity {
  type: MediaType
  url: string

  postId: number
  post: Post
}
