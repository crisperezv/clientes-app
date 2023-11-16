import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit{
  public cliente: Cliente = new Cliente();
  public regiones: Region[];
  public titulo: string = "Crear cliente";
  public errors: string[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.cargarCliente();
    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  public cargarCliente(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id)
          this.clienteService.getCliente(id).subscribe(cliente => this.cliente = cliente)
      }
    );
  }

  public create(): void {
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']);
        Swal.fire(
          "¡Cliente creado con éxito!",
          `${json.cliente.nombre} ${json.cliente.apellido}`,
          "success"
        )
      },
      err => {
        this.errors = err.error.errors as string[];
        console.log("Error desde el back-end: "+err.status);
        console.log(err.error.errors);
      }
    )
  }

  public update(): void {
    console.log(this.cliente);
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']);
        Swal.fire(
          "¡Cliente actualizado con éxito!",
          `${json.cliente.nombre} ${json.cliente.apellido}`,
          "success"
        )
      },
      err => {
        this.errors = err.error.errors as string[];
        console.log("Error desde el back-end: "+err.status);
        console.log(err.error.errors);
      }
    )
  }

  public compararRegion(r1: Region, r2: Region): boolean {
    if(r1 === undefined && r2 === undefined){
      return true;
    }
    return (r1 == null || r2 == null)? false : r1.id === r2.id;
  }
}
