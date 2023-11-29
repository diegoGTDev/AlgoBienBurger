import {LocalStorage} from './services/localstorage.js'
import {Login} from './services/login.js'
const _LocalStorage = new LocalStorage()
const login = new Login();
const user = JSON.parse(_LocalStorage.get("user"));
if (user != null){
    const user_entry = document.getElementById("user-entry");
    console.log(user);
    user_entry.innerHTML = user.username;
}
console.log("JS VINCULADO")

const btnCerrarSesion = document.getElementById("btn-cerrar-sesion").addEventListener('click', login.cerrarSesion);