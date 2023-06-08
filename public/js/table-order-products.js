// Obtener la lista UL
const order_table = document.getElementById('order-table');
      
// Obtener el input de búsqueda
const text_product_search = document.getElementById('input-products-search');
const select_product_category = document.getElementById('inputProductCategory');
const select_product_subcategory = document.getElementById('inputProductSubCategory');
const ticket_order_list = document.querySelector('.prod-list');

let text_filters = [
      { input_text: ''},
      { select_category_text: '' },
      { select_subcategory_text: '' }
    ];
// Obtener todos los elementos LI de la lista
const items_tr = order_table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

  // Recorrer cada elemento LI y agregar el evento de clic
  for (let i = 0; i < items_tr.length; i++) {
  // Permite mostrar u ocultar los campos para añadir productos
  items_tr[i].getElementsByClassName('row-item-count')[0].children[1].addEventListener('click', function() {
    this.parentElement.classList.toggle('hide-input');
    this.parentElement.classList.toggle('show-input');
  });
  // Determinar el si el producto será catalogado con una etiqueta o no en caso de haber una cantidad solicitada
  function set_Product_Tag(id, val) {
    // Buscaremos en toda la tabla el elemento que actualizaremos or su ID
    let td_item_row = order_table.querySelector('#'+id);
    // Si el elemento tiene un valor mayor a 0, es que será solicitado
    if (val > 0) {
      // Si se solicita, se le asignará su respectiva clase de añadido
      td_item_row.classList.add("row-item-added")
      fill_Ticket(td_item_row, 'ticket_'+id)
    }else{
      // Si no se solicita, se le eliminará la clase en caso de que anteriormente se haya agregado
      td_item_row.classList.remove("row-item-added")
      del_Ticket('ticket_'+id);
    }
  }
  // Determinar el objeto
  function det_Object(element) {
    let item_id = element.id
    let input_count = element.querySelector('#'+item_id+'_count')
    let tag_count = element.children[4].children[1].children[0].children[0]
    
    let row_object = [
      { id: item_id},
      { input_count: input_count },
      { tag_count: tag_count }
    ];
    
    return row_object;
  }
  // Permite VERIFICAR input productos
  function check_Product(element) {
    // Se confirma que el valor del elemento sea inferior a 0
    if (element[1].input_count.value < 0) {
      // En caso de ser un número negativo, se actualizará el input a 0, de esa manera bloquear el ingreso de números negativos al teclearlos
      element[1].input_count.value = parseInt(0);
      // Por consecuencia, la etiqueta también se actualizará a 0
      element[2].tag_count.innerHTML = parseFloat(element[1].input_count.value);
    }else if (element[1].input_count.value === '') {
      // En caso de que se eliminen todos los números en el campo y quede vacío, se actualizará el input a 0
      element[1].input_count.value = parseInt(0);
      // Por consecuencia, la etiqueta también se actualizará a 0
      element[2].tag_count.innerHTML = parseFloat(element[1].input_count.value);
    }else{
      // Por contrario, si el valor ingresado por teclado es mayor a 0, la etiqueta también se actualizará al valor del input
      element[2].tag_count.innerHTML = parseFloat(element[1].input_count.value);
    }
    // Se enviará la información del elemento a la función que lo catalogue
    set_Product_Tag(element[0].id, parseInt(element[1].input_count.value))
  }
  // Permite SUMAR productos
  function sum_Product(element, update) {
    // Se verifica que el valor de update sea verdadero
    if (update){
      // Si es verdadero, significa que fue llamado desde el botón + y requiere sumarse el valor al input y actualizar la etiqueta
      element[1].input_count.value = parseInt(element[1].input_count.value) + 1;
      // Se actualiza la etiqueta con respecto al valor del input
      element[2].tag_count.innerHTML = element[1].input_count.value;
    }else{
      // Si es falso, significa que el valor se está ingresando por las teclas flecha ARRIBA, por lo cual el input se actualiza automáticamente y sólo resta actualizar la etiqueta
      element[2].tag_count.innerHTML = parseFloat(element[1].input_count.value) + 1;
    }
    // Se enviará la información del elemento a la función que lo catalogue
    set_Product_Tag(element[0].id, parseInt(element[1].input_count.value))
  }
  // Permite ELIMINAR productos
  function del_Product(element, update) {
    // Se verifica que el valor dentro del input sea mayor a 0
    if (element[1].input_count.value > 0) {
      // Se verifica que el valor de update sea verdadero
      if (update){
        // Si es verdadero, significa que fue llamado desde el botón - y requiere restar el valor al input y actualizar la etiqueta
        element[1].input_count.value = parseInt(element[1].input_count.value) - 1;
        // Se actualiza la etiqueta con respecto al valor del input
        element[2].tag_count.innerHTML = element[1].input_count.value;
      }else{
        // Si es falso, significa que el valor se está ingresando por las teclas flecha ABAJO y flecha ABAJO, por lo cual el input se actualiza automáticamente y sólo resta actualizar la etiqueta
        element[2].tag_count.innerHTML = parseFloat(element[1].input_count.value) - 1;
      }
    }else if (element[1].input_count.value == 0 && !update){
      // Si el valor del input es igual a 0 y el valor de update es falso, significa que se está intentando actualizar el input con flecha ABAJO hacia valores negativos, lo cual no está permitido, entonces siempre se sumará un 1 cuando intente llegar a -1 regresándolo a 0 causando un bloqueo a números negativos
      element[1].input_count.value = parseInt(0);
    }
    // Se enviará la información del elemento a la función que lo catalogue
    set_Product_Tag(element[0].id, parseInt(element[1].input_count.value))
  }
  // Agregar un evento al botón +
  items_tr[i].getElementsByClassName('row-item-count')[0].children[0].children[0].children[0].addEventListener('click', function() {
    // Función para crear un array del input
    let rowObject = det_Object(this.parentElement.parentElement.parentElement.parentElement);
    // Función para sumar dentro del input
    sum_Product(rowObject, true);
  });
  // Agregar un evento al botón -
  items_tr[i].getElementsByClassName('row-item-count')[0].children[0].children[2].children[0].addEventListener('click', function() {
    // Función para crear un array del input
    let rowObject = det_Object(this.parentElement.parentElement.parentElement.parentElement);
    // Función para restar dentro del input
    del_Product(rowObject, true);
  });
  // Agregar un evento keydown al input
  items_tr[i].getElementsByClassName('row-item-count')[0].children[0].children[1].addEventListener('keydown', function(event) {
    // Verificar si se presionó la tecla "Arriba" (código 38) o "Abajo" (código 40)
    if (event.keyCode === 38) { // Flecha "Arriba"
      // Función para crear un array del input
      let rowObject = det_Object(this.parentElement.parentElement.parentElement);
      // Función para sumar dentro del input
      sum_Product(rowObject, false);
    } else if (event.keyCode === 40) { // Flecha "Abajo"
      // Función para crear un array del input
      let rowObject = det_Object(this.parentElement.parentElement.parentElement);
      // Función para restar dentro del input
      del_Product(rowObject, false);          
    }
  });
  // Agregar un evento input al input
  items_tr[i].getElementsByClassName('row-item-count')[0].children[0].children[1].addEventListener('input', function() {
    // Función para crear un array del input
    let rowObject = det_Object(this.parentElement.parentElement.parentElement);
    // Función para verificar si se tecleó el número y cumple con no ser inferior a 0
    check_Product(rowObject);          
  });
}

