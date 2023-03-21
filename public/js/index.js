let plus = document.getElementById('listHeaderButton_Plus');

plus.addEventListener('click', ()=>{
    window.location.href = '/new/intake-form';
});


var raw = "";

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

async function hydrate(){
    try{
        let fetchResult = await fetch(window.location.href + "api/hydrate/all-patients", requestOptions);
        let response = await fetchResult.text();
        console.log(response)
        
        let allPatients = JSON.parse(response);

        let home = document.querySelector("#patientsList");
        for(let i = 0; i < allPatients.length; i++){
            let div = document.createElement('div');
            let patient = allPatients[i];
            div.className = 'row';
            div.innerHTML ='<span>'+patient.name+'</span><span>764483</span><span>05-28-08</span><div><button class="rowButtonNew">New</button><button>Historic</button></div>'
            home.appendChild(div);
        }

    } catch(err){
        console.log(err)
    }
}
hydrate()