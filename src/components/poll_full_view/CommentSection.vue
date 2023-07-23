<script setup lang="ts">
import RecursiveComment from './RecursiveComment.vue';
import { Comment } from 'src/api/models/comment';
import { ref } from 'vue';
import { usePollStore } from 'src/stores/poll-store';
import {showSigninPopupIfNotConnected} from 'src/misc/ShowSigninPopupIfNotConnected'

interface Props {
  pollId: string;
  comments: Comment[];
}
const props = defineProps<Props>();

const pollStore = usePollStore();

const currentComment = ref('');

const postComment = () => {
  if (currentComment.value == '') return;

  pollStore.postCommentOnPoll(props.pollId, null, currentComment.value);
};
</script>
<template>
  <q-card>
    <q-card-section>
      <q-form @submit="postComment" @click="showSigninPopupIfNotConnected(()=>{})">
        <q-input
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
            <q-btn
              type="submit"
              @click="postComment"
              round
              dense
              flat
              icon="send"
            />
          </template>
        </q-input>
      </q-form>
      <recursive-comment
        :poll-id="pollId"
        :is-root="true"
        v-for="(comment, index) in props.comments"
        :key="index"
        :comment="comment"
        :author="comment.author"
      />
    </q-card-section>
  </q-card>
</template>
