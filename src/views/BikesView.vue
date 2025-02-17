<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
const bikes = ref([]);

const authStore = useAuthStore();

async function fetchBikes() {
  const token = await authStore.getUser?.getIdToken();
  console.log(token);
  const response = await fetch('http://localhost:3000/api/bikes', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
  bikes.value = await response.json();
  console.log(bikes.value);
}

onMounted(() => {
  fetchBikes();
});
</script>

<template>
  <div class="container mt-3 rounded text-center">
    <!-- Button to navigate to the Add Bike page -->
    <router-link to="/bikes/add">
      <button class="btn btn-primary text-white"><i class="bi bi-plus"></i> Bike
        hinzufügen</button>
    </router-link>
  </div>

  <div class="container mt-3">
    <h1>Bikes</h1>
    <!-- copilot prompt: add a row and 3 columns to show the bikes in a card element -->
    <div class="row">
      <!-- loop through the bikes and show them in a card element -->
      <div v-for="bike in bikes" :key="bike.id" class="col-md-4 mb-3">
        <div class="card h-100">
          <img :src="`http://localhost:3000${bike.image}`" class="card-img-top" alt="bike image">
          <div class="card-body">
            <h5 class="card-title">{{ bike.brand }}</h5>
            <p class="card-text">{{ bike.model }}</p>
            <p class="card-text">{{ bike.category }}</p>
            <p class="card-text"><small class="text-muted">{{ bike.price }}</small></p>
            <p class="card-text">
              <!-- <router-link :to="{ name: 'BikeDetails', params: { id: bike.id } }" class="btn btn-primary">View
                details</router-link> -->
              <router-link :to="`/bikes/${bike.id}`" class="btn btn-primary">View
                details</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>