const zamanGostergeElementi = document.getElementById("timer");
const baslatButonu = document.getElementById("start");
const durdurButonu = document.getElementById("stop");
const sifirlaButonu = document.getElementById("reset");

// Kronometre değişkenleri
let baslangicZamani;
let gecenZaman = 0;
let calisiyor = false;
let animationFrameId;

// Kronometreyi başlat
function kronometreyiBaslat() {
  if (!calisiyor) {
    calisiyor = true;
    baslangicZamani = Date.now() - gecenZaman;
    kronometreCalistir();
    baslatButonu.disabled = true;
    durdurButonu.disabled = false;
  }
}

// Kronometreyi durdur
function kronometreyiDurdur() {
  if (calisiyor) {
    calisiyor = false;
    cancelAnimationFrame(animationFrameId);
    baslatButonu.disabled = false;
    durdurButonu.disabled = true;
  }
}

// Kronometreyi sıfırla
function kronometreyiSifirla() {
  calisiyor = false;
  cancelAnimationFrame(animationFrameId);
  gecenZaman = 0;
  zamaniGuncelle();
  baslatButonu.disabled = false;
  durdurButonu.disabled = true;
}

// Kronometreyi çalıştır
function kronometreCalistir() {
  if (calisiyor) {
    gecenZaman = Date.now() - baslangicZamani;
    zamaniGuncelle();
    animationFrameId = requestAnimationFrame(kronometreCalistir);
  }
}

// Gösterilen zamanı güncelle
function zamaniGuncelle() {
  const toplamMilisaniye = gecenZaman;
  const dakikalar = Math.floor(toplamMilisaniye / (1000 * 60));
  const saniyeler = Math.floor((toplamMilisaniye % (1000 * 60)) / 1000);
  const milisaniyeler = Math.floor((toplamMilisaniye % 1000) / 10);

  zamanGostergeElementi.innerHTML = `
        <h1 class="text">Hogwarts <span>Saati</span> 🐦‍🔥</h1>
        <span>${String(dakikalar).padStart(2, "0")}:</span>${String(
    saniyeler
  ).padStart(2, "0")}:${String(milisaniyeler).padStart(2, "0")}
    `;
}

// Olay dinleyicileri
baslatButonu.addEventListener("click", kronometreyiBaslat);
durdurButonu.addEventListener("click", kronometreyiDurdur);
sifirlaButonu.addEventListener("click", kronometreyiSifirla);

// Başlangıç durumu
zamaniGuncelle();
durdurButonu.disabled = true;
