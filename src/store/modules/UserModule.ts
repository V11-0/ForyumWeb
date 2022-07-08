import Session from '@/models/Session'
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({ name: 'UserModule', namespaced: true, preserveState: true })
export default class UserModule extends VuexModule {
  session: Session | null = null;

  @Mutation
  setSession (session: Session) {
    this.session = session
  }
}
