<script setup lang="ts">
import { axiosPollit } from "@/axios";
import {useConnectedUserStore} from "@/stores/ConnectedUserStore";
import { ref } from "@vue/reactivity";
import router from "@/router";

const connectedUserStore = useConnectedUserStore();

let userName = ref("");

const setPermanentUserName = async () => {
    await connectedUserStore.setPermanentUserName(userName.value);    
}

</script>

<template>
<v-form
    ref="form"
    v-model="valid"
    lazy-validation
>
    <v-text-field
        variant="solo"
        v-model="userName"
        :readonly="loading"
        :rules="[required]"
        class="mb-1 rounded-text-input"
        clearable
        label="User name"
        >
    </v-text-field>
    <v-btn
        class="px-10"
        color="success"
        rounded="pill"
        @click="setPermanentUserName"
    >
        Set user name
    </v-btn>
</v-form>
</template>
