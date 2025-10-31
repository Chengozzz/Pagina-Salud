// Espera a que todo el contenido HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVEGACIÓN TIPO SPA (Single Page App) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el navegador salte al ancla
            
            const targetId = link.getAttribute('href').substring(1); // Obtiene el ID (ej. "perfil")

            // Oculta todas las secciones
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Muestra la sección objetivo
            document.getElementById(targetId).classList.add('active');

            // Actualiza el estado activo en los enlaces de navegación
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // --- 2. LÓGICA DE "MI PERFIL" ---
    const formPerfil = document.getElementById('formPerfil');
    const estaturaInput = document.getElementById('estatura');
    const pesoInicialInput = document.getElementById('pesoInicial');
    const notasMedicasInput = document.getElementById('notasMedicas');

    // Al enviar el formulario de perfil
    formPerfil.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('perfilEstatura', estaturaInput.value);
        localStorage.setItem('perfilPesoInicial', pesoInicialInput.value);
        localStorage.setItem('perfilNotasMedicas', notasMedicasInput.value);
        alert('¡Perfil guardado exitosamente!');
    });

    // Función para cargar los datos del perfil guardados
    function cargarPerfil() {
        estaturaInput.value = localStorage.getItem('perfilEstatura') || '';
        pesoInicialInput.value = localStorage.getItem('perfilPesoInicial') || '';
        notasMedicasInput.value = localStorage.getItem('perfilNotasMedicas') || '';
    }

    // --- 3. LÓGICA DE "RECORDATORIOS" ---
    const formRecordatorios = document.getElementById('formRecordatorios');
    const checkAgua = document.getElementById('check-agua');
    const checkDesayuno = document.getElementById('check-desayuno');
    const checkComida = document.getElementById('check-comida');
    const checkCena = document.getElementById('check-cena');

    // Al enviar el formulario de recordatorios
    formRecordatorios.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('recordatorioAgua', checkAgua.checked);
        localStorage.setItem('recordatorioDesayuno', checkDesayuno.checked);
        localStorage.setItem('recordatorioComida', checkComida.checked);
        localStorage.setItem('recordatorioCena', checkCena.checked);
        alert('¡Configuración de recordatorios guardada!');
    });

    // Función para cargar la configuración de recordatorios
    function cargarRecordatorios() {
        // 'localStorage.getItem' devuelve un string "true" o "false"
        checkAgua.checked = localStorage.getItem('recordatorioAgua') === 'true';
        checkDesayuno.checked = localStorage.getItem('recordatorioDesayuno') === 'true';
        checkComida.checked = localStorage.getItem('recordatorioComida') === 'true';
        checkCena.checked = localStorage.getItem('recordatorioCena') === 'true';
    }

    // --- 4. LÓGICA DE "MI PROGRESO" ---
    const formProgreso = document.getElementById('formProgreso');
    const progresoFechaInput = document.getElementById('progresoFecha');
    const progresoPesoInput = document.getElementById('progresoPeso');
    const progresoNotasInput = document.getElementById('progresoNotas');
    const historialTablaBody = document.getElementById('historialTablaBody');

    // Al enviar el formulario de progreso
    formProgreso.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Obtener el historial existente (o crear un array vacío)
        let historial = JSON.parse(localStorage.getItem('historialProgreso')) || [];

        // 2. Crear el nuevo registro
        const nuevoRegistro = {
            fecha: progresoFechaInput.value,
            peso: progresoPesoInput.value,
            notas: progresoNotasInput.value
        };

        // 3. Añadir el nuevo registro al array
        historial.push(nuevoRegistro);

        // 4. Guardar el array actualizado en localStorage
        localStorage.setItem('historialProgreso', JSON.stringify(historial));

        // 5. Actualizar la tabla visualmente
        renderizarTablaProgreso();

        // 6. Limpiar el formulario
        formProgreso.reset();
    });

    // Función para dibujar la tabla con los datos de localStorage
    function renderizarTablaProgreso() {
        // Limpiar la tabla actual
        historialTablaBody.innerHTML = '';

        // Obtener datos
        let historial = JSON.parse(localStorage.getItem('historialProgreso')) || [];

        // Si no hay datos, mostrar un mensaje
        if (historial.length === 0) {
            historialTablaBody.innerHTML = '<tr><td colspan="3">Aún no hay registros. ¡Añade tu primer avance!</td></tr>';
            return;
        }

        // Crear una fila (tr) por cada registro
        historial.forEach(registro => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${registro.fecha}</td>
                <td>${registro.peso} kg</td>
                <td>${registro.notas}</td>
            `;
            historialTablaBody.appendChild(fila);
        });
    }


    // --- 5. CARGA INICIAL DE DATOS ---
    // Al cargar la página, se ejecutan estas funciones para
    // rellenar todos los formularios y tablas con los datos guardados.
    cargarPerfil();
    cargarRecordatorios();
    renderizarTablaProgreso();
    
});