<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>
              Join
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="formJoin"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="displayName"
                prepend-icon="mdi-cow"
                :counter="30"
                :rules="displayNameRules"
                label="Display Name"
                required
              />
              <v-text-field
                v-model="email"
                prepend-icon="mdi-account"
                name="emailJoin"
                label="Email"
                type="email"
                :rules="emailRules"
                required
              />
              <v-text-field
                v-model="password"
                prepend-icon="mdi-lock"
                name="passwordJoin"
                label="Password"
                type="password"
                required
                :rules="passwordRules"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              to="/login"
            >
              To Login
            </v-btn>
            <v-btn
              color="yellow"
              :disabled="!valid"
              @click="submit"
            >
              Join
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import Vue from 'vue'
import { userJoin } from '@/services/userApi'

export default Vue.extend({
  name: 'Join',
  data () {
    return {
      valid: false,
      displayName: '',
      email: '',
      password: '',
      displayNameRules: [
        (v: string) => !!v || 'Name is required',
        (v: string) => (v && v.length <= 30) ||
          'Name must be less than 30 characters'
      ],
      emailRules: [
        (v: string) => !!v || 'E-mail is required',
        (v: string) => /.+@.+/.test(v) ||
          'E-mail must be valid'
      ],
      passwordRules: [
        (v: string) => !!v || 'Password is required',
        (v: string) => (v && v.length >= 6) ||
          'Password must be greater than 6 characters'
      ]
    }
  },
  computed: {
    formJoin (): Vue & { validate: () => boolean } {
      return this.$refs.formJoin as Vue & {
        validate: () => boolean;
       }
    }
  },
  methods: {
    async submit () {
      if (this.formJoin.validate()) {
        try {
          const { email, password, displayName } = this
          await userJoin(email, password, displayName)
          this.$toast.global.my_app_success()
          this.$router.push('/')
        } catch (error) {
          this.$toast.global.my_app_error(error)
        }
      }
    }
  }
})
</script>

<style scoped></style>
