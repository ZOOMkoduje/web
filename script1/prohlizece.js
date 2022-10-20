class priklad1{
  constructor(rodic){
    rodic.innerHTML = "";
    this.pr = 1;
    this.rodic = rodic;
    this.tridy = "cap4 prohlizece";
    this.popisky = ["Prohlížeč","Podíl na trhu [%]"];
    this.procenta = ["56,31","14,44","8,29","8,24","5,56","3,96","3,2"];
    this.prohlizece = ["Chrome","Safari","UC Browser","Ostatní","Firefox","Opera","Internet Explorer"];  
    this.skore = 0;      
    this.pokusu = 0;
  }

  create_table(trida_dropu){
    this.drop_trida = trida_dropu;
    let tabulka = document.createElement('table');
    tabulka.setAttribute("class",this.tridy);
    let radek,bunka;
    for(let x=0;x<=this.procenta.length;x++){
      radek = tabulka.insertRow(x);
      for(let i=0;i<2;i++){
        if(x==0){
          bunka = document.createElement('th');
          bunka.innerHTML = this.popisky[i];
          radek.appendChild(bunka);
        }else{
          bunka = radek.insertCell(i);
          if(i==0){
            bunka.setAttribute("class",trida_dropu);
            bunka.setAttribute("data-value",x-1);            
          }else        
            bunka.innerHTML = this.procenta[x-1]; 
        }
      }
    }
    this.rodic.appendChild(tabulka);
    //skore
    let skore_obal = document.createElement('p');
    skore_obal.classList.add("w3-row","w3-center");
    let skore = document.createElement('span');
    skore.innerHTML = "Správně: " + this.skore;
    skore.setAttribute("id", "skoreR_" + this.pr);
    skore.classList.add("w3-half");
    let pokusu = document.createElement('span');
    pokusu.innerHTML = "Pokusů: "+ this.pokusu;
    pokusu.setAttribute("id", "pokusR_" + this.pr);
    pokusu.classList.add("w3-half");
    skore_obal.appendChild(skore);
    skore_obal.appendChild(pokusu);
    this.rodic.appendChild(skore_obal);

  }
  
  create_banner(trida_rodic,trida_drag){
    this.drag_trida = trida_drag;
    let obal;
    let banner = document.createElement('p');
    banner.setAttribute("class",trida_rodic);
    for(let x=0;x<this.prohlizece.length;x++){
      obal = document.createElement('span');
      obal.setAttribute("class",trida_drag); 
      obal.innerHTML = this.prohlizece[x];
      banner.appendChild(obal);
    }
    this.rodic.appendChild(banner);  
    prohazej(trida_drag,trida_rodic);   
  }
  
  create_result(id,score_id){
    let obal = document.createElement('p');
    obal.id=id;
    obal.style.display = "none";
    let score = document.createElement('span');
    score.id = score_id;
    obal.appendChild(document.createTextNode("Máš už správně: "));
    obal.appendChild(score);
    this.rodic.appendChild(obal);
    this.zapis_score = document.getElementById(score_id);  
  }

  setDD(data){
    jQuery("."+this.drag_trida).draggable({ revert: "invalid" });
    jQuery("."+this.drop_trida).droppable({
      drop: function( event, ui ) {
        event.preventDefault();
        let tmp_event_toElement = event.toElement? event.toElement: event.originalEvent.target;
        let prohlizec = tmp_event_toElement.innerText;
        tmp_event_toElement.removeAttribute("style");
        tmp_event_toElement.style.position = "relative";                                  //to tam musi zustat
        event.target.appendChild(tmp_event_toElement);  
        //vyhodnoceni
        data.pokusu++;
        if(prohlizec == data.prohlizece[parseInt(event.target.dataset.value)]){
          event.target.style.color = "green";
          event.target.removeAttribute("class");
          event.target.removeAttribute("id");
          data.skore++;
          jQuery(this).droppable('disable');       
          tmp_event_toElement.removeAttribute("class");
          jQuery(tmp_event_toElement).draggable('disable');
        } else {
          data.pokusu++;
          event.target.style.color = "red";
        }
        data.getScore();
      }      
    });
  }
  
  getScore(){
    let spravne = document.getElementById("skoreR_"+this.pr);
    let pokusu = document.getElementById("pokusR_" + this.pr);
    spravne.innerHTML = "Správně: " + this.skore;
    pokusu.innerHTML = "Pokusů: " + this.pokusu;
    /*
    let zapis = this.skore+" z "+this.prohlizece.length;
    this.zapis_score.innerHTML = zapis;
    this.zapis_score.parentNode.removeAttribute("style");*/
    //TODO vyhonoceni 
    if(this.skore==this.prohlizece.length){
      if (this.pokusu == this.skore)
        print_modal("modal", "ok");
      else  
        print_modal("modal", "neutr", "Tabulka je vyplněná, bezva! Příště to dáš určitě bez chyby!");
    }
      //this.zapis_score.parentNode.innerHTML = "Perfektní, doplnil jsi úplně celou tabulku.";
  }
}


