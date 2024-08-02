<template>
  <div>
    <h1>Órdenes</h1>
    <div class="container">
      <div class="button-group">
        <button @click="openAddOrderModal">Agregar Orden</button>
      </div>
      <div class="search-container">
        <input type="text" v-model="searchId" placeholder="Buscar por ID" @keyup.enter="fetchOrderById">
        <button @click="fetchOrderById">Buscar</button>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Total Amount</th>
          <th>Total Items</th>
          <th>Status</th>
          <th>Paid</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Detalles</th>
          <th>Cambiar Estado</th>
          <th>Pagar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.totalAmount }}</td>
          <td>{{ order.totalItems }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.paid ? 'Yes' : 'No' }}</td>
          <td>{{ new Date(order.createdAt).toLocaleDateString() }}</td>
          <td>{{ new Date(order.updatedAt).toLocaleDateString() }}</td>
          <td>
            <button @click="fetchOrderDetails(order.id)">Ver Detalles</button>
          </td>
          <td>
            <select v-model="order.status" @change="changeOrderStatus(order)">
              <option value="PENDING">Pendiente</option>
              <option value="DELIVERED">Entregado</option>
              <option value="CANCELLED">Cancelado</option>
            </select>
          </td>
          <td>
            <Text v-if="!order.paid" @click="payOrder(order.id)"> por Pagar</text>
            <span v-else>Pagado</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button @click="fetchOrders(currentPage - 1)" :disabled="currentPage <= 1">Anterior</button>
      <span>Página {{ currentPage }} de {{ lastPage }}</span>
      <button @click="fetchOrders(currentPage + 1)" :disabled="currentPage >= lastPage">Siguiente</button>
    </div>

    <!-- Modal para agregar orden -->
    <div v-if="showAddOrderModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeAddOrderModal">&times;</span>
        <h2>Pagar  Orden</h2>
        <form @submit.prevent="submitAddOrder">
          <div v-for="(item, index) in newOrder.items" :key="index" class="order-item">
            <label for="productId">Product ID:</label>
            <input type="number" v-model="item.productId" required>
            <label for="quantity">Quantity:</label>
            <input type="number" v-model="item.quantity" required>
            <label for="price">Price:</label>
            <input type="number" v-model="item.price" required>
            <button type="button" @click="removeItem(index)">Eliminar Item</button>
          </div>
          <button type="button1" @click="addItem">Agregar Item</button>
          <button type="submit">Pagar Orden</button>
        </form>
      </div>
    </div>

    <!-- Modal para mostrar detalles de la orden -->
    <div v-if="showOrderDetailsModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeOrderDetailsModal">&times;</span>
        <h2>Detalles de la Orden</h2>
        <div v-for="(item, index) in orderDetails.OrderItem" :key="index">
          <p>Producto ID: {{ item.productId }}</p>
          <p>Nombre: {{ item.name }}</p>
          <p>Precio: {{ item.price }}</p>
          <p>Cantidad: {{ item.quantity }}</p>
        </div>
        <p>Total Amount: {{ orderDetails.totalAmount }}</p>
        <p>Total Items: {{ orderDetails.totalItems }}</p>
        <p>Status: {{ orderDetails.status }}</p>
        <p>Paid: {{ orderDetails.paid ? 'Yes' : 'No' }}</p>
        <p>Created At: {{ new Date(orderDetails.createdAt).toLocaleDateString() }}</p>
        <p>Updated At: {{ new Date(orderDetails.updatedAt).toLocaleDateString() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Text } from 'vue';

export default {
  data() {
    return {
      orders: [],
      currentPage: 1,
      lastPage: 1,
      showAddOrderModal: false,
      showOrderDetailsModal: false,
      orderDetails: {},
      searchId: '',
      newOrder: {
        items: [
          {
            productId: '',
            quantity: '',
            price: ''
          }
        ]
      }
    };
  },
  methods: {
    fetchOrders(page = 1) {
      axios.get(`http://192.168.100.214:3000/api/orders?page=${page}`)
        .then(response => {
          this.orders = response.data.data;
          this.currentPage = response.data.meta.page;
          this.lastPage = response.data.meta.lastPage;
        })
        .catch(error => {
          console.error('Error fetching the orders:', error);
        });
    },
    fetchOrderById() {
      if (!this.searchId) return;
      axios.get(`http://192.168.100.214:3000/api/orders/id/${this.searchId}`)
        .then(response => {
          this.orderDetails = response.data;
          this.showOrderDetailsModal = true;
        })
        .catch(error => {
          console.error('Error fetching the order:', error);
          alert('Orden no encontrada.');
        });
    },
    fetchOrderDetails(orderId) {
      axios.get(`http://192.168.100.214:3000/api/orders/id/${orderId}`)
        .then(response => {
          this.orderDetails = response.data;
          this.showOrderDetailsModal = true;
        })
        .catch(error => {
          console.error('Error fetching order details:', error);
        });
    },
    changeOrderStatus(order) {
      axios.patch(`http://192.168.100.214:3000/api/orders/id/${order.id}`, { status: order.status })
        .then(response => {
          console.log('Estado actualizado', response.data);
        })
        .catch(error => {
          console.error('Error updating order status:', error);
        });
    },
    openAddOrderModal() {
      this.showAddOrderModal = true;
    },
    closeAddOrderModal() {
      this.showAddOrderModal = false;
    },
    closeOrderDetailsModal() {
      this.showOrderDetailsModal = false;
    },
    addItem() {
      this.newOrder.items.push({
        productId: '',
        quantity: '',
        price: ''
      });
    },
    removeItem(index) {
      this.newOrder.items.splice(index, 1);
    },
    submitAddOrder() {
      axios.post('http://192.168.100.214:3000/api/orders', this.newOrder)
        .then(response => {
          const paymentUrl = response.data.paymentSession.url;
          window.location.href = paymentUrl;
        })
        .catch(error => {
          console.error('Error adding order:', error);
          alert('Error al agregar la orden: ' + error.message);
        });
    },
    payOrder(orderId) {
      axios.post(`http://192.168.100.214:3000/api/payments`, { orderId })
        .then(response => {
          const paymentUrl = response.data.url;
          window.location.href = paymentUrl;
        })
        .catch(error => {
          console.error('Error initiating payment:', error);
          alert('Error al iniciar el pago: ' + error.message);
        });
    }
  },
  mounted() {
    this.fetchOrders();
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
}

.search-container input[type="text"] {
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

.order-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.order-item label {
  margin-top: 5px;
  font-weight: 500;
}

.order-item input {
  margin-top: 5px;
  padding: 8px;
  font-size: 14px;
}

button[type="button"] {
  background-color: #dc3545;
  margin-top: 10px;
}

button[type="button1"] {
  background-color:  #007bff;
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
