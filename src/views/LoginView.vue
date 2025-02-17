<template>
  <div class="register-container">
    <h2>Login</h2>
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
      <button type="submit" class="register-button">Login</button>
      
      <div class="divider">
        <span>or</span>
      </div>
      
      <button 
        type="button" 
        class="google-button"
        @click="handleGoogleSignIn"
      >
        <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google logo" />
        Continue with Google
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // TODO: Implement login logic here
      console.log('Login attempted with:', this.email)
    },
    handleGoogleSignIn() {
      // TODO: Implement Google Sign-In logic here
      console.log('Google Sign-In attempted')
    }
  }
}
</script> 