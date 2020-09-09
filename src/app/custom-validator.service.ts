import { Injectable } from '@angular/core';
import {FormGroup,AbstractControl,ValidatorFn} from '@angular/forms'

@Injectable({
	providedIn: 'root'
})
export class CustomValidatorService {

	constructor() { }

	patternValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } => {
			if (!control.value) {
				return null;
			}
			const regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}');
			
			const valid = regex.test(control.value);
			return valid ? null : { invalidPassword: true };
		};
	}

	MatchPassword(password: string, confirmPassword: string) {
		return (formGroup: FormGroup) => {
			const passwordControl = formGroup.controls[password];
			const confirmPasswordControl = formGroup.controls[confirmPassword];

			if (!passwordControl || !confirmPasswordControl) {
				return null;
			}

			if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
				return null;
			}

			if (passwordControl.value !== confirmPasswordControl.value) {
				confirmPasswordControl.setErrors({ passwordMismatch: true });
			} else {
				confirmPasswordControl.setErrors(null);
			}
		}
	}
}
