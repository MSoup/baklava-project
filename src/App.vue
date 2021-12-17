<template>
  <v-app>
    <v-main>
      <Tabs :components_data=components_data :items=items /> 
      <!-- <v-container fluid>
        <v-row class="sidebar-editor-sidebar-container">
          <v-col>
            <v-container class="sidebar-container">
            </v-container>
          </v-col>

          <v-col cols="8" >
            <h2>Demo Graph: {{curTab.tab}}</h2>
            <div v-for="(component, index) in display.editors" :key="index">
              <Editor :EditorName="curTab.content" />
            </div>
          </v-col>
          <v-col>
            <v-container class="sidebar-container">

            </v-container>
          </v-col>
        </v-row>
      </v-container> -->
    </v-main>
  </v-app>
</template>

<script>
// import Editor from './components/Editor';
import Tabs from "./components/Tab";

export default {
  name: 'App',
  data() {
    return {
      items: [
          { tab: 'TRD', content: 'Graph Title' },
          { tab: 'MPTool', content: 'Graph Title' },
          { tab: 'Editor Name', content: 'Graph Title' },
          { tab: 'Random Long Title', content: 'Graph Title' },
          { tab: 'Dave', content: 'Graph Title' },
      ],
      // display represents the source of truth for what should be displayed on the main page where the tab is

      components_data: [
        {
          editors: 1,
          data: {nodes: 5}
        },
        {
          editors: 2,
          data: {nodes: 2}
        },
        {
          editors: 3,
          data: {nodes: 2}
        },
        {
          data: {nodes: 2},
          editors: 4,
        },
        {
          data: {nodes: 2},
          editors: 5,
        },
      ]
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
  border: solid pink 2px;
  min-height: 180vh;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background-color: lightgrey;

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