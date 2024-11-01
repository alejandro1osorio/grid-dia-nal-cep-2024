```vue

<template>
  <section class="grid-section">
    <!-- Barra de búsqueda -->
    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Buscar Institución" 
        @input="filterItems" 
      />
      <button @click="filterItems">Buscar</button>
    </div>

    <!-- Contenedor de tarjetas paginadas -->
    <div class="grid-container">
      <div v-for="(item, index) in paginatedItems" :key="index" class="card">
        <div class="card-image" @click="item.fotos && item.fotos.length ? openPhotoSwipe(item) : null">
          <img 
            :src="item.fotos && item.fotos.length ? item.fotos[0] : 'https://dia-nacional-cepillado-2024.s3.us-east-1.amazonaws.com/images/logo-colgate.png'"
            :alt="item.fotos && item.fotos.length ? 'Imagen' : 'Sin Imagen'" 
            :width="300" 
            :height="200" 
            class="lazyload"
          />
        </div>
        <div class="card-content">
          <p><strong>Nombre Institución:</strong> {{ item.nombreInstitucion }}</p>
          <p><strong>Nombre Sede:</strong> {{ item.nombreSede }}</p>
          <p><strong>Departamento:</strong> {{ item.departamento }}</p>
          <p><strong>Ciudad:</strong> {{ item.ciudad }}</p>
        </div>
      </div>
    </div>

    <!-- Paginación numérica en la parte inferior -->
    <div class="pagination">
      <button 
        v-for="page in totalPages" 
        :key="page" 
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import 'lazysizes';

export default {
  name: 'GridSection',
  data() {
    return {
      items: [], // Todos los datos de las instituciones
      currentPage: 1, // Página actual para paginación
      itemsPerPage: 15, // Tarjetas por página
      searchQuery: '', // Query para el filtro de búsqueda
    };
  },
  computed: {
    // Filtrar los ítems según el texto de búsqueda
    filteredItems() {
      return this.items.filter(item => 
        item.nombreInstitucion.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    // Determinar el número total de páginas
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    // Mostrar solo los elementos de la página actual
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredItems.slice(start, end);
    }
  },
  mounted() {
    // Cargar datos de las instituciones al montar el componente
    axios.get('http://localhost:3000/api/instituciones')
      .then(response => {
        this.items = response.data;
      })
      .catch(error => {
        console.error('Error al obtener los datos', error);
      });
  },
  methods: {
    // Abrir galería de imágenes con PhotoSwipe para el item seleccionado
    openPhotoSwipe(item) {
      const images = item.fotos.map(foto => ({
        src: foto,
        w: 1200,
        h: 800
      }));

      const lightbox = new PhotoSwipeLightbox({
        dataSource: images,
        pswpModule: () => import('photoswipe'),
        maxSpreadZoom: 1,
        paddingFn: (viewportSize) => {
          if (viewportSize.x < 600) {
            return { top: 0, bottom: 0, left: 0, right: 0 };
          }
          return { top: 50, bottom: 50, left: 50, right: 50 };
        }
      });

      lightbox.on('contentLoad', (e) => {
        if (e.content && e.content.element && e.content.element.tagName === 'IMG') {
          const img = e.content.element;
          img.style.objectFit = 'contain';
          img.style.maxWidth = '100vw';
          img.style.maxHeight = '100vh';
        }
      });

      lightbox.init();
      lightbox.loadAndOpen(0);
    },
    // Navegar a una página específica
    goToPage(page) {
      this.currentPage = page;
    },
    // Método para filtrar ítems (se invoca en tiempo real y con botón)
    filterItems() {
      this.currentPage = 1; // Reiniciar a la primera página al filtrar
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.grid-section {
  padding: 80px 20px;
}

.search-bar {
  margin-bottom: 20px;
  text-align: center;
}

.search-bar input {
  padding: 10px;
  width: 50%;
  font-size: 16px;
  border: 2px solid #df1b16;
  border-radius: 5px;
}

.search-bar button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #df1b16;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  background-color: #fff;
  border: 2px solid #DF1B16;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
}

.card-content {
  padding: 15px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

.card-content p {
  margin: 0 0 10px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

.card-content p strong {
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
  color: #be8900;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  color: #333;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 4px;
}

.pagination button:hover {
  background-color: #007bff;
  color: #fff;
}

.pagination button.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
  cursor: default;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

</style>

```