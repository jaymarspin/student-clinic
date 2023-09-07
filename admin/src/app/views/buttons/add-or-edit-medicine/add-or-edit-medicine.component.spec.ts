import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditMedicineComponent } from './add-or-edit-medicine.component';

describe('AddOrEditMedicineComponent', () => {
  let component: AddOrEditMedicineComponent;
  let fixture: ComponentFixture<AddOrEditMedicineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditMedicineComponent]
    });
    fixture = TestBed.createComponent(AddOrEditMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
