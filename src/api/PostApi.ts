import { PostFeedDTO } from '@/models/dto/PostDTO'
import { VoteDTO } from '@/models/dto/VoteDTO'
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

  public async getCommunityPosts (
    communityId: number,
    orderBy: string
  ): Promise<Array<PostFeedDTO>> {
    const resp = await axiosInstance.get(`/Community/${communityId}/Post`, {
      headers: getAuthHeader(this.token).headers,
      params: { orderBy }
    })
    return resp.data
  }

  public async vote (vote: VoteDTO): Promise<void> {
    await axiosInstance.post('/Vote', vote, getAuthHeader(this.token))
  }

  public async deleteVote (postId: number): Promise<void> {
    await axiosInstance.delete('/Vote', {
      headers: getAuthHeader(this.token).headers,
      params: { postId }
    })
  }
}
