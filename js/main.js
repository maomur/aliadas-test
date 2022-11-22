import { Items } from '../classes/Item.js'


class App {

    array = [];
    idCurrent = 0;

    // CAPTURA DE INPUTS
    inputFechaInicio = document.querySelector('#fechaInicio');
    inputFechaFin = document.querySelector('#fechaFin');
    inputTipoTrabajo = document.querySelector('#tipoTrabajo');
    inputOtrosPagos = document.querySelector('#otrosPagos');
    inputSalarioMensual = document.querySelector('#salarioMensual');
    inputSalarioHora = document.querySelector('#salarioHora');
    inputSalarioDia = document.querySelector('#salarioDia');
    botonCalcular = document.querySelector('#botonCalcular');
    contenidoModal = document.querySelector('.modal-body');
    modalContent = document.querySelector('.modal-content');
    divMensual = document.querySelector('#divMensual');
    divDias = document.querySelector('#divDias');
    divHoras = document.querySelector('#divHoras');
    divDiasTrabajoSemana = document.querySelector('#divDiasTrabajoSemana');
    inputDiasTrabajadosSemana = document.querySelector('#diasTrabajoSemana');
    divHorasTrabajoDia = document.querySelector('#divHorasTrabajoDia');
    inputHorasTrabajoDia = document.querySelector('#horasTrabajoDia');
    divAuxilioTransporte = document.querySelector('#divAuxilioTransporte');
    inputAuxilioTransporte = document.querySelector('#auxilioTransporte');
    botonLiquidaciones = document.querySelector('#botonLiquidaciones');


    constructor() {
        this.localIni();
        this.selector();
        this.validacion();
    }


    localIni() {
        document.addEventListener('DOMContentLoaded', () => {
            this.array = JSON.parse(localStorage.getItem('Liquidaciones')) || [];
            this.ejecutar();
        })
    }

    selector() {

        this.inputTipoTrabajo.addEventListener('change', () => {
            if (this.inputTipoTrabajo.value === 'tiempo-completo') {
                divMensual.className = 'd-block'
                divDias.className = 'd-none';
                divHoras.className = 'd-none';
                divDiasTrabajoSemana.className = 'd-none';
                divHorasTrabajoDia.className = 'd-none';

            } if (this.inputTipoTrabajo.value === 'por-dias') {
                divDias.className = 'd-block';
                divMensual.className = 'd-none';
                divHoras.className = 'd-none';
                divDiasTrabajoSemana.className = 'd-block';
                divHorasTrabajoDia.className = 'd-none';

            } if (this.inputTipoTrabajo.value === 'por-horas') {
                divHoras.className = 'd-block';
                divHorasTrabajoDia.className = 'd-block';
                divMensual.className = 'd-none';
                divDias.className = 'd-none';
                divDiasTrabajoSemana.className = 'd-none';
            }
        })
    }


