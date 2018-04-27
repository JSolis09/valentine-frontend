import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MyDatePickerModule } from 'mydatepicker';

import { NavBarComponent } from './components';

@NgModule({
    imports: [
        NgxDatatableModule,
        MyDatePickerModule,
    ],
    declarations: [
        NavBarComponent,
    ],
    bootstrap: [],
    schemas: [
        NO_ERRORS_SCHEMA,
    ],
    exports: [
        NavBarComponent,
        NgxDatatableModule,
        MyDatePickerModule,
    ],
    providers: [],
})

export class SharedComponentModule {}
