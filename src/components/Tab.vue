<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="primary"
      dark
    >
        <v-tab
            v-for="item in items"
            :key="item.tab"
            @click="$emit('clickEvent', item.tab)"
        >
            {{ text[item.tab] }}
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
        <v-container >
            <h2>{{ item.tab }}</h2>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
    
  </v-card>
</template>

<script>

  export default {
    data () {
      return {
        tab: null,
        text: {
            "1": "One",
            "2": "Two",
            "3": "Three",
            "4": "Four",
        }
      }
    },
    components: {
    },
    props: {
        items: Array
    }
  }
</script>

<style scoped>
</style>
