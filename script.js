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

    // --- 4. LÓGICA DE "MI PROGRESO" (MODIFICADA PARA TARJETAS) ---
    const formProgreso = document.getElementById('formProgreso');
    const progresoFechaInput = document.getElementById('progresoFecha');
    const progresoPesoInput = document.getElementById('progresoPeso');
    const progresoNotasInput = document.getElementById('progresoNotas');
    
    // ¡CAMBIO! Apuntamos al nuevo contenedor de galería (asegúrate de crearlo en tu HTML)
    const historialGallery = document.getElementById('historialGallery');

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

        // 5. ¡CAMBIO! Actualizar la VISTA de tarjetas
        renderizarTarjetasProgreso();

        // 6. Limpiar el formulario
        formProgreso.reset();
    });

    // ¡FUNCIÓN MODIFICADA! Ahora crea tarjetas en lugar de filas de tabla
    function renderizarTarjetasProgreso() {
        // Limpiar la galería actual
        historialGallery.innerHTML = '';

        // Obtener datos
        let historial = JSON.parse(localStorage.getItem('historialProgreso')) || [];

        // Si no hay datos, mostrar un mensaje
        if (historial.length === 0) {
            historialGallery.innerHTML = '<p class="mensaje-vacio">Aún no hay registros. ¡Añade tu primer avance!</p>';
            return;
        }

        // Crear una tarjeta por cada registro, en orden inverso (más nuevo primero)
        // Usamos .slice() para no modificar el array original
        historial.slice().reverse().forEach(registro => {
            const card = document.createElement('div');
            // Reutilizamos las clases 'card' y 'recipe-card' o una nueva como 'progreso-card'
            card.className = 'card progreso-card'; 
            
            // Usamos '||' para poner un texto por defecto si no hay notas
            const notasTexto = registro.notas || 'Sin notas.';
            
            card.innerHTML = `
                <div class="card-content">
                    <h4>Registro: ${registro.fecha}</h4>
                    <p><strong>Peso:</strong> ${registro.peso} kg</p>
                    <p><strong>Notas:</strong> ${notasTexto}</p>
                </div>
            `;
            historialGallery.appendChild(card);
        });
    }


    // --- 5. CARGA INICIAL DE DATOS ---
    // Al cargar la página, se ejecutan estas funciones para
    // rellenar todos los formularios y tablas con los datos guardados.
    cargarPerfil();
    cargarRecordatorios();
    
    // ¡CAMBIO! Llamamos a la nueva función de renderizado de tarjetas
    renderizarTarjetasProgreso();
});