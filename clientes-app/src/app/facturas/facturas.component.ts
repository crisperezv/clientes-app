import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { FacturaService } from './services/factura.service';
import { Producto } from './models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemFactura } from './models/item-factura';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
})
export class FacturasComponent implements OnInit{
  titulo: string = "Nueva factura";
  factura: Factura = new Factura();

  autocompleteControl = new FormControl('');
  productos: string[] = ['TV', 'Tablet', 'Celular'];
  productosFiltrados: Observable<Producto[]>;

  constructor(
    private clienteService: ClienteService,
    private facturaService: FacturaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente);
    });

    this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(
      map(value => value? this._filter(value) : []),
    );
  }

  private _filter(value: string): Producto[] {
    //const filterValue = value.toLowerCase();
    let products: Producto[]= [];

    this.facturaService.filtrarProductos(value).subscribe(
      productos => productos.forEach((producto: Producto) =>
        products.push(producto)
      )
    );
    return products;
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;
    console.log(producto);

    if(this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }
  actualizarCantidad(id: number, event: any): void {
    let cantidad = event.target.value as number;

    if(cantidad == 0) {
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if(id === item.producto.id){
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.factura.items.forEach((item: ItemFactura) => {
      if(id === item.producto.id){
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if(id === item.producto.id){
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItemFactura(id: number): void {
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id !== item.producto.id);
  }

  create(facturaForm): void {
    console.log(this.factura);
    if(this.factura.items.length == 0) {
      this.autocompleteControl.setErrors({'invalid': true});
    }

    if(facturaForm.form.valid && this.factura.items.length > 0) {
      this.facturaService.create(this.factura).subscribe(factura => {
        Swal.fire(
          "¡Factura creada con éxito!",
          `${this.factura.descripcion}`,
          "success"
        );
        this.router.navigate(['/clientes']);
      })
    }
  }
}
