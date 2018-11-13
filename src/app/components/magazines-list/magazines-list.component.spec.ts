import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinesListComponent } from './magazines-list.component';

describe('MagazinesListComponent', () => {
  let component: MagazinesListComponent;
  let fixture: ComponentFixture<MagazinesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagazinesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
