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
      <h2>Graphs for {{ item.tab }}</h2>
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
          <h2>Demo Graph: {{focused.content}}</h2>
          <div v-for="(editor, n) in focused.editors" :key="n">
            <Editor :EditorName="focused.content"/>

          </div>
        </v-col>
        <v-col>
          <v-container class="sidebar-container">
            <Editor EditorName="resultGraph"/>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Editor from "./Editor"

  export default {
    data () {
      return {
        // Default values
        tab: 0,
        focused: this.components_data[0],
      }
    },
    methods: {
      handleClick(index) {
        // Clicking tabs will change what data should be displayed
        this.focused = this.components_data[index]
        console.log(this.focused)
        console.log(this.tab)
      }
    },
    components: {
      Editor
    },
    props: {
        items: Array,
        components_data: Array
    },
  }
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

.graph-container {
  flex-wrap: nowrap;
}


.sidebar-container > button {
  margin: 5px;
  margin-bottom: 15px;
}


</style>
