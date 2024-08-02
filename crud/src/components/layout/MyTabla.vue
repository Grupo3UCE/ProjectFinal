<template>
  <div>
    <h1>Lista de Productos</h1>
    <div class="container">
      <div class="button-group">
        <button @click="openAddModal" class="btn btn-success my-2">Agregar</button>
      </div>
      <div class="search-container">
        <input type="number" v-model="searchId" placeholder="Buscar por ID" @keyup.enter="fetchProduct">
       
        <button @click="fetchProduct">Buscar</button>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Disponible</th>
          <th>Creado</th>
          <th>Actualizado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.available ? 'Sí' : 'No' }}</td>
          <td>{{ new Date(product.createdAt).toLocaleDateString() }}</td>
          <td>{{ new Date(product.updatedAt).toLocaleDateString() }}</td>
          <td>
            <button @click="openEditModal(product)">Editar</button>
            <button2 @click="deleteProduct(product.id)">Eliminar</button2>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para editar productos -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeEditModal">&times;</span>
        <h2>Editar Producto</h2>
        <form @submit.prevent="submitEdit">
          <label for="name">Nombre:</label>
          <input type="text" id="name" v-model="editProductData.name">
          <label for="price">Precio:</label>
          <input type="number" id="price" v-model="editProductData.price" step="0.01">
          <button type="submit">Guardar Cambios</button>
        </form>
      </div>
    </div>

    <!-- Modal para agregar productos -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeAddModal">&times;</span>
        <h2>Agregar Producto</h2>
        <form @submit.prevent="submitAdd">
          <label for="addName">Nombre:</label>
          <input type="text" id="addName" v-model="addProductData.name" required>
          <label for="addPrice">Precio:</label>
          <input type="number" id="addPrice" v-model="addProductData.price" step="0.01" required>
          <button type="submit">Agregar Producto</button>
        </form>
      </div>
    </div>

    <div>
      <button @click="fetchProducts(currentPage - 1)" :disabled="currentPage <= 1">Anterior</button>
      <span>Página {{ currentPage }} de {{ lastPage }}</span>
      <button @click="fetchProducts(currentPage + 1)" :disabled="currentPage >= lastPage">Siguiente</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      currentPage: 1,
      lastPage: 1,
      total: 0,
      searchId: '',
      searchName: '',
      showEditModal: false,
      editProductData: {},
      showAddModal: false,
      addProductData: {
        name: '',
        price: 0
      }
    };
  },
  methods: {
    fetchProducts(page = 1) {
      axios.get(`http://192.168.100.214:3000/api/products?page=${page}`)
        .then(response => {
          this.products = response.data.data;
          this.currentPage = response.data.meta.page;
          this.lastPage = response.data.meta.lastPage;
          this.total = response.data.meta.total;
        })
        .catch(error => {
          console.error('Error fetching the products:', error);
        });
    },
    fetchProduct() {
      if (this.searchId) {
        axios.get(`http://192.168.100.214:3000/api/products/${this.searchId}`)
          .then(response => {
            this.products = [response.data]; // Mostrar solo el producto encontrado
          })
          .catch(error => {
            console.error('Error fetching the product:', error);
            alert('Producto no encontrado.');
          });
      } else if (this.searchName) {
        axios.get(`http://192.168.100.214:3000/api/products?name=${this.searchName}`)
          .then(response => {
            this.products = response.data.data; // Mostrar los productos encontrados
          })
          .catch(error => {
            console.error('Error fetching the products:', error);
            alert('Productos no encontrados.');
          });
      } else {
        this.fetchProducts(this.currentPage); // Si no hay búsqueda, cargar todos los productos
      }
    },
    deleteProduct(id) {
      if (confirm('¿Estás seguro de querer eliminar este producto?')) {
        axios.delete(`http://192.168.100.214:3000/api/products/${id}`)
          .then(() => {
            alert('Producto eliminado');
            this.fetchProducts(this.currentPage); // Recargar los productos
          })
          .catch(error => {
            console.error('Error deleting the product:', error);
          });
      }
    },
    openEditModal(product) {
      this.editProductData = { ...product };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    submitEdit() {
      axios.patch(`http://192.168.100.214:3000/api/products/${this.editProductData.id}`, {
        name: this.editProductData.name,
        price: this.editProductData.price
      })
      .then(() => {
        alert('Producto actualizado');
        this.closeEditModal();
        this.fetchProducts(this.currentPage);  // Recargar los productos
      })
      .catch(error => {
        console.error('Error updating the product:', error);
        alert('Error al actualizar el producto: ' + error.message);
      });
    },
    openAddModal() {
      this.showAddModal = true;
    },
    closeAddModal() {
      this.showAddModal = false;
    },
    submitAdd() {
      axios.post('http://192.168.100.214:3000/api/products', {
        name: this.addProductData.name,
        price: this.addProductData.price
      })
      .then(() => {
        alert('Producto agregado');
        this.closeAddModal();
        this.fetchProducts(this.currentPage);  // Recargar los productos
      })
      .catch(error => {
        console.error('Error adding the product:', error);
        alert('Error al agregar el producto: ' + error.message);
      });
    }
  },
  mounted() {
    this.fetchProducts();
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

h1 {
  color: #007bff; /* Color destacado */
  text-align: center;
  margin-top: 20px;
  font-size: 32px; /* Tamaño de fuente mayor */
  font-weight: 700; /* Negrita */
  border-bottom: 3px solid #007bff; /* Línea debajo del título */
  padding-bottom: 10px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
}

.container .button-group {
  display: flex;
  gap: 10px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, box-shadow 0.3s;
}
button2 {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

button:hover {
  background-color: #0056b3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input[type="text"], input[type="number"] {
  padding: 10px;
  margin: 5px 0;
  box-sizing: border-box;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Alinear a la derecha */
}

.search-container input[type="text"], .search-container input[type="number"] {
  width: 250px;
  margin-right: 10px;
}

.search-container button {
  margin: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th, td {
  border: 1px solid #dee2e6;
  padding: 12px;
  text-align: left;
  font-size: 14px;
}

th {
  background-color: #e9ecef;
  color: #495057;
  font-weight: 500;
}

tr:nth-child(even) {
  background-color: #f8f9fa;
}

tr:hover {
  background-color: #e9ecef;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #ccc;
  cursor: pointer;
}

.close:hover {
  color: #000;
}

button[type="button"] {
  background-color: #dc3545;
  margin-top: 10px;
}
button[type="button1"] {
  background-color: #dc3545;
  margin-top: 10px;
}
button[type="button"]:hover {
  background-color: #c82333;
}

button[type="submit"] {
  background-color: #28a745;
  margin-top: 10px;
}

button[type="submit"]:hover {
  background-color: #218838;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.pagination button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:not(:disabled):hover {
  background-color: #0056b3;
}

.pagination span {
  font-size: 14px;
  margin: 0 10px;
}
</style>
