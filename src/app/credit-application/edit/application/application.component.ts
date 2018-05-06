import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  public folders: any[];
  constructor() {
    this.folders = [
      { name: 'DNI_ambos_lados.png'  },
      { name: 'recibo_telefónico_actual.png'  },
      { name: 'Boletas_de_pago.png'  },
    ];
  }

  ngOnInit() { }

}
