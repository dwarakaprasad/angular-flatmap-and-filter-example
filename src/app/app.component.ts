import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { flatMap, filter } from 'rxjs/operators';

export class FileUpload {
  fileName: string;
  type: string;

  constructor(fileName: string, type: string) {
    this.fileName = fileName;
    this.type = type;
  }
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ] 
})
export class AppComponent  {
  name = 'Angular';

  constructor() {
    this.getByAvatar()
      .pipe(
        flatMap(uploads => uploads),
        filter(upload => upload.type === 'avatar')
    ).subscribe(
      console.log
    );
  }

  getByAvatar(): Observable<FileUpload[]> {
    return of([new FileUpload('abc.tif', 'data'), new FileUpload('def.jpg', 'picture'),
     new FileUpload('xyz.bmp', 'avatar'), new FileUpload('bbb.jpg', 'unknown')]);
  }
}
