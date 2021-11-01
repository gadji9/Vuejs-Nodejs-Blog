<template>
    <div>
        <Form curOption="Login"/>
    </div>
</template>

<script>
import Form from '../components/Form'
import { Component, Vue } from "vue-property-decorator";
    @Component({
        components:{
            Form
        }
    })
    export default class Auth extends Vue {}
</script>

<style lang="scss" scoped>

</style>