# Prueba técnica Frontend Datacenter

Se construyó una aplicación WEB frontend tipo SPA utilizando la versión 17 de Angular. Y como libreria de componentes, se utilizó Angular Material.

## Funcionamiento 🔧
Para observar el funcionamiento de la aplicación frontend se requiere que se este corriendo localmente la aplicacion  Backend de SpringBoot que se encuentra documentada en el repositorio: 

https://github.com/asuridev/datacenter-backend


### Vista de login.

Cuando la aplicación inicia, presenta una vista de login donde los vendedores podrán ingresar sus credenciales según hayan sido creadas en la base de datos.

!["menu1"](/assets/login.png)

La aplicación Backend cuenta con los siguientes usuarios de forma predeterminada.

| username        | password | roles        |
|-----------------|----------|--------------|
| pedro@gmail.com | 6145     | SELLER       |
| maria@gmail.com | 6145     | SELLER       |
| diana@gmail.com | 6145     | SELLER       |
| ana@gmail.com   | 6145     | SELLER ADMIN |
| juan@gmail.com  | 6145     | SELLER ADMIN |

### Panel de recarga.

Una vez se hayan ingresado las credenciales de forma correcta, la aplicación lo dirige a la vista de recarga, en la que mediante un formulario el vendedor podrá realizar la recarga con el número de teléfono y completando los campos.
Las opciones presentada en el select **operador**  corresponde a la consulta al backend donde solicita los operadores del sistema.

!["menu1"](/assets/recarga.png)

Si la recarga es exitosa obtendrá un mensaje de confirmación.

!["menu1"](/assets/succes.png)

Confirmando que el registro fue insertado en la base de datos.

!["menu1"](/assets/db-recarga.png)


### Reporte de recargas.

**Si**  el vendedor que realiza el login en la aplicación cuenta con **el rol de administrador**, se le mostrará un toggle-button en la vista de recarga, donde podrá conmutar entre el panel de recarga y el panel de reportes.
Estando en el panel de reporte, el usuario tendría las opciones para discriminar las recargas realizadas por operador y/o vendedor.

!["menu1"](/assets/reporte.png)

## Comenzando. 🚀

## Despliegue. 📦
Para correr localmente esta aplicación debe estar ejecutandose localmente el backend.
Además tener instalada la version 18 de nodejs y contar con la version 17 de Angular.


## Configuración para prueba local. ⚙️

Instalar nodejs https://nodejs.org/en/download

Instalar la cli de angular.

```
  npm i -g @angular/cli
```
Clonar el repositorio.

```
 git clone https://github.com/asuridev/datacenter-front.git
```

Moverse al directorio del proyecto.
```
 cd datacenter-front
```

Correr el proyecto.
```
 npm run start
```
 
**Nota**:
Angular ejecuturá un servidor web en el puerto 4200 donde podrá interactuar con la aplicación.


