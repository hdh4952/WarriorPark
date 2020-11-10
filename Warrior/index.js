let IsParkChange = false;
let NowMoster = 0;
let CharacterImage = ["Park.jpg", "Jung.jpg", "Kim.jpg", "김건한.jpg", "임성택.jpg"];
let Character = ["박태준", "정성훈", "김동균", "마왕 김건한", "용사 임성택"];
let CharacterMaxHP = [10, 10, 10, 15, 21];
let CharacterHP = [10, 10, 10, 15, 21];
let Level = 1;
let exp = 0;

let ParkChange = function() {
    if(IsParkChange === false) {
        document.getElementById("playerImage").src = "Park2.jpg";
    }else {
        document.getElementById("playerImage").src = "Park.jpg";
    }
    IsParkChange = !IsParkChange;
}

let spawn = function(Num) {
    // 스킬 이펙트 복구
    document.getElementById('effect').innerHTML = ``;
    document.querySelector('body').style.backgroundColor = "white";
    //
    document.getElementById("monsterImage").src = `${CharacterImage[Num]}`;
    document.getElementById("notice").innerHTML = `${Character[Num]}을 소환했습니다!!<br>`;
    if(Num === 3) Music3.play();
    else Music3.stop();
    SetHP(Num);
}

let SetHP = function(Num) {
    if(Num > 0) {
        NowMoster = Num;
        document.getElementById("monsterHP").innerHTML = `HP: `;
        for(let i=0 ; i<CharacterHP[Num] ; i++) document.getElementById("monsterHP").innerHTML += `■`;
        for(let i=0 ; i<CharacterMaxHP[Num]-CharacterHP[Num] ; i++) document.getElementById("monsterHP").innerHTML += `□`;
    }
}

let ClickMonster = function() {
    ParkChange();
    CharacterHP[NowMoster]--;
    if(CharacterHP[NowMoster] === 0) {
        document.getElementById("notice").innerHTML += `${Character[NowMoster]}을(를) 죽였다!!`
        document.getElementById("monsterImage").src = ``;
        document.getElementById("monsterHP").innerHTML = ``;
        CharacterHP[NowMoster] = CharacterMaxHP[NowMoster];
        exp += CharacterMaxHP[NowMoster] * 10;
        if(exp > 100 * Level) {
            exp %= 100;
            Level++;
        }
        document.getElementById('Level').innerHTML = `Lv. ${Level} (${exp}/${100 * Level})`;
        NowMoster = -1;
    }else {
        SetHP(NowMoster);
    }
}

// 스킬
let ParkOrder = function() {
    document.querySelector('body').style.backgroundColor = "red";
    document.getElementById('effect').innerHTML = `<h1>하앙♥</h1>`;
    for(let i=0 ; i<5 ; i++) ClickMonster();
}

let ParkOrder2 = function() {
    document.querySelector('body').style.backgroundColor = "green";
    document.getElementById('effect').innerHTML = `<h1>하앙♡</h1>`;
    for(let i=0 ; i<10 ; i++) ClickMonster();
}

// 오디오

function sound(src) {   // Music = new sound("파일") , Music.paly() : 재생, Music.stop() : 중지 
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}
Music3 = new sound("m.mp3");