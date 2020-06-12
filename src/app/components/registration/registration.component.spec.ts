import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let user: true

  // const routes: Routes = [
  //   { path: "register", component: RegistrationComponent }
  // ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        RegistrationComponent 
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
        //RouterModule.forRoot(routes)
      ]
    }).compileComponents().then(()=>{
        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
        user = true;
    });
  }));

  it('should set submitted to true', async(() => {
    component.onSubmit(user);
    expect(component.submitted).toBeTruthy();
  }));

  it('should call the onSubmit method', async(() => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);

  }));

  it('form should be valid', async(()=>{
    component.registerForm.controls['firstName'].setValue('Seema');
    component.registerForm.controls['lastName'].setValue('Baghel');
    component.registerForm.controls['email'].setValue('seemabaghel696@gmail.com');
    component.registerForm.controls['password'].setValue('Seema@567');
    expect(component.registerForm.valid).toBeTruthy();
  }));

  it('form should be invalid', async(()=>{
    component.registerForm.controls['firstName'].setValue('');
    component.registerForm.controls['lastName'].setValue('');
    component.registerForm.controls['email'].setValue('');
    component.registerForm.controls['password'].setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  }));

});
