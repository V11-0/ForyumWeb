import Session from '@/models/Session'
import User from '@/models/User'
import axios from '@/utils/AxiosInstance'

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
}
