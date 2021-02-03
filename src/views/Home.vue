<template>
  <div class="home">
    <FileManager />
  </div>
</template>

<script>
// @ is an alias to /src
import FileManager from '@/components/FileManager/FileManager.vue';

export default {
  name: 'Home',
  components: {
    FileManager,
  },
};
</script>
