<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getImageUrl } from '../utils/helper';

const bike = ref({});
const route = useRoute();

const fetchBike = async () => {
  const id = route.params.id;
  const response = await fetch(`http://localhost:3000/api/bikes/${id}`);
  bike.value = await response.json();
  console.log(bike.value);
};

onMounted(() => {
  fetchBike();
});
</script>

<template>
  <div class="container mt-3">
    <h1>Bike Details</h1>
    <div class="row">
      <div class="col-md-4">
        <img :src="getImageUrl(bike?.image)" class="img-fluid rounded" alt="bike image">
      </div>
      <div class="col-md-4">
        <h5 class="card-title">{{ bike?.brand }}</h5>
        <p class="card-text">{{ bike?.model }}</p>
        <p class="card-text">{{ bike?.category }}</p>
        <p class="card-text">{{ bike?.color }}</p>
        <p class="card-text">{{ bike?.size }}</p>
        <p class="card-text">{{ bike?.description }}</p>
      </div>
      <div class="col-md-4">
        <h5>Equipment</h5>
        <!-- equipment list as ul and li, show all values -->
        <ul>
          <li v-for="equipment in bike?.equipment" :key="equipment">{{ equipment }}</li>
        </ul>
        <h5>Price</h5>
        <p class="card-text"><small class="text-muted">${{ bike?.price }}</small></p>
      </div>
    </div>
  </div>
</template>