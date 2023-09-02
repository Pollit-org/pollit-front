import Router from 'src/router';
import { ref } from 'vue';

const tags = ref<string[]>([]);

const addTag = (tag: string) => {
  if (!tags.value.includes(tag)) {
    tags.value.push(tag);
  }
  pushHomeWithTags();
};

const removeTag = (tag: string) => {
  const index = tags.value.indexOf(tag);
  if (index !== -1) {
    tags.value.splice(index, 1);
    pushHomeWithTags();
  }
};

const pushHomeWithTags = () => {
  const query_formatted_tags = tags.value;
  Router.push({
    name: 'Home',
    query: {
      tags: tags.value?.length > 0 ? query_formatted_tags.join('+') : undefined,
    },
  });
};

export { tags, addTag, removeTag, pushHomeWithTags };
