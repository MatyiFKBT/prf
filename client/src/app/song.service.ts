import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Song } from './song';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private refetchSubject = new BehaviorSubject(null);
  constructor(private http: HttpClient, private router: Router) { }

  get refetch() {
    return this.refetchSubject.asObservable();
  }
  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>('/api/songs/all');
  }

  getMySongs(): Observable<Song[]> {
    return this.http.get<Song[]>('/api/songs/my');
  }

  addSong(song: Song) {
    console.log('song.service.ts: addSong()', song);
    return this.http.post<Song>('/api/songs/new', song).pipe(
      tap(() => this.refetchSubject.next(null))
    )
  }

  getSong(id: string): Observable<Song> {
    return this.http.get<Song>(`/api/songs/${id}`);
  }

  likeSong(id: string) {
    return this.http.put(`/api/songs/${id}/like`, null).pipe(
      tap(() => this.refetchSubject.next(null))
    )
  }

  deleteSong(id: string) {
    return this.http.delete(`/api/songs/${id}`).pipe(
      tap(() => this.router.navigate(['/songs']))
    )
  }

  addComment(songId: string, comment: string) {
    return this.http.post(`/api/songs/${songId}/comment`, { text: comment }).pipe(
      tap(() => this.refetchSubject.next(null))
    )
  }
}
