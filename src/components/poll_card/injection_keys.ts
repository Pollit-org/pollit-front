import { Post } from 'src/models/interfaces';
import { InjectionKey } from 'vue';

export const postInjectionKey = Symbol() as InjectionKey<Post>
