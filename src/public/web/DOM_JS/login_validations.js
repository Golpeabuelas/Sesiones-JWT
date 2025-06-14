export async function login (correo, contraseña) {
    const res = await fetch('https://sesiones-jwt.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña })
    });

    const data = await res.json();

    if (data.status === 200) {
        alert('Inicio de sesión exitoso');
        localStorage.setItem('TOKEN', data.token);

        window.location.href = `https://sesiones-jwt.onrender.com/protectedd`
    } else if (data.status === 403) {
        alert('Contraseña incorrecta');
    } else if (data.status === 404) {
        alert('Correo no registrado');
    } else {
        alert('Error desconocido');
    }
}