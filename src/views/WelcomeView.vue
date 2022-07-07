<template>
  <v-container>
    <v-row class="mx-16 mt-8">
      <v-col>
        <LoginCard></LoginCard>
      </v-col>
      <v-col>
        <SignUpCard></SignUpCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import LoginCard from '@/components/welcome/LoginCard.vue'
import SignUpCard from '@/components/welcome/SignUpCard.vue'

@Component({
  components: {
    LoginCard,
    SignUpCard
  }
})
export default class WelcomeView extends Vue {

}
</script>
