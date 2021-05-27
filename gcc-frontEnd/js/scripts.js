class Validator {

    constructor() {
        this.validations = [
            'data-min-length',
            'data-max-length'

        ];

    }

    //Iniciar a validação de todos os campos
    validate(form) {

        // Resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0){
           this.cleanValidations(currentValidations);
        }

        // pegar ps inputs
        let inputs = document.getElementsByTagName('input');

        //transformo uma HTMLCollection -> array
        let inputsArray = [...inputs];

        //loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function (input) {            

            // loop em todas as vlidações existentes
            for (let i = 0; this.validations.length > i; i++) {

                //Verifica se a validação atual exsite no input
                if (input.getAttribute(this.validations[i]) != null) {

                    //data-min-length -> minlength
                    // limpando a string para virar um método
                    let method = this.validations[i].replace('data-','').replace('-', '');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //invocar o método
                    this[method](input, value);

                }
            }

        }, this);

    }


// verifica se o input tem o número mínimo de caracteres
minlength(input, minValue) {

  let inputLength = input.value.length;

  let erroMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

  if (inputLength < minValue){
     this.printMessage(input, erroMessage);
  }

}

//Verifica se o input passou do limite de caracteres
maxlength(input, maxValue){
    let inputLength = input.value.length;

    let erroMessage = `O campo precisa menos que ${maxValue} caracteres`;
  
    if (inputLength > maxValue){
       this.printMessage(input, erroMessage);
    }
}

// Método para imprimir mensagens de erro na tela
printMessage(input, msg){
 
    let template = document.querySelector('.error-validation').cloneNode(true);

    template.textContent = msg;

    let inputParent = input.parentNode;

    template.classList.remove('template');

    inputParent.appendChild(template);
}

    // Limpa as validações da tela
    cleanValidations(validations){
      validations.forEach(el => el.remove());
    }

}


let form = document.getElementById("registre-form");
let submit = document.getElementById("btn-submit");
let validator = new Validator();

// evento quie dispara as validações
submit.addEventListener('click', function (e) {

    e.preventDefault();

    validator.validate(form);
});
