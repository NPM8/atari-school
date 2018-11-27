import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {MagazineListService} from '../../magazine-list.service';
import {Years} from '../../years';
// import { ClarityIcons } from '@clr/icons';
// import { ClrShapeStepForward2 } from '@clr/icons/shapes/core-shapes';


@Component({
  selector: 'app-magazine-page',
  templateUrl: './magazine-page.component.html',
  styleUrls: ['./magazine-page.component.sass']
})
export class MagazinePageComponent implements OnInit {

    years: string[];

    mag: string;

    isHover: boolean;
  constructor(
      private router:  ActivatedRoute,
      private messService: MagazineListService,
      private location: Location
              ) { }

  ngOnInit() {
      this.years = [];
      this.mag = this.router.snapshot.paramMap.get('mag');
      this.isHover = false;
    this.getYears();
  }

  getYears(): void {
      const mag = this.router.snapshot.paramMap.get('mag');
      this.messService.getMagzineYears(mag)
          .subscribe(years => {this.years = years; console.log(years);});
  }

  goBack(): void {
      this.location.back();
  }

  changeHover() {
      this.isHover = !this.isHover;
  }
}
