<template>
  <section class="grid-section">
    <div class="grid-container">
      <div v-for="(item, index) in items" :key="index" class="card">
        <div class="card-image">
          <img :src="item.images[0]" alt="Imagen" @click="openPhotoSwipe(index)" />
        </div>
        <div class="card-content">
          <p><strong>Nombre Institución:</strong> {{ item.nombreInstitucion }}</p>
          <p><strong>Nombre Sede:</strong> {{ item.nombreSede }}</p>
          <p><strong>Departamento:</strong> {{ item.departamento }}</p>
          <p><strong>Ciudad:</strong> {{ item.ciudad }}</p>
        </div>
      </div>
    </div>
    
    <!-- Aquí va el contenedor que será usado por PhotoSwipe -->
    <div id="photoswipe-gallery"></div>
  </section>
</template>

<script>
import { Gallery } from 'photoswipe';

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
          images: ['https://cdn.pixabay.com/photo/2024/08/08/17/13/salt-8955103_1280.jpg', '', ''],
        },
        {
          nombreInstitucion: 'Institución 1',
          nombreSede: 'Sede 1',
          departamento: 'Departamento 1',
          ciudad: 'Ciudad 1',
          images: ['https://cdn.pixabay.com/photo/2017/01/31/13/40/shooting-star-2024127_1280.png', 'img2.jpg', 'img3.jpg'],
        },
        {
          nombreInstitucion: 'Institución 1',
          nombreSede: 'Sede 1',
          departamento: 'Departamento 1',
          ciudad: 'Ciudad 1',
          images: ['https://cdn.pixabay.com/photo/2023/10/07/14/24/smartwatch-8300238_1280.jpg', 'img2.jpg', 'img3.jpg'],
        },
        {
          nombreInstitucion: 'Institución 1',
          nombreSede: 'Sede 1',
          departamento: 'Departamento 1',
          ciudad: 'Ciudad 1',
          images: ['https://cdn.pixabay.com/photo/2024/07/31/06/12/stray-8933778_1280.png', 'img2.jpg', 'img3.jpg'],
        },
        {
          nombreInstitucion: 'Institución 1',
          nombreSede: 'Sede 1',
          departamento: 'Departamento 1',
          ciudad: 'Ciudad 1',
          images: ['https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg', 'img2.jpg', 'img3.jpg'],
        },
        {
          nombreInstitucion: 'Institución 1',
          nombreSede: 'Sede 1',
          departamento: 'Departamento 1',
          ciudad: 'Ciudad 1',
          images: ['https://cdn.pixabay.com/photo/2023/05/06/12/17/music-7974197_1280.jpg', 'img2.jpg', 'img3.jpg'],
        },
        {
          nombreInstitucion: 'Institución 1',
          nombreSede: 'Sede 1',
          departamento: 'Departamento 1',
          ciudad: 'Ciudad 1',
          images: ['https://cdn.pixabay.com/photo/2024/05/24/19/06/bird-8785666_1280.jpg', 'img2.jpg', 'img3.jpg'],
        },
        {
          nombreInstitucion: 'Institución 1',
          nombreSede: 'Sede 1',
          departamento: 'Departamento 1',
          ciudad: 'Ciudad 1',
          images: ['https://cdn.pixabay.com/photo/2024/07/13/07/40/cars-8891625_1280.jpg', 'img2.jpg', 'img3.jpg'],
        },
        {
          nombreInstitucion: 'Institución 1',
          nombreSede: 'Sede 1',
          departamento: 'Departamento 1',
          ciudad: 'Ciudad 1',
          images: ['https://cdn.pixabay.com/photo/2024/04/21/14/13/pelican-8710717_1280.jpg', 'img2.jpg', 'img3.jpg'],
        },
        {
          nombreInstitucion: 'Institución 1',
          nombreSede: 'Sede 1',
          departamento: 'Departamento 1',
          ciudad: 'Ciudad 1',
          images: ['https://cdn.pixabay.com/photo/2024/06/25/16/57/woman-8853114_1280.jpg', 'img2.jpg', 'img3.jpg'],
        },
        {
          nombreInstitucion: 'Institución 1',
          nombreSede: 'Sede 1',
          departamento: 'Departamento 1',
          ciudad: 'Ciudad 1',
          images: ['https://cdn.pixabay.com/photo/2024/03/25/20/30/german-shorthaired-pointer-8655457_1280.jpg', 'img2.jpg', 'img3.jpg'],
        },
        {
          nombreInstitucion: 'Institución 1',
          nombreSede: 'Sede 1',
          departamento: 'Departamento 1',
          ciudad: 'Ciudad 1',
          images: ['https://cdn.pixabay.com/photo/2023/08/08/10/50/hot-wheels-8177051_1280.jpg', 'img2.jpg', 'img3.jpg'],
        },
        {
          nombreInstitucion: 'Institución 1',
          nombreSede: 'Sede 1',
          departamento: 'Departamento 1',
          ciudad: 'Ciudad 1',
          images: ['https://cdn.pixabay.com/photo/2022/11/15/06/35/trees-7593237_1280.jpg', 'img2.jpg', 'img3.jpg'],
        },
        {
          nombreInstitucion: 'Institución 1',
          nombreSede: 'Sede 1',
          departamento: 'Departamento 1',
          ciudad: 'Ciudad 1',
          images: ['https://cdn.pixabay.com/photo/2023/02/08/18/36/tawny-owl-7777285_1280.jpg', 'img2.jpg', 'img3.jpg'],
        },
        {
          nombreInstitucion: 'Institución 1',
          nombreSede: 'Sede 1',
          departamento: 'Departamento 1',
          ciudad: 'Ciudad 1',
          images: ['https://cdn.pixabay.com/photo/2022/11/15/06/35/trees-7593237_1280.jpg', 'img2.jpg', 'img3.jpg'],
        },
        // Agrega más items aquí
      ],
    };
  },
  methods: {
    openPhotoSwipe(index) {
      const items = this.items[index].images.map((image) => ({
        src: image,
        width: 1200,
        height: 800,
      }));

      const galleryElement = document.querySelectorAll('#photoswipe-gallery')[0];
      const options = {
        // Opciones de la galería, si las necesitas
        index: 0, // Empieza desde la primera imagen
      };

      const gallery = new PhotoSwipe(galleryElement, items, options);
      gallery.init();
    },
  },
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
