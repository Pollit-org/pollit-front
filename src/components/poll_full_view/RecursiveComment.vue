<script setup lang="ts">
import moment from 'moment';
import { Comment } from 'src/api/models/comment';
import { usePollStore } from 'src/stores/poll-store';
import { ref } from 'vue';
import {showSigninPopupIfNotConnected} from 'src/misc/ShowSigninPopupIfNotConnected'

interface Props {
  pollId: string;
  comment: Comment;
  isRoot: boolean;
}

const pollStore = usePollStore();

const currentReply = ref<string | null>(null);

const startReply = () => (currentReply.value = '');

const postReply = () => {
  if (currentReply.value == null) return;

  pollStore.postCommentOnPoll(
    props.pollId,
    props.comment.id,
    currentReply.value
  );
};

const props = defineProps<Props>();
</script>

<template>
  <q-expansion-item
    dense
    dense-toggle
    default-opened
    header-style="align-items: center;"
    class="q-pb-md d-flex"
  >
    <template v-slot:header>
      <q-icon
        name="account_circle"
        class="q-pr-sm"
        size="sm"
        color="primary"
      ></q-icon>
      <div class="text-weight-small q-pa-none q-ma-none">
        {{ props.comment.author }} ·
        <span class="text-weight-light text-italic text-caption">{{
          moment(comment.createdAt).fromNow()
        }}</span>
      </div>
    </template>
    <q-card class="comment-tree-marker q-pa-none q-ml-sm">
      <q-card-section class="q-pa-none q-pl-md q-pr-md">
        {{ props.comment.body }}
      </q-card-section>
      <q-card-section class="q-px-none q-pb-none q-pt-sm q-ml-md">
        <q-btn
          v-if="currentReply == null"
          @click="showSigninPopupIfNotConnected(startReply)"
          color="grey-6"
          outline
          size="0.5rem"
          icon="sym_o_reply"
          class="q-py-none"
        ></q-btn>
        <q-form @submit="postReply" v-else>
          <q-input
            dense
            v-model.trim="currentReply"
            autofocus
            type="textarea"
            autogrow
            @keydown.enter.shift="postReply"
          >
            <template v-slot:append>
              <q-icon
                v-if="currentReply !== ''"
                name="close"
                @click="currentReply = null"
                class="cursor-pointer"
              />
              <q-btn
                type="submit"
                @click="postReply"
                round
                dense
                flat
                icon="send"
              />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-section
        v-if="props.comment.children.length > 0"
        class="q-pa-none q-pl-md q-pr-md q-pt-sm"
      >
        <recursive-comment
          :poll-id="pollId"
          :is-root="false"
          v-for="(childComment, index) in props.comment.children"
          :key="index"
          :comment="childComment"
        />
      </q-card-section>
    </q-card>
  </q-expansion-item>
  <!-- <q-separator v-if="isRoot" class="q-my-sm"></q-separator> -->
</template>

<style>
.comment-tree-marker {
  border-left: 0.15rem solid rgb(220, 220, 220);
}
</style>