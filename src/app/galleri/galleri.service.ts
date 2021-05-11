import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'
import {Subject} from 'rxjs'
import {Galleri} from './galleri.model'


@Injectable({providedIn: 'root'})
export class GalleriService {
  private galleris: Galleri[] = [];
  private galleriUpdated = new Subject<Galleri[]>();

  constructor(private http: HttpClient, private router: Router) {}

  addMedia(title: string, description: string, image: File){
    const postData = new FormData();
    postData.append('title', title);
    postData.append('description', description);
    postData.append('image', image, title);
    this.http
    .post<{message: string; galleri: Galleri}>(
      'http://localhost:3000/api/mediaPosts',
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
      this.router.navigate(['/']);

    });
  }
};
