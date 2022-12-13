import { Items } from '../classes/Item.js'

class App {

    array = [];

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
    inputPrimaSi = document.querySelector('#primaSi');
    divPrima = document.querySelector('#divPrima')
    fechaButton = document.querySelector('#fechaButton');


    constructor() {
        this.selector();
        this.validacionPrima();
        this.validacion();
        this.localIni();
        this.misLiquidaciones();
    }


    localIni() { //REFACTORIZADO
        document.addEventListener('DOMContentLoaded', () => {
            this.array = JSON.parse(localStorage.getItem('Liquidaciones')) || [];
        })
    }

    selector() { // REFACTORIZADO

        this.inputTipoTrabajo.addEventListener('change', () => {
            if (this.inputTipoTrabajo.value === 'tiempo-compvaro') {
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


    validacionPrima() { // REFACTORIZADO

        this.inputFechaFin.addEventListener('change', () => {

            const inicial = new Date(this.inputFechaInicio.value);

            const inicialMes = inicial.getUTCMonth() + 1;

            let inicialDay = inicial.getUTCDate();

            const final = new Date(this.inputFechaFin.value);

            let finalDay = final.getUTCDate();

            const finalMes = final.getUTCMonth() + 1;

            const inicialYear = inicial.getUTCFullYear();

            const finalYear = final.getUTCFullYear();

            if (inicialDay == 31) inicialDay = 30;
            if (finalDay == 31) finalDay = 30;

            // console.log('INICIAL DAY', inicialDay)
            // console.log('FINAL DAY', finalDay)

            const days = (final.getUTCFullYear() - inicial.getUTCFullYear()) * 360
                + (final.getUTCMonth() - inicial.getUTCMonth()) * 30
                + ((final.getUTCDate() + 1) - inicial.getUTCDate());

            // console.log(parseFloat(parseFloat(days.toString())))










            let itemPrima = false;

            if (inicialMes <= 6 && finalMes > 6) {
                itemPrima = true;
            }
            if (inicialMes <= 6 && finalMes <= 6) {
                itemPrima = false;
            }
            if (inicialMes > 6 && finalMes > 6) {
                itemPrima = false;
            }
            this.activarPrima(itemPrima)
        })
        this.inputFechaInicio.addEventListener('click', () => {
            this.inputFechaFin.value = "";
        })
    }

    activarPrima(itemPrima) { // REFACTORIZADO

        if (itemPrima === true) {
            this.divPrima.className = 'd-block';
        } else {
            this.divPrima.className = 'd-none';
        }
    }

    validacion() { // REFACTORIZADO 

        botonCalcular.addEventListener('click', () => {

            const inicial = new Date(this.inputFechaInicio.value);
            const inicialMes = inicial.getMonth() + 1;

            const final = new Date(this.inputFechaFin.value);
            const finalMes = final.getMonth() + 1;

            const inicialYear = inicial.getUTCFullYear();
            const finalYear = final.getUTCFullYear();

            if (inicialYear != finalYear) {
                this.contenidoModal.innerHTML = "";
                const modal = document.createElement('div');
                modal.innerHTML = `
                    <h2>ATENCIÓN</h2>
                    <h4>Solo puedes hacer liquidaciones <span class='text-danger'>DEL MISMO AÑO</span>.  Para liquidar años diferentes, debes hacer <span class="text-danger">CADA UNA POR SEPARADO<span>.
                    `
                this.contenidoModal.appendChild(modal);
            }

            else if (!this.inputFechaInicio.value) {
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
                this.inputOtrosPagos.value = 0;
                this.imprimir();
            }
            else this.ejecutar()
        }
        )
    }

    sincLocalS() { // REFACTORIZADO
        localStorage.setItem('Liquidaciones', JSON.stringify(this.array));
    }

    misLiquidaciones() { // REFACTORIZADO
        this.botonLiquidaciones.addEventListener('click', () => {
            this.localIni();
            this.imprimir(this.array);
        })
    }

    ejecutar = () => {

        this.contenidoModal.innerHTML = "";

        // ---------------VARIABLES TIEMPO COMPLETO MES -----------------//

        this.fechaInicio = this.inputFechaInicio.value;

        this.fechaInicioDate = new Date(this.fechaInicio);

        this.fechaFin = this.inputFechaFin.value;

        this.fechaFinDate = new Date(this.fechaFin);

        this.fechaMitad = new Date('2022-07-01');

        this.fechaContable = this.day360(this.fechaInicio, this.fechaFin);

        this.tipoTrabajo = this.inputTipoTrabajo.value;

        this.primaSi = this.inputPrimaSi.checked;

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

        this.diasLaborados = this.fechaContable;

        this.totalCesantias = Math.round((
            this.salarioMensual
            + this.auxilioTransporte
            + this.otrosPagos)
            * parseInt(this.diasLaborados) / 360);

        this.totalCesantiasFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalCesantias);

        this.totalInteresesCesantias = Math.round(((this.salarioMensual + this.auxilioTransporte) * this.diasLaborados / 360) * 0.12);

        this.totalInteresesCesantiasFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalInteresesCesantias);

        this.totalPrimaJunio = Math.round(((
            this.salarioMensual
            + this.auxilioTransporte
            + parseInt(this.inputOtrosPagos.value))
            * this.diasLaborados / 360)
            / 2);

        this.totalPrimaDiciembre = Math.round(((
            this.salarioMensual
            + this.auxilioTransporte
            + parseInt(this.inputOtrosPagos.value))
            * this.diasLaborados / 360)
            / 2);

        this.totalPrimaJunioFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaJunio);

        this.totalPrimaDiciembreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaDiciembre);

        this.totalVacaciones = Math.round((this.salarioMensual * this.diasLaborados) / 720);

        this.totalVacacionesFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalVacaciones);

