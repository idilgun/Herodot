import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { UserRegistration } from '../../objects/userRegistration';

@Component({
    moduleId: module.id,
    selector: 'reg,ster',
    templateUrl: 'register.component.html'
})
export class RegisterComponent {
    model: UserRegistration = new UserRegistration();
    loading = false;

    constructor(private router: Router, private userService: UserService, private alertService: AlertService) {

    }

    register(): void {
        this.loading = true;
        if(this.model.password !== this.model.repassword){
            this.alertService.error("Passwords do not match!");
            this .loading = false;
            return;
        }
        var registrationResult = this.userService.register(this.model);
        if (registrationResult.isSuccessfull) {
            this.alertService.success("Registration was successfull.", true);
            this.router.navigate(['login']);
        } else {
            this.alertService.error(registrationResult.errorMessage);
            this.loading = false;
        }
    }
}