    validacion() {

        botonCalcular.addEventListener('click', () => {

            if (!this.inputFechaInicio.value) {
                this.contenidoModal.innerHTML = "";
                const modal = document.createElement('div');
                modal.innerHTML = `
                    <h2>ATENCIÓN</h2>
                    <h4>El campo <span class='text-danger'>FECHA INICIAL</span>, no puede quedar vacío</h4>
                    `
                this.contenidoModal.appendChild(modal);

            } else if (!this.inputFechaFin.value) {
                this.contenidoModal.innerHTML = "";
                const modal = document.createElement('div');
                modal.innerHTML = `
                    <h2>ATENCIÓN</h2>
                    <h4>El campo <span class='text-danger'>FECHA FINAL</span>, no puede quedar vacío</h4>
                    `
                this.contenidoModal.appendChild(modal);

            } else if (this.inputTipoTrabajo.value === 'unselect') {
                this.contenidoModal.innerHTML = "";
                const modal = document.createElement('div');
                modal.innerHTML = `
                    <h2>ATENCIÓN</h2>
                    <h4>El campo <span class='text-danger'>TIPO DE TRABAJO</span>, no puede quedar vacío</h4>
                    `
                this.contenidoModal.appendChild(modal);

            } else if (!this.inputSalarioMensual.value) {
                this.contenidoModal.innerHTML = "";
                const modal = document.createElement('div');
                modal.innerHTML = `
                    <h2>ATENCIÓN</h2>
                    <h4>El campo <span class='text-danger'>SALARIO MENSUAL</span>, no puede quedar vacío</h4>
                    `
                this.contenidoModal.appendChild(modal);

            } else if (!this.inputSalarioDia.value) {
                this.contenidoModal.innerHTML = "";
                const modal = document.createElement('div');
                modal.innerHTML = `
                    <h2>ATENCIÓN</h2>
                    <h4>El campo <span class='text-danger'>SALARIO POR DÍA</span>, no puede quedar vacío</h4>
                    `
                this.contenidoModal.appendChild(modal);

            } else if (!this.inputDiasTrabajadosSemana.value) {
                this.contenidoModal.innerHTML = "";
                const modal = document.createElement('div');
                modal.innerHTML = `
                    <h2>ATENCIÓN</h2>
                    <h4>El campo <span class='text-danger'>DIAS A LA SEMANA TRABAJADOS</span>, no puede quedar vacío</h4>
                    `
                this.contenidoModal.appendChild(modal);

            } else if (!this.inputSalarioHora.value) {
                this.contenidoModal.innerHTML = "";
                const modal = document.createElement('div');
                modal.innerHTML = `
                    <h2>ATENCIÓN</h2>
                    <h4>El campo <span class='text-danger'>SALARIO POR HORA</span>, no puede quedar vacío</h4>
                    `
                this.contenidoModal.appendChild(modal);

            } else if (!this.inputHorasTrabajoDia.value) {
                this.contenidoModal.innerHTML = "";
                const modal = document.createElement('div');
                modal.innerHTML = `
                    <h2>ATENCIÓN</h2>
                    <h4>El campo <span class='text-danger'>HORAS TRABAJADAS POR SEMANA</span>, no puede quedar vacío</h4>
                    `
                this.contenidoModal.appendChild(modal);

            } else if (!this.inputAuxilioTransporte.value) {
                this.contenidoModal.innerHTML = "";
                const modal = document.createElement('div');
                modal.innerHTML = `
                    <h2>ATENCIÓN</h2>
                    <h4>El campo <span class='text-danger'>AUXILIO DE TRANSPORTE</span>, no puede quedar vacío</h4>
                    `
                this.contenidoModal.appendChild(modal);

            } else if (!this.inputOtrosPagos.value) {
                this.contenidoModal.innerHTML = "";
                const modal = document.createElement('div');
                modal.innerHTML = `
                <h2>ATENCIÓN</h2>
                    <h4>El campo <span class='text-danger'>OTROS PAGOS RECIBIDOS</span>, no puede quedar vacío</h4>
                    `
                this.contenidoModal.appendChild(modal);
            }
            else { this.ejecutar() };
        }
        )

    }


    sincLocalS() {
        localStorage.setItem('Liquidaciones', JSON.stringify(this.array));
    }

    misLiquidaciones() {
        this.botonLiquidaciones.addEventListener('click', () => {
            this.localIni();
            this.imprimir();
        })
    }

    // ESCUCHADORES LISTENERS

    ejecutar = () => {

        this.contenidoModal.innerHTML = "";

        // VARIABLES TIEMPO COMPLETO MES

        this.fechaInicio = this.inputFechaInicio.value
        this.fechaFin = this.inputFechaFin.value;
        this.tipoTrabajo = this.inputTipoTrabajo.value;

        this.salarioMensual = parseInt(this.inputSalarioMensual.value);

        this.salarioMensualFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.salarioMensual);

        this.salarioHora = parseInt(this.inputSalarioHora.value);
        this.salarioDia = parseInt(this.inputSalarioDia.value);

