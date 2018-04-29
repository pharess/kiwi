import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
describe('AppComponent', () => {


  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;  // test env
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ AppComponent ] // isolated test of component itself
    })
    .compileComponents(); // compiles template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.css('form'));  // test rendered HTML
    htmlElement = debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
 
  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Peter Test (Angular)');
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have updateTest', () => {
    expect(component.updateTest).toBeTruthy();
  });

  it('should initally render one line', () => {
    expect(component.times).toEqual(1);
  });

  it('should initially render black', () => {
    expect(component.colorName).toBe('black');
  });

  it('should call updateTest when form is submitted', () => {
    spyOn(component, 'updateTest');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    
    fixture.whenStable().then(() => {
      expect(component.updateTest).toHaveBeenCalled();
    })
  });

});
