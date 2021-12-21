<template>
  <v-app>
    <v-main>
      <Tabs  :items=items /> 
    </v-main>
  </v-app>
</template>

<script>
import Tabs from "./components/Tab";

export default {
  name: 'App',
  data() {
    return {
      items: [
          { tab: 'こもり音' },
          { tab: 'エンジンノイズ'},
          { tab: 'アイドル試験' },
      ],
      // display represents the source of truth for what should be displayed on the main page where the tab is

    }
  },
  components: {
    Tabs, 

  },
  created() {
  },

};
</script>

<style scoped>
.sidebar-container {
  min-height: 180vh;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-editor-sidebar-container {
  flex-wrap: nowrap;
  border: solid;
}


.sidebar-container > button {
  margin: 5px;
  margin-bottom: 15px;
}


</style>