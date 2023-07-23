<script setup lang="ts">
import PollitPage from 'components/PollitPage.vue';
import Router from 'src/router';
import { useConnectedUserStore } from 'src/stores/connected-user-store';
import { ref } from 'vue';

const connectedUserStore = useConnectedUserStore();

const birthdate = ref('');
const gender = ref('preferNotToSay');

const selectGender = (g: string) =>
  (gender.value = g == gender.value ? 'preferNotToSay' : g);

const goToHome = () => Router.push({ name: 'Home' });

const validate = async () => {
  const [year, month, day] = birthdate.value.split('-').map((x) => parseInt(x));
  await Promise.all([
    connectedUserStore.setBirthdate(year, month, day),
    connectedUserStore.setGender(gender.value),
  ]);
  goToHome();
};

const showSkipDisclaimer = ref(false);
const showWhyAreWeAsking = ref(false);
</script>

<template>
  <pollit-page
    vertical-center
    :has-back-button="false"
    text-center
  >
    <h1 class="q-mb-lg q-mt-none q-pt-none">
      Please tell us about you {{ connectedUserStore.userName }} !
    </h1>
    <q-separator class="q-my-lg"></q-separator>
    <h2>I was born on</h2>
    <q-input
      v-model="birthdate"
      formatModel="string"
      format="YYYY-MM-DD"
      type="date"
      dense
      class="q-px-none q-py-none"
      style="max-width: 150px; margin: auto"
      input-class="q-py-none self-end"
      input-style="line-height: inherit; "
    />
    <q-separator class="q-my-lg"></q-separator>
    <h2>I identify as</h2>
    <q-btn
      rounded
      outline
      :color="gender == 'Male' ? 'primary' : 'grey'"
      class="q-mx-xs q-my-xs"
      @click="(e) => selectGender('Male')"
      >Male</q-btn
    >
    <q-btn
      rounded
      outline
      :color="gender == 'Female' ? 'primary' : 'grey'"
      class="q-mx-xs q-my-xs"
      @click="(e) => selectGender('Female')"
      >Female</q-btn
    >
    <q-btn
      rounded
      outline
      :color="gender == 'Other' ? 'primary' : 'grey'"
      class="q-mx-xs q-my-xs"
      @click="(e) => selectGender('Other')"
      >Other</q-btn
    >
    <q-separator class="q-my-lg"></q-separator>
    <q-btn
      rounded
      outline
      color="grey"
      class="q-mx-xs q-my-xs"
      @click="showSkipDisclaimer = true"
      >Skip</q-btn
    >
    <q-dialog v-model="showSkipDisclaimer">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm text-justify"
            >We completely understand that you want to keep your personal
            information private. Just keep in mind that some features of Pollit
            require you to provide these information. But it's okay, you can
            always change your mind later!</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="I understand"
            color="primary"
            v-close-popup
            @click="goToHome"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-btn
      rounded
      color="primary"
      class="q-mx-xs q-my-xs"
      :disable="gender == 'preferNotToSay' || !birthdate"
      @click="validate"
      >Validate</q-btn
    >
    <br />
    <br />
    <span
      class="label cursor-pointer"
      style="text-decoration: underline"
      @click="showWhyAreWeAsking = true"
      >Why are we asking ?</span
    >
    <q-dialog v-model="showWhyAreWeAsking">
      <q-card>
        <q-card-section class="row items-center q-py-none q-my-sm">
          <p class="text-justify q-my-none">
            A key feature of Pollit is to provide a cool data aggregation tool
            on every poll to understand what category of the population voted
            for which answer.
          </p>
        </q-card-section>
        <q-card-section class="row items-center q-py-none q-my-sm">
          <p class="text-justify q-my-none">
            This feature can exists only if users accept to provide these
            information. Such information will never be displayed publicly. It
            will only be used to aggregate the answers of a poll into different
            categories of voters. No user will ever be able to determine your
            personal information.
          </p>
        </q-card-section>
        <q-card-section class="row items-center q-py-none q-my-sm">
          <p class="text-justify q-my-none">
            <span class="text-bold"
              >What if I don't provide my information ?</span
            >
            <br />
            You'll be able to use Pollit normally, except that you won't have
            access to the data aggregation visualisation features.
          </p>
        </q-card-section>
        <q-card-section class="row items-center q-py-none q-my-sm">
          <p class="text-justify q-my-none">
            <span class="text-bold"
              >If I don't give my information now, can I change my mind later
              ?</span
            >
            <br />
            Absolutely, you can set your information later in the Account
            Settings page.
          </p>
        </q-card-section>
        <q-card-section class="row items-center q-py-none q-my-sm">
          <p class="text-justify q-my-none">
            <span class="text-bold"
              >Are you going to sell my information ?</span
            >
            <br />
            No.
          </p>
        </q-card-section>
        <q-card-section class="row items-center q-py-none q-my-sm">
          <p class="text-justify q-my-none">
            <span class="text-bold">Can I remove my information later ?</span>
            <br />
            Yes, just go to your account settings and remove it from here.
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </pollit-page>
</template>
