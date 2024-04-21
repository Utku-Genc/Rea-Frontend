import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandListingComponent } from './land-listing.component';

describe('LandListingComponent', () => {
  let component: LandListingComponent;
  let fixture: ComponentFixture<LandListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
