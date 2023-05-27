// Obtener la lista UL
const order_table = document.getElementById('order-table');

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
    }else{
      // Si no se solicita, se le eliminará la clase en caso de que anteriormente se haya agregado
      td_item_row.classList.remove("row-item-added")
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
      element[2].tag_count.innerHTML = parseInt(element[1].input_count.value);
    }else if (element[1].input_count.value === '') {
      // En caso de que se eliminen todos los números en el campo y quede vacío, se actualizará el input a 0
      element[1].input_count.value = parseInt(0);
      // Por consecuencia, la etiqueta también se actualizará a 0
      element[2].tag_count.innerHTML = parseInt(element[1].input_count.value);
    }else{
      // Por contrario, si el valor ingresado por teclado es mayor a 0, la etiqueta también se actualizará al valor del input
      element[2].tag_count.innerHTML = parseInt(element[1].input_count.value);
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
      element[2].tag_count.innerHTML = parseInt(element[1].input_count.value) + 1;
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
        element[2].tag_count.innerHTML = parseInt(element[1].input_count.value) - 1;
      }
    }else if (element[1].input_count.value == 0 && !update){
      // Si el valor del input es igual a 0 y el valor de update es falso, significa que se está intentando actualizar el input con flecha ABAJO hacia valores negativos, lo cual no está permitido, entonces siempre se sumará un 1 cuando intente llegar a -1 regresándolo a 0 causando un bloqueo a números negativos
      element[1].input_count.value = parseInt(element[1].input_count.value) + 1;
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