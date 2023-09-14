import { type TemplateResult } from 'lit'

export interface Post {
  title: string
  shortTitle: string
  description: string
  tags: string
  date: string
  postId: string
  component: string
  pathForDynamicLoad: string
  rootPagePath: string
  renderFunc: () => TemplateResult
}
