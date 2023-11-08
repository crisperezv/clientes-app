import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';

import { Cliente } from './cliente';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint: string = "http://localhost:8080/api/clientes";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndpoint+'/page/'+page).pipe(
      map(
        (response: any) => {
          (response.content as Cliente[]).map(cliente => {
            cliente.nombre = cliente.nombre.toUpperCase();
            return cliente;
          });
          return response;
        }
      )
    ); 
  }

  create(cliente: Cliente) : Observable<any>{
    return this.http.post<any>(this.urlEndpoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(() => e);
        }
        this.router.navigate(['/clientes']);
        Swal.fire("Error al crear cliente", e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        Swal.fire("Error al obtener cliente", e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        Swal.fire("Error al eliminar cliente", e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }
}
