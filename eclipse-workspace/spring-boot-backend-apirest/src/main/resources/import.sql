INSERT INTO regiones (id, nombre) VALUES (1, 'Sudamérica');
INSERT INTO regiones (id, nombre) VALUES (2, 'Centroamérica');
INSERT INTO regiones (id, nombre) VALUES (3, 'Norteamérica');
INSERT INTO regiones (id, nombre) VALUES (4, 'Europa');
INSERT INTO regiones (id, nombre) VALUES (5, 'Asia');
INSERT INTO regiones (id, nombre) VALUES (6, 'África');
INSERT INTO regiones (id, nombre) VALUES (7, 'Oceanía');
INSERT INTO regiones (id, nombre) VALUES (8, 'Antártida');

INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES(1, 'Cristián', 'Pérez', 'crisperez@admin.com', '2023-11-05');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES(2, 'Alejandra', 'Fuentes', 'alefuentes@gmail.com', '2023-11-06');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES(4, 'Mauricio', 'Pérez', 'mauro@gmail.com', '2023-11-06');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES(5, 'Claudia', 'Pérez', 'claudia@gmail.com', '2023-11-07');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES(8, 'Sara', 'Vásquez', 'saravasquez@gmail.com', '2023-11-08');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES(3, 'Rodrigo', 'Pérez', 'rodrigo@gmail.com', '2023-11-09');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES(6, 'Héctor', 'Pérez', 'hector@gmail.com', '2023-11-10');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES(6, 'Javier', 'Pérez', 'javier@gmail.com', '2023-11-11');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES(7, 'Alejandro', 'Soto', 'alejandro@gmail.com', '2023-11-12');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES(1, 'Verónica', 'G', 'veronica@gmail.com', '2023-11-13');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES(2, 'Eddard', 'Stark', 'eddard@gmail.com', '2023-11-14');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES(4, 'Catelyn', 'Tully', 'catelyn@gmail.com', '2023-11-15');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES(4, 'Robb', 'Stark', 'robb@gmail.com', '2023-11-16');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES(4, 'Daenerys', 'Targaryen', 'daenerys@gmail.com', '2023-11-17');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES(3, 'Ramsay', 'Snow', 'ramsay@gmail.com', '2023-11-18');

INSERT INTO productos (nombre, precio, create_at) VALUES('Panasonic Pantalla LCD', 259990, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES('Sony Cámara Digital DSC-W320B', 123450, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES('iPhone 15 Pro Max', 1490000, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES('iPad 13th gen', 990000, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES('Samsung Galaxy Book3', 590000, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES('Samsung Galaxy Watch 6', 249000, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES('Motorola Moto G40', 280000, NOW());

INSERT INTO facturas (descripcion, observacion, cliente_id, create_at) VALUES ('Factura equipos de oficina', null, 1, NOW());
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES(1, 1, 1);
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES(2, 1, 4);
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES(1, 1, 5);
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES(1, 1, 7);

INSERT INTO facturas (descripcion, observacion, cliente_id, create_at) VALUES ('Factura celulares', 'Celulares nuevos', 1, NOW());
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES(4, 2, 3);
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES(1, 2, 6);