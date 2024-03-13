<div align="center">
    <img width="300px" alt="Rewrite It In Rust" src="https://ghost.fission.codes/content/images/2023/04/Rewrite-It-In-Rust---Postcard---Front.jpeg" />
</div>

# RIIR (Rewrite It In Rust)
Esa es la version reescrita en Rust del proyecto original

## Novedades replicadas desde la pagina orignal
- [x] Diseño identico (y mejorado)
- [x] Creacion y Eliminacion de Columnas
- [x] Creacion y Eliminacion de Tarjetas
- [x] Soporte para Imagenes
- [x] Modal para Eliminar columna
- [x] Modal para editar las tarjetas
- [x] Almacenamiento y escucha de datos en LocalHost
- [ ] Drag & Drop (No hay tiempo xd)

## Tecnologias Usadas
> [!NOTE]
> Se necesitan bases en Rust para entender el codigo por lo que es probable que quieras revisar este contenido
> [Libro de Rust en Español](https://rustlang-es.org/rust-book-es) y una [Guia de estudio y contenido en Español](https://rustlang-es.org/aprende)

- [Rust](https://rust-lang.org)
- [cargo-make](https://github.com/sagiegurari/cargo-make) - automatizar comandos
- [Leptos](https://leptos.dev) - framework para desarrollar la web
- [Trunk](https://trunkrs.dev) - bundler de rust para la web

## Desarrollo

### Requisitos
- NodeJs >= 20
- [Rust](https://rust-lang.org)
- [Trunk](https://trunkrs.dev)
- [cargo-make](https://github.com/sagiegurari/cargo-make) *

> [!IMPORTANT]
> Los elementos marcados con `*` son opcionales pero mejoran la experiencia

Inicialmente necesitas instalar los paquetes de nodejs
```sh
npm install
```

Si decidiste usar `cargo-make`, solo es necesario correr el siguiente comando
```sh
cargo make
```

Por lo contrario si decidiste no usar `cargo-make`, tienes que correr el siguiente comando
```sh
# generando los archiovs unocss
npx unocss
# compilando y corriendo la web en Rust
trunk serve
```

### Build
Se necesita lo mismo que para desarrollo

Inicialmente necesitas instalar los paquetes de nodejs
```sh
npm install --production
```

Si decidiste usar `cargo-make`, solo es necesario correr el siguiente comando
```sh
cargo make build
```

Por lo contrario si decidiste no usar `cargo-make`, tienes que correr el siguiente comando
```sh
# generando los archiovs unocss
npx unocss
# compilando y corriendo la web en Rust
trunk build --no-default-features --release
```
