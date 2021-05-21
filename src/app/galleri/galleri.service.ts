import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

import {Media} from './media.model';


@Injectable({providedIn: 'root'})
export class GalleriService {
  private medias: Media[] = [];
  private mediaUpdated = new Subject<{medias: Media[], mediaCount: number}>();



  constructor(private http: HttpClient, private router: Router) {}

  getMedias(mediaPerPage: number, currentPage: number) {
    const queryParams =`?pagesize=${mediaPerPage}&page=${currentPage}`;
    this.http
    .get<{ message: string; media: any, maxMedia: number }>("http://localhost:3000/api/mediaPosts" + queryParams)
    .pipe(
      map(mediaData => {
        return { media: mediaData.media.map( media => {
          return {
            title: media.title,
            mediaPath: media.mediaPath,
            id: media._id,
            description: media.description
          };
        }), maxMedia: mediaData.maxMedia};
      })

    )
    .subscribe(transformedGalleriData => {
      this.medias = transformedGalleriData.media;
      this.mediaUpdated.next({medias: [...this.medias],
        mediaCount:transformedGalleriData.maxMedia});
    });

  }

  getGalleriUpdateListener(){
    return this.mediaUpdated.asObservable();
  }

  getMedia(id: string){
    return this.http.get<{_id: string, title: string, mediaPath: string, description: string}>(
      "http://localhost:3000/api/mediaPosts/" + id
    );
  }

  addMedia(title: string, media: File, description: string ){
    const postData = new FormData();
    postData.append("title", title);
    postData.append("media", media, title);
    postData.append("description", description);
    this.http
    .post<{message: string; post: Media}>(
      "http://localhost:3000/api/mediaPosts",
      postData
    )
    .subscribe(responseData => {

      this.router.navigate(["/galleri/private"]);

    });
  }
  updateMedia(id: string, title: string, media: File | string, description: string){
    let postData: Media | FormData;
    if(typeof media === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("media", media, title);
      postData.append("description", description);

    } else{
      postData ={
        id: id,
        title: title,
        mediaPath : media,
        description: description
      };
    }
    this.http
    .put("http://localhost:3000/api/mediaPosts/" + id, postData)
    .subscribe(response => {

      this.router.navigate(["/galleri/private"]);
    });
  }

  deleteMedia(mediaId: String ) {
    return this.http
    .delete("http://localhost:3000/api/mediaPosts/" + mediaId);;


  }



}
