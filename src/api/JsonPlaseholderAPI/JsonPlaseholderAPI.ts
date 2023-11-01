import { JSON_PLACEHOLDER_BASE_URL } from '../../constant'
import { API } from '../API/API'
import { FetchArgs } from '../API/types'

export interface FetchArg<Updates = Record<string, unknown>> extends FetchArgs {
  signal?: AbortSignal
  userId?: number
  updates?: Updates
  commentId?: string
  postId?: string
}

export interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export interface Comments {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface Posts {
  userId: number
  id: number
  title: string
  body: string
}

class JsonPlaceholderAPI extends API {
  // constructor(url) {
  //   super(url)
  // }

  async getPhotos({ signal, ...rest }: FetchArg) {
    const response = await this.fetch<Photo[]>({ path: 'photos', signal })
    //console.log('response', response);
    return response.slice(0, 30)
  }

  async getUsers({ signal, ...rest }: FetchArg) {
    return await this.fetch<User[]>({ path: 'users', signal, ...rest})
  }

  async getUser({ signal, userId, ...rest }: FetchArg) {
    return await this.fetch<User>({ path: `users/${userId}`, signal, ...rest })
  }

  async deleteUser({ signal, userId, ...rest }: FetchArg) {
    return await this.fetch({ path: `users/${userId}`, signal, method: 'DELETE', ...rest })
  }

  async updateUser({ signal, userId, updates, ...rest }: FetchArg) {
    return await this.fetch({ path: `users/${userId}`, signal, method: 'PATCH', body: updates, ...rest })
  }

  async getComments({ signal, ...rest }: FetchArg) {
    const responseComments = await this.fetch<Comments[]>({ path: 'comments', signal, ...rest })

    return responseComments.slice(0, 50)
  }

  async getComment({ signal, commentId, ...rest }: FetchArg) {
    return await this.fetch<Comments>({ path: `comments/${commentId}`, signal, ...rest })
  }

  async deleteComment({ signal, commentId, ...rest }: FetchArg) {
    return await this.fetch({ path: `comments/${commentId}`, signal, method: 'DELETE', ...rest })
  }

  async getPosts({ signal, ...rest }: FetchArg) {
    return await this.fetch<Posts[]>({ path: 'posts', signal, ...rest })
  }

  async getPost({ signal, postId, ...rest }: FetchArg) {
    return await this.fetch<Posts>({ path: `posts/${postId}`, signal, ...rest })
  }

  async deletePost({ signal, postId, ...rest }: FetchArg) {
    return await this.fetch({ path: `posts/${postId}`, signal, method: 'DELETE', ...rest })
  }

  async updatePost({ signal, postId, updates, ...rest }: FetchArg) {
    return await this.fetch({ path: `posts/${postId}`, signal, method: 'PATCH', body: updates, ...rest })
  }
}

export default new JsonPlaceholderAPI(JSON_PLACEHOLDER_BASE_URL)
