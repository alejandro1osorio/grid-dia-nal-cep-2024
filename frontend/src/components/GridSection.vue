<template>
  <section class="grid-section">
    <div class="grid-container">
      <!-- Se itera sobre cada tarjeta -->
      <div v-for="(item, index) in items" :key="index" class="card">
        <div class="card-image">
          <!-- Se muestra solo la primera imagen de cada tarjeta -->
          <div @click="openPhotoSwipe(index)" style="cursor: pointer;">
            <img :src="item.images[0].src" alt="Imagen" />
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
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export default {
  name: 'GridSection',
  data() {
    return {
      items: [
        {
          nombreInstitucion: 'Institución 1',
          nombreSede: 'Sede 1',
          departamento: 'Departamento 1',
          ciudad: 'Ciudad 1',
          images: [
            { src: 'https://cdn.pixabay.com/photo/2024/08/08/17/13/salt-8955103_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2017/01/31/13/40/shooting-star-2024127_1280.png', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2023/10/07/14/24/smartwatch-8300238_1280.jpg', width: 1200, height: 800 }
          ]
        },
        {
          nombreInstitucion: 'Institución 2',
          nombreSede: 'Sede 2',
          departamento: 'Departamento 2',
          ciudad: 'Ciudad 2',
          images: [
            { src: 'https://cdn.pixabay.com/photo/2023/08/08/10/50/hot-wheels-8177051_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2024/05/06/15/49/grey-heron-8743610_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2024/03/09/16/59/typewriter-8622984_1280.jpg', width: 1200, height: 800 }
          ]
        },
        {
          nombreInstitucion: 'Institución 3',
          nombreSede: 'Sede 3',
          departamento: 'Departamento 3',
          ciudad: 'Ciudad 3',
          images: [
            { src: 'https://cdn.pixabay.com/photo/2024/07/31/06/12/stray-8933778_1280.png', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2023/05/06/12/17/music-7974197_1280.jpg', width: 1200, height: 800 }
          ]
        },
        {
          nombreInstitucion: 'Institución 3',
          nombreSede: 'Sede 3',
          departamento: 'Departamento 3',
          ciudad: 'Ciudad 3',
          images: [
            { src: 'https://cdn.pixabay.com/photo/2023/02/08/18/36/tawny-owl-7777285_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2022/11/15/06/35/trees-7593237_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2024/03/25/20/30/german-shorthaired-pointer-8655457_1280.jpg', width: 1200, height: 800 }
          ]
        },
        {
          nombreInstitucion: 'Institución 3',
          nombreSede: 'Sede 3',
          departamento: 'Departamento 3',
          ciudad: 'Ciudad 3',
          images: [
            { src: 'https://cdn.pixabay.com/photo/2024/05/24/19/06/bird-8785666_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2024/07/13/07/40/cars-8891625_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2024/04/21/14/13/pelican-8710717_1280.jpg', width: 1200, height: 800 }
          ]
        },
        {
          nombreInstitucion: 'Institución 3',
          nombreSede: 'Sede 3',
          departamento: 'Departamento 3',
          ciudad: 'Ciudad 3',
          images: [
            { src: 'https://cdn.pixabay.com/photo/2024/06/25/16/57/woman-8853114_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2024/02/07/14/02/tree-8559118_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2024/02/04/06/46/roller-coaster-8551651_1280.jpg', width: 1200, height: 800 }
          ]
        },
        {
          nombreInstitucion: 'Institución 3',
          nombreSede: 'Sede 3',
          departamento: 'Departamento 3',
          ciudad: 'Ciudad 3',
          images: [
            { src: 'https://cdn.pixabay.com/photo/2024/09/03/08/56/dairy-cattle-9018750_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2024/09/05/09/00/watzmann-9024287_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2024/09/02/20/49/goat-9017896_1280.jpg', width: 1200, height: 800 }
          ]
        },
        {
          nombreInstitucion: 'Institución 3',
          nombreSede: 'Sede 3',
          departamento: 'Departamento 3',
          ciudad: 'Ciudad 3',
          images: [
            { src: 'https://cdn.pixabay.com/photo/2024/08/02/09/01/barracuda-8939250_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2024/08/28/12/52/mountain-9004008_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2024/09/02/20/49/goat-9017896_1280.jpg', width: 1200, height: 800 }
          ]
        },
        {
          nombreInstitucion: 'Institución 3',
          nombreSede: 'Sede 3',
          departamento: 'Departamento 3',
          ciudad: 'Ciudad 3',
          images: [
            { src: 'https://cdn.pixabay.com/photo/2024/07/21/10/22/vulture-8910009_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2024/08/26/12/29/milky-way-8999255_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2023/08/20/06/45/hornbill-8201730_1280.png', width: 1200, height: 800 }
          ]
        },
        {
          nombreInstitucion: 'Institución 3',
          nombreSede: 'Sede 3',
          departamento: 'Departamento 3',
          ciudad: 'Ciudad 3',
          images: [
            { src: 'https://cdn.pixabay.com/photo/2024/01/16/19/56/seagull-8512995_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2024/02/28/16/51/mountain-8602437_1280.jpg', width: 1200, height: 800 },
            { src: 'https://cdn.pixabay.com/photo/2022/11/22/20/25/ball-7610545_960_720.jpg', width: 1200, height: 800 }
          ]
        }
      ]
    };
  },
  methods: {
    openPhotoSwipe(index) {
      // Obtener las imágenes de la tarjeta seleccionada
      const images = this.items[index].images;

      // Crear la instancia de PhotoSwipeLightbox
      const lightbox = new PhotoSwipeLightbox({
        dataSource: images,  // Pasamos las imágenes específicas de la tarjeta
        pswpModule: () => import('photoswipe')
      });

      lightbox.init();
      lightbox.loadAndOpen(0);  // Abrir en la primera imagen
    }
  }
};
</script>

<style scoped>
.grid-section {
  padding: 80px 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  background-color: #fff;
  border: 1px solid #ddd;
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
}
</style>
