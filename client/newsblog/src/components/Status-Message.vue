<template>
    <div>
        <div v-if="STATUS_MESSAGE" class="position-absolute">
            <div class="message-wrapper bg-secondary text-white rounded p-3">
            <div class="">            
                <img src="../assets/Exclamation.png" width="25" alt="">
            </div>
                {{STATUS_MESSAGE}}
                {{RemoveStatusMessage()}}
            </div>
        </div>
    </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import {mapGetters, mapActions} from 'vuex'

@Component({
    computed:{
        ...mapGetters(['STATUS_MESSAGE'])
    },
    methods:{
        ...mapActions([
            'A_CHANGE_STATUS_MESSAGE'
        ])
    }
})
export default class Status_Message extends Vue {
 
    RemoveStatusMessage(){
        setTimeout(()=>{
        this.A_CHANGE_STATUS_MESSAGE('')
        }, 3000)
    }
    
}
</script>

<style lang="scss" scoped>
    
</style>