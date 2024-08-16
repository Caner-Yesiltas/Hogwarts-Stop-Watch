const zamanGostergeElementi = document.getElementById("timer");
const baslatButonu = document.getElementById("start");
const durdurButonu = document.getElementById("stop");
const sifirlaButonu = document.getElementById("reset");

let baslangicZamani = 0;
let gecenZaman = 0;
let kronometre;

const backgroundMusic = new Audio("harry_potter_theme.mp3"); //audio js apidir
backgroundMusic.loop = true;  // loop ozelligi ses doyalarini bitince tekrar baslatir

function kronometreyiBaslat() {
  baslatButonu.disabled = true;
  durdurButonu.disabled = false;
  
  const baslangicZamani = Date.now() - gecenZaman; // kronometre 1 sn once basladi ve bitti demek 
  
  kronometre = setInterval(() => {
    
    gecenZaman = Date.now() - baslangicZamani;  //date now suan sayama basla demek baslangic zamani hep zaten 0 demek 
    zamaniGuncelle();
    
  }, 10); 
  
  // Her 10 milisaniyede bir fonksiyonu calistirir ve calisan degerleri gecenzaman degiskenine atar degerler surekli degisir
  //setintervalin aldigi deger gecen zamanin icinde birikir. biriken deger zamaniguncelle fonksiyonunda kullanilir

  backgroundMusic.play(); // ses dosyasini baslatir
}

function kronometreyiDurdur() {
  clearInterval(kronometre);
  baslatButonu.disabled = false;
  durdurButonu.disabled = true;
  backgroundMusic.pause(); //ses dosyasini durdurur
}

function kronometreyiSifirla() {
  clearInterval(kronometre);
  gecenZaman = 0;
  zamaniGuncelle();
  baslatButonu.disabled = false;
  durdurButonu.disabled = true;
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;  // ses dosyasini baslangic noktasina dondurur
}

  function zamaniGuncelle() {
    const toplamMilisaniye = gecenZaman;
    const dakikalar = Math.floor(toplamMilisaniye / (1000 * 60)); //60bin milisaniye 1dk oldugu icin boluyoruz
    const saniyeler = Math.floor((toplamMilisaniye % (1000 * 60)) / 1000);
    const milisaniyeler = Math.floor((toplamMilisaniye % 1000) / 10);
    
    zamanGostergeElementi.textContent = `${String(dakikalar).padStart(2, "0")}:${String(saniyeler).padStart(2, "0")}:${String(milisaniyeler).padStart(2, "0")}`;
}

  // padstart sayinin basina 0 koyar ve 2 haneli yapar yalniz sadece stringler ile calisir bu yuzden aldigimiz dakikalar saniyeler mili saniyeler degiskenlerini 
  // once sstringe cevirmemiz gerekiyor sonra padsttart metodunu uyguluyoruz.


baslatButonu.addEventListener("click", kronometreyiBaslat);
durdurButonu.addEventListener("click", kronometreyiDurdur);
sifirlaButonu.addEventListener("click", kronometreyiSifirla);

zamaniGuncelle();
durdurButonu.disabled = true;


