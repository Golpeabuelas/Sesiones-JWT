import { buscarCorreoRegistrado, registrarSesion, validarContraseñas, validarEstructuraCorreo, validarInputs, validarInputsVacios } from "./register_validations.js";

const nombreInput = document.getElementById('nombre');
const correoInput = document.getElementById('correo');
const contraseñaInput = document.getElementById('contraseña');
const confirmarContraseñaInput = document.getElementById('confirmarContraseña');
const btnSubmit = document.getElementById('btnsubmit')

const allInputs = document.getElementsByClassName('input-required') 

nombreInput.addEventListener('input', () => {
    validarInputs(nombreInput)
})

btnSubmit.addEventListener('click', async (event) => {
    event.preventDefault()
    if ( validarInputsVacios(allInputs) ) {
        
        if ( !validarContraseñas(contraseñaInput.value, confirmarContraseñaInput.value ) ) {
            confirmarContraseñaInput.setCustomValidity('Confirmacion de contraseña incorrecta')
            confirmarContraseñaInput.reportValidity()
        }

        if ( !validarEstructuraCorreo(correoInput.value) ) {
            correoInput.setCustomValidity('Estructura de correo inválida')
            correoInput.reportValidity()
        }
        
        if ( ! await buscarCorreoRegistrado(correoInput.value) ) {
            console.log('ME METOOOOOo')
            correoInput.setCustomValidity('Correo ya registrado, intenta con otro')
            correoInput.reportValidity()
        }

        if ( validarContraseñas(contraseñaInput.value, confirmarContraseñaInput.value) && await buscarCorreoRegistrado(correoInput.value) && validarEstructuraCorreo(correoInput.value) ) {
            alert('entro porque soy ggei')
            const result = await registrarSesion(nombreInput.value, correoInput.value, contraseñaInput.value)
            
            window.location.href = 'http://localhost:3000/'
        }
    }
})
 