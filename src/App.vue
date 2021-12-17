<template>
  <v-app>
    <v-main>
      <Tabs :items=items @clickEvent="clickEvent" /> 
      <v-container fluid>
        <v-row class="sidebar-editor-sidebar-container">
          <v-col>
            <v-container class="sidebar-container">
 
            </v-container>
          </v-col>
          <v-col cols="8" >
            <h2>{{display}}</h2>
            <Editor editorname="editor-1" />

          </v-col>
          <v-col>
            <v-container class="sidebar-container">

            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Editor from './components/Editor';
import Tabs from "./components/Tab";

export default {
  name: 'App',
  data() {
    return {
      items: [
          { tab: '1', content: 'Title for Tab 1 Contents' },
          { tab: '2', content: 'Title for Tab 2 Contents' },
          { tab: '3', content: 'Title for Tab 3 Contents' },
          { tab: '4', content: 'Title for Tab 4 Contents' },
      ],
      display: ""
    }
  },
  methods: {
    clickEvent(val) {
      this.display = this.items[val-1].content
    },
  },
  components: {
    Tabs, 
    Editor
  },
  created() {
    this.clickEvent("1");
  },

};
</script>

<style scoped>
.sidebar-container {
  border: solid pink;
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