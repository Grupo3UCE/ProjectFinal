<template>
  <div class="card mx-auto mt-5" style="width: 350px;">
    <form 
      @submit.prevent="procesarFormulario"
      class="card-body">
      <h1>{{ tarea ? 'Editar':'Agregar' }} Producto</h1>
      <input 
        class="form-control mb-2"
        type="text" 
        v-model="formData.name"
        placeholder="name"
        required>
      <input 
        type="number"
        placeholder="price"
        v-model="formData.price"
        class="form-control mb-3"
        required
        >
      <div class="form-check mb-3">
        <input 
          type="checkbox"
          v-model="formData.available"
          class="form-check-input">
        <label class="form-check-label">Disponible</label>
      </div>
      <button :disabled="cargando" class="btn btn-primary w-100">Guardar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { API, ITarea } from "@/contantes";
import { useRouter } from "vue-router";

const props = defineProps({
  tarea: {
    type: Object as () => ITarea | null,
    default: null
  }
});

const formData = reactive({
  name: '',
  price: 0,
  available: false
});

const cargando = ref(false);
const router = useRouter();
const tarea = computed(() => props.tarea);

watch(tarea, (newTarea) => {
  if (newTarea) {
    formData.name = newTarea.name || '';
    formData.price = newTarea.price || 0;
    formData.available = newTarea.available || false;
  }
}, { immediate: true });

const procesarFormulario = async () => {
  cargando.value = true;
  const payload = {
    name: formData.name,
    price: formData.price,
    available: formData.available
  };

  try {
    let response;
    if (tarea.value) {
      response = await fetch(`${API}/${tarea.value.id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      response = await fetch(`${API}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    cargando.value = false;
    router.back();
  } catch (error) {
    console.error(error);
    cargando.value = false;
  }
}
</script>

<style scoped>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  color: #333;
  margin: 0;
  padding: 0;
}

.card {
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 24px;
  color: #007bff;
  font-weight: 700;
}

.form-control {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.btn {
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.btn-primary {
  background-color: #007bff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-check-label {
  margin-left: 5px;
}

.form-check-input {
  margin-top: 0.3em;
}
</style>
