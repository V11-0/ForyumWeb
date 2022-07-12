import Post from '@/models/Post'
import axiosInstance, { getAuthHeader } from '@/utils/AxiosInstance'

export default class PostApi {
  private token: string

  constructor (token: string) {
    this.token = token
  }

  public async createPost (post: Post) {
    await axiosInstance.post('/Post', post, getAuthHeader(this.token))
  }
}
