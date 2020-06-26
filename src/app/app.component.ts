import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { flatMap, filter, first, take } from 'rxjs/operators';

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
    // filter + take(1)
    this.getByAvatar()
      .pipe(
        flatMap(uploads => uploads),
        filter(upload => upload.type === 'avatar'),
        take(1)
    ).subscribe(
      console.log
    );

    // first with predicate
    this.getByAvatar()
      .pipe(
        flatMap(uploads => uploads),
        first(upload => upload.type === 'avatar')
    ).subscribe(
      console.log,
      console.log
    );

    // filter + first
    this.getByAvatar()
      .pipe(
        flatMap(uploads => uploads),
        filter(upload => upload.type === 'avatar'),
        first()
    ).subscribe(
      console.log,
      console.log
    );
  }

  getByAvatar(): Observable<FileUpload[]> {
    return of([new FileUpload('abc.tif', 'data'), new FileUpload('def.jpg', 'picture'),
     new FileUpload('xyz.bmp', 'avatar'), new FileUpload('bbb.jpg', 'unknown'), new FileUpload('ccc.jpg', 'avatar')]);
  } 
}
