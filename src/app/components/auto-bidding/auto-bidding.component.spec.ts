import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoBiddingComponent } from './auto-bidding.component';

describe('AutoBiddingComponent', () => {
  let component: AutoBiddingComponent;
  let fixture: ComponentFixture<AutoBiddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoBiddingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoBiddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
