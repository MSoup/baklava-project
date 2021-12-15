<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-spacer></v-spacer>

    <v-btn
        href="https://newcat.github.io/baklavajs/#/"
        target="_blank"
        text
      >
        <span class="mr-2">BaklavaJS Documentation</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Editor />
    </v-main>
  </v-app>
</template>

<script>
import Editor from './components/Editor';

export default {
  name: 'App',

  components: {
    Editor,
  },

  data: () => ({
    //
  }),
};
</script>
