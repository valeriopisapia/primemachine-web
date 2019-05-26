<template>
<v-container fluid pa-3 pr-3>
    <sw-machine :patternId="patternId"></sw-machine>
</v-container>
</template>

<script>
import Machine from '@/components/machine/Machine'
export default {
    name: 'PatternComponent',
    components: {
        'sw-machine': Machine
    },
    props: ['patternId'],
    data() {
        return {
        }
    },
    created() {
        // sounds/:soundUrl/
    }
}
</script>
