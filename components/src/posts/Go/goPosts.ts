// postsData.js
import type { Post } from 'src/types/postTypes'

import { post as GoInterfaces } from './Interfaces'
import { post as GoGenerics } from './Generics'
import { post as GoTesting } from './Testing'

export const goPosts: Post[] = [GoInterfaces, GoGenerics, GoTesting]
