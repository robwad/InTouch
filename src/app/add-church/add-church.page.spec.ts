import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChurchPage } from './add-church.page';

describe('AddChurchPage', () => {
  let component: AddChurchPage;
  let fixture: ComponentFixture<AddChurchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChurchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChurchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
