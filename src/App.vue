<template>
  <v-app>
    <v-main>
      <Tabs @clickEvent="clickEvent" /> 
      <v-container fluid>
        <v-row class="sidebar-editor-sidebar-container">
          <v-col>
            <v-container class="sidebar-container">
                <v-btn>Button</v-btn>
                <v-btn>Button</v-btn>
                <v-btn>Button</v-btn>
                <v-btn>Button</v-btn>
            </v-container>
          </v-col>
          <v-col cols="8" >
            <Editor editorname="editor-1" />
            <Editor editorname="editor-2" />
            <Editor editorname="editor-3" />

          </v-col>
          <v-col>
            <v-container class="sidebar-container">
                <v-btn>Button</v-btn>
                <v-btn>Button</v-btn>
                <v-btn>Button</v-btn>
                <v-btn>Button</v-btn>
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
      tab1: [],
      tab2: [],
      tab3: [],
    }
  },
  methods: {
    clickEvent(val) {
      console.log(val)
    },
  },
  components: {
    Tabs, 
    Editor
  },
  created() {
    this.tab1.push()
  },

};
</script>

<style scoped>
.sidebar-container {
  border: solid pink;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

/* .sidebar-container {


} */

.sidebar-editor-sidebar-container {
  flex-wrap: nowrap;
  border: solid;
}


.sidebar-container > button {
  margin: 5px;
}

</style>