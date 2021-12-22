<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="primary"
      dark
    >
        <v-tab
            v-for="(item, i) in items"
            :key="item.tab"
            @click="handleClick(i)"
        >
            {{ item.tab }}
        </v-tab>
        <v-spacer></v-spacer>
        <v-btn
            href="https://newcat.github.io/baklavajs/#/"
            target="_blank"
            text
        >
            <span class="mr-2">BaklavaJS Documentation</span>
            <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.tab"
      >
      <v-container>
      <h2>{{ item.tab }}</h2>
      </v-container>
      </v-tab-item>
    </v-tabs-items>
    <v-container fluid>
      <v-row class="graph-container">
        <!-- <v-col>
          <v-container class="sidebar-container">
          </v-container>
        </v-col> -->

        <v-col cols="8" >
          <div v-for="(editor, n) in 1" :key="n">
            <Editor EditorName="エンジンマウント入力" :contents="graph_1_data"/>
          </div>
        </v-col>
        <v-col>
          <v-container class="sidebar-container">
            <Editor2 EditorName="評価"/>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Editor from "./Editor"
import Editor2 from "./EditorResults"
import graph_1_data from "../MOCK_DATA.json";

  export default {
    data () {
      return {
        // Default values
        tab: 0,
        focused: 0,
        graph_1_data: graph_1_data,
      }
    },
    methods: {
      handleClick(index) {
        // Clicking tabs will change what data should be displayed

        console.log(index)
      }
    },
    created() {
    },
    components: {
      Editor, 
      Editor2
    },
    props: {
        items: Array,
    },
  }
</script>

<style scoped>
.sidebar-container {
  min-height: 180vh;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

}

.graph-container {
  flex-wrap: nowrap;
}


.sidebar-container > button {
  margin: 5px;
  margin-bottom: 15px;
}


</style>
