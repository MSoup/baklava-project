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
        <v-container >
            <p>{{ item.tab }}</p>
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
        items: [
          { tab: 'One', content: "Tab 1 Conteeent" },
          { tab: 'Two', content: 'Tab 2 Content' },
          { tab: 'Three', content: 'Tab 3 Content' },
          { tab: 'Four', content: 'Tab 4 Content' },
          { tab: 'Five', content: 'Tab 5 Content' },
        ],
      }
    },
    components: {
    }
  }
</script>

<style scoped>
</style>