import {AbstractControl} from '@angular/forms'
import { Observable, Observer, of } from 'rxjs';

//async validator
export const mimeType = (control: AbstractControl
  ): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
  if(typeof(control.value) === 'string'){
    return of(null);
  }
  //a file value
  const file = control.value as File;
  //filereader
  const fileReader = new FileReader();
  //filereader observable
  const frObs = new Observable((observer: Observer<{[key: string]: any}>) => {
    //event listener i filereader til at lytte på 'loadend' 
    //som er det samme som filereader.onloadend som bliver kaldt når readen er fuldent
    fileReader.addEventListener('loadend', () =>{
      //skaber et nyt array med 8 bit inside ints, lader dig
      //læse specifike mønstre inde i en file
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header = "";
      let isValid = false;
      for (let i = 0; i<arr.length; i++) {
        //corverter det element vi kigger på til et hexadecimal string
        header += arr[i].toString(16);
      }
      switch (header) {
        case "89504e47":
          isValid = true;
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          isValid = true;
          break;
        default:
          isValid = false;
          break;
      }
      if (isValid) {
        observer.next(null);
      } else{
        observer.next({invalidMimetype: true});
      }
      observer.complete();
    });
    //allow to access mimetype
    fileReader.readAsArrayBuffer(file);
  });
  return frObs;
};
