// import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { ApiModule } from '@utopiksandcastle/accesscontrol-api-client';
// import { environment } from '../../environments/environment';
// import { AccessControlDeviceService, AccessControlSystemService } from '@utopiksandcastle/accesscontrol-api-client';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  // accessControlDevices: AccessControlDevice[] = []
  // accessControlSystems: AccessControlSystem[] = []

  // constructor(
  //   private accesControleDeviceService: AccessControlDeviceService,
  //   private accesControleSystemService: AccessControlSystemService) {
  // }

  ngOnInit(): void {
    console.log("ok");
    //   this.accesControleSystemService.apiV1AccessControlSystemGet().subscribe(
    //     data => this.accessControlDevices = data,
    //     error => console.error('Error fetching data', error)
    //   )
  }
}
