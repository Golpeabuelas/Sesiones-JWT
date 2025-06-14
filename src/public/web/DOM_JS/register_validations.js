export function validarEstructuraCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(correo)) {
        return true
    } 

   return false 
}

export async function buscarCorreoRegistrado (correo) {
    const result = await fetch(`https://sesiones-jwt.onrender.com/find-email-registered/${correo}`)
    const status = await result.json()

    if ( status.status == 201 ) { return true } 
    
    return false
}

export function validarContraseñas (contraseña, confirmacion) {
    if ( contraseña === confirmacion ) { return true}
    
    return false 
}

export function validarInputs (input) {
    input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '')
}

export function validarInputsVacios (inputs) {
    for(let i = 0; i > inputs.length; i++) {
        if ( inputs[i].value.trim() == '' ) {
            return false
        }
    }

    return true
}

export async function registrarSesion(nombre, correo, contraseña) {
    const result = await fetch(`http://localhost:3000/create-session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, correo, contraseña })
    })

    const allowed = await result.json()

    return allowed.status
}