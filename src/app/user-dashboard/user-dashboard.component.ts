import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../services/dashboard.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  users: any[] = [];
  name: any;

  constructor(private dashboardSvc: DashboardService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }


  private loadUsers() {
    this.users = [];
    this.dashboardSvc.getUsers().subscribe(resp => {
      for (let usr in resp) {
        const u = {name: resp[usr].name, id: resp[usr].id}
        this.users.push(u);
      }

    })
  }

  delete(id: string) {
    this.dashboardSvc.deleteUser(id).subscribe(resp => {
      this.loadUsers();
    })
  }

  saveUser() {
    const usr = {name: this.name, id: this.createID()}
    this.dashboardSvc.saveUser(usr).subscribe(resp => {
      this.loadUsers();
      this.name = '';
    })
  }

  createID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // eslint-disable-next-line no-bitwise
      const r = Math.random() * 16 | 0;
      // eslint-disable-next-line no-bitwise
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

  }

}
