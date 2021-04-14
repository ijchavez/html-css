function animarAvatar(){
    let unId = 'avatar';
    let unaClase = 'avatar-animado';
    document.getElementById(unId).classList.toggle(unaClase);

}
setInterval(animarAvatar,1000);