import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicinesComponent } from './add-medicines.component';

describe('AddMedicinesComponent', () => {
  let component: AddMedicinesComponent;
  let fixture: ComponentFixture<AddMedicinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMedicinesComponent]
    });
    fixture = TestBed.createComponent(AddMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
