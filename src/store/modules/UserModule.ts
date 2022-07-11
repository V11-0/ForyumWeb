import Session from '@/models/Session'
import User from '@/models/User'
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({ name: 'UserModule', namespaced: true, preserveState: true })
export default class UserModule extends VuexModule {
  session: Session | null = null;
  user: User | null = null;

  @Mutation
  setSession (session: Session | null) {
    this.session = session
  }

  @Mutation
  setUser (user: User | null) {
    this.user = user
  }

  get hasSession (): boolean {
    return this.session != null
  }

  get hasUser (): boolean {
    return this.user != null
  }

  get token (): string {
    return this.session!.token
  }
}
