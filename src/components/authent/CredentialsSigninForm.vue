<script setup lang="ts">
import { useConnectedUserStore } from "@/stores/ConnectedUserStore";
import { ref } from "vue";
import { requiredField } from "@/misc/validationRules";

const connectedUserStore = useConnectedUserStore();

let emailOrUserName = ref("");
let password = ref("");

let formIsValid = ref(true)

const emit = defineEmits(['onSigninSuccess'])

const signinWithCredentials = () => {
    connectedUserStore.signinWithCredentials(emailOrUserName.value, password.value)
    emit('onSigninSuccess')
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
        v-model="emailOrUserName"
        :readonly="loading"
        :rules="[requiredField]"
        class="mb-1 rounded-text-input"
        clearable
        label="Email or Username"
        type="email"
        >
    </v-text-field>
    <v-text-field
        variant="solo"
        v-model="password"
        :readonly="loading"
        :rules="[required]"
        class="mb-1 rounded-text-input"
        clearable
        label="Password"
        type="password"
    >
</v-text-field>
    <v-btn
        class="px-10"
        color="success"
        rounded="pill"
        @click="signinWithCredentials"
    >
        Sign in
    </v-btn>
</v-form>
</template>
