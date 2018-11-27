import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MagazineListService} from '../../magazine-list.service';
import {Location} from '@angular/common';
import {Mgazineobj} from '../../mgazineobj';

@Component({
  selector: 'app-magazines-list',
  templateUrl: './magazines-list.component.html',
  styleUrls: ['./magazines-list.component.sass']
})
export class MagazinesListComponent implements OnInit {

    mags: Mgazineobj[];

    magName: string;

    year: string;

    isHover: boolean;
  constructor(
      private router:  ActivatedRoute,
      private messService: MagazineListService,
      private location: Location
  ) { }

  ngOnInit() {
      this.mags = [];
      this.isHover = false;
      this.year = this.router.snapshot.paramMap.get('year');
      this.magName = this.router.snapshot.paramMap.get('mag');
      this.getMagazines();
  }

  getMagazines() {
      this.messService.getMagzines(this.magName, this.year)
          .subscribe(magazines => { this.mags = magazines; console.log(magazines); });
  }

    goBack(): void {
        this.location.back();
    }

    changeHover() {
        this.isHover = !this.isHover;
    }
}
