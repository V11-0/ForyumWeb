import Community from '@/models/Community'
import axios, { getAuthHeader } from '@/utils/AxiosInstance'

export default class CommunityApi {
  private token: string

  constructor (token: string) {
    this.token = token
  }

  public async fetchRecommendedCommunities (): Promise<Array<Community>> {
    const resp = await axios.get('/Community/Recommended', getAuthHeader(this.token))
    return resp.data
  }

  public async joinCommunity (communityId: number): Promise<void> {
    await axios.post(
      `/Community/Join/${communityId}`,
      undefined,
      getAuthHeader(this.token)
    )
  }

  public async getCommunity (communityId: number): Promise<Community> {
    const resp = await axios.get(`/Community/${communityId}`, getAuthHeader(this.token))
    return resp.data
  }
}
