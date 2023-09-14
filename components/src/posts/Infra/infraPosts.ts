// postsData.js
// just import post
import { post as PubSubRedpanda } from './PubSubRedpanda'
import { post as ServerlessCFWorkers } from './ServerlessCFWorkers'
import type { Post } from './../../types/postTypes'

export const infraPosts: Post[] = [PubSubRedpanda, ServerlessCFWorkers]
