import { Producto } from "./producto";

export class ItemFactura {
    producto: Producto;
    cantidad: number = 1;
    importe: number;

    // Podemos usar tanto el método del backend como este
    public calcularImporte(): number {
        return this.cantidad * this.producto.precio;
    }
}
