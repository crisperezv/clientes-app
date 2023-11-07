import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';

import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit{
  clientes: Cliente[];

  constructor(
    private clienteService: ClienteService
  ){}

  ngOnInit(): void {
    this.clienteService.getClientes().pipe(
      tap(clientes => this.clientes = clientes)
    ).subscribe(); // El método subscribe es muy importante, porque me permite obtener los observables del servicio.
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
