<template>
    <nav class="navbar navbar-expand-sm bg-light-olive justify-content-center" data-bs-theme="dark">
        <ul class="navbar-nav w-100">
            <li class="nav-item">
                <RouterLink class="nav-link fs-4" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link fs-4" to="/bikes">Bikes</RouterLink>
            </li>
            
            <!-- Show these items when user is NOT logged in -->
            <template v-if="!authStore.isAuthenticated">
                <li class="nav-item ms-auto">
                    <RouterLink class="nav-link fs-4" to="/register">Register</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link fs-4" to="/login">Login</RouterLink>
                </li>
            </template>
            
            <!-- Show these items when user is logged in -->
            <template v-else>
                <li class="nav-item ms-auto">
                    <span class="nav-link fs-4">{{ authStore.getUser?.email }}</span>
                </li>
                <li class="nav-item">
                    <button 
                        class="nav-link fs-4 btn btn-link" 
                        @click="handleLogout"
                    >
                        Logout
                    </button>
                </li>
            </template>
        </ul>
    </nav>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const authStore = useAuthStore()
        const router = useRouter()

        const handleLogout = async () => {
            try {
                await authStore.logout()
                router.push('/login')
            } catch (error) {
                console.error('Logout failed:', error)
            }
        }

        return {
            authStore,
            handleLogout
        }
    }
}
</script>