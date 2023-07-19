import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AMEditPageComponent } from './amedit-page.component';

describe('AMEditPageComponent', () => {
  let component: AMEditPageComponent;
  let fixture: ComponentFixture<AMEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AMEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AMEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
