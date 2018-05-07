import { Component, OnInit } from '@angular/core';

import { Parameter } from '../../credit-application.model';
import { CreditApplicationService } from '../../credit-application.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
})
export class ApplicationComponent implements OnInit {
  public folders: any[];
  public creditDestinationList: Parameter[];

  constructor(private creditApplicationService: CreditApplicationService) {
    this.creditDestinationList = [];
    this.folders = [
      { name: 'DNI_ambos_lados.png'  },
      { name: 'recibo_telefónico_actual.png'  },
      { name: 'Boletas_de_pago.png'  },
    ];
  }

  ngOnInit() {
    this.creditApplicationService
      .getAllCreditDestination()
      .subscribe((response) => {
        this.creditDestinationList = response;
      });
  }

}
