

const iconInput = document.querySelector('.iconInput');
const testAlert = document.querySelector('.test-alert')

iconInput.addEventListener('click', () => {
    this.alertSuccessFuncion('Ha ocurrido un error');
    // const alertDiv = document.createElement('div')
    // alertDiv.innerHTML =
    //     `<div class="alert alert-secondary alert-dismissible fade show" role="alert">
    //    Selecciona la fecha en la que empezaste a trabajar.
    //    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    //  </div>
    //          `
    // testAlert.append(alertDiv)
})


function alertSuccessFuncion() {
    console.log('Hola Murcia')

    const alertS = document.createElement('div');
    alertS.className = `alert alert-success fade show alert-style d-block}`;
    alertS.setAttribute('role', 'alert');
    alertS.innerHTML = `<div class="alert alert-dismissible fade show" role="alert">
       Selecciona la fecha en la que empezaste a trabajar.
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>`;
    testAlert.append(alertS);
    setTimeout(() => {
        alertS.remove();
    }, 3000)
}