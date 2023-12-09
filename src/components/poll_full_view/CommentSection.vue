<script setup lang="ts">
import RecursiveComment from './RecursiveComment.vue';
import { Comment } from 'src/api/models/comment';
import { ref } from 'vue';
import { usePollStore } from 'src/stores/poll-store';
import { showSigninPopupIfNotConnected } from 'src/misc/ShowSigninPopupIfNotConnected';
import { useConnectedUserStore } from 'src/stores/connected-user-store';
import { viewPoll } from 'src/misc/viewPoll';

interface Props {
  pollId: string;
  comments: Comment[];
}
const props = defineProps<Props>();
const pollStore = usePollStore();
const connectedUserStore = useConnectedUserStore();
const currentComment = ref('');

const postComment = () => {
  if (currentComment.value == '') return;

  pollStore.postCommentOnPoll(props.pollId, null, currentComment.value);
};
</script>
<template>
  <q-card class="q-mb-xs shadow-1 q-px-md q-py-sm">
    <q-card-section class="q-pa-none">
      <q-form @submit="postComment" @click="showSigninPopupIfNotConnected(() => {
            if (connectedUserStore.eventAfterSignIn !== null) {
              connectedUserStore.setEventAfterSignIn(null);
              viewPoll(props.pollId);
            }
          })">
        <q-input
          dense
          label="What's on your mind ?"
          v-model.trim="currentComment"
          type="textarea"
          autogrow
        >
          <template v-slot:append>
            <q-icon
              v-if="currentComment !== ''"
              name="close"
              @click="currentComment = ''"
              class="cursor-pointer"
            />
            <q-btn type="submit" @click="postComment" round dense flat icon="send" />
          </template>
        </q-input>
      </q-form>
    </q-card-section>
  </q-card>
  <q-card v-for="(comment, index) in props.comments" :key="index" class="q-mb-xs shadow-1 q-px-sm q-py-xs"
    ><q-card-section class="q-pa-none"
      ><recursive-comment
        :poll-id="pollId"
        :is-root="true"
        :comment="comment"
        :author="comment.author" /></q-card-section
  ></q-card>
</template>
