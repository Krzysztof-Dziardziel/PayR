const fs = require('fs');
let text = fs.readFileSync('filtered.txt', 'utf8').split(',');
let i = 0;
let j = 0;


const rules = [
    {
        condition: '02329015190000000125329821',
        result: 'Jan Kowalski'
    },
    {
        condition: '03219015190321000123321897',
        result: 'Grażyna Kowalska'
    }
]


function makeObject(item) {
    ++i;
    const rachunekRegex = /Z RACHUNKU(\d+)/g
    const kwotaRegex = /(\d{1,4}\.\d{2})\d+\.\d+/g
    let rachunek = rachunekRegex.test(item) ? RegExp.$1.trim() : 'none';
    let kwota = kwotaRegex.test(item) ? RegExp.$1 : 'none';
    let platnik = applyRules(parseInt(rachunek));
    if (platnik != '') {
        console.log(`\n ${j + 1}) \n Rachunek: ${rachunek} \n Klient: ${platnik} \n Kwota: ${kwota}`);
        j++;
    };
};
function makeNotObject(item) {
    ++i;
    const rachunekRegex = /Z RACHUNKU(\d+)/g
    const kwotaRegex = /(\d{1,4}\.\d{2})\d+\.\d+/g
    let rachunek = rachunekRegex.test(item) ? RegExp.$1.trim() : 'none';
    let kwota = kwotaRegex.test(item) ? RegExp.$1 : 'none';
    let platnik = applyRules(parseInt(rachunek));
    if (platnik == '') {
        console.log(`\n ${j + 1}) \n Rachunek: ${rachunek} \n Klient: Nieznany \n Kwota: ${kwota}`);
        j++;
    }
};
console.log('Rozpoznane przelewy:');
text.forEach(item => makeObject(item));
console.log(`\nRozpoznanych przelewow: ${j}\n\n`);
i = 0;
j = 0;
console.log('Nierozpoznane przelewy:');
text.forEach(item => makeNotObject(item));
console.log(`\nNierozpoznanych przelewow: ${j}`);





// function applyRules(numbr) {
//     return rules.filter((rule) => rule.condition(numbr))
//         .map((rule) => rule.result);
// }
function applyRules(numbr) {
    return rules.filter((rule) => rule.condition == numbr)
        .map((rule) => rule.result);
}