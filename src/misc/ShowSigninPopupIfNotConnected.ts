import { useConnectedUserStore } from 'src/stores/connected-user-store';
import { ref } from 'vue';

const showSigninPopup = ref(false);

const showSigninPopupIfNotConnected = (eventHandler: () => void) => {
  const connectedUserStore = useConnectedUserStore();
  if (connectedUserStore.user == null) {
    showSigninPopup.value = true;
  } else {
    eventHandler();
  }
};

const closeSigninPopup = () => {
  showSigninPopup.value = false;
};

export { showSigninPopup, showSigninPopupIfNotConnected, closeSigninPopup };