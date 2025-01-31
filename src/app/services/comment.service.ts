import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private localStorageKey = 'commentsMap';

  constructor() {
    if (this.isBrowser() && !localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify({}));
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private getCommentsMap(postId: string): { [postId: string]: { text: string, nick: string }[] } {
    if (this.isBrowser()) {
      const commentsMap = localStorage.getItem(this.localStorageKey);
      return commentsMap ? JSON.parse(commentsMap) : {};
    }
    return {};
  }

  private setCommentsMap(commentsMap: { [postId: string]: { text: string, nick: string }[] }): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(commentsMap));
    }
  }

  getComments(postId: string): { text: string, nick: string }[] {
    const commentsMap = this.getCommentsMap(postId);
    return commentsMap[postId] || [];
  }

  addComment(postId: string, comment: { text: string, nick: string }): void {
    const commentsMap = this.getCommentsMap(postId);

    if (!commentsMap[postId]) {
      commentsMap[postId] = [];
    }

    commentsMap[postId].push(comment);

    this.setCommentsMap(commentsMap);
  }
}
