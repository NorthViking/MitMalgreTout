import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-galleri',
  templateUrl: './galleri.component.html',
  styleUrls: ['./galleri.component.css']
})
export class GalleriComponent implements OnInit {

  routes = [
    {path: 'public', label: 'Offentligt Galleri'},
    {path: 'private', label: 'Personligt Galleri' }

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
