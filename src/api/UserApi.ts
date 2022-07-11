import Session from '@/models/Session'
import User from '@/models/User'
import axios, { getAuthHeader } from '@/utils/AxiosInstance'

export default class UserApi {
  public static async checkUsername (username: string): Promise<boolean> {
    const resp = await axios.get('/User/CheckUsername', {
      params: { username }
    })
    return resp.data
  }

  public static async createUser (user: User): Promise<void> {
    const resp = await axios.post('/User', user)
    return resp.data
  }

  public static async login (username: string, password: string): Promise<Session> {
    const resp = await axios.post('/User/Login', { username, password })
    return resp.data
  }

  public static async getUser (userId: number) {
    const resp = await axios.get('/User/', { params: { userId } })
    return resp.data
  }

  public static async getCurrentUser (token: string): Promise<User> {
    const resp = await axios.get('/User', getAuthHeader(token))
    return resp.data
  }
}
