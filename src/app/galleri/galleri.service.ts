import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

import {Galleri} from './galleri.model';

@Injectable({providedIn: 'root'})
export class GalleriService {
  private galleris: Galleri[] = [];
  private galleriUpdated = new Subject<Galleri[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getMedias(){
    this.http
    .get<{message: string; galleris: any}>("http://localhost:3000/api/mediaPosts")
    .pipe(
      map(postData => {
        return postData.galleris.map(galleri => {
          return{
            title: galleri.title,
            imagePath: galleri.imagePath,
            description: galleri.description,
            id: galleri._id
          };
        });
      })
    )
    .subscribe(transformedGalleri => {
      this.galleris = transformedGalleri;
      this.galleriUpdated.next([...this.galleris]);
    })
  }

  getMedia(id: string){
    return this.http.get<{_id: string, title: string, imagePath: string, description: string}>(
      "http://localhost:3000/api/mediaPosts" + id
    );
  }

  addMedia(title: string, image: File, description: string ){
    const postData = new FormData();
    postData.append("title", title);
    postData.append("image", image, title);
    postData.append("description", description);
    this.http
    .post<{message: string; galleri: Galleri}>(
      "http://localhost:3000/api/mediaPosts",
      postData
    )
    .subscribe(responseData => {
      const galleri: Galleri = {
        id: responseData.galleri.id,
        title: title,
        imagePath: responseData.galleri.imagePath,
        description: description
        };
      this.galleris.push(galleri);
      this.galleriUpdated.next([...this.galleris]);
      this.router.navigate(["/"]);

    });
  }
  updateMedia(id: string, title: string, image: File | string, description: string){
    let postData: Galleri | FormData;
    if(typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("image", image, title);
      postData.append("description", description);

    } else{
      postData ={
        id:id,
        title: title,
        imagePath : image,
        description: description
      };
    }
    this.http
    .put("http://localhost:3000/api/mediaPosts" + id, postData)
    .subscribe(response => {
      const updatedGalleri = [...this.galleris];
      const oldGalleriIndex = updatedGalleri.findIndex(p => p.id === id);
      const galleri: Galleri = {
        id: id,
        title: title,
        imagePath: "",
        description: description
      };
      updatedGalleri[oldGalleriIndex] = galleri;
      this.galleris = updatedGalleri;
      this.galleriUpdated.next([...this.galleris])
      this.router.navigate(["/"])
    });
  }

  deleteMedia(mediaId: String ){
    this.http
    .delete("http://localhost:3000/api/mediaPosts" + mediaId)
    .subscribe(() => {
      const updatedGalleri = this.galleris.filter(media => media.id !== mediaId);
      this.galleris = updatedGalleri;
      this.galleriUpdated.next({...this.galleris});
    })
  }

}
