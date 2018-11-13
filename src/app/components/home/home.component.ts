import { Component, OnInit } from '@angular/core';
import {MagazineListService} from '../../magazine-list.service';
import {Magazine} from '../../magazine';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
    magList: Magazine[];

  constructor(private magService: MagazineListService) {
      this.magList = [];
  }

  ngOnInit() {
      this.getMagList();
  }

  private getMagList() {
      this.magService.getMagazineList()
          .subscribe(magasines => this.magList = magasines);
  }
}
