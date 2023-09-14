import { infraPosts } from './Infra/infraPosts'
import { goPosts } from './Go/goPosts'
import { jsPosts } from './JS/jsPosts'
import { cppPosts } from './C++/cppPosts'
import { generalPosts } from './General/generalPosts'

export const allPosts = [
  ...infraPosts,
  ...goPosts,
  ...jsPosts,
  ...cppPosts,
  ...generalPosts
]
