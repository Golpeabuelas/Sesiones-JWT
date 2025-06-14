import { login } from "./login_validations.js";

const form = document.querySelector('form');
const correoInput = document.getElementById('correo');
const contraseñaInput = document.getElementById('contraseña');

function camposCompletos() {
    const correo = correoInput.value.trim();
    const contraseña = contraseñaInput.value.trim();
    return correo !== '' && contraseña !== '';
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!camposCompletos()) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const correo = correoInput.value.trim();
    const contraseña = contraseñaInput.value;

    await login(correo, contraseña)
});
