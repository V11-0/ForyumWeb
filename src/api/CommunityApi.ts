import Community from '@/models/Community'
import axios, { getAuthHeader } from '@/utils/AxiosInstance'

export default class CommunityApi {
  public static async fetchRecommendedCommunities (
    token: string
  ): Promise<Array<Community>> {
    const resp = await axios.get('/Community/Recommended', getAuthHeader(token))
    return resp.data
  }

  public static async joinCommunity (token: string, communityId: number): Promise<void> {
    await axios.post(`/Community/Join/${communityId}`, undefined, getAuthHeader(token))
  }
}