        this.otrosPagos = parseInt(this.inputOtrosPagos.value);
        this.otrosPagosFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.otrosPagos);

        this.deducciones = this.salarioMensual * 0.08;

        this.deduccionesFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.deducciones);

        this.salarioRecibidoMensual = this.salarioMensual - this.deducciones;
        this.salarioRecibidoMensualFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.salarioRecibidoMensual);

        this.auxilioTransporte = parseInt(this.inputAuxilioTransporte.value);

        this.auxilioTransporteFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.auxilioTransporte);

        const fechaInicioFormateada = new Date(this.fechaInicio);
        const inicioMilisegundos = fechaInicioFormateada.getTime();

        const fechaFinFormateada = new Date(this.fechaFin);
        const finMilisegundos = fechaFinFormateada.getTime();

        const totalMilisegundos = Math.abs(finMilisegundos - inicioMilisegundos);

        const milisegundosDia = 24 * 60 * 60 * 1000;

        this.diasLaborados = totalMilisegundos / milisegundosDia;

        const baseSalarial = salarioMensual + auxilioTransporte + otrosPagos;

        const diasVacaciones = this.diasLaborados / 720 * 15;

        const sumatoria = parseInt(this.inputOtrosPagos.value) + 1000;

        const salarioDiario = salarioMensual / 30;

        this.totalCesantias = Math.round((this.salarioMensual + this.auxilioTransporte + this.otrosPagos) * parseInt(this.diasLaborados) / 360);

        this.totalCesantiasFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalCesantias);

        this.totalInteresesCesantias = Math.round(((this.salarioMensual + this.auxilioTransporte) * this.diasLaborados / 360) * 0.12);

        this.totalInteresesCesantiasFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalInteresesCesantias);

        this.totalPrima = Math.round(((this.salarioMensual + this.auxilioTransporte + parseInt(this.inputOtrosPagos.value)) * this.diasLaborados / 360) / 2);

        this.totalPrimaFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrima);

        this.totalVacaciones = Math.round((this.salarioMensual * this.diasLaborados) / 720);

        this.totalVacacionesFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalVacaciones);

        this.totalLiquidacionMes = this.totalCesantias + this.totalInteresesCesantias + (this.totalPrima * 2) + this.totalVacaciones;

        this.totalLiquidacionMesFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalLiquidacionMes);


        //VARIABLES TRABAJO POR DÍA

        this.salarioPactadoDia = this.inputSalarioDia.value;
        this.salarioPactadoDiaFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.salarioPactadoDia);

        this.diasSemanaTrabajo = this.inputDiasTrabajadosSemana.value;
        this.semanasMes = 4.33;
        this.diasLaboradosMensualizados = parseInt(this.diasSemanaTrabajo) * this.semanasMes;
        this.salarioPromedioMensualDia = this.diasLaboradosMensualizados * this.salarioPactadoDia;
        this.mesesTrabajados = this.diasLaborados / 30;
        this.valorLiquidacionPrestacionesDia = (this.salarioPromedioMensualDia / 30) * 21;
        this.auxilioTransporteActualDiario = this.auxilioTransporte / 30;
        this.auxilioTransporteActualMensual = this.diasLaboradosMensualizados * this.auxilioTransporteActualDiario;
        this.salarioBaseLiquidacionDia = this.salarioPromedioMensualDia + this.auxilioTransporteActualMensual + this.otrosPagos;

        this.diasTrabajadosAnuales = this.diasLaboradosMensualizados * this.mesesTrabajados;

        this.deduccionesDia = this.valorLiquidacionPrestacionesDia * 0.08;

        this.deduccionesDiaFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.deduccionesDia);

        this.salarioMensualRecibidoDia = this.salarioPromedioMensualDia - this.deduccionesDia;

        this.salarioMensualRecibidoDiaFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.salarioMensualRecibidoDia);

        this.totalCesantiasDia = Math.round((this.salarioPromedioMensualDia * this.diasLaborados) / 360);

        this.totalCesantiasDiaFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalCesantiasDia);

        this.totalInteresesCesantiasDia = Math.round(((this.salarioPromedioMensualDia) * this.diasLaborados / 360) * 0.12);
        this.totalPrimaDia = Math.round(((this.salarioPromedioMensualDia * this.diasLaborados) / 360) / 2);
        this.totalPrimaDiaFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaDia);
        this.totalInteresesCesantiasDiaFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalInteresesCesantiasDia);
        this.totalVacacionesDia = Math.round((this.diasLaborados * this.salarioPromedioMensualDia) / 720);
        this.totalVacacionesDiaFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalVacacionesDia);

        this.totalLiquidacionDia = this.totalCesantiasDia + this.totalInteresesCesantiasDia + this.totalVacacionesDia + (this.totalPrimaDia * 2);

        this.totalLiquidacionDiaFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalLiquidacionDia);



        // VARIABLES POR HORA
        this.salarioPactadoHora = this.inputSalarioHora.value;
        this.horasTrabajadasSemana = this.inputHorasTrabajoDia.value;
        this.diasHora = parseInt(this.horasTrabajadasSemana) / 8;
        this.promedioSalarioHoraMensual = (this.salarioPactadoHora * this.horasTrabajadasSemana) * this.diasHora;
        this.promedioSalarioHoraMensualFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.promedioSalarioHoraMensual);
        this.baseSalarialLiquidacionSeguridadSocialHora = (this.promedioSalarioHoraMensual / 30) * 21;

        this.auxilioTransporteActualHoraDiario = this.auxilioTransporte / 30;

        this.promedioTransporteSemanal = this.auxilioTransporteActualHoraDiario * this.diasHora;

        this.promedioTransporteMensualHora = Math.round(this.promedioTransporteSemanal * 4.33);

        this.salarioPactadoHora = parseInt(this.inputSalarioHora.value);

        this.salarioPactadoHoraFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.salarioPactadoHora);

        this.promedioTransporteMensualHoraFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.promedioTransporteMensualHora);

        this.deduccionesHora = this.baseSalarialLiquidacionSeguridadSocialHora * 0.08;

        this.deduccionesHoraFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.deduccionesHora);

        this.totalCesantiasHora = Math.round((this.promedioSalarioHoraMensual * this.diasLaborados) / 360);


        this.totalCesantiasHoraFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalCesantiasHora);

        this.totalInteresesCesantiasHora = Math.round(((this.promedioSalarioHoraMensual) * this.diasLaborados / 360) * 0.12);

        this.totalInteresesCesantiasHoraFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.
            totalInteresesCesantiasHora);

        this.totalPrimaHora = Math.round(((this.promedioSalarioHoraMensual * this.diasLaborados) / 360) / 2);

        this.totalPrimaHoraFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaHora);

        this.totalVacacionesHora = Math.round((this.diasLaborados * this.promedioSalarioHoraMensual) / 720);

        this.totalVacacionesHoraFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalVacacionesHora);

        this.totalLiquidacionHora = this.totalCesantiasHora + this.totalInteresesCesantiasHora + (this.totalPrimaHora * 2) + this.totalVacacionesHora;

        this.totalLiquidacionHoraFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalLiquidacionHora);

        this.addArray();
    }

    addArray = () => {
        const addItem = new Items(this.fechaInicio, this.fechaFin, this.tipoTrabajo, this.otrosPagos, this.otrosPagosFormat, this.salarioMensual, this.salarioMensualFormat, this.id, this.diasLaborados, this.auxilioTransporte, this.auxilioTransporteFormat, this.deducciones, this.deduccionesFormat, this.salarioRecibidoMensual, this.salarioRecibidoMensualFormat, this.totalCesantias, this.totalCesantiasFormat, this.totalInteresesCesantias, this.totalInteresesCesantiasFormat, this.totalPrima, this.totalPrimaFormat, this.totalVacaciones, this.totalVacacionesFormat, this.totalLiquidacionMes, this.totalLiquidacionMesFormat, this.salarioPactadoDia, this.salarioPactadoDiaFormat, this.diasSemanaTrabajo, this.semanasMes, this.diasLaboradosMensualizados, this.salarioPromedioMensualDia, this.mesesTrabajados, this.valorLiquidacionPrestacionesDia, this.auxilioTransporteActualDiario, this.auxilioTransporteActualMensual, this.salarioBaseLiquidacionDia, this.diasTrabajadosAnuales, this.deduccionesDia, this.deduccionesDiaFormat, this.salarioMensualRecibidoDia, this.salarioMensualRecibidoDiaFormat, this.totalCesantiasDia, this.totalCesantiasDiaFormat, this.totalInteresesCesantiasDia, this.totalInteresesCesantiasDiaFormat, this.totalPrimaDia, this.totalPrimaDiaFormat, this.totalVacacionesDia, this.totalVacacionesDiaFormat, this.totalLiquidacionDia, this.totalLiquidacionDiaFormat, this.promedioSalarioHoraMensual, this.promedioSalarioHoraMensualFormat, this.promedioTransporteMensualHora, this.promedioTransporteMensualHoraFormat, this.salarioPactadoHoraFormat, this.deduccionesHora, this.deduccionesHoraFormat, this.totalCesantiasHora, this.totalCesantiasHoraFormat, this.totalInteresesCesantiasHora, this.totalInteresesCesantiasHoraFormat, this.totalPrimaHora, this.totalPrimaHoraFormat, this.totalVacacionesHora, this.totalVacacionesHoraFormat, this.totalLiquidacionHora, this.totalLiquidacionHoraFormat)

        this.array.push(addItem);

        this.sincLocalS();

        this.imprimir()
    }

    eliminarItem(e) {
        this.array = this.array.filter((item) => {
            return item.id !== e.target.dataset.id;
        })

        this.imprimir();
    }

    imprimir(myarray = this.array) {

        this.contenidoModal.innerHTML = "";

        if (this.tipoTrabajo === 'tiempo-completo') {

            this.array.forEach((item) => {

                this.contenidoModal.dataset.id = item.id;

                const modal = document.createElement('div');

                modal.innerHTML = `
                <section class="head-data">
                    <div>
                        <p class="head-data-title">Tus Resultados:</p>
                        <p class="head-data-subtitle">Ingreso Mensual</p>
                    </div>
                </section>
                <section class="form-container">
                    <h2 class="titulo-bloque mb-4">Información General</h2>
                    <div class="bloque-data">
                        <div>
                            <h3>Fecha Inicial</h3>
                            <h4>${item.fechaInicio}</h4>
                        </div>
                        <div>
                            <h3>Fecha Final</h3>
                            <h4>${item.fechaFin}</h4>
                        </div>
                    </div>
                    <div class="bloque-data">
                        <div>
                            <h3>Días Laborados</h3>
                            <h4>${item.diasLaborados}</h4>
                        </div>
                        <div>
                            <h3>Salario Mensual</h3>
                            <h4>${item.salarioMensualFormat}</h4>
                        </div>
                    </div>
                    <div class="bloque-data">
                        <div>
                            <h3>Auxilio de Transporte</h3>
                            <h4>${item.auxilioTransporteFormat}</h4>
                        </div>
                        <div>
                            <h3>Deducciones</h3>
                            <h4>${item.deduccionesFormat}</h4>
                        </div>
                    </div>
                    <div class="bloque-data">
                        <div>
                            <h3>Otros Pagos Recibidos</h3>
                            <h4>${item.otrosPagosFormat}</h4>
                        </div>
                        <div>
                            <h3>Salario Recibido</h3>
                            <h4>${item.salarioRecibidoMensualFormat}</h4>
                        </div>
                    </div>
                </section>
                <section class="form-container">
                    <h2 class="titulo-bloque">Tu Liquidación</h2>
                    <div class="resultados">
                        <h4>Cesantías:</h4>
                        <h4>${item.totalCesantiasFormat}</h4>
                    </div>
                    <div class="resultados">
                        <h4>Intereses Cesantías:</h4>
                        <h4>${item.totalInteresesCesantiasFormat}</h4>
                    </div>
                    <div class="resultados">
                        <h4>Prima Junio:</h4>
                        <h4>${item.totalPrimaFormat}</h4>
                    </div>
                    <div class="resultados">
                        <h4>Prima Diciembre:</h4>
                        <h4>${item.totalPrimaFormat}</h4>
                    </div>
                    <div class="resultados">
                        <h4>Vacaciones:</h4>
                        <h4>${item.totalVacacionesFormat}</h4>
                    </div>
                    <h2 class="titulo-total">Total: ${item.totalLiquidacionMesFormat}  *</h2>
                                
                    </section>
                    
                    <p class="texto-aclaracion">
                    *Los cálculos generados por esta calculadora, no compromenten a la Escuela Nacional Sindical; pues son meramente
                    informativos. </p>
                    `

                const botonEliminar = document.createElement('div');

                botonEliminar.innerHTML = `
                <button id="eliminarLiquidacion" class="btn btn-danger mb-5" data-id = ${item.id}>Eliminar Liquidación</button>
                `

                botonEliminar.addEventListener('click', (e) => { return this.eliminarItem(e) })

                this.contenidoModal.appendChild(modal);
                this.contenidoModal.appendChild(botonEliminar)
            })
        }

        if (this.tipoTrabajo === 'por-dias') {

            this.array.forEach((item) => {

                const modal = document.createElement('div');
                modal.innerHTML = `
            <section class="head-data">
                    <div>
                        <p class="head-data-title">Tus Resultados:</p>
                        <p class="head-data-subtitle">Trabajo por Días</p>
                    </div>
                </section>
                <section class="form-container">
                    <h2 class="titulo-bloque mb-4">Información General</h2>
                    <div class="bloque-data">
                        <div>
                            <h3>Fecha Inicial</h3>
                            <h4>${item.fechaInicio}</h4>
                        </div>
                        <div>
                            <h3>Fecha Final</h3>
                            <h4>${item.fechaFin}</h4>
                        </div>
                    </div>
                    <div class="bloque-data">
                        <div>
                            <h3>Días de Liquidación</h3>
                            <h4>${item.diasLaborados}</h4>
                        </div>
                        <div>
                            <h3>Salario Pactado Diario</h3>
                            <h4>${item.salarioPactadoDiaFormat}</h4>
                        </div>
                    </div>
                    <div class="bloque-data">
                        <div>
                            <h3>Auxilio de Transporte</h3>
                            <h4>${item.auxilioTransporteFormat}</h4>
                        </div>
                        <div>
                            <h3>Deducciones</h3>
                            <h4>${item.deduccionesDiaFormat}</h4>
                        </div>
                    </div>
                    <div class="bloque-data">
                        <div>
                            <h3>Otros Pagos</h3>
                            <h4>${item.otrosPagosFormat}</h4>
                        </div>
                        <div>
                            <h3>Salario Promedio Mensual </h3>
                            <h4>${item.salarioMensualRecibidoDiaFormat}</h4>
                        </div>
                    </div>
                </section>
                <section class="form-container">
                    <h2 class="titulo-bloque">Tu Liquidación</h2>
                    <div class="resultados">
                        <h4>Cesantías:</h4>
                        <h4>${item.totalCesantiasDiaFormat}</h4>
                    </div>
                    <div class="resultados">
                        <h4>Intereses Cesantías:</h4>
                        <h4>${item.totalInteresesCesantiasDiaFormat}</h4>
                    </div>
                    <div class="resultados">
                        <h4>Prima Junio:</h4>
                        <h4>${item.totalPrimaDiaFormat}</h4>
                    </div>
                    <div class="resultados">
                        <h4>Prima Diciembre:</h4>
                        <h4>${item.totalPrimaDiaFormat}</h4>
                    </div>
                    <div class="resultados">
                        <h4>Vacaciones:</h4>
                        <h4>${item.totalVacacionesDiaFormat}</h4>
                    </div>
                    <h2 class="titulo-total">Total: ${item.totalLiquidacionDiaFormat} *</h2>

                </section>

                <p class="texto-aclaracion">
                    *Los cálculos generados por esta calculadora, no compromenten a la Escuela Nacional Sindical; pues son meramente
                    informativos. </p>
                `

                const botonEliminar = document.createElement('div');

                botonEliminar.innerHTML = `
                <button id="eliminarLiquidacion" class="btn btn-danger mb-5" data-id = ${item.id}>Eliminar Liquidación</button>
                `

                botonEliminar.addEventListener('click', (e) => { return this.eliminarItem(e) })

                this.contenidoModal.appendChild(modal);
                this.contenidoModal.appendChild(botonEliminar)


            })
        }


        if (this.tipoTrabajo === 'por-horas') {

            this.array.forEach((item) => {

                const modal = document.createElement('div');
                modal.innerHTML = `
                <section class="head-data">
                    <div>
                        <p class="head-data-title">Tus Resultados:</p>
                        <p class="head-data-subtitle">Ingreso por Horas</p>
                    </div>
                </section>
                <section class="form-container">
                    <h2 class="titulo-bloque mb-4">Información General</h2>
                    <div class="bloque-data">
                        <div>
                            <h3>Fecha Inicial</h3>
                            <h4>${item.fechaInicio}</h4>
                        </div>
                        <div>
                            <h3>Fecha Final</h3>
                            <h4>${item.fechaFin}</h4>
                        </div>
                    </div>
                    <div class="bloque-data">
                        <div>
                            <h3>Días Laborados</h3>
                            <h4>${item.diasLaborados}</h4>
                        </div>
                        <div>
                            <h3>Promedio Mensual</h3>
                            <h4>${item.promedioSalarioHoraMensualFormat}</h4>
                        </div>
                    </div>
                    <div class="bloque-data">
                        <div>
                            <h3>Auxilio de Transporte</h3>
                            <h4>${item.promedioTransporteMensualHoraFormat}</h4>
                        </div>
                        <div>
                            <h3>Deducciones</h3>
                            <h4>${item.deduccionesHoraFormat}</h4>
                        </div>
                    </div>
                    <div class="bloque-data">
                        <div>
                            <h3>Otros Pagos</h3>
                            <h4>${item.otrosPagosFormat}</h4>
                        </div>
                        <div>
                            <h3>Salario Hora</h3>
                            <h4>${item.salarioPactadoHoraFormat}</h4>
                        </div>
                    </div>
                </section>

                <section class="form-container">
                    <h2 class="titulo-bloque">Tu Liquidación</h2>
                    <div class="resultados">
                        <h4>Cesantías:</h4>
                        <h4>${item.totalCesantiasHoraFormat}</h4>
                    </div>
                    <div class="resultados">
                        <h4>Intereses Cesantías:</h4>
                        <h4>${item.totalInteresesCesantiasHoraFormat}</h4>
                    </div>
                    <div class="resultados">
                        <h4>Prima Junio:</h4>
                        <h4>${item.totalPrimaHoraFormat}</h4>
                    </div>
                    <div class="resultados">
                        <h4>Prima Diciembre:</h4>
                        <h4>${item.totalPrimaHoraFormat}</h4>
                    </div>
                    <div class="resultados">
                        <h4>Vacaciones:</h4>
                        <h4>${item.totalVacacionesHoraFormat}</h4>
                    </div>
                    <h2 class="titulo-total">Total: ${item.totalLiquidacionHoraFormat} *</h2>
                    
                </section>

                <p class="texto-aclaracion">
                    *Los cálculos generados por esta calculadora, no compromenten a la Escuela Nacional Sindical; pues son meramente
                    informativos. </p>

                `
                const botonEliminar = document.createElement('div');

                botonEliminar.innerHTML = `
                <button id="eliminarLiquidacion" class="btn btn-danger mb-5" data-id = ${item.id}>Eliminar Liquidación</button>
                `

                botonEliminar.addEventListener('click', (e) => { return this.eliminarItem(e) })

                this.contenidoModal.appendChild(modal);
                this.contenidoModal.appendChild(botonEliminar)
            })

        }
        this.sincLocalS();
    }
}


const app = new App();