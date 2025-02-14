<script setup>
import { computed, ref } from 'vue';

const brand = ref('');
const model = ref('');
const category = ref('');
const color = ref('');
const price = ref('');
const size = ref('');
const description = ref('');
const equipment = ref(['']); // Array aus Strings
const imageFile = ref(null); // Hält das Bild
const successMessage = ref(''); // Hält die Erfolgsmeldung
const errorMessage = ref(''); // Hält die Fehlermeldung
const isFormVisible = ref(true); // Steuert die Sichtbarkeit des Formulars
const startValidation = ref(false); // Steuert die Validierung

// Validierung für das Inputfeld Marke
const isValidBrand = computed(() => startValidation.value ? brand.value.length >= 2 : true);
const isValidModel = computed(() => startValidation.value ? model.value.length >= 2 : true);
const isValidCategory = computed(() => startValidation.value ? category.value.length >= 2 : true);
const isValidColor = computed(() => startValidation.value ? color.value.length >= 2 : true);
const isValidPrice = computed(() => startValidation.value ? price.value > 0 : true);

// Neues Equipment hinzufügen
const addEquipment = () => {
  equipment.value.push(''); // Fügt einen leeren String hinzu
};

// Equipment entfernen
const removeEquipment = (index) => {
  equipment.value.splice(index, 1);
};

// Bildauswahl verarbeiten
const handleImageUpload = (event) => {
  imageFile.value = event.target.files[0];
};

// Fahrrad hinzufügen
const addBike = async () => {
  const formData = new FormData();
  startValidation.value = true;

  formData.append('brand', brand.value);
  formData.append('model', model.value);
  formData.append('category', category.value);
  formData.append('color', color.value);
  formData.append('price', price.value);
  formData.append('size', size.value);
  formData.append('description', description.value);
  formData.append('image', imageFile.value);

  equipment.value.forEach((item, index) => {
    formData.append(`equipment[${index}]`, item); // Fügt jedes Equipment-Item als String hinzu
  });

  if (isValidBrand.value
    && isValidPrice.value
    && isValidModel.value
    && isValidCategory.value
    && isValidColor.value) {
    const response = await fetch('http://localhost:3000/api/bikes', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      successMessage.value = 'Fahrrad erfolgreich hinzugefügt!';
      isFormVisible.value = false; // Formular ausblenden
      errorMessage.value = ''; // Fehlermeldung zurücksetzen
    } else {
      errorMessage.value = 'Fehler beim Hinzufügen des Fahrrads!';
    }
  }
};
</script>

<template>
  <div class="container my-3">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <!-- Erfolgsmeldung -->
        <div v-if="successMessage" class="alert alert-success text-center">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="alert alert-danger text-center">
          {{ errorMessage }}
        </div>
        <!-- Formular Fahrrad hinzufügen -->
        <form v-if="isFormVisible" @submit.prevent="addBike">
          <div class="mb-3">
            <label for="brand" class="form-label">Marke</label>
            <input type="text" class="form-control" id="brand" v-model="brand" required />
            <p class="text-danger" v-if="!isValidBrand">Bitte mindestens 2 Zeichen eingeben!</p>
          </div>

          <div class="mb-3">
            <label for="model" class="form-label">Modell</label>
            <input type="text" class="form-control" id="model" v-model="model" required />
            <p class="text-danger" v-if="!isValidModel">Bitte mindestens 2 Zeichen eingeben!</p>
          </div>

          <div class="mb-3">
            <label for="category" class="form-label">Kategorie</label>
            <input type="text" class="form-control" id="category" v-model="category" required />
            <p class="text-danger" v-if="!isValidCategory">Bitte mindestens 2 Zeichen eingeben!</p>
          </div>

          <div class="mb-3">
            <label for="color" class="form-label">Farbe</label>
            <input type="text" class="form-control" id="color" v-model="color" required />
            <p class="text-danger" v-if="!isValidColor">Bitte mindestens 2 Zeichen eingeben!</p>
          </div>

          <div class="mb-3">
            <label for="price" class="form-label">Preis (€)</label>
            <input type="number" class="form-control" id="price" v-model="price" step="0.01" required />
            <p class="text-danger" v-if="!isValidPrice">Preis darf nicht negativ oder 0 sein!</p>
          </div>

          <div class="mb-3">
            <label for="size" class="form-label">Rahmengröße</label>
            <select class="form-select" id="size" v-model="size" required>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">Beschreibung</label>
            <textarea class="form-control" id="description" v-model="description"></textarea>
          </div>

          <!-- Bild-Upload -->
          <div class="mb-3">
            <label for="image" class="form-label">Bild hochladen</label>
            <input type="file" class="form-control" id="image" @change="handleImageUpload" accept="image/*" />
          </div>

          <!-- Equipment -->
          <div class="mb-3">
            <label class="form-label">Equipment</label>
            <div v-for="(item, index) in equipment" :key="index" class="input-group mb-2">
              <input type="text" class="form-control" placeholder="Equipment (z. B. Shimano Bremse)"
                v-model="equipment[index]" required />
              <button type="button" class="btn btn-danger" @click="removeEquipment(index)" v-if="equipment.length > 1">
                &times;
              </button>
            </div>
            <button type="button" class="btn btn-secondary mt-2" @click="addEquipment">
              + Equipment hinzufügen
            </button>
          </div>

          <button type="submit" class="btn btn-primary">Speichern</button>
        </form>
      </div>
    </div>
  </div>
</template>
