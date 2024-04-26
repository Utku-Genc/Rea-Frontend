import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingEditingComponent } from './listing-editing.component';

describe('ListingEditingComponent', () => {
  let component: ListingEditingComponent;
  let fixture: ComponentFixture<ListingEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingEditingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListingEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
