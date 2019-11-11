import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchesPage } from './churches.page';

describe('ChurchesPage', () => {
  let component: ChurchesPage;
  let fixture: ComponentFixture<ChurchesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChurchesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChurchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