var cviceni1 = new priklad1(pr1);
cviceni1.create_table("drop1");
cviceni1.create_banner("drop_pr1","drag1");
cviceni1.create_result("score","score_ok");
cviceni1.setDD(cviceni1);

 
class priklad2 extends priklad1{
  constructor(rodic){
    super(rodic);  
    this.pr = 2;
    this.prohlizece = ["Chrome","Safari","Ostatní","Firefox","Opera","Internet Explorer"];
    this.procenta = this.procenta.slice(0,this.procenta.length-1);
    this.pokusu = 0;
    this.skore = 0;
  }
  
  create_data(){
    //nova data
    for(let i = 1; i<=6; i++)
    switch(i){
      case 1: this.procenta[0] = random_int(15,35); break;
      case 2: this.procenta[1] = this.procenta[0] - random_int(2,9); break;
      case 3: this.procenta[2] = Math.round(this.procenta[1]/3); break;
      case 4: this.procenta[3] = Math.round(this.procenta[2]/2);break;
      case 5: this.procenta[4] = Math.round(this.procenta[2]/4);break;
      default: 
        this.procenta[5] = 100 - (this.procenta[0]+this.procenta[1]+this.procenta[2]+this.procenta[3]+this.procenta[4]);
    }
    
    //prohazeni prohlizecu v poli
    let pocet_prohozeni = 4;
    let i = 0;
    let tmp_int, tmp_intI, tmp_vault;
    while(i != pocet_prohozeni){
      tmp_int = random_int(0,this.prohlizece.length-1);
      tmp_intI = random_int(0,this.prohlizece.length-1);
      if(tmp_int != tmp_intI){
      //prohozeni
        tmp_vault = this.prohlizece[tmp_int];
        this.prohlizece[tmp_int] = this.prohlizece[tmp_intI];
        this.prohlizece[tmp_intI] = tmp_vault;
        i++; 
      }
    }         
  } 

  
  drawChart(){
    draw_pie_chart('pr_graph',this.procenta,this.prohlizece);
  }
  //tady musim setridit i prohlizece podle hodnot
  sort(){          
    let ukazatel = this.procenta.length-1;
    let presun = this.procenta[ukazatel];
    let porovnavac = 0;         //index
    let tmp_value = 0;          //pouziji
    let tmp_prohlizec = 0;       //dole
    while(porovnavac != ukazatel){
      if(presun > this.procenta[porovnavac]){
        //cislo a pohlizec pro presun
        tmp_value = this.procenta[ukazatel];
        tmp_prohlizec = this.prohlizece[ukazatel];
        //posun           
        for(let x = ukazatel; x > porovnavac; x--){                                           
            this.procenta[x] = this.procenta[x-1];            //%            
            this.prohlizece[x] = this.prohlizece[x-1];        //nazvy prohlizecu    
        } 
        //presunuti prvku cisla a prohlizece
        this.prohlizece[porovnavac] = tmp_prohlizec;
        this.procenta[porovnavac] = tmp_value;  
        //breaknuti   
        porovnavac = ukazatel;  
      }else
        porovnavac++;
    }
  }  
    
}

var cviceni2 = new priklad2(pr2);
cviceni2.create_data();
cviceni2.drawChart();
cviceni2.sort();   
cviceni2.create_table("drop2");
cviceni2.create_banner("drop_pr2","drag2");
cviceni2.create_result("score2","score_ok2");    
cviceni2.setDD(cviceni2);
//schoovam dvojku - jinak mi to vykresli az po zobrazeni a to tam uz jsou serazena data
document.getElementById("pr_2").classList.add("w3-hide");



/**
 * Funkce kreslici vysecovy graf.
 * data: data pro graf (array)
 * popisky_x: datovy format.
 * radky: popisky osy x (array)  
 * skryj: urcuje, zda se zobrazi hodnoty (boolean) 
 * id_grafu: id elementu, kam se vykresli (string) 
 */
 function draw_pie_chart(kam,datas,labels){
			var ctx = document.getElementById(kam).getContext('2d');
      var config = {
  			type: 'pie',
  			data: {
  				datasets: [{
  					data: datas,
  					backgroundColor: [
  						window.chartColors.red,
  						window.chartColors.orange,
  						window.chartColors.yellow,
  						window.chartColors.green,
  						window.chartColors.blue,
              window.chartColors.purple
  					]
  				}],
  				labels: labels
  			},
  			options: {
          responsive: true,
          plugins: {
    		    datalabels: {display:false}			
    	    }, 
          events: [],
          tooltips: { enabled: false},
          legend: { 
            position: "right",
            onClick: function (e) { e.stopPropagation(); }
          },
  				title: {
  					display: true,
            fontSize: 18,
  					text: "Nejpoužívanější pohlížeče",
  				},
  			}
  		};
			window.myPie = new Chart(ctx, config);
}

/**
 * Prohazuje prvky uvnitr rodice
 * Uziti: Doplnujeme sportovni tabulku  
 */ 
function prohazej(co,kde){
  var prvky = document.getElementsByClassName(co);   
  var delka = prvky.length;
  var rodic = document.getElementsByClassName(kde);
  for(var i = 0; i < delka; i++){    
    var rand = random_int(0,delka-1);
    rodic[0].appendChild(prvky[rand]);
  }
}