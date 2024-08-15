    const zamanGostergeElementi = document.getElementById('timer');
    const baslatButonu = document.getElementById('start');
    const durdurButonu = document.getElementById('stop');
    const sifirlaButonu = document.getElementById('reset');
  
    // Kronometre değişkenleri
    let baslangicZamani; // Kronometrenin başlatıldığı anın zaman damgası
    let gecenZaman = 0; // Toplam geçen süre (milisaniye cinsinden)
    let zamanSayaci; // setInterval'in referansını tutar
  
    // Kronometreyi başlat
    function kronometreyiBaslat() {

        baslangicZamani = Date.now() - gecenZaman;
        
        zamanSayaci = setInterval(() => {

            gecenZaman = Date.now() - baslangicZamani;
            
            zamaniGuncelle();
        }, 10);
        
        baslatButonu.disabled = true;
        durdurButonu.disabled = false;
    }
  
    // Kronometreyi durdur
    function kronometreyiDurdur() {
        clearInterval(zamanSayaci);
        baslatButonu.disabled = false;
        durdurButonu.disabled = true;
    }
  
    // Kronometreyi sıfırla
    function kronometreyiSifirla() {
        clearInterval(zamanSayaci);
        gecenZaman = 0;
        zamaniGuncelle();
        baslatButonu.disabled = false;
        durdurButonu.disabled = true;
    }
  
    // Gösterilen zamanı güncelle
    function zamaniGuncelle() {
        const dakikalar = Math.floor(gecenZaman / (1000 * 60));
        const saniyeler = Math.floor((gecenZaman % (1000 * 60)) / 1000);
        const milisaniyeler = Math.floor((gecenZaman % 1000) / 10);
  
        zamanGostergeElementi.innerHTML = `
            <h1 class="text">Hogwarts <span>Saati</span> 🐦‍🔥</h1>
            <span>${String(dakikalar).padStart(2, '0')}:</span>${String(saniyeler).padStart(2, '0')}:${String(milisaniyeler).padStart(2, '0')}
        `;
    }
  
    // Olay dinleyicileri
    baslatButonu.addEventListener('click', kronometreyiBaslat);
    durdurButonu.addEventListener('click', kronometreyiDurdur);
    sifirlaButonu.addEventListener('click', kronometreyiSifirla);
  
    // Başlangıç durumu
    zamaniGuncelle();
    durdurButonu.disabled = true;
