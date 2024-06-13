function insertOszlop() {
    document.querySelector('.TanuloErtekelesGrid thead tr').innerHTML +=
        `
        <th class="k-header atlag" scope="col"><span class="k-link">Megbukáshoz</span></th>
        <th class="k-header atlag" scope="col"><span class="k-link">4.59+</span></th>
        `
}

function getTantargyak() {
    return document.querySelectorAll('.TanuloErtekelesGrid tbody [role="row"]')
}

function osszegzes(lista) {
    let osszeg = 0
    for (let i = 0; i < lista.length; i++) {
        osszeg += parseInt(lista[i])
    }
    return osszeg
}

const init = () => {
    insertOszlop()
    const tantargySorok = getTantargyak()
    const jegyekLista = []
    for (let i = 1; i < tantargySorok.length; i++) {
        let tantargyNev = tantargySorok[i].querySelectorAll('[role="gridcell"]')[1].innerHTML
        let jegyekElemek = tantargySorok[i].querySelectorAll('.honap')
        let jegyek = []

        for (let y = 1; y < jegyekElemek.length; y++) {
            if (jegyekElemek[y].className != "honap kozepre") {
                if (jegyekElemek[y].innerHTML) {
                    let spanElemek = jegyekElemek[y].querySelectorAll('span')

                    for (let x = 0; x < spanElemek.length; x++) {
                        if (spanElemek[x].dataset.tanuloertekeles != '-') {
                            jegyek.push(parseInt(spanElemek[x].dataset.tanuloertekeles))
                            if (spanElemek[x].dataset.suly == 'Súly: 200%') {
                                jegyek.push(parseInt(spanElemek[x].dataset.tanuloertekeles))
                            }
                        }
                    }

                }
            }

        }
        jegyekLista.push({
            tantargy: tantargyNev,
            jegyek: jegyek
        })
    }

    mennyiKellMegjelenites(jegyekLista)

}

function atlag(lista) {
    let osszeg = 0
    for (let i = 0; i < lista.length; i++) {
        osszeg += parseInt(lista[i])
    }
    return osszeg / lista.length
}

function mennyiEgyesKell(lista) {
    let ideiglenesLista = lista
    let darabSzam = 0
    while (atlag(ideiglenesLista) > 1.99) {
        darabSzam++
        ideiglenesLista.push(5)
    }
    return darabSzam
}

function mennyiOtosKell(lista) {
    let ideiglenesLista = lista
    let darabSzam = 0
    while (atlag(ideiglenesLista) > 4.59) {
        darabSzam++
        ideiglenesLista.push(1)
    }
    return darabSzam
}

function mennyiKellMegjelenites(adat) {
    console.log(adat)
    const tantargySorok = getTantargyak()
    console.log(tantargySorok)
    tantargySorok[0].innerHTML += '<td class="atlag kozepre" role="gridcell">-</td>'
    for (let i = 0; i < adat.length; i++) {
        let mennyiegyes = mennyiEgyesKell(adat[i].jegyek)
        let mennyiotos = mennyiOtosKell(adat[i].jegyek)
        tantargySorok[i + 1].innerHTML +=
            `<td class="atlag kozepre" role="gridcell"><span style="color: ${szinezo(mennyiegyes)};">Egyes: ${mennyiegyes} db</span></td>
            <td class="atlag kozepre" role="gridcell"><span style="color: ${szinezo(mennyiotos)};">Ötös: ${mennyiotos} db</span></td>`
        console.log(adat[i].jegyek, adat[i].tantargy)
    }
}

function szinezo(mennyiEgyes) {
    if (mennyiEgyes <= 1) {
        return "#8a131f"
    } else if (mennyiEgyes <= 3) {
        return "#dc3545"
    } else if (mennyiEgyes <= 4) {
        return "#fd7e14"
    } else if (mennyiEgyes <= 6) {
        return "#ffc107"
    } else if (mennyiEgyes <= 8) {
        return "#20c997"
    } else if (mennyiEgyes <= 10) {
        return "#198754"
    } else if (mennyiEgyes > 10) {
        return "#198754"
    }
}


const linkValidate = 'e-kreta.hu/TanuloErtekeles/Osztalyzatok'
if (window.location.href.includes(linkValidate)) {
    let observer = new MutationObserver(mutationRecords => {
        init()
        observer.disconnect()
    });
    observer.observe(document.querySelector('.TanuloErtekelesGrid tbody'), {
        childList: true,
        subtree: true,
        characterDataOldValue: true
    });
}
