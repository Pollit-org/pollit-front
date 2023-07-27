<template>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=12.0, minimum-scale=.25, user-scalable=yes"/>
  <q-layout view="hHh Lpr fff">
    <q-header bordered class="bg-banner text-white">
      <q-toolbar>
        <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" class="desktop-hide" /> -->
        <pollit-toolbar-title />
        <q-space />
        <q-btn-dropdown
          v-if="connectedUserStore.user != null"
          color="primary"
          :label="connectedUserStore.user.claims.UserName"
          icon="person"
          no-caps
        >
          <q-list>
            <!-- <q-item clickable v-close-popup @click="onItemClick">
              <span class="material-icons-outlined"></span>
              <q-item-section avatar>
                <q-icon name="question_answer" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Inbox</q-item-label>
              </q-item-section>
            </q-item> -->

            <q-item clickable to="/account-settings" class="no-link-style">
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Settings</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="connectedUserStore.signout(false)">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section> Signout </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn v-else rounded @click="signin" color="accent"> Sign in </q-btn>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" side="left" show-if-above bordered>
      <q-scroll-area class="fit">
        <q-list>

          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>

        </q-list>
      </q-scroll-area>
    </q-drawer> -->
    <!-- <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered> -->
    <!-- drawer content -->
    <!-- </q-drawer> -->
    <q-page-container>
      <router-view />
      <q-dialog
        v-if="showSigninPopup"
        v-model="showSigninPopup"
        @close="closeSigninPopup"
      >
        <sign-in style="width: 700px; max-width: 80vw" />
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useConnectedUserStore } from 'src/stores/connected-user-store';
import Router from 'src/router';
import PollitToolbarTitle from './components/PollitToolbarTitle.vue';
import SignIn from 'src/components/SignIn.vue';
import { showSigninPopup, closeSigninPopup } from '../misc/ShowSigninPopupIfNotConnected';

const connectedUserStore = useConnectedUserStore();

const signin = () => {
  Router.push({ name: 'Signin' });
};

const menuList = [
  {
    icon: 'inbox',
    label: 'Menu 1',
    separator: true,
  },
  {
    icon: 'send',
    label: 'Menu 2',
    separator: false,
  },
  {
    icon: 'delete',
    label: 'Menu 3',
    separator: false,
  },
  {
    icon: 'error',
    label: 'Menu 4',
    separator: true,
  },
  {
    icon: 'settings',
    label: 'Menu 5',
    separator: false,
  },
  {
    icon: 'feedback',
    label: 'Menu 6',
    separator: false,
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Menu 7',
    separator: false,
  },
];

const $q = useQuasar();

const leftDrawerOpen = ref($q.screen.width < 1023 ? false : true);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