        this.totalLiquidacionMes = this.totalCesantias
            + this.totalInteresesCesantias
            + this.totalPrimaJunio
            + this.totalPrimaDiciembre
            + this.totalVacaciones;

        this.totalLiquidacionMesFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalLiquidacionMes);



        // ---------------VARIABLES TRABAJO POR DÍAS -----------------//

        this.salarioPactadoDia = this.inputSalarioDia.value;
        this.salarioPactadoDiaFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.salarioPactadoDia);

        this.diasSemanaTrabajo = this.inputDiasTrabajadosSemana.value;
        this.semanasMes = 4.33;
        this.diasLaboradosMensualizados = parseInt(this.diasSemanaTrabajo) * this.semanasMes;

        this.salarioPromedioMensualDia = this.diasLaboradosMensualizados * this.salarioPactadoDia;

        this.mesesTrabajados = this.diasLaborados / 30;
        this.valorLiquidacionPrestacionesDia = (this.salarioPromedioMensualDia / 30) * 21;
        this.auxilioTransporteActualDiario = this.auxilioTransporte / 30;

        this.auxilioTransporteActualMensual = Math.round(this.diasLaboradosMensualizados * this.auxilioTransporteActualDiario);

        this.auxilioTransporteActualMensualFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.auxilioTransporteActualMensual);

        this.salarioBaseLiquidacionDia = this.salarioPromedioMensualDia + this.auxilioTransporteActualMensual + this.otrosPagos;

        this.diasTrabajadosAnuales = this.diasLaboradosMensualizados * this.mesesTrabajados;

        this.deduccionesDia = Math.round(this.valorLiquidacionPrestacionesDia * 0.08);

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


        // ---------------VARIABLES TRABAJO POR HORAS -----------------//

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



        // --------------- PONDERACIÓN DE PRIMA -----------------//


        let sistemaLiquidacion;

        if (this.fechaInicioDate <= this.fechaMitad && this.fechaFinDate <= this.fechaMitad) {
            this.sistemaLiquidacion = 'Primer Semestre';

            this.diasPrimerSemestre = this.day360(this.fechaInicio, this.fechaFin);

            this.totalPrimaMesPrimerSemestre =
                Math.round((
                    this.salarioMensual
                    + this.auxilioTransporte
                    + this.otrosPagos)
                    * parseInt(this.diasPrimerSemestre) / 360);


            this.totalPrimaMesPrimerSemestreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaMesPrimerSemestre);

            this.totalPrimaDiaPrimerSemestre =
                Math.round((this.salarioPromedioMensualDia * this.diasPrimerSemestre) / 360)

            this.totalPrimaDiaPrimerSemestreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaDiaPrimerSemestre);

            this.totalLiquidacionDia =
                this.totalCesantiasDia
                + this.totalInteresesCesantiasDia
                + this.totalVacacionesDia
                + this.totalPrimaDiaPrimerSemestre

            this.totalLiquidacionDiaFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalLiquidacionDia);

            this.totalPrimaHoraPrimerSemestre =
                Math.round((
                    this.promedioSalarioHoraMensual
                    * this.diasPrimerSemestre)
                    / 360);

            this.totalPrimaHoraPrimerSemestreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaHoraPrimerSemestre);

            this.totalLiquidacionHora =
                this.totalCesantiasHora
                + this.totalInteresesCesantiasHora
                + this.totalVacacionesHora
                + this.totalPrimaHoraPrimerSemestre;

            this.totalLiquidacionHoraFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalLiquidacionHora);



        } if (this.fechaInicioDate >= this.fechaMitad && this.fechaInicioDate >= this.fechaMitad) {
            this.sistemaLiquidacion = 'Segundo Semestre';

            this.diasSegundoSemestre = this.day360(this.fechaInicio, this.fechaFin)

            this.totalPrimaMesSegundoSemestre =
                Math.round((
                    this.salarioMensual
                    + this.auxilioTransporte
                    + this.otrosPagos)
                    * parseInt(this.diasSegundoSemestre) / 360);


            this.totalPrimaMesSegundoSemestreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaMesSegundoSemestre);

            this.totalPrimaDiaSegundoSemestre =
                Math.round((this.salarioPromedioMensualDia * this.diasSegundoSemestre) / 360)


            this.totalPrimaDiaSegundoSemestreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaDiaSegundoSemestre);

            this.totalLiquidacionDia =
                this.totalCesantiasDia
                + this.totalInteresesCesantiasDia
                + this.totalVacacionesDia
                + this.totalPrimaDiaSegundoSemestre

            this.totalLiquidacionDiaFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalLiquidacionDia);

            this.totalPrimaHoraSegundoSemestre =
                Math.round((
                    this.promedioSalarioHoraMensual
                    * this.diasSegundoSemestre)
                    / 360);

            this.totalPrimaHoraSegundoSemestreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaHoraSegundoSemestre);

            this.totalLiquidacionHora =
                this.totalCesantiasHora
                + this.totalInteresesCesantiasHora
                + this.totalVacacionesHora
                + this.totalPrimaHoraSegundoSemestre;

            this.totalLiquidacionHoraFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalLiquidacionHora);


        } else if (this.fechaInicioDate <= this.fechaMitad && this.fechaFinDate > this.fechaMitad) {


            this.sistemaLiquidacion = 'Sistema Múltiple';

            this.diasPrimerSemestre = this.day360(this.fechaInicio, this.fechaMitad);
            this.diasSegundoSemestre = this.day360(this.fechaMitad, this.fechaFin)


            this.totalPrimaMesPrimerSemestre =
                Math.round((
                    this.salarioMensual
                    + this.auxilioTransporte
                    + this.otrosPagos)
                    * parseInt(this.diasPrimerSemestre) / 360);

            this.totalPrimaMesSegundoSemestre =
                Math.round((
                    this.salarioMensual
                    + this.auxilioTransporte
                    + this.otrosPagos)
                    * parseInt(this.diasSegundoSemestre) / 360);


            this.totalPrimaMesPrimerSemestreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaMesPrimerSemestre);

            this.totalPrimaMesSegundoSemestreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaMesSegundoSemestre);


            this.totalPrimaDiaPrimerSemestre =
                Math.round((this.salarioPromedioMensualDia * this.diasPrimerSemestre) / 360)


            this.totalPrimaDiaPrimerSemestreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaDiaPrimerSemestre);

            this.totalPrimaDiaSegundoSemestre =
                Math.round((this.salarioPromedioMensualDia * this.diasSegundoSemestre) / 360)


            this.totalPrimaDiaSegundoSemestreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaDiaSegundoSemestre);

            this.totalLiquidacionDia =
                this.totalCesantiasDia
                + this.totalInteresesCesantiasDia
                + this.totalVacacionesDia
                + this.totalPrimaDiaPrimerSemestre
                + this.totalPrimaDiaSegundoSemestre

            this.totalLiquidacionDiaFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalLiquidacionDia);



            this.totalPrimaHoraPrimerSemestre =
                Math.round((
                    this.promedioSalarioHoraMensual
                    * this.diasPrimerSemestre)
                    / 360);

            this.totalPrimaHoraPrimerSemestreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaHoraPrimerSemestre);


            this.totalPrimaHoraSegundoSemestre =
                Math.round((
                    this.promedioSalarioHoraMensual
                    * this.diasSegundoSemestre)
                    / 360);

            this.totalPrimaHoraSegundoSemestreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalPrimaHoraSegundoSemestre);

            this.totalLiquidacionHora =
                this.totalCesantiasHora
                + this.totalInteresesCesantiasHora
                + this.totalVacacionesHora
                + this.totalPrimaHoraPrimerSemestre
                + this.totalPrimaHoraSegundoSemestre;

            this.totalLiquidacionHoraFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(this.totalLiquidacionHora);

        }



        this.addArray();
    }

    addArray = () => {
        const addItem = new Items(this.fechaInicio, this.fechaFin, this.tipoTrabajo, this.otrosPagos, this.otrosPagosFormat, this.salarioMensual, this.salarioMensualFormat, this.id, this.diasLaborados, this.primaSi, this.auxilioTransporte, this.auxilioTransporteFormat, this.deducciones, this.deduccionesFormat, this.salarioRecibidoMensual, this.salarioRecibidoMensualFormat, this.totalCesantias, this.totalCesantiasFormat, this.totalInteresesCesantias, this.totalInteresesCesantiasFormat, this.totalPrima, this.totalPrimaFormat, this.totalVacaciones, this.totalVacacionesFormat, this.totalLiquidacionMes, this.totalLiquidacionMesFormat, this.salarioPactadoDia, this.salarioPactadoDiaFormat, this.diasSemanaTrabajo, this.semanasMes, this.diasLaboradosMensualizados, this.salarioPromedioMensualDia, this.mesesTrabajados, this.valorLiquidacionPrestacionesDia, this.auxilioTransporteActualDiario, this.auxilioTransporteActualMensualFormat, this.auxilioTransporteActualMensual, this.salarioBaseLiquidacionDia, this.diasTrabajadosAnuales, this.deduccionesDia, this.deduccionesDiaFormat, this.salarioMensualRecibidoDia, this.salarioMensualRecibidoDiaFormat, this.totalCesantiasDia, this.totalCesantiasDiaFormat, this.totalInteresesCesantiasDia, this.totalInteresesCesantiasDiaFormat, this.totalPrimaDia, this.totalPrimaDiaFormat, this.totalVacacionesDia, this.totalVacacionesDiaFormat, this.totalLiquidacionDia, this.totalLiquidacionDiaFormat, this.promedioSalarioHoraMensual, this.promedioSalarioHoraMensualFormat, this.promedioTransporteMensualHora, this.promedioTransporteMensualHoraFormat, this.salarioPactadoHoraFormat, this.deduccionesHora, this.deduccionesHoraFormat, this.totalCesantiasHora, this.totalCesantiasHoraFormat, this.totalInteresesCesantiasHora, this.totalInteresesCesantiasHoraFormat, this.totalPrimaHora, this.totalPrimaHoraFormat, this.totalVacacionesHora, this.totalVacacionesHoraFormat, this.totalLiquidacionHora, this.totalLiquidacionHoraFormat, this.totalPrimaJunioFormat, this.totalPrimaDiciembreFormat, this.sistemaLiquidacion, this.totalPrimaMesPrimerSemestreFormat,
            this.totalPrimaMesSegundoSemestreFormat,
            this.totalPrimaMesPrimerSemestre, this.totalPrimaMesSegundoSemestre, this.totalPrimaDiaPrimerSemestreFormat, this.totalPrimaDiaSegundoSemestreFormat, this.totalPrimaDiaSegundoSemestre, this.totalPrimaHoraPrimerSemestreFormat, this.totalPrimaHoraPrimerSemestre, this.totalPrimaHoraSegundoSemestre, this.totalPrimaHoraSegundoSemestreFormat)

        this.array.push(addItem);

        this.sincLocalS();

        this.imprimir()
    }

    eliminarItem(e) {
        alert('Registro Eliminado');
        this.array = this.array.filter((item) => {
            return item.id !== e.target.dataset.id;
        })
        this.sincLocalS();
        this.imprimir();
    }

    imprimir(myarray = this.array) {

        this.contenidoModal.innerHTML = "";

        this.array.forEach((item) => {


            if (item.tipoTrabajo === 'tiempo-completo') {
                this.contenidoModal.dataset.id = item.id;
                const modal = document.createElement('div');

                modal.innerHTML = `
                        <section class="head-data">
                            <div>
                                <p class="head-data-title">Liquidación:</p>
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
                                    <h3>Seguridad Social</h3>
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
                            `

                if (item.sistemaLiquidacion === "Primer Semestre") {

                    const infoPrimaMesPrimerSemestre = document.createElement('div');

                    infoPrimaMesPrimerSemestre.innerHTML =
                        `
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
                                <h4>Vacaciones:</h4>
                                <h4>${item.totalVacacionesFormat}</h4>
                            </div>

                            <div class="resultados" id="divPrimaPrimerSemestre">
                            <h4>Prima Primer Semestre:</h4>
                        <h4>${item.totalPrimaMesPrimerSemestreFormat}</h4></div>
                            
                            <div class="resultados" id="divPrimaSegundoSemestre"></div>

                            <h2 class="titulo-total">Total: ${item.totalLiquidacionMesFormat}  *</h2>
                                        
                            </section>
                            
                            <p class="texto-aclaracion">
                            *Los cálculos generados por esta calculadora, no compromenten a la Escuela Nacional Sindical; pues son meramente
                            informativos. </p>
                        `

                    modal.append(infoPrimaMesPrimerSemestre)
                }

                else if (item.sistemaLiquidacion === "Segundo Semestre") {

                    const infoPrimaMesPrimerSemestre = document.createElement('div');

                    infoPrimaMesPrimerSemestre.innerHTML =
                        `
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
                                <h4>Vacaciones:</h4>
                                <h4>${item.totalVacacionesFormat}</h4>
                            </div>

                            <div class="resultados" id="divPrimaPrimerSemestre">
                            <h4>Prima Segundo Semestre:</h4>
                        <h4>${item.totalPrimaMesSegundoSemestreFormat}</h4></div>
                            
                            <div class="resultados" id="divPrimaSegundoSemestre"></div>

                            <h2 class="titulo-total">Total: ${item.totalLiquidacionMesFormat}  *</h2>
                                        
                            </section>
                            
                            <p class="texto-aclaracion">
                            *Los cálculos generados por esta calculadora, no compromenten a la Escuela Nacional Sindical; pues son meramente
                            informativos. </p>
                        `
                    modal.append(infoPrimaMesPrimerSemestre)
                }

                else if (item.sistemaLiquidacion === "Sistema Múltiple") {

                    const infoPrimaMesPrimerSemestre = document.createElement('div');

                    if (this.inputPrimaSi.checked === true) {

                        item.totalPrimaMesPrimerSemestre = 0;

                        item.totalPrimaMesPrimerSemestreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(item.totalPrimaMesPrimerSemestre);

                        item.totalLiquidacionMes =
                            item.totalCesantias
                            + item.totalInteresesCesantias
                            + item.totalPrimaMesSegundoSemestre
                            + item.totalVacaciones
                            + item.totalPrimaMesPrimerSemestre;

                        item.totalLiquidacionMesFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(item.totalLiquidacionMes);

                        infoPrimaMesPrimerSemestre.innerHTML =
                            `
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
                                <h4>Vacaciones:</h4>
                                <h4>${item.totalVacacionesFormat}</h4>
                            </div>

                            <div class="resultados" id="divPrimaPrimerSemestre">
                            <h4>Prima Primer Semestre:</h4>
                            <h4>${item.totalPrimaMesPrimerSemestreFormat}</h4></div>
                            
                            <div class="resultados" id="divPrimaSegundoSemestre">
                            <h4>Prima Segundo Semestre:</h4>
                            <h4>${item.totalPrimaMesSegundoSemestreFormat}</h4></div>

                            <h2 class="titulo-total">Total: ${item.totalLiquidacionMesFormat}  *</h2>
                                        
                            </section>
                            
                            <p class="texto-aclaracion">
                            *Los cálculos generados por esta calculadora, no compromenten a la Escuela Nacional Sindical; pues son meramente
                            informativos. </p>
                        `


                        modal.append(infoPrimaMesPrimerSemestre);


                    } else {
                        item.totalLiquidacionMes =
                            item.totalCesantias
                            + item.totalInteresesCesantias
                            + item.totalPrimaMesPrimerSemestre
                            + item.totalPrimaMesSegundoSemestre
                            + item.totalVacaciones;

                        item.totalLiquidacionMesFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(item.totalLiquidacionMes);

                        infoPrimaMesPrimerSemestre.innerHTML =
                            `
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
                                <h4>Vacaciones:</h4>
                                <h4>${item.totalVacacionesFormat}</h4>
                            </div>

                            <div class="resultados" id="divPrimaPrimerSemestre">
                            <h4>Prima Primer Semestre:</h4>
                            <h4>${item.totalPrimaMesPrimerSemestreFormat}</h4></div>
                            
                            <div class="resultados" id="divPrimaSegundoSemestre">
                            <h4>Prima Segundo Semestre:</h4>
                            <h4>${item.totalPrimaMesSegundoSemestreFormat}</h4></div>

                            <h2 class="titulo-total">Total: ${item.totalLiquidacionMesFormat}  *</h2>
                                        
                            </section>
                            
                            <p class="texto-aclaracion">
                            *Los cálculos generados por esta calculadora, no compromenten a la Escuela Nacional Sindical; pues son meramente
                            informativos. </p>
                        `


                        modal.append(infoPrimaMesPrimerSemestre);

                    }
                }

                this.sincLocalS();

                const botonEliminar = document.createElement('div');

                botonEliminar.innerHTML = `
                <button id="eliminarLiquidacion" class="btn btn-danger mb-5" data-id = ${item.id}>Eliminar Liquidación</button>
                `

                botonEliminar.addEventListener('click', (e) => { return this.eliminarItem(e) })

                this.contenidoModal.appendChild(modal);
                this.contenidoModal.appendChild(botonEliminar)

            }

            if (item.tipoTrabajo === 'por-dias') {
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
                                    <h4>${item.auxilioTransporteActualMensualFormat}</h4>
                                </div>
                                <div>
                                    <h3>Seguridad Social</h3>
                                    <h4>${item.deduccionesDiaFormat}</h4>
                                </div>
                            </div>
                            <div class="bloque-data">
                                <div>
                                    <h3>Otros Pagos</h3>
                                    <h4>${item.otrosPagosFormat}</h4>
                                </div>
                                <div>
                                    <h3>Salario Promedio Mes </h3>
                                    <h4>${item.salarioMensualRecibidoDiaFormat}</h4>
                                </div>
                            </div>
                        </section>
                        `

                if (item.sistemaLiquidacion === "Primer Semestre") {

                    const infoPrimaMesPrimerSemestre = document.createElement('div');

                    infoPrimaMesPrimerSemestre.innerHTML =
                        `
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
                                <h4>Vacaciones:</h4>
                                <h4>${item.totalVacacionesDiaFormat}</h4>
                            </div>

                            <div class="resultados" id="divPrimaPrimerSemestre">
                            <h4>Prima Primer Semestre:</h4>
                        <h4>${item.totalPrimaDiaPrimerSemestreFormat}</h4></div>
                            
                            <div class="resultados" id="divPrimaSegundoSemestre"></div>

                            <h2 class="titulo-total">Total: ${item.totalLiquidacionDiaFormat}  *</h2>
                                        
                            </section>
                            
                            <p class="texto-aclaracion">
                            *Los cálculos generados por esta calculadora, no compromenten a la Escuela Nacional Sindical; pues son meramente
                            informativos. </p>
                        `
                    modal.append(infoPrimaMesPrimerSemestre)
                }

                if (item.sistemaLiquidacion === "Segundo Semestre") {

                    const infoPrimaMesPrimerSemestre = document.createElement('div');

                    infoPrimaMesPrimerSemestre.innerHTML =
                        `
                        <section class="form-container">
                            <h2 class="titulo-bloque">Tu Liquidación</h2>
                            <div class="resultados">
                                <h4>Cesantías:</h4>
                                <h4>${item.totalCesantiasDiaFormat}</h4>
                            </div>
                            <div class="resultados">
                                <h4>Intereses Cesantías:</h4>
                                <h4>${item.totalInteresesCesantiasDia}</h4>
                            </div>

                            <div class="resultados">
                                <h4>Vacaciones:</h4>
                                <h4>${item.totalVacacionesDiaFormat}</h4>
                            </div>

                            <div class="resultados" id="divPrimaPrimerSemestre">
                            <h4>Prima Segundo Semestre:</h4>
                        <h4>${item.totalPrimaDiaSegundoSemestreFormat}</h4></div>
                            
                            <div class="resultados" id="divPrimaSegundoSemestre"></div>

                            <h2 class="titulo-total">Total: ${item.totalLiquidacionDiaFormat}  *</h2>
                                        
                            </section>
                            
                            <p class="texto-aclaracion">
                            *Los cálculos generados por esta calculadora, no compromenten a la Escuela Nacional Sindical; pues son meramente
                            informativos. </p>
                        `
                    modal.append(infoPrimaMesPrimerSemestre)
                }

                if (item.sistemaLiquidacion === "Sistema Múltiple") {

                    const infoPrimaMesPrimerSemestre = document.createElement('div');

                    if (this.inputPrimaSi.checked) {
                        item.totalPrimaDiaPrimerSemestre = 0;

                        item.totalPrimaDiaPrimerSemestreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(item.totalPrimaDiaPrimerSemestre);

                        item.totalLiquidacionDia =
                            item.totalCesantiasDia
                            + item.totalInteresesCesantiasDia
                            + item.totalPrimaDiaSegundoSemestre
                            + item.totalVacacionesDia;


                        item.totalLiquidacionDiaFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(item.totalLiquidacionDia);

                        console.log(item.totalLiquidacionDia)
                    }


                    infoPrimaMesPrimerSemestre.innerHTML =
                        `
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
                                <h4>Vacaciones:</h4>
                                <h4>${item.totalVacacionesDiaFormat}</h4>
                            </div>

                            <div class="resultados" id="divPrimaPrimerSemestre">
                            <h4>Prima Primer Semestre:</h4>
                            <h4>${item.totalPrimaDiaPrimerSemestreFormat}</h4></div>
                            
                            <div class="resultados" id="divPrimaSegundoSemestre">
                            <h4>Prima Segundo Semestre:</h4>
                            <h4>${item.totalPrimaDiaSegundoSemestreFormat}</h4></div>

                            <h2 class="titulo-total">Total: ${item.totalLiquidacionDiaFormat}  *</h2>
                                        
                            </section>
                            
                            <p class="texto-aclaracion">
                            *Los cálculos generados por esta calculadora, no compromenten a la Escuela Nacional Sindical; pues son meramente
                            informativos. </p>
                        `
                    modal.append(infoPrimaMesPrimerSemestre)
                }


                const botonEliminar = document.createElement('div');

                botonEliminar.innerHTML = `
                <button id="eliminarLiquidacion" class="btn btn-danger mb-5" data-id = ${item.id}>Eliminar Liquidación</button>
                `

                botonEliminar.addEventListener('click', (e) => { return this.eliminarItem(e) })

                this.contenidoModal.appendChild(modal);
                this.contenidoModal.appendChild(botonEliminar)
            }


            if (item.tipoTrabajo === 'por-horas') {
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
                                    <h3>Seguridad Social</h3>
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
                        `

                if (item.sistemaLiquidacion === "Primer Semestre") {

                    const infoPrimaMesPrimerSemestre = document.createElement('div');

                    infoPrimaMesPrimerSemestre.innerHTML =
                        `
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
                                <h4>Vacaciones:</h4>
                                <h4>${item.totalVacacionesHoraFormat}</h4>
                            </div>

                            <div class="resultados" id="divPrimaPrimerSemestre">
                            <h4>Prima Primer Semestre:</h4>
                        <h4>${item.totalPrimaHoraPrimerSemestreFormat}</h4></div>
                            
                            <div class="resultados" id="divPrimaSegundoSemestre"></div>

                            <h2 class="titulo-total">Total: ${item.totalLiquidacionHoraFormat}  *</h2>
                                        
                            </section>
                            
                            <p class="texto-aclaracion">
                            *Los cálculos generados por esta calculadora, no compromenten a la Escuela Nacional Sindical; pues son meramente
                            informativos. </p>
                        `
                    modal.append(infoPrimaMesPrimerSemestre)
                }

                if (item.sistemaLiquidacion === "Segundo Semestre") {

                    const infoPrimaMesPrimerSemestre = document.createElement('div');

                    infoPrimaMesPrimerSemestre.innerHTML =
                        `
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
                                <h4>Vacaciones:</h4>
                                <h4>${item.totalVacacionesHoraFormat}</h4>
                            </div>

                            <div class="resultados" id="divPrimaPrimerSemestre">
                            <h4>Prima Segundo Semestre:</h4>
                        <h4>${item.totalPrimaHoraSegundoSemestreFormat}</h4></div>
                            
                            <div class="resultados" id="divPrimaSegundoSemestre"></div>

                            <h2 class="titulo-total">Total: ${item.totalLiquidacionHoraFormat}  *</h2>
                                        
                            </section>
                            
                            <p class="texto-aclaracion">
                            *Los cálculos generados por esta calculadora, no compromenten a la Escuela Nacional Sindical; pues son meramente
                            informativos. </p>
                        `
                    modal.append(infoPrimaMesPrimerSemestre)
                }

                if (item.sistemaLiquidacion === "Sistema Múltiple") {

                    const infoPrimaMesPrimerSemestre = document.createElement('div');


                    if (this.inputPrimaSi.checked) {
                        item.totalPrimaHoraPrimerSemestre = 0;

                        item.totalPrimaHoraPrimerSemestreFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(item.totalPrimaHoraPrimerSemestre);

                        item.totalLiquidacionHora =
                            item.totalCesantiasHora
                            + item.totalInteresesCesantiasHora
                            + item.totalPrimaHoraSegundoSemestre
                            + item.totalVacacionesHora;


                        item.totalLiquidacionHoraFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(item.totalLiquidacionHora);

                    }



                    infoPrimaMesPrimerSemestre.innerHTML =
                        `
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
                                <h4>Vacaciones:</h4>
                                <h4>${item.totalVacacionesHoraFormat}</h4>
                            </div>

                            <div class="resultados" id="divPrimaPrimerSemestre">
                            <h4>Prima Primer Semestre:</h4>
                            <h4>${item.totalPrimaHoraPrimerSemestreFormat}</h4></div>
                            
                            <div class="resultados" id="divPrimaSegundoSemestre">
                            <h4>Prima Segundo Semestre:</h4>
                            <h4>${item.totalPrimaHoraSegundoSemestreFormat}</h4></div>

                            <h2 class="titulo-total">Total: ${item.totalLiquidacionHoraFormat}  *</h2>
                                        
                            </section>
                            
                            <p class="texto-aclaracion">
                            *Los cálculos generados por esta calculadora, no compromenten a la Escuela Nacional Sindical; pues son meramente
                            informativos. </p>
                        `
                    modal.append(infoPrimaMesPrimerSemestre)
                }

                const botonEliminar = document.createElement('div');

                botonEliminar.innerHTML = `
                <button id="eliminarLiquidacion" class="btn btn-danger mb-5" data-id = ${item.id}>Eliminar Liquidación</button>
                `

                botonEliminar.addEventListener('click', (e) => { return this.eliminarItem(e) })

                this.contenidoModal.appendChild(modal);
                this.contenidoModal.appendChild(botonEliminar)
            }
        })
    }

    day360(sd, fd, m) {
        var fechaInicial = new Date(sd);
        var fechaFinal = new Date(fd);

        var method = m || false;

        // EXTRAER AÑOS
        var anoInicial = fechaInicial.getUTCFullYear();
        //console.log('AÑO INICIAL:', anoInicial)

        var anoFinal = fechaFinal.getUTCFullYear();
        //console.log('AÑO FINAL:', anoFinal)

        var anos = 0;

        //EXTRAER MESES
        var mesInicial = fechaInicial.getUTCMonth();
        //console.log('MES INICIAL:', mesInicial)

        var mesFinal = fechaFinal.getUTCMonth();
        //console.log('MES FINAL:', mesFinal)

        var meses = 0;

        //EXTRAER DÍAS
        var diaInicial = fechaInicial.getUTCDate();
        //console.log('DÍA INICIAL:', diaInicial)
        var diaFinal = fechaFinal.getUTCDate();



        var dias = 0;


        if (mesInicial == 1) {
            if (diaInicial == 1) {
                if (mesFinal == 1) {
                    console.log(diaFinal)
                    if (diaFinal == 28) {
                        diaFinal = fechaFinal.getUTCDate() + 3;
                        console.log(diaFinal)

                    }
                }
            }

        } else {
            console.log('ESTE ES EL ELSE')

        }

        // ---------------------------------------////

        // CONDICIONALES

        if (method) {
            // euro
            if (diaInicial == 31) diaInicial = 30;
            if (diaFinal == 31) diaFinal = 30;
        } else {
            // american NASD
            if (diaInicial == 31) {
                diaInicial = 30
            }

            //var diaFinal = fechaFinal.getUTCDate();

            if (diaFinal == 31) {
                console.log('ENTRA EN IF DIA FINAL')
                if (diaInicial < 30) {
                    if (mesFinal == 11) {
                        anoFinal = anoFinal + 1;
                        diaFinal = 0;
                        diaFinal = 1;
                    } else {
                        mesFinal = mesFinal + 1;
                        diaFinal = 1;
                    }
                } else {
                    diaFinal = 30;
                }
            }
        }
        anos = anoFinal - anoInicial;

        meses = mesFinal - mesInicial;
        dias = (diaFinal - diaInicial);



        //this.fechaContable = (parseFloat(dy * 360 + dm * 30 + dd));
        // OJOOOOOOOOOOOOOOOO CON ESE +1 ////////////
        return (parseFloat(anos * 360 + meses * 30 + dias))
    }







}


const app = new App();