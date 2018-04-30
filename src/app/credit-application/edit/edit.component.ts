import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  public navLinks = [
    { label: 'General', path: 'general' },
    { label: 'Solicitud', path: 'application' },
    { label: 'Evaluación', path: 'evaluation' },
    { label: 'Préstamo', path: 'loan' },
  ];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const userId = params['id'];
      console.log(userId);
    });
  }
}
