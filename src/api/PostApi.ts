import { CommentCreationDTO, CommentDTO } from '@/models/dto/CommentDTO'
import { PostFeedDTO } from '@/models/dto/PostDTO'
import { VoteDTO } from '@/models/dto/VoteDTO'
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

  public async getFeed (orderBy: string): Promise<Array<PostFeedDTO>> {
    const resp = await axiosInstance.get('/Post', {
      headers: getAuthHeader(this.token).headers,
      params: { orderBy }
    })
    return resp.data
  }

  public async getComments (postId: number): Promise<Array<CommentDTO>> {
    const resp = await axiosInstance.get(
      `/Post/${postId}/Comment`,
      getAuthHeader(this.token)
    )
    return resp.data
  }

  public async createComment (comment: CommentCreationDTO) {
    await axiosInstance.post('/Post/Comment', comment, getAuthHeader(this.token))
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
