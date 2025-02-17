<template>
  <div class="register-container">
    <h2>Create Account</h2>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <form @submit.prevent="handleRegister" class="register-form">
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
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
          placeholder="Confirm your password"
        />
      </div>
      <button type="submit" class="register-button" :disabled="loading">
        {{ loading ? 'Registering...' : 'Register' }}
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
  name: 'RegisterView',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const { loading, error } = storeToRefs(authStore)
    return { authStore, router, loading, error }
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match!'
        return
      }
      try {
        await this.authStore.registerWithEmail(this.email, this.password)
        this.router.push('/bikes')
      } catch (error) {
        console.error('Registration failed:', error)
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