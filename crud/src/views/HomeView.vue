<template>
  <div class="home-container">
    <div class="home-image-container">
      <img src="@/assets/PI.jpg" alt="Eternal Elegance" class="home-image"/>
    </div>
    <div class="home-content">
      <h1 class="home-title">Descubre Eternal Elegance</h1>
      <p class="home-intro">Explora nuestra colección única de joyas finas y accesorios. Cada pieza es una obra de arte diseñada para destacar tu elegancia y estilo personal.</p>
      <router-link class="explore-button" to="/login">Explora Ahora</router-link>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
});
</script>

<style scoped>
.home-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #404040; /* Gris suave */
  background-color: #f4f4f9; /* Color de fondo claro */
  padding: 20px;
}

.home-image-container {
  flex: 1;
  max-width: 50%;
  padding-left: 5%; /* Padding para separar la imagen del borde */
}

.home-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transiciones */
}

.home-image:hover {
  transform: scale(1.05); /* Escala al pasar el ratón */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Sombra más pronunciada */
}

.home-content {
  flex: 1;
  max-width: 50%;
  padding: 20px;
  text-align: left;
}

.home-title {
  font-size: 2.5em;
  margin-bottom: 0.5em;
  color: #325959; /* Color oscuro para el título */
  font-family: 'Helvetica Neue', Arial, sans-serif; /* Fuente profesional */
  font-weight: 700;
}

.home-intro {
  font-size: 1.2em;
  margin-bottom: 1em;
  line-height: 1.5;
  color: #606060; /* Color gris para el texto */
}

.explore-button {
  padding: 10px 20px;
  background-color: #779990; /* Verde azulado claro */
  border: none;
  border-radius: 5px;
  font-size: 1em;
  color: #ffffff; /* Texto blanco para contraste */
  cursor: pointer;
  text-decoration: none; /* Elimina el subrayado de los enlaces */
  display: inline-block; /* Asegura el comportamiento del botón */
  transition: background-color 0.3s ease, color 0.3s ease; /* Transiciones */

  &:hover {
    background-color: #567373; /* Tono más oscuro para el hover */
    color: #ffffff;
  }
}
</style>
