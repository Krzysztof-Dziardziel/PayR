const fs = require('fs');
const pdf = require('pdf-parse');


let dataBuffer = fs.readFileSync('wyciąg.pdf');

pdf(dataBuffer).then(function (data) {
    var filtered = [];
    let parsed = data.text.toUpperCase();
    let arr = parsed.split('RODZAJOPERACJI');
    arr.shift();

    console.log(`Ilość przelewów na wyciągu: ${arr.length}`);

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].includes('PRZYCHODZĄCY')) {
            filtered.push(arr[i]);
        }
    }
    console.log(`Ilość przelewów przychodzących: ${filtered.length}`);
    var filteredSpace = filtered.map(x => x.replace(/,/g, ' '))
        .map(x => x.replace(footerMessage, ''))
        .map(x => x.replace(/STRONA  \d+   Z   \d+/g, ''))
        .map(x => x.replace(/\d\d\d\d-\d\d-\d\d/g, ''))
        .map(x => x.replace(/\n\n|\r\r|\n\r|\r\n/g, '\n'));

    //console.log(filteredSpace)
    fs.writeFile('./bin/filtered.txt', filteredSpace.toString(), function (err, res) {
        if (err) console.error('error', err);
    });
});
let footerMessage = `DATAWYSTAWIENIADOKUMENTU: 2020 - 04 - 10
 
LISTATRANSAKCJIZOSTAŁAWYGENEROWANAELEKTRONICZNIEI NIEWYMAGAPODPISUANISTEMPLA.
        DOKUMENTZOSTAŁSPORZĄDZONYNAPODSTAWIEART.7 USTAWYPRAWOBANKOWE(DZ.U.NR140Z 1997ROKU POZ.939Z PÓŹNIEJSZYMI
ZMIANAMI).
DOKUMENTNIEJESTWYCIĄGIEMZ RACHUNKUBANKOWEGO
 
 
BANKMILLENNIUMS.A.Z SIEDZIBĄW WARSZAWIE UL.STANISŁAWAŻARYNA2A 02 - 593WARSZAWA WPISANYPODNRKRS0000010186DO
REJESTRUPRZEDSIĘBIORCÓWKRAJOWEGOREJESTRUSĄDOWEGO PROWADZONEGOPRZEZSĄDREJONOWYDLAM.ST.WARSZAWY XIIIWYDZIAŁ
GOSPODARCZYKRAJOWEGOREJESTRUSĄDOWEGO O NUMERZEIDENTYFIKACJIPODATKOWEJ(NIP) - 526 - 021 - 29 - 31I KAPITALEZAKŁADOWYM
CAŁKOWICIEWPŁACONYMW WYSOKOŚCI1.213.116.777 00ZŁOTYCH.`;