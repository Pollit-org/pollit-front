
<template>
    <q-page class="row items-center justify-evenly">
        <h1>Hello there.</h1>
    </q-page>
</template>

<script setup lang="ts">
import Router from 'src/router';
import { useConnectedUserStore } from 'src/stores/connected-user-store';

const connectedUserStore = useConnectedUserStore();

const signin = () => {
    Router.push({ name: 'Signin'})
}
</script>