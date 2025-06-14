async function mostrarBienvenida() {
    try {
        const token = localStorage.getItem('TOKEN');
        const res = await fetch('/protected', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token})
        });

        if (!res.ok) throw new Error('No autorizado');

        const data = await res.json();
        document.getElementById('bienvenida').textContent = `Bienvenido, ${data.usuario}`;
    } catch {
        window.location.href = '/web/sign_in.html';
    }
}

mostrarBienvenida();