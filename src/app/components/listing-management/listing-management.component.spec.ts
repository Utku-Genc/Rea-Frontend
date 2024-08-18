import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingManagementComponent } from './listing-management.component';

describe('ListingManagementComponent', () => {
  let component: ListingManagementComponent;
  let fixture: ComponentFixture<ListingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