// Cada que se escriba dentro del input, se ejecutará la función de búsqueda dentro de la tabla
text_product_search.addEventListener('input', function () {
  // Obtener el texto del input
  text_filters[0].input_text = this.value.toLowerCase();
  // Función para buscar el texto deseado desde el texto ingresado
  search_For()
})      
// Cada que se selecciona un texto del filtro select, se buscará en cada tr de toda la tabla
select_product_category.addEventListener('change', function () {
  // Obtener el texto del select
  text_filters[1].select_category_text = this.value.toLowerCase();
  // Función para buscar el texto deseado desde categorías
  search_For();
})     
// Cada que se selecciona un texto del filtro select, se buscará en cada tr de toda la tabla
select_product_subcategory.addEventListener('change', function () {
  // Obtener el texto del select
  text_filters[2].select_subcategory_text = this.value.toLowerCase();
  // Función para buscar el texto deseado desde subcategorías
  search_For();
})      
//Función para ejecutar una consulta entre la información de la tabla
function search_For() {
  // Recorrer cada elemento tr para leer los textos 
  for (let i = 0; i < items_tr.length; i++) {
    // Buscar en cada tr uno por uno 
    let tr = items_tr[i];
    // Buscar entre ciertos td la información escrita relevante para la búsqueda 
    let td = tr.getElementsByTagName('td');

    // Capturar la información del nombre en base a la rutas específica dentro del td 
    let prod_name = td[0].children[0].textContent.toLowerCase();
    // Capturar la información de la categoría en base a la rutas específica dentro del td 
    let prod_cat = td[1].textContent.toLowerCase();
    // Capturar la información de la subcategoría en base a la rutas específica dentro del td 
    let prod_sub_cat = td[2].textContent.toLowerCase();
    
    // Se verifica que la opción seleccionada del select de categorías sea sin definir
    if (text_filters[1].select_category_text === 'all') {
      // En caso de no estar definida la categoría, se remueven las clases hide de todos los tr haciéndolas visibles nuevamente
      tr.classList.remove('hide-tr') 
      // Se reinicia el select de subcategoría
      select_product_subcategory.selectedIndex = 0;
      // Se reinicia la variable de subcategoría
      text_filters[2].select_subcategory_text = select_product_subcategory.value.toLowerCase();
    }else{
      if ((prod_cat.includes(text_filters[1].select_category_text))) {
        // En caso de haberse seleccionado algo en categoría, se ocultarán con hide los tr que no cumplan con dicha categoría
        tr.classList.remove('hide-tr') 
        if ((text_filters[2].select_subcategory_text === 'all')) {
          // En caso de no estar definida la subcategoría, se remueven las clases hide de todos los tr haciéndolas visibles nuevamente
          tr.classList.remove('hide-tr') 
        }else{
          // En caso de estar definida se hace lo siguiente
          if ((prod_cat.includes(text_filters[1].select_category_text)) &&
          (prod_sub_cat.includes(text_filters[2].select_subcategory_text))) {
            // Se verificarán los tr que cumplan con la categoría y subcategoría
            tr.classList.remove('hide-tr') 
          }else{
            // En caso de no cumplir, se ocultan con la clase hide
            tr.classList.add('hide-tr')
          }
        }
      }else{
        // En caso de no cumplir, se ocultan con la clase hide
        tr.classList.add('hide-tr')
      }
    }
    
    //Se verificará que la categoría sea seleccionada y subcategoría esté sin definir
    if (text_filters[1].select_category_text !== 'all' && 
        text_filters[2].select_subcategory_text === 'all') {
      
      //Se verificará que la categoría exista y el texto ingresado coincida con algun tr
      if (prod_cat.includes(text_filters[1].select_category_text) &&
      prod_name.includes(text_filters[0].input_text)) {
        //Si categoría y texto coinciden con algún tr, se visualizará
        tr.classList.remove('hide-tr')
      }else{
        // En caso de no cumplir, se ocultan con la clase hide
        tr.classList.add('hide-tr')
      }
    }else if (text_filters[1].select_category_text !== 'all' && 
              text_filters[2].select_subcategory_text !== 'all'){
        //Se verificará que la categoría y subcategoría hayan sido ingresadas
      if (prod_cat.includes(text_filters[1].select_category_text) &&
          prod_sub_cat.includes(text_filters[2].select_subcategory_text) &&
          prod_name.includes(text_filters[0].input_text)) {
        //Si categoría, subcategoría y texto coinciden con algún tr, se visualizará
        tr.classList.remove('hide-tr')
      }else{
        // En caso de no cumplir, se ocultan con la clase hide
        tr.classList.add('hide-tr')
      } 
    }else{
      //En caso de que la categoría y subcategoría estén sin definir, sólo se buscará el texto ingresado 
      if (prod_name.includes(text_filters[0].input_text)) {
        //Si el texto coincide con algún tr, se visualizará
        tr.classList.remove('hide-tr')
      }else{
        // En caso de no cumplir, se ocultan con la clase hide
        tr.classList.add('hide-tr')
      }
    }
  }
}

