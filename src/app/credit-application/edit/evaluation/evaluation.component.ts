import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  public folders: any[];

  constructor() {
    this.folders = [
      { name: 'contrato_firmado.png'  },
    ];
  }

  ngOnInit() {
  }

}
