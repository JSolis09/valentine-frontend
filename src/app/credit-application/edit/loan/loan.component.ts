import { Component, OnInit } from '@angular/core';

import { Schedule, SolicitudCredito } from '../../credit-application.model';
import { CreditApplicationService } from '../../credit-application.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
})
export class LoanComponent implements OnInit {
  public displayedColumns: string[];
  public dataSource: Schedule[];
  public solicitud: SolicitudCredito;

  constructor(private creditApplicationService: CreditApplicationService) { }

  ngOnInit() {
    this.solicitud = this.creditApplicationService.solicitudCredito;
    this.mapSchedule();
  }

  mapSchedule(): void {
    this.dataSource = [];
    const cuotas = this.creditApplicationService.solicitudCredito.Cuotas || [];
    cuotas.forEach((cuota) => {
      this.dataSource.push({
        id: cuota.CodigoCuota,
        amount: cuota.Monto,
        expiryDate: cuota.Vencimiento,
        status: cuota.EstadoNombre,
        fee: cuota.CuotaOriginal,
        interest: cuota.InteresMoratorio,
        expense: cuota.GastosAdministrativos,
        payment: cuota.Pago,
        paymentDate: cuota.FechaPago,
        arrears: 0,
        debt: null,
      });
    });
    this.displayedColumns = Object.keys(this.dataSource[0] || {});
  }

}
