//Importar configuraciones legacy
import config from './config.js';

// Obtener referencias a los elementos
const input = document.getElementById('input_table_search');
let timeoutId;

//llamar por primera vez
getInformation(input.value);

document.addEventListener('click', function(event) {
    //console.log(event.target.classList);
    if (event.target.classList.contains('btn_remove')) {
        let fila = event.target;
        let row = fila.closest('tr');
        row.parentNode.removeChild(row);  
        Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "success",
            title: "Noticia escondida"
          })
    }
});

// Agregar un event listener para el evento 'input'
input.addEventListener('input', (event) => {
    // Limpiar cualquier timeout anterior
    clearTimeout(timeoutId);

    // Crear un nuevo timeout para actualizar el valor después de 2 segundos
    timeoutId = setTimeout(() => {
        // Obtener el valor actual del input
        const valor = event.target.value;
        getInformation(valor)
    }, 2000); // 2000 milisegundos = 2 segundos
});


//Solicitudes para obtener información de la api
async function getInformation(input){
    console.log(input)

    let htmlTags = '';

    const tbody_info = document.getElementById('tbody_info');
    tbody_info.innerHTML = '';

    //Obtener todos los registros sin filtracion
    if(input == null || input == undefined || input == ''){
        await axios.get(config[0].apiUrl)
            .then(function(response) {

                response.data.map(function(value, index){
                    htmlTags = htmlTags+`<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">` 
                        htmlTags = htmlTags+`
						<th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
							${value.titulo}
						</th>
						<td class="px-6 py-4">
                            ${value.descripcion}
						</td>
						<td class="px-6 py-4">
                            ${value.autor}
						</td>
						<td class="px-6 py-4">
                            ${value.fecha_publicacion}
						</td>
						<td class="px-6 py-4 text-right">
							        <div class="flex justify-center">
                                    <button>
                                        <svg id="${value.id}" class="btn_remove h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
						</td>`
                    htmlTags = htmlTags+`<tr>`
                })

                console.log(response.data);
                tbody_info.innerHTML = htmlTags;
            })
            .catch(function(error) {
                console.error(error);
            })
            .finally(function() {
                console.log('Petición completada');
            });
    //Filtrar registros por la fecha o el titulo
    }else{
        await axios.get(config[1].apiUrl+'?search='+input)
        .then(function(response) {

            response.data.map(function(value, index){
                htmlTags = htmlTags+`<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">` 
                    htmlTags = htmlTags+`
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        ${value.titulo}
                    </th>
                    <td class="px-6 py-4">
                        ${value.descripcion}
                    </td>
                    <td class="px-6 py-4">
                        ${value.autor}
                    </td>
                    <td class="px-6 py-4">
                        ${value.fecha_publicacion}
                    </td>
                    <td class="px-6 py-4 text-right">
                                <div class="flex justify-center">
                                    <button>
                                        <svg id="${value.id}" class="btn_remove h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                    </td>`
                htmlTags = htmlTags+`<tr>`
            })

            console.log(response.data);
            tbody_info.innerHTML = htmlTags;
        })
        .catch(function(error) {
            console.error(error);
        })
        .finally(function() {
            console.log('Petición completada');
        });
    }
}