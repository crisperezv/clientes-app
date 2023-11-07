import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit{
  public cliente: Cliente = new Cliente();
  public titulo: String = "Crear cliente";

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.cargarCliente();
  }

  public cargarCliente(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          this.clienteService.getCliente(id).subscribe(
            cliente => {
              this.cliente = cliente;
            }
          )
        }
      }
    )
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']);
        Swal.fire(
          "¡Cliente creado con éxito!",
          `${json.cliente.nombre} ${json.cliente.apellido}`,
          "success"
        )
      }
    )
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']);
        Swal.fire(
          "¡Cliente actualizado con éxito!",
          `${json.cliente.nombre} ${json.cliente.apellido}`,
          "success"
        )
      }
    )
  }
}
