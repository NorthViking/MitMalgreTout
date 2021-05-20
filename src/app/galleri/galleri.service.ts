import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

import {Media} from './media.model';


@Injectable({providedIn: 'root'})
export class GalleriService {
  private medias: Media[] = [];
  private mediaUpdated = new Subject<Media[]>();



  constructor(private http: HttpClient, private router: Router) {}

  getMedias() {
    this.http
    .get<{ message: string; media: any }>("http://localhost:3000/api/mediaPosts")
    .pipe(
      map(mediaData => {
        return mediaData.media.map( media => {
          return {
            title: media.title,
            mediaPath: media.mediaPath,
            id: media._id,
            description: media.description
          };
        });
      })

    )
    .subscribe(transformedGalleri => {
      this.medias = transformedGalleri;
      this.mediaUpdated.next([...this.medias]);
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
      const galleri: Media = {
        id: responseData.post.id,
        title: title,
        mediaPath: responseData.post.mediaPath,
        description: description
        };
      this.medias.push(galleri);
      this.mediaUpdated.next([...this.medias]);
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
      const updatedMedia = [...this.medias];
      const oldMediaIndex = updatedMedia.findIndex(p => p.id === id);
      const media: Media = {
        id: id,
        title: title,
        mediaPath: "",
        description: description
      };
      updatedMedia[oldMediaIndex] = media;
      this.medias = updatedMedia;
      this.mediaUpdated.next([...this.medias]);
      this.router.navigate(["/galleri/private"]);
    });
  }

  deleteMedia(mediaId: String ) {
    this.http
    .delete("http://localhost:3000/api/mediaPosts/" + mediaId)
    .subscribe(() => {
      const updatedGalleri = this.medias.filter(media => media.id !== mediaId);
      this.medias = updatedGalleri;
      this.mediaUpdated.next({...this.medias});
    });
  }



}
