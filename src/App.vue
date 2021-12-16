<template>
  <v-app>
    <v-main>
      <Tabs :items=items @clickEvent="clickEvent" /> 
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
            <!-- {{display}} -->
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
      items: [
          { tab: '1', content: Editor },
          { tab: '2', content: 'Tab 2 Content' },
          { tab: '3', content: 'Tab 3 Content' },
          { tab: '4', content: 'Tab 4 Content' },
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