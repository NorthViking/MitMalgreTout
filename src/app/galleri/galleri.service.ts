import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';


import {Galleri} from './galleri.model';

@Injectable({providedIn: 'root'})
export class GalleriService {
  private galleriGrid: Galleri[] = [];
  private galleriUpdated = new Subject<Galleri[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getMedias() {
    this.http
    .get<{ message: string; galleriGrid: any }>("http://localhost:3000/api/mediaPosts")
    .pipe(
      map(mediaData => {
        return mediaData.galleriGrid.map(media => {
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
      this.galleriGrid = transformedGalleri;
      this.galleriUpdated.next([...this.galleriGrid]);
    });
  }

  getGalleriUpdateListener(){
    return this.galleriUpdated.asObservable();
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
    .post<{message: string; post: Galleri}>(
      "http://localhost:3000/api/mediaPosts",
      postData
    )
    .subscribe(responseData => {
      const galleri: Galleri = {
        id: responseData.post.id,
        title: title,
        mediaPath: responseData.post.mediaPath,
        description: description
        };
      this.galleriGrid.push(galleri);
      this.galleriUpdated.next([...this.galleriGrid]);
      this.router.navigate(["/"]);

    });
  }
  updateMedia(id: string, title: string, media: File | string, description: string){
    let postData: Galleri | FormData;
    if(typeof media === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("media", media, title);
      postData.append("description", description);

    } else{
      postData ={
        id:id,
        title: title,
        mediaPath : media,
        description: description
      };
    }
    this.http
    .put("http://localhost:3000/api/mediaPosts" + id, postData)
    .subscribe(response => {
      const updatedGalleri = [...this.galleriGrid];
      const oldGalleriIndex = updatedGalleri.findIndex(p => p.id === id);
      const galleri: Galleri = {
        id: id,
        title: title,
        mediaPath: "",
        description: description
      };
      updatedGalleri[oldGalleriIndex] = galleri;
      this.galleriGrid = updatedGalleri;
      this.galleriUpdated.next([...this.galleriGrid])
      this.router.navigate(["/"])
    });
  }

  deleteMedia(mediaId: String ){
    this.http
    .delete("http://localhost:3000/api/mediaPosts" + mediaId)
    .subscribe(() => {
      const updatedGalleri = this.galleriGrid.filter(media => media.id !== mediaId);
      this.galleriGrid = updatedGalleri;
      this.galleriUpdated.next({...this.galleriGrid});
    })
  }

}
