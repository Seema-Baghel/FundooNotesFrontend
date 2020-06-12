import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let user: true

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent 
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents().then(() =>{
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
    });
  }));

  it('should set submitted to true', async(() => {
    component.onSubmit(user);
    expect(component.submitted).toBeTruthy();
  }));

  it('form should be valid', async(()=> {
    component.loginForm.controls['email'].setValue('seemabaghel696@gmail.com');
    component.loginForm.controls['password'].setValue('Seema@567');
    expect(component.loginForm.valid).toBeTruthy();
  }));
  
  it('form should be invalid', async(()=> {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  }));
});
