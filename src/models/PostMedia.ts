import Entity from './Entity'
import Post from './Post'

export enum MediaType {
  Image,
  Video
}

export default interface PostMedia extends Entity {
  Type: MediaType
  Url: string

  PostId: number
  Post: Post
}
