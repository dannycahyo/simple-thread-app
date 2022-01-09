export type ReplyType = {
    id: string,
    content: string,
    likeCount:number,
}

export type CommentType = {
    id: string,
    content: string,
    likeCount:number,
    replies:ReplyType[]
}

export type ThreadsType = {
    id: string,
    content: string,
    likeCount:number,
    comments: CommentType[]
}