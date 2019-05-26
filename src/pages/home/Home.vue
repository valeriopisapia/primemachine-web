<template>
<div>
    <sw-content></sw-content>
</div>
</template>

<script>
import Content from '@/pages/home/Content'
export default {
    name: 'HomeComponent',
    components: {
        'sw-content': Content
    },
    data() {
        return {
        }
    },
    created() {
        // sounds/:soundUrl/
    }
}
</script>
