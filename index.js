document.documentElement.classList.add('js-enabled');
document.querySelector('.no-js__message').remove();
class Player{
    constructor (nom, prenom, score){
        this._nom = nom;
        this._prenom = prenom;
        this._score = 1;
    }
    getName(){
        return this._nom
    }
    getFirstname(){
        return this._prenom;
    }
    getScore(){
        return this._score;
    }
    setScore(score){
        this._score = score;
    }
}
const aPlayers = [new Player('Batta', 'Gwenaelle', 1),new Player('Vincent', 'Noémie',1)];
let iSecond = 40;
let iMinutes = 1;
let intervalID = 100;
let iTour = 1;
let eJlove = document.querySelector('.result_item--love');
let eJjs = document.querySelector('.result_item--js');

document.querySelector('.grid').insertAdjacentHTML('beforeend',
    `<li class="grid__item"></li>
        <li class="grid__item"></li>
        <li class="grid__item"></li>
        <li class="grid__item"></li>
        <li class="grid__item"></li>
        <li class="grid__item"></li>
        <li class="grid__item"></li>
        <li class="grid__item"></li>
        <li class="grid__item"></li>`);
const aLis = document.querySelectorAll('li');
for (const eLi of aLis) {
    eLi.addEventListener('click', (event) => {
        iTour++;
        if (intervalID === 100) {
            intervalID = setInterval(upDate, 1000);
        }
        if (iTour%2 === 0) {
            event.currentTarget.classList.add('grid__item--js');
            eJjs.textContent = `${aPlayers[0].getName()} ${aPlayers[0].getFirstname()} ${aPlayers[0].getScore()}`
                aPlayers[0].setScore(aPlayers[0].getScore() + 1);
        } else {
            event.currentTarget.classList.add('grid__item--love');
            eJlove.textContent = `${aPlayers[1].getName()} ${aPlayers[1].getFirstname()} ${aPlayers[1].getScore()}`
                aPlayers[1].setScore(aPlayers[1].getScore() + 1);
        }
        if (iTour===10){
            console.log('Vous avez perdu');
        }
    })
}

document.querySelector('.grid').addEventListener('mousemove', (event)=>{
    if (iTour%2 === 0) {
        event.currentTarget.classList.add('js');
    }else{
        event.currentTarget.classList.add('love');
    }
})
document.querySelector('.grid').addEventListener('mouseout', (event)=>{
    if (iTour%2 === 0) {
        event.currentTarget.classList.remove('js');
    }else{
        event.currentTarget.classList.remove('love');
    }
});
function upDate(){
    iSecond--;
    document.querySelector('.timer').textContent = `${zero(iMinutes)} : ${zero(iSecond)}`;
    if (iMinutes===0 && iSecond===0){
        clearInterval(intervalID);
        console.log('Vous avez perdu');
    }
    if (iSecond===0){
        iMinutes--
        iSecond = 60;
    }
}
function zero(time){
    if (time>=0 && time<10){
        return `0${time}`;
    }else{
        return time;
    }
}