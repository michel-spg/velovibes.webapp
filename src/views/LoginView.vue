<template>
  <div class="register-container">
    <h2>Login</h2>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <form @submit.prevent="handleLogin" class="register-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Enter your email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" class="register-button" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
      
      <div class="divider">
        <span>or</span>
      </div>
      
      <button 
        type="button" 
        class="google-button"
        @click="handleGoogleSignIn"
        :disabled="loading"
      >
        <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google logo" />
        Continue with Google
      </button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const { loading, error } = storeToRefs(authStore)
    return { authStore, router, loading, error }
  },
  methods: {
    async handleLogin() {
      try {
        await this.authStore.loginWithEmail(this.email, this.password)
        this.router.push('/bikes')
      } catch (error) {
        console.error('Login failed:', error)
      }
    },
    async handleGoogleSignIn() {
      try {
        await this.authStore.loginWithGoogle()
        this.router.push('/bikes')
      } catch (error) {
        console.error('Google sign-in failed:', error)
      }
    }
  }
}
</script> 