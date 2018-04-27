import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css'],
})

export class NavBarComponent {

    isCollapse: boolean = false;

    constructor(
        private router: Router,
    ) {}

    toggleMenu() {
        this.isCollapse = !this.isCollapse;
        console.log(this.isCollapse);
    }

}
