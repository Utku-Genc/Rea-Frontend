import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingAddComponent } from './listing-add.component';

describe('ListingAddComponent', () => {
  let component: ListingAddComponent;
  let fixture: ComponentFixture<ListingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
