import { Component, OnDestroy, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ArchivoService, LocalStoreManager } from '../../app/services';
import { UploadFileModel } from '../../app/models';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.css'],
})

export class SuccessComponent implements OnInit {

    columns = [];
    imageLogo: string;
    id: number;
    uploadFileList: UploadFileModel[] = [];
    loadingIndicator: boolean = false;
    fileType: string;
    fileExtension: string;
    fileName: string;

    @ViewChild('actionsTemplate')
    actionsTemplate: TemplateRef<any>;

    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(
        private archivoSevice: ArchivoService,
        private route: ActivatedRoute,
        private router: Router,
        private storageManager: LocalStoreManager,) {

        this.route.params.subscribe(params => {
            const id = params.Id;
            if (id) {
                this.id = id;
            }
        });
    }

    ngOnInit(): void {
        this.createColumsTable();
    }

    private createColumsTable(): void {
        this.columns = [
            { prop: 'name', name: 'Nombre', width: 150, resizeable: false, canAutoResize: false, sortable: true, draggable: false },
            { cellTemplate: this.actionsTemplate, name: "Quitar", width: 150, resizeable: false, canAutoResize: false, sortable: false, draggable: false }
        ];
    }

    onFileUpload($event): void {
        this.loadingIndicator = true;
        this.fileType = $event.target.files[0].type;
        this.fileExtension = String($event.target.files[0].name).substring(String($event.target.files[0].name).lastIndexOf('.') + 1);
        this.fileName = $event.target.files[0].name;
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString($event.target.files[0]);
    }

    _handleReaderLoaded(readerEvt): void {
        var binaryString = readerEvt.target.result;
        this.imageLogo = btoa(binaryString);
        this.imageLogo = `data:${this.fileType};base64,${this.imageLogo}`;
        var uploadFile: UploadFileModel = new UploadFileModel();
        uploadFile.name = this.fileName;
        uploadFile.container = 'documentos';
        uploadFile.file = this.imageLogo;
        uploadFile.extension = this.fileExtension;
        uploadFile.solicitudCreditoId = this.id;
        this.uploadFileList.push(uploadFile);
        this.uploadFileList = [...this.uploadFileList];
        this.loadingIndicator = false;
    }

    onDelete(row: UploadFileModel) {
        let index = this.uploadFileList.findIndex(ar => ar.name == row.name);
        if (index > -1) {
            this.uploadFileList.splice(index, 1);
            this.uploadFileList = [...this.uploadFileList];
        }
    }

    registerFiles(): void {
        this.archivoSevice.uploadFile(this.uploadFileList).subscribe(
            (result: UploadFileModel[]) => {
                this.storageManager.deleteData();
                this.router.navigate([`/successAll/${this.id}`]);
            }, error => console.error(error));
    }
}