//Función para rellenar el ticket con la cantidad de productos solicitados
function fill_Ticket(element, id) {
    let prod_id = id;
    // Capturar la información del nombre en base a la rutas específica dentro del td 
    let prod_name = element.children[1].children[0].textContent.toLowerCase();
    // Capturar la información de la categoría en base a la rutas específica dentro del td 
    let prod_cant = element.children[4].children[0].children[1].value;
    // Crea un nuevo elemento li
    let ticket_order_new_li = document.createElement('li');
    
    let ticket_order_find_li = ticket_order_list.querySelector('#' + prod_id);

    if (ticket_order_list.contains(ticket_order_find_li)) {
      ticket_order_find_li.children[0].children[1].children[0].innerHTML = prod_cant;
      //console.log(ticket_order_find_li.children[1].children[0]);
    }else{
      // Agrega el contenido HTML al nuevo elemento li
      ticket_order_new_li.id = prod_id;
      ticket_order_new_li.innerHTML =  '<div class="row my-2">'
                                            +'<div class="ml-4 col-5 text-break">' + prod_name + '</div>'
                                          +'<div class="col-3 text-break">'
                                            +'<span>' + prod_cant + '</span>'
                                            +'<span class="text-danger"></span>'
                                          +'</div>'
                                          +'<div class="col-2 text-right text-primary text-break"></div>'
                                        +'</div>';
  
      // Agrega el nuevo elemento li al ul
      ticket_order_list.appendChild(ticket_order_new_li);
    }
}

//Función para eliminar del ticket la cantidad de productos no solicitados
function del_Ticket(id) {
  let prod_id = id;
  let ticket_order_find_li = ticket_order_list.querySelector('#' + prod_id);
  if (ticket_order_list.contains(ticket_order_find_li)) {
    ticket_order_list.removeChild(ticket_order_find_li);
  }
}