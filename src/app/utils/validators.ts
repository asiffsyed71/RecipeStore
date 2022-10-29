import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function validateEmail(control: FormControl): ValidationErrors | null {
  let EMAIL_REGEXP =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  
  return EMAIL_REGEXP.test(control.value)
    ? null
    : {
        emailInvalid: {
          message: 'Please enter a valid Email Id',
        },
      };
}

export function matchPassword(matchControl: FormControl): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    if (matchControl.value !== control.value && matchControl.touched && matchControl.dirty) {
      return {
        passwordMatchError: {
          message: "Passwords do not match",
        },
      };
    }
    return null;
  };
}
