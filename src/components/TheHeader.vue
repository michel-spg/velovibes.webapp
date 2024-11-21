<script setup>
const title = 'VeloBikes';
// create a slogan for yumlog
const slogan = 'Jedes Bike ist ein Meisterwerk!';
</script>

<template>
  <div class="container mt-3 p-4 text-center bg-light-olive text-white rounded">
    <h1>{{ title }}</h1>
    <figure>
      <blockquote class="blockquote">
        <p>{{ slogan }}</p>
      </blockquote>
      <figcaption class="blockquote-footer">
        <cite title="ChatGpt">ChatGpt</cite>
      </figcaption>
    </figure>
  </div>
</template>