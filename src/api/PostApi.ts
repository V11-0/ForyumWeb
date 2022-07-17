import { PostFeedDTO } from '@/models/dto/PostDTO'
import Post from '@/models/Post'
import { PostOrdenation } from '@/models/PostOrdenation'
import axiosInstance, { getAuthHeader } from '@/utils/AxiosInstance'

export default class PostApi {
  private token: string

  constructor (token: string) {
    this.token = token
  }

  public async createPost (post: Post) {
    await axiosInstance.post('/Post', post, getAuthHeader(this.token))
  }

  public async getFeed (orderBy: string): Promise<Array<PostFeedDTO>> {
    const resp = await axiosInstance.get('/Post', {
      headers: getAuthHeader(this.token).headers,
      params: { orderBy }
    })
    return resp.data
  }
}
