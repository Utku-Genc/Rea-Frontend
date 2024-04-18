import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseFilterComponent } from './house-filter.component';

describe('HouseFilterComponent', () => {
  let component: HouseFilterComponent;
  let fixture: ComponentFixture<HouseFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HouseFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HouseFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
