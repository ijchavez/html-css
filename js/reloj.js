const mostrarReloj = () => {
    let fecha = new Date();
    let hora = formatoHora(fecha.getHours());
    let min = formatoHora(fecha.getMinutes());
    let seg = formatoHora(fecha.getSeconds());
    document.getElementById('hora').innerHTML = `${hora}:${min}:${seg}`;

    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov', 'Dec'];
    const dias = ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'];
    let diaSemana = dias[fecha.getDay()];
    let dia = formatoHora(fecha.getDate());
    let mesActual = meses[fecha.getMonth()];
    let anio = fecha.getFullYear();
    let fechaTexto = ` ${diaSemana}, ${dia} ${mesActual} ${anio}`;
    document.getElementById('fecha').innerHTML = fechaTexto;

}
formatoHora = (hora) => {
    if(hora < 10){
        hora = '0' + hora;

    }
    return hora;

}

setInterval(mostrarReloj,1000);