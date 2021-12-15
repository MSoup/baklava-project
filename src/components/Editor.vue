<template>
    <baklava-editor :plugin="viewPlugin"></baklava-editor>
</template>

<script>
import { Editor } from "@baklavajs/core";
import { ViewPlugin } from "@baklavajs/plugin-renderer-vue";

export default {
    data() {
        return {
            editor: new Editor(),
            viewPlugin: new ViewPlugin()
        }
    },
    created() {
        this.editor.use(this.viewPlugin);
        // register your nodes, node options, node interface types, ...
    }
}
</script>