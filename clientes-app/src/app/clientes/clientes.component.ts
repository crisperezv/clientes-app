import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';

import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit{
  clientes: Cliente[];
  paginador: any;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        let page: number = +params.get('page');
        if(!page)
          page = 0;

        this.clienteService.getClientes(page).pipe(
          tap(response => {
            this.clientes = response.content as Cliente[];
            this.paginador = response;
          })
        ).subscribe(); // El método subscribe es muy importante, porque me permite obtener los observables del servicio.
      }
    )
    
  }

  delete(cliente: Cliente){
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            Swal.fire({
              title: "¡Cliente eliminado!",
              text: `El cliente ${cliente.nombre} ${cliente.apellido} fue eliminado`,
              icon: "success"
            });
          }
        )
      }
    });
  }
}
