import { Component, OnDestroy, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SubastaService } from '../../app/services';
import { ReportSubastaModel } from '../../app/models';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {

    columns = [];
    loadingIndicator: boolean = false;
    rows: ReportSubastaModel[] = [];
    constructor(
        private subastaService: SubastaService,
        private route: ActivatedRoute,
        private router: Router) {

    }

    ngOnInit(): void {
        this.createColumsTable();
        this.subastaService.getSubastaReport().subscribe(
            (response: ReportSubastaModel[]) => {
                this.rows = response;
            }, error => console.error(error)
        );
    }

    private createColumsTable(): void {
        this.columns = [
            { prop: 'fechaTermino', name: 'Fecha', width: 150, resizeable: false, canAutoResize: false, sortable: true, draggable: false },
            { prop: 'TotalSubastas', name: 'Cantidad', width: 150, resizeable: false, canAutoResize: false, sortable: true, draggable: false },
            { prop: 'FondosExactos', name: 'Con Fondos Exactos', width: 150, resizeable: false, canAutoResize: false, sortable: true, draggable: false },
            { prop: 'FondosMinimos', name: 'Con Fondos Mínimos', width: 150, resizeable: false, canAutoResize: false, sortable: true, draggable: false },
            { prop: 'SinFondos', name: 'Sin Fondos Requeridos', width: 150, resizeable: false, canAutoResize: false, sortable: true, draggable: false },
        ];
    }

}