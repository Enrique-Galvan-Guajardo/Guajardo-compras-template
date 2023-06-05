window.addEventListener('load', function() {
    // Obtenemos el elemento del overlay de carga
    var load_page = document.getElementById('loading-page');
    // Agregamos la clase 'hidden' para desvanecer el overlay de carga
    load_page.classList.add('disappear');
    // Eliminamos la propiedad 'hidden' para permitir el movimiento de la página luego de eliminar la pantalla de carga
    document.body.style.overflow = "";
});

        const item_basket = document.querySelector('.item-basket');
        const basket_points = document.querySelectorAll('.basket-points');
        const basket = document.querySelector('.basket');
        const icons_array = [
            { nombre: 'tomate', extension: '-hd' },
            { nombre: 'coco', extension: '-hd' },
            { nombre: 'naranja', extension: '-hd' },
            { nombre: 'sandía', extension: '-hd' },
            { nombre: 'limón', extension: '-hd' },
            { nombre: 'melón', extension: '-hd' },
            { nombre: 'galleta', extension: '-hd' },
            { nombre: 'pastel', extension: '-hd' },
            { nombre: 'uvas', extension: '-hd' },
            { nombre: 'pollo', extension: '-hd' },
            { nombre: 'salchicha', extension: '-hd' },
            { nombre: 'refresco', extension: '-hd' },
            { nombre: 'azúcar', extension: '-hd' },
            { nombre: 'zanahoria', extension: '-hd' },
            { nombre: 'huevos', extension: '-hd' },
            { nombre: 'carne', extension: '-hd' },
            { nombre: 'helado', extension: '-hd' }
        ];
        
        function item_fall_action() {
            // Activa la animación al ingresar la clase que la contiene
            item_basket.classList.toggle('item-basket-fall');
            add_random_rotation(item_basket);
        }

        function item_change(element) {
            // Generar un índice aleatorio basado en la longitud del icons_array
            let random_number = Math.floor(Math.random() * icons_array.length);
    
            // Obtener el objeto aleatorio usando el índice generado
            let random_item = icons_array[random_number];
            
            element.children[0].classList.replace( item_basket.children[0].classList[1], random_item.nombre + random_item.extension);
            element.parentNode.children[1].innerText = random_item.nombre;
        }

        function check_positions() {
            let i = 0;
            // Obtiene las dimensiones y coordenadas del elemento itemBasket
            let rectItemBasket = item_basket.getBoundingClientRect();
                
            let itemBasketTop = rectItemBasket.top;
            let itemBasketLeft = rectItemBasket.left;
            let itemBasketRight = rectItemBasket.right;
            let itemBasketBottom = rectItemBasket.bottom;
            // Obtiene las dimensiones y coordenadas del elemento basket
            let rectBasket = basket.getBoundingClientRect();
            let basketTop = rectBasket.top;
            let basketLeft = rectBasket.left;
            let basketRight = rectBasket.right;
            let basketBottom = rectBasket.bottom;
            // Verifica si el elemento itemBasket está dentro del elemento basket
            let estaDentro = itemBasketTop >= basketTop &&
                             itemBasketLeft >= basketLeft &&
                             itemBasketRight <= basketRight && 
                             itemBasketBottom <= basketBottom;
                
            if (estaDentro) {
                i++;
                basket.classList.add('basketed');
                setTimeout(function () {
                    basket.classList.remove('basketed');
                }, 200)
            }
            return i;
        }
        
        function get_points() {
            // Aumenta 100 puntos
            return basket_points[0].innerHTML = parseInt(basket_points[0].innerHTML) + 100;
        }

        item_basket.addEventListener('click', function() {
            // Llamar a la función de tirar item aquí
            drop_item();
        });
        
        document.addEventListener('keydown', function(event) {
            if (event.code === 'Space') {
                // Llamar a la función de tirar item aquí
                drop_item();
            }
        });
        
        document.addEventListener('keydown', function(event) {
            if (event.code === 'KeyR') {
                // Llamar a la función de cambiar item aquí
                item_change(item_basket)
            }
        });
        
        function add_random_rotation(element) {
            // Generar un índice aleatorio basado en la longitud del array
            let random_number = Math.floor(Math.random() * 361);
            
            // Se forma el valor en el que girará el elemento
            element.style.rotate = random_number+'deg';
        }
        
        function delete_rotation(element) {
            // Se elimina el valor en el que giró el elemento
            element.style.removeProperty('rotate');
        }
        
        function drop_item() {
            if (!item_basket.classList.contains('item-basket-fall')){
                // Ejecuta la función que ingresa la clase con animación
                item_fall_action();
                let times_in = 0;
                
                // Repetir la ejecución de la función cada .1 segundos (100 milisegundos)
                let check_interval = setInterval(() => {
                    // Imprimirá el valor retornado por miFuncion
                    times_in += check_positions()
                    
                }, 100);
                              
                setTimeout(function () {
                    // Ejecuta la función que remueve la clase con animación
                    item_fall_action();
                    
                    // Ejecuta la función que genera aleatoriamente otro producto
                    item_change(item_basket);
                            
                    delete_rotation(item_basket);
                    // Detener la ejecución después de 2 segundos (por ejemplo), finalizar la ejecución de la función setInterval
                    clearInterval(check_interval); 
                    if (times_in > 0) {
                        // Ejecuta la función que aumenta puntos
                        get_points();
                    }    
                }, 2000); 
            }
        }
    