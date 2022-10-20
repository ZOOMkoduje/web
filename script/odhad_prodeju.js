class Platno {
    constructor(platno_id, kontejner_id) {
        this.platno_id = platno_id
        this.elementPlatna = document.getElementById(platno_id)
        this.obsahPlatna = this.elementPlatna.getContext('2d')
        this.kontejnerPlatna = document.getElementById(kontejner_id)
    }
    vycistit_platno() {
        this.obsahPlatna.clearRect(
            0,
            0,
            this.elementPlatna.width,
            this.elementPlatna.height
        )
        this.obsahPlatna.beginPath()
    }
}

class kruhovyGraf extends Platno {
    constructor(platno_id, kontejner_id, velikost) {
            super(platno_id, kontejner_id)
            this.velikost = velikost
            this.stredX = this.elementPlatna.width / 2 // hodnoty větší než 2.0 = centrování k levému okraji
            this.stredY = this.elementPlatna.height / 2 // hodnoty menší než 2.0 = centrování k dolnímu okraji
        }
        // metoda vyžaduje v argumentu pole objektů, kdy objekty mají tvar {nazev: 'nazev', procenta:cislo, barva:'barva'}
    vytvorVysece(array, nahodne) {
        this.vycistit_platno()
        this.startovaciUhel = -0.5 * Math.PI
        if (nahodne) {
            array.sort(function() {
                return 0.5 - Math.random()
            })
        }
        array.forEach(
            function(vysledek) {
                // provede funkci pro každý element v arrayi
                this.uhelVysece = (vysledek.procenta / 100) * 2 * Math.PI
                this.obsahPlatna.beginPath()
                this.obsahPlatna.arc(
                    this.stredX,
                    this.stredY,
                    this.velikost,
                    this.startovaciUhel,
                    this.startovaciUhel + this.uhelVysece
                )
                this.startovaciUhel += this.uhelVysece
                this.obsahPlatna.lineTo(this.stredX, this.stredY) // vrací se do středu grafu pro vykreslení vysece
                this.obsahPlatna.fillStyle = vysledek.barva
                this.obsahPlatna.fill()
            }.bind(this)
        )
    }

    zobrazElement(idElementu) {
        this.element = document.getElementById(idElementu)
        this.element.setAttribute(
            'style',
            'display: inline')
    }

    smazElement(idElementu) {
        this.element = document.getElementById(idElementu)
        this.element.setAttribute(
            'style',
            'display: none')
    }
}

class Legenda {
    constructor() {}
    static vytvorLegendu(array, id_legendy, custom_id, nahodne) {
        this.legend = document.getElementById(id_legendy)
        this.legend.innerHTML = ''
        this.ul = document.createElement('ul')
        this.pole = ['']
        this.pole_nezamichano = array
        this.legend.appendChild(this.ul)

        if (nahodne) {
            array.sort(function() {
                return 0.5 - Math.random()
            })
        }
        for (let i = 0; i < array.length; i++) {
            this.pole.push(array[i].procenta)
        }

        for (let i = 0; i < array.length; i++) {
            this.li = document.createElement('li')
            this.li.style.listStyle = 'none'
            this.li.style.borderLeft = '20px solid'
            this.li.style.borderLeftColor = array[i].barva
            this.divLi = document.createElement('div')
            this.divLi.textContent = array[i].nazev
            this.divLi.style.cssFloat = 'left'
            this.li.style.height = '29px'
            this.li.style.padding = '5px 0px 5px 5px'
            this.li.style.margin = '5px'
            this.li.style.display = 'block'
                /*this.li.style.flexWrap = 'wrap'
                this.li.style.alignContent = 'flex-end'*/


            this.divSeznam = document.createElement('div')
            this.divSeznam.style.cssFloat = 'right'
            this.seznam = document.createElement('select') // generovani selectu start
            this.seznam.setAttribute('id', custom_id + i)
            for (let i = 0; i < this.pole.length; i++) {
                this.seznam.setAttribute(
                    'style',
                    'width: 75px; margin: 0 0 0 10px; /*padding: 0;*/ border: 2px solid #e0e0e0; border-radius: 10px'
                )
                this.legend.appendChild(this.seznam)
                this.polozkaSeznam = document.createElement('option')
                this.polozkaSeznam.setAttribute('value', this.pole[i])
                this.pole.sort(function(a, b) {
                    return a - b
                })
                this.hodnotaSeznam = document.createTextNode(this.pole[i] + ' %')
                this.polozkaSeznam.appendChild(this.hodnotaSeznam)
                this.seznam.appendChild(this.polozkaSeznam)
                this.li.append(this.seznam) // generovani selectu  konec
                    //
            }
            this.divSeznam.append(this.seznam)
            this.li.append(this.divLi)
            this.li.append(this.divSeznam)
            this.ul.append(this.li)
        }
        return array
    }
}

/*class cviceni1 {
    // přiklad nedynamického cvičení
    constructor() {}
    vytvareniCviceni() {
        this.vysece = [
            { nazev: 'Apple ', procenta: 18.7, barva: 'lightblue' },
            { nazev: 'Samsung ', procenta: 20.4, barva: 'lightgreen' },
            { nazev: 'Huawei ', procenta: 8.2, barva: 'DarkTurquoise	' },
            { nazev: 'Vivo ', procenta: 3, barva: 'grey' },
            { nazev: 'Oppo ', procenta: 3.6, barva: 'DarkMagenta' },
            { nazev: 'Ostatní ', procenta: 53.9, barva: 'LightSalmon' }
        ]
        const graf = new kruhovyGraf('platno1', 'kontejner_platna1', 200)
        graf.vytvorVysece(this.vysece, false)
        Legenda.vytvorLegendu(this.vysece, 'legenda1', 'legenda1_selecty', false)
    }
    kontrolaCviceni() {
        // správné odpovědi zezelenají/špatné zčervenají
        for (let i = 0; i < this.vysece.length; i++) {
            if (
                document.getElementById('legenda1_selecty' + i).value ==
                this.vysece[i].procenta
            ) {
                document.getElementById('legenda1_selecty' + i).style.borderColor =
                    '#228B22'
            } else {
                document.getElementById('legenda1_selecty' + i).style.borderColor =
                    '#800000'
            }
        }
    }
}*/

class cviceni2 {
    // přiklad dynamického(náhodně generovaného) cvičení
    constructor(select_id, start_id) {
            this.select = document.getElementById(select_id)
            this.start_id = document.getElementById(start_id)
        }
        // generovani náhodných čísel se stejnou pravděpodobností, sečtená vygenerovaná čísla se rovanjí argumentu max, argument pocet určuje počet vygenerovanych čísel, rozdil určuje rozdil mezi jednotlivými čísly, vrací pole
    generovaniProcent(max, pocet, rozdil) {
        this.pole = []
        this.soucet = 0
        for (let i = 0; i < pocet; i++) {
            this.pole.push(Math.random())
            this.soucet += this.pole[i]
        }
        this.delitel = max
        for (let i = 0; i < pocet; i++) {
            this.delitel = this.delitel - i * rozdil
        }
        this.zbyvajici = this.delitel
        for (let i = 0; i < this.pole.length; i++) {
            this.pole[i] = Math.floor((this.pole[i] / this.soucet) * this.delitel)
            if (this.pole[i] == 0) {
                this.pole[i] = 1
            }
            this.zbyvajici -= this.pole[i]
            if (i + 1 == this.pole.length) {
                while (this.zbyvajici > 0) {
                    this.pole[i]++
                        this.zbyvajici--
                }
            }
        }
        this.pole.sort(function(a, b) {
            return a - b
        })
        for (let i = 0; i < this.pole.length; i++) {
            this.pole[i] += i * rozdil
        }
        this.pole.sort(function() {
            return 0.5 - Math.random()
        })
        return this.pole
    }
    vytvareniCviceni() {
        this.vysece = []
        this.procenta = this.generovaniProcent(
            // rozdíl % mezi dvěma výseči je vždy 11-počet výsečí. tj dvě výseče budou vždy alespoň 9% od sebe a 10 vysečí bude vždy alespoň 1% od sebe=nebudou stejné
            100,
            this.select.value,
            11 - this.select.value
        )
        this.vysece_vsechny = [
            { nazev: 'Apple', procenta: this.procenta[0], barva: '#40F9F9' },
            { nazev: 'Samsung', procenta: this.procenta[1], barva: '#7F98FF' },
            { nazev: 'Oppo', procenta: this.procenta[2], barva: '#EE8A34' },
            { nazev: 'Huawei', procenta: this.procenta[3], barva: '#FFE956' },
            { nazev: 'Xiaomi', procenta: this.procenta[4], barva: '#DC143C' },
            { nazev: 'LG', procenta: this.procenta[5], barva: '#7CFC00' },
            { nazev: 'Sony', procenta: this.procenta[6], barva: '#DCDCDC' },
            { nazev: 'OnePlus', procenta: this.procenta[7], barva: '#006400' },
            { nazev: 'Vivo', procenta: this.procenta[8], barva: '#FF00FF' },
            { nazev: 'Lenovo', procenta: this.procenta[9], barva: '#5D7594' }
        ]

        for (let i = 0; i < this.select.value; i++) {
            this.vysece[i] = this.vysece_vsechny[i]
        }

        const graf = new kruhovyGraf('platno2', 'kontejner_platna2', 200)
        graf.vytvorVysece(this.vysece, true)
        graf.zobrazElement('ramLegendy')
        graf.zobrazElement('nadpisGrafu')
        Legenda.vytvorLegendu(this.vysece, 'legenda2', 'legenda2_selecty', true)

    }
    kontrolaCviceni() {
        this.spravne = 0;
        this.spatne = 0;
        for (let i = 0; i < this.vysece.length; i++) {
            if (
                document.getElementById('legenda2_selecty' + i).value ==
                this.vysece[i].procenta
            ) {
                this.spravne++
                    document.getElementById('legenda2_selecty' + i).style.borderColor =
                    '#00BB00'
                document.getElementById('legenda2_selecty' + i).style.borderWidth =
                    '2px'
            } else {
                this.spatne++
                    document.getElementById('legenda2_selecty' + i).style.borderColor =
                    '#FF0000'
                document.getElementById('legenda2_selecty' + i).style.borderWidth =
                    '2px'
            }
        }
        if (this.spatne == 0) {
            print_modal("modal", "ok")
        } else {
            print_modal("modal", "neutr", 'To ještě není správně. Správných odhadů máš ' + this.spravne + ' a nesprávných ' + this.spatne + '.');
        }
    }
}

class nacteni {
    constructor() {}
    static nacteni() {
        /*const cvic1 = new cviceni1()
        cvic1.vytvareniCviceni()
        const button2 = document.getElementById('kontrola1')
        button2.addEventListener('click', function() {
            cvic1.kontrolaCviceni()
        })*/
        const cvic2 = new cviceni2('select', 'start')

        const start = document.getElementById('start')
        start.addEventListener('click', function() {
            cvic2.vytvareniCviceni()
                /*document.getElementById('kontejner_platna2').style.display = 'inline-block'*/
        })

        const button = document.getElementById('kontrola2')
        button.addEventListener('click', function() {
            cvic2.kontrolaCviceni()
        })
    }
}

window.addEventListener('load', function() {
    nacteni.nacteni()
    const graf = new kruhovyGraf('platno2', 'kontejner_platna2', 200);
    graf.smazElement('ramLegendy');
    graf.smazElement('nadpisGrafu');
})