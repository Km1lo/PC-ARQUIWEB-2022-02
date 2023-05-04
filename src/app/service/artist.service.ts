import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../model/artist';
import { Subject, map } from 'rxjs';

const base_url = "http://localhost:3000";
@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private url = `${base_url}/artists`;

  constructor(private http:HttpClient) { }
  private confirmDeletion = new Subject<Boolean>()
  private listChange = new Subject<Artist[]>()


  //Este metodo es para el homecomponent para que muestre el numero de artistas que hay en db.json
  getArtistCount(){
    return this.http.get<Artist[]>(this.url).pipe(
      map((artists: Artist[]) => artists.length)
    )
  }

  list(){
    return this.http.get<Artist[]>(this.url);
  }
  listId(id:number){
    return this.http.get<Artist>(`${this.url}/${id}`);
  }
  update(art: Artist){
    return this.http.put(this.url+"/"+art.id, art);
  }
  insert(comentario : Artist){
    return this.http.post(this.url, comentario);
 }
 getConfirmDelete(){
  return this.confirmDeletion.asObservable();
}
setConfirmDelete(state:Boolean){
  this.confirmDeletion.next(state);
}
delete(id: number) {
  return this.http.delete(`${this.url}/${id}`)
}
setList(listNew: Artist[]) {
  this.listChange.next(listNew);
}
}
