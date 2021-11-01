import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  showFiller = false;
  following:any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  removeFollower(event: any) {

  }

  connectWithFollower(event: any) {
    
  }

}
