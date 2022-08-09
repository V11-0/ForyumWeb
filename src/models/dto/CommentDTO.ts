export interface CommentDTO {
  text: string
  creatorUserId: number
  creatorUsername: string
  subComments?: Array<CommentDTO>
  showReply: boolean

  commentModel?: string
}

export interface CommentCreationDTO {
  PostId: number
  CreatorUserId: number
  Text: string
  ParentCommentId?: number
}
