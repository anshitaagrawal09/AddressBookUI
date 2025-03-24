import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AddressBookService {
  private apiUrl = 'http://localhost:8080/api/addressbook';

  constructor(private http: HttpClient) {}

  getPersons(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // addPerson(person: any): Observable<any> {
  //   return this.http.post(this.apiUrl, person);
  // }

  addPerson(person: any): Observable<any> {
    return this.http.post(this.apiUrl, person, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  

  updatePerson(id: number, person: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, person);
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
