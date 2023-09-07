import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStocksComponent } from './add-stocks.component';

describe('AddStocksComponent', () => {
  let component: AddStocksComponent;
  let fixture: ComponentFixture<AddStocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStocksComponent]
    });
    fixture = TestBed.createComponent(AddStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
