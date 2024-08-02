<template>
  <div class="container">
 
    <MyTablaOrders />
  </div>
</template>

<script setup lang="ts">
import MyTablaOrders from '@/components/layout/MyTablaOrders.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const irAlFormulario = () => {
  router.push('/tarea-formulario');
}
</script>

<style scoped>

</style>
