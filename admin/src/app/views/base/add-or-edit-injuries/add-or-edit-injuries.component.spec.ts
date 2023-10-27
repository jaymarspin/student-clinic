import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditInjuriesComponent } from './add-or-edit-injuries.component';

describe('AddOrEditInjuriesComponent', () => {
  let component: AddOrEditInjuriesComponent;
  let fixture: ComponentFixture<AddOrEditInjuriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditInjuriesComponent]
    });
    fixture = TestBed.createComponent(AddOrEditInjuriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
