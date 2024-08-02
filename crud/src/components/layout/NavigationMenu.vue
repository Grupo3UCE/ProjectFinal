<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="@/assets/logo.jpeg" alt="Logo" class="navbar-logo">
        <h3 class="title is-3 navbar-title">Eternal Elegance</h3>
      </router-link>
      <a role="button" class="navbar-burger" :class="{ 'is-active': isOpen }" @click.prevent="toggleMenu"
        aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isOpen }">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/products">Productos</router-link>
        <router-link class="navbar-item" to="/orders">Órdenes</router-link>
       
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="user" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">{{ user.displayName || user.email }}</a>
            <div class="navbar-dropdown">
              <router-link class="navbar-item" to="/dashboard">Dashboard</router-link>
              <a class="navbar-item" @click.prevent="logout">Cerrar sesión</a>
            </div>
          </div>
          <div v-else class="buttons">
            <router-link class="button is-primary" to="/register">
              <strong>Registrarme</strong>
            </router-link>
            <router-link class="button is-light" to="/login">Iniciar sesión</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
  data() {
    return {
      isOpen: false,
      user: null,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    async logout() {
      const auth = getAuth();
      try {
        await signOut(auth);
        this.$router.push({ name: 'login' });
      } catch (error) {
        console.error('Error signing out: ', error);
      }
    },
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user ? user : null;
    });
  },
};
</script>

<style scoped>
/* Estilo general de la navegación */
.navbar {
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
  background-color: #868e99;
  padding: 1rem;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.navbar:hover {
  background-color: #6a7482;
  box-shadow: 0 4px 6px rgba(10, 10, 10, 0.15);
}

.navbar-logo {
  height: 50px;
  margin-right: 15px;
  transition: transform 0.3s ease;
}

.navbar-logo:hover {
  transform: scale(1.1);
}

.navbar-title {
  margin-left: 10px;
  color: #ffffff;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 2rem;
  transition: color 0.3s ease;
}

.navbar-title:hover {
  color: #e1e1e1;
}

.navbar-burger {
  border: none;
  outline: none;
  color: #ffffff;
  transition: color 0.3s ease;
}

.navbar-burger:hover {
  color: #e1e1e1;
}

.navbar-item {
  color: #ffffff;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.navbar-item:hover {
  color: #00d1b2;
  background-color: #4a4a4a;
  border-radius: 5px;
}

.navbar-link {
  color: #ffffff;
  transition: color 0.3s ease;
}

.navbar-link:hover {
  color: #00d1b2;
}

.navbar-dropdown {
  background-color: #ffffff;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
  transition: box-shadow 0.3s ease;
}

.navbar-dropdown .navbar-item {
  color: #363636;
}

.navbar-dropdown .navbar-item:hover {
  background-color: #00d1b2;
  color: #ffffff;
}

.button {
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.75rem 1.5rem;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.button.is-primary {
  background-color: #00d1b2;
  border-color: transparent;
}

.button.is-primary:hover {
  background-color: #00b89c;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button.is-light {
  background-color: #f5f5f5;
  color: #363636;
  border: 1px solid #8a2f2f;
}

.button.is-light:hover {
  background-color: #e1e1e1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .navbar-title {
    font-size: 1.5rem;
  }
}

/* Estilo para el dropdown del usuario */
.navbar-item.has-dropdown .navbar-link {
  cursor: pointer;
}

.navbar-item.has-dropdown .navbar-link::after {
  content: '▼';
  margin-left: 5px;
}

.navbar-dropdown {
  background-color: #f9f9f9;
  border-radius: 5px;
  padding: 10px;
}

.navbar-dropdown .navbar-item {
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.navbar-dropdown .navbar-item:hover {
  background-color: #00d1b2;
  color: #ffffff;
}

.navbar-dropdown .navbar-item + .navbar-item {
  margin-top: 5px;
}
</style>

