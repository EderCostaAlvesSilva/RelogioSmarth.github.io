//selecionando elementos
//relogios
let RHora = document.querySelector('#Rhora');
let RMinutos = document.querySelector('#Rminutos');
let RSegundos = document.querySelector('#Rsegundos');

//relogio smart
let SmartHora = document.querySelector('#SmartHora');
let SmartMinutos = document.querySelector('#SmartMinutos');
let SmartSegundos = document.querySelector('#SmartSegundos');

let InputSemana = document.querySelector('#semana');
let InputDataAtual = document.querySelector('#dataAtual');
let InputCidade = document.querySelector('#cidade');
let InputTemperatura = document.querySelector('#temperatura');
let InputChover = document.querySelector('#chover');

function pegarHora(){
    let Hora_data = new Date();
    let h = new String(Hora_data.getHours());
    let m = new String(Hora_data.getMinutes());
    let s = new String(Hora_data.getSeconds());

    if(h.length == 1){
        h = '0'+h;
    }
    if(m.length == 1){
        m = '0'+m;
    }
    if(s.length == 1){
        s = '0'+s;
    }
  
    RHora.innerHTML = h;
    RMinutos.innerHTML = m;
    RSegundos.innerHTML = s;
    SmartHora.innerHTML = h;
    SmartMinutos.innerHTML = m;
    SmartSegundos.innerHTML = s;
        

    setInterval("pegarHora()", 1000);
}

let DiaAtual = new Date();

function pegarData(){
    let dia = String(DiaAtual.getDate());
    let mes = String(DiaAtual.getMonth() +1);
    let ano  = DiaAtual.getFullYear();
    let semana = DiaAtual.getDay();

    if(dia.length == 1){
        dia = '0'+dia;
    }
    if(mes.length == 1){
        mes = '0'+mes;
    }

    let dataCompleta = dia +"/"+mes+'/'+ano;

    switch (semana) {
        case 0:
            InputSemana.innerHTML = 'DOM';
            break;
        case 1:
            InputSemana.innerHTML = 'SEG';
            break;
        case 2:
        InputSemana.innerHTML = 'TER';
        break;
        case 3:
            InputSemana.innerHTML = 'QUA';
            break;
        case 4:
        InputSemana.innerHTML = 'QUI';
            break;
        case 5:
            InputSemana.innerHTML = 'SEX';
            break;
        case 6:
        InputSemana.innerHTML = 'SAB';
            break;
    }
    InputDataAtual.innerHTML = dataCompleta;
}


pegarData();


function getUserPosition(){
    let url = '';
    navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude;
        let long = pos.coords.longitude;

        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=622296cd4fda08b69c46ccfa980f968d`;

        fetchApi(url);
    })
}

function fetchApi(url){
    fetch(url)
    .then((data) =>{
        return data.json()
    })
    .then((data) =>{
        let TempConvercion = ((5/9) * (data.main.temp-32)).toFixed(1);

        InputCidade.textContent = data.name;
        InputTemperatura.textContent = TempConvercion;
        InputChover.textContent = data.main.humidity;
    })
    .catch((err) => {
        InputCidade.textContent = 'Impossivel acessar o openweather, verifique sua conexao';
        InputTemperatura.textContent = '-';
    })
}

getUserPosition();
