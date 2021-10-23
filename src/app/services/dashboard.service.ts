import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) {
  }


  public getUsers(): Observable<any> {
    return this.httpClient.get(`${environment.api}/listUsers`);
  }

  deleteUser(id: any): Observable<any> {
    return this.httpClient.delete(`${environment.api}/deleteUser/${id}`);
  }

  public saveUser(user: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}/addUser`, user);
  }

}
