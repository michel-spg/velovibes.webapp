<script setup>
import { bikes } from '@/assets/bikes.js'
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="container mt-3">
    <h1>Bikes</h1>
    <!-- copilot prompt: add a row and 3 columns to show the bikes in a card element -->
    <div class="row">
      <!-- loop through the bikes and show them in a card element -->
      <div v-for="bike in bikes" :key="bike.id" class="col-md-4 mb-3">
        <div class="card h-100">
          <img :src="bike.image" class="card-img-top" alt="bike image">
          <div class="card-body">
            <h5 class="card-title">{{ bike.brand }}</h5>
            <p class="card-text">{{ bike.model }}</p>
            <p class="card-text">{{ bike.category }}</p>
            <p class="card-text"><small class="text-muted">{{ bike.price }}</small></p>
            <!-- <p class="card-text">
              <router-link :to="{ name: 'BikeDetails', params: { id: bike.id } }" class="btn btn-primary">View
                details</router-link>
            </p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>