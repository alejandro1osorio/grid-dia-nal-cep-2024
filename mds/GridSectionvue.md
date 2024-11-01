```vue

<template>
  <section class="grid-section">
    <!-- Agregar barra de búsqueda -->
    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Buscar Institución"
        @input="filterItems" 
      />
      <button @click="filterItems">Buscar</button>
    </div>

    <div class="grid-container">
      <!-- Se itera sobre cada tarjeta filtrada -->
      <div v-for="(item, index) in filteredItems" :key="index" class="card">
        <div class="card-image">
          <div @click="item.fotos && item.fotos.length ? openPhotoSwipe(index) : null" style="cursor: pointer;">
            <img
              :src="item.fotos && item.fotos.length ? item.fotos[0] : 'https://dia-nacional-cepillado-2024.s3.us-east-1.amazonaws.com/images/logo-colgate.png'"
              :alt="item.fotos && item.fotos.length ? 'Imagen' : 'Sin Imagen'"
              :width="1200"
              :height="800"
              class="lazyload"
            />
          </div>
        </div>
        <div class="card-content">
          <p><strong>Nombre Institución:</strong> {{ item.nombreInstitucion }}</p>
          <p><strong>Nombre Sede:</strong> {{ item.nombreSede }}</p>
          <p><strong>Departamento:</strong> {{ item.departamento }}</p>
          <p><strong>Ciudad:</strong> {{ item.ciudad }}</p>
        </div>
      </div>
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
      items: [], // Datos originales
      searchQuery: '' // Query para el filtro de búsqueda
    };
  },
  computed: {
    // Computed para filtrar los ítems en función de la búsqueda
    filteredItems() {
      return this.items.filter(item => 
        item.nombreInstitucion.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  mounted() {
    axios.get('http://localhost:3000/api/instituciones') // /api/instituciones
      .then(response => {
        this.items = response.data;
      })
      .catch(error => {
        console.error('Error al obtener los datos', error);
      });
  },
  methods: {
    openPhotoSwipe(index) {
      const images = this.items[index].fotos.map(foto => ({
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
          img.style.margin = '0';
          img.style.padding = '0';
        }
      });

      lightbox.init();
      lightbox.loadAndOpen(0);
    },
    // Método para filtrar los ítems (se invoca en tiempo real y con botón)
    filterItems() {
      this.filteredItems;
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
</style>

```