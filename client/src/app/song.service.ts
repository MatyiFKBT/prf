import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Song } from './song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private refetchSubject = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

  get refetch() {
    return this.refetchSubject.asObservable();
  }
  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>('/api/songs/all');
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
}
