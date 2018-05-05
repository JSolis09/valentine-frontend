import { Component, OnInit } from '@angular/core';
import { Parameter, UbigeoDTO } from '../../credit-application.model';
import { CreditApplicationService } from '../../credit-application.service';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
})
export class GeneralComponent implements OnInit {
  public documentTypeList: Parameter[] = [];
  public gradeList: Parameter[] = [];
  public genderList: Parameter[] = [];
  public maritalStatusList: Parameter[] = [];
  public ubigeoList: UbigeoDTO[] = [];
  public departmentList: UbigeoDTO[] = [];
  public provinceList: UbigeoDTO[] = [];
  public districtList: UbigeoDTO[] = [];
  constructor(private creditApplicationService: CreditApplicationService) { }

  ngOnInit() {
    this.creditApplicationService
      .getAllDocumentType()
      .subscribe((response: Parameter[]) => {
        this.documentTypeList = response;
      });
    this.creditApplicationService
      .getAllGender()
      .subscribe((response: Parameter[]) => {
        this.genderList = response;
      });
    this.creditApplicationService
      .getAllGrade()
      .subscribe((response: Parameter[]) => {
        this.gradeList = response;
      });
    this.creditApplicationService
      .getAllMaritalStatus()
      .subscribe((response: Parameter[]) => {
        this.maritalStatusList = response;
      });
    this.creditApplicationService
      .getUbigeo()
      .subscribe((response: UbigeoDTO[]) => {
        this.ubigeoList = response;
      });
  }

  getAllDepartment(ubigeo_id: string): void {
    this.creditApplicationService
      .getUbigeo(ubigeo_id)
      .subscribe((response: UbigeoDTO[]) => {
        this.departmentList = response;
      });
  }

  getAllProvince(ubigeo_id: string): void {
    this.creditApplicationService
      .getUbigeo(ubigeo_id)
      .subscribe((response: UbigeoDTO[]) => {
        this.provinceList = response;
      });
  }

  getAllDistrict(ubigeo_id: string): void {
    this.creditApplicationService
      .getUbigeo(ubigeo_id)
      .subscribe((response: UbigeoDTO[]) => {
        this.districtList = response;
      });
  }

}
