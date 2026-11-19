window.ROADMAP_DATA = window.ROADMAP_DATA || [];

window.ROADMAP_DATA.push(
  {
    id: "l1-descriptive",
    level: 1,
    levelTitle: "1. Başlangıç Seviyesi: Veriyi Tanıma ve Olasılık Temelleri",
    order: 1,
    title: "Betimsel İstatistik (Descriptive Statistics)",
    tag: "core",
    explainability: false,
    summary: "Merkezi eğilim, yayılım ölçüleri, aykırı değerlerin etkisi, çarpıklık-basıklık ve veri dönüştürme temelleri.",
    keywords: ["ortalama", "medyan", "mod", "varyans", "standart sapma", "iqr", "boxplot", "skewness", "kurtosis", "log-transform"],
    labId: "lab-descriptive",
    theoryHtml: `
      <div class="card">
        <h3>1. Merkezi Eğilim Ölçüleri</h3>
        <p>Bir veri setinin "tipik" veya "merkez" değerini özetlemek için üç temel ölçü kullanılır:</p>
        <ul>
          <li><strong>Ortalama (Mean, $\\bar{x}$):</strong> Tüm gözlemlerin toplamının gözlem sayısına bölümüdür: $\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i$. Tüm veriyi kullanır ancak <strong>aykırı değerlere (outliers) çok duyarlıdır</strong>.</li>
          <li><strong>Medyan (Median):</strong> Küçükten büyüğe sıralanmış verinin tam ortasındaki değerdir ($n$ çiftse ortadaki iki değerin ortalaması). Aykırı değerlere karşı <strong>dayanıklıdır (robust)</strong>. Gelir, ev fiyatı gibi sağa çarpık verilerde ortalama yerine medyan tercih edilir.</li>
          <li><strong>Mod (Mode):</strong> En sık tekrar eden değerdir. Kategorik değişkenlerde tek geçerli merkezi eğilim ölçüsüdür.</li>
        </ul>
      </div>

      <div class="card">
        <h3>2. Yayılım Ölçüleri ve Kutu Grafiği (Boxplot)</h3>
        <p>İki veri seti aynı ortalamaya sahip olabilir ancak biri çok dar, diğeri çok geniş yayılabilir. Örneğin A ve B sınıflarının not ortalaması 70 olabilir; A'daki herkes 68–72 almışken, B'de yarısı 20, yarısı 100 almış olabilir. Bu farkı anlamak için yayılım ölçülerine bakarız:</p>
        <ul>
          <li><strong>Örneklem Varyansı ($s^2$) ve Standart Sapma ($s$):</strong>
            <div class="formula-box">$$s^2 = \\frac{1}{n-1}\\sum_{i=1}^{n}(x_i - \\bar{x})^2, \\quad s = \\sqrt{s^2}$$</div>
            <ul>
              <li><strong>Neden farkların karesini alırız?</strong> Ortalamadan küçük değerler negatif, büyük değerler pozitif fark üretir; doğrudan toplarsak birbirini sıfırlar. Kare almak hem işaretleri pozitife çevirir hem de ortalamadan çok uzaklaşan noktalara daha büyük ağırlık verir.</li>
              <li><strong>Varyans ($s^2$) ne anlatır?</strong> Noktaların ortalamadan karesel sapmalarının ortalamasıdır. Ancak birimi orijinal verinin <strong>karesidir</strong> (ör. TL² veya saniye²); bu yüzden tek başına günlük hayatta yorumlamak zordur, daha çok matematiksel hesaplamalarda ve modellerde kullanılır.</li>
              <li><strong>Standart Sapma ($s$) ne anlatır?</strong> Varyansın karekökü alınarak birimi tekrar orijinal verinin birimine (TL, saniye, puan) döndürülür. Kabaca <em>"tipik bir gözlemin ortalamadan ortalama ne kadar uzakta olduğunu"</em> söyler. <strong>Küçük $s$</strong> verinin merkeze sıkıca toplandığını (tutarlı/öngörülebilir), <strong>büyük $s$</strong> ise verinin geniş bir aralığa dağıldığını (oynak/değişken) gösterir.</li>
              <li><strong>Neden paydada $n-1$ var?</strong> Örneklem ortalaması $\\bar{x}$'i verinin kendisinden hesapladığımız için 1 serbestlik derecesi kaybederiz; $n$'e bölmek popülasyon varyansını olduğundan küçük tahmin eder. $n-1$'e bölmeye <em>Bessel düzeltmesi</em> denir ve tahmini yansız hale getirir.</li>
            </ul>
          </li>
          <li><strong>Kartiller (Quartiles) ve Çeyrekler Açıklığı (IQR):</strong> Veriyi küçükten büyüğe sıralayıp %25'lik dilimlere bölen $Q_1$ (%25), $Q_2$ (Medyan, %50) ve $Q_3$ (%75) değerleridir. $\\text{IQR} = Q_3 - Q_1$, <strong>verinin tam ortadaki %50'lik kısmının genişliğini</strong> verir. Uç değerlerden etkilenmediği için çarpık verilerde standart sapmaya göre çok daha sağlıklı bir yayılım ölçüsüdür.</li>
          <li><strong>Kutu Grafiği (Boxplot) Aykırı Değer Kuralı:</strong> $Q_1 - 1.5 \\times \\text{IQR}$ altı ve $Q_3 + 1.5 \\times \\text{IQR}$ üstü gözlemler potansiyel aykırı değer (outlier) olarak işaretlenir.</li>
        </ul>
      </div>

      <div class="card">
        <h3>3. Çarpıklık (Skewness) ve Basıklık (Kurtosis)</h3>
        <ul>
          <li><strong>Çarpıklık (Skewness):</strong> Dağılımın simetriden sapmasını ölçer.
            <ul>
              <li><strong>Sağa Çarpık (Pozitif):</strong> Uzun kuyruk sağdadır. Genelde $\\text{Ortalama} > \\text{Medyan}$. Örn: Gelir dağılımı, e-ticaret sepet tutarı.</li>
              <li><strong>Sola Çarpık (Negatif):</strong> Uzun kuyruk soldadır. Genelde $\\text{Ortalama} < \\text{Medyan}$.</li>
            </ul>
          </li>
          <li><strong>Basıklık (Kurtosis):</strong> Dağılımın kuyruklarının kalınlığını (uç değer üretme eğilimini) ölçer. Normal dağılımın basıklığı 3 (excess kurtosis = 0) kabul edilir.</li>
        </ul>
        <div class="callout tip">
          <strong>Veri Bilimi &amp; Özellik Mühendisliği Notu:</strong> Doğrusal regresyon veya mesafe temelli modellerde (KNN, K-Means) aşırı sağa çarpık değişkenlere <code>log(x + 1)</code> (log-transform) uygulamak dağılımı normale yaklaştırır ve aykırı değerlerin modele baskın gelmesini engeller.
        </div>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: Aykırı Değerin Ortalama ve Medyana Etkisi",
        problem: "Bir startup'taki 5 çalışanın aylık maaşları (bin TL): [30, 32, 35, 38, 215]. Ortalama, medyan ve örneklem standart sapmasını hesaplayın.",
        steps: [
          "Veri zaten küçükten büyüğe sıralı: 30, 32, 35, 38, 215 (n = 5).",
          "Ortalama: $\\bar{x} = (30 + 32 + 35 + 38 + 215) / 5 = 350 / 5 = 70$ bin TL.",
          "Medyan: Sıralı 5 elemanın tam ortasındaki 3. eleman = $35$ bin TL.",
          "Farkların kareleri toplamı: $(30-70)^2 + (32-70)^2 + (35-70)^2 + (38-70)^2 + (215-70)^2 = 1600 + 1444 + 1225 + 1024 + 21025 = 26318$.",
          "Örneklem varyansı: $s^2 = 26318 / (5 - 1) = 26318 / 4 = 6579.5$.",
          "Standart sapma: $s = \\sqrt{6579.5} \\approx 81.11$ bin TL."
        ],
        answer: "Ortalama = 70 bin TL, Medyan = 35 bin TL, Varyans = 6579.5 (bin TL)², Standart Sapma ≈ 81.11 bin TL.",
        interpretation: "Tek bir yönetici maaşı (215 bin TL) iki şeyi bozmuştur: (1) Ortalamayı 35'ten 70 bin TL'ye çekerek tipik çalışan maaşını temsil etmez hale getirmiştir. (2) Standart sapmayı 81.11 bin TL'ye fırlatmıştır — yani 'ortalama 70 ± 81 bin TL' demek eksi maaşlara bile inen anlamsız bir aralık üretir! Bu yüzden sağa çarpık maaş/gelir verilerinde ortalama ve standart sapma yerine medyan (35 bin TL) ve IQR kullanılmalıdır."
      },
      {
        title: "Örnek 2: IQR ile Aykırı Değer Tespiti",
        problem: "Bir sensörden alınan 9 ölçüm sıralanmıştır: [10, 12, 13, 15, 16, 18, 19, 21, 40]. Q1, Q3, IQR ve üst aykırı değer sınırını bulun.",
        steps: [
          "Medyan ($Q_2$): 5. eleman = 16.",
          "Alt yarı (medyan hariç ilk 4 eleman): [10, 12, 13, 15] → $Q_1 = (12 + 13)/2 = 12.5$.",
          "Üst yarı (medyan hariç son 4 eleman): [18, 19, 21, 40] → $Q_3 = (19 + 21)/2 = 20$.",
          "$\\text{IQR} = Q_3 - Q_1 = 20 - 12.5 = 7.5$.",
          "Üst sınır = $Q_3 + 1.5 \\times \\text{IQR} = 20 + 1.5 \\times 7.5 = 20 + 11.25 = 31.25$."
        ],
        answer: "Q1 = 12.5, Q3 = 20, IQR = 7.5, Üst Sınır = 31.25 (40 değeri aykırı değerdir).",
        interpretation: "40 ölçümü 31.25 üst sınırını aştığı için veri temizleme aşamasında sensör hatası olup olmadığı incelenmelidir."
      }
    ],
    questions: [
      {
        id: "l1-desc-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir e-ticaret sitesindeki 6 siparişin tutarları (TL): [100, 120, 140, 160, 180, 500]. Bu veri setinin <strong>medyanı</strong> kaç TL'dir?",
        hint: "Veri sıralıdır ve n=6 çifttir. Ortadaki iki değerin (3. ve 4. eleman) ortalamasını alın.",
        answer: 150,
        tolerance: 0.01,
        unit: "TL",
        solutionSteps: [
          "Sıralı veri: [100, 120, 140, 160, 180, 500], $n = 6$.",
          "3. eleman = 140, 4. eleman = 160.",
          "Medyan = $(140 + 160) / 2 = 150$ TL."
        ],
        dsNote: "500 TL'lik uç sipariş ortalamayı (1200/6 = 200 TL) yukarı çekse de medyan 150 TL'de sabit kalmıştır."
      },
      {
        id: "l1-desc-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir modelin 5 farklı test katmanındaki doğruluk skorları (%): [80, 82, 84, 86, 88]. Bu skorların <strong>örneklem standart sapması</strong> ($s$) kaçtır? (Ondalıklı ise 2 basamak girin)",
        hint: "Önce ortalamayı bulun (84). Sonra farkların karelerini toplayıp n-1 = 4'e bölün ve karekök alın.",
        answer: 3.16,
        tolerance: 0.05,
        unit: "%",
        solutionSteps: [
          "Ortalama $\\bar{x} = (80+82+84+86+88)/5 = 84$.",
          "Farkların kareleri toplamı: $(-4)^2 + (-2)^2 + 0^2 + 2^2 + 4^2 = 16 + 4 + 0 + 4 + 16 = 40$.",
          "Örneklem varyansı: $s^2 = 40 / (5 - 1) = 10$.",
          "Standart sapma: $s = \\sqrt{10} \\approx 3.162$."
        ],
        dsNote: "Cross-validation skorlarında standart sapmanın küçük olması modelin farklı veri dilimlerinde kararlı çalıştığını gösterir."
      },
      {
        id: "l1-desc-q3",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir özelliğin $Q_1 = 24$ ve $Q_3 = 44$ olarak hesaplanmıştır. Boxplot (1.5 × IQR) kuralına göre <strong>üst aykırı değer sınırı</strong> kaçtır?",
        hint: "Önce IQR = Q3 - Q1 hesaplayın, sonra Q3 + 1.5 * IQR formülünü uygulayın.",
        answer: 74,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$\\text{IQR} = Q_3 - Q_1 = 44 - 24 = 20$.",
          "Üst sınır = $Q_3 + 1.5 \\times \\text{IQR} = 44 + 1.5 \\times 20 = 44 + 30 = 74$."
        ],
        dsNote: "Aykırı değerleri doğrudan silmeden önce iş bilgisiyle gerçek bir durum mu (ör. VIP müşteri) yoksa veri hatası mı olduğu kontrol edilmelidir."
      },
      {
        id: "l1-desc-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir bankanın kredi başvuru veri setinde 'Yıllık Gelir' değişkeninin ortalaması 480.000 TL, medyanı 260.000 TL ve çarpıklık (skewness) değeri +3.4 olarak ölçülmüştür. Lineer regresyon modeli kurmadan önce en uygun adım hangisidir?",
        options: [
          "Gelir sütununu tamamen silmek çünkü çarpıktır.",
          "Gelir değişkenine logaritmik dönüşüm (log-transform) uygulayıp dağılımı normale yaklaştırmak.",
          "Medyanı ortalamaya eşitlemek için tüm değerlerden 220.000 çıkarmak.",
          "Lineer regresyon sadece kategorik veri kabul ettiği için geliri mod değerine sabitlemek."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Ortalama > Medyan ve skewness = +3.4 olması verinin güçlü biçimde sağa çarpık olduğunu gösterir.",
          "Log dönüşümü büyük değerleri sıkıştırarak sağa çarpıklığı azaltır ve doğrusal ilişkileri belirginleştirir."
        ],
        dsNote: "Sıfır değerler varsa `log1p(x) = log(1 + x)` kullanmak standart pratiktir."
      },
      {
        id: "l1-desc-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Aynı ortalama (50 ms) yanıt süresine sahip iki API servisinden A servisinin IQR'ı 4 ms, B servisinin IQR'ı 35 ms'dir. Kullanıcı deneyimi (tutarlılık) açısından hangisi doğrudur?",
        options: [
          "İki servisin ortalaması eşit olduğu için kullanıcı deneyimleri tamamen aynıdır.",
          "B servisi daha tutarlıdır çünkü IQR değeri daha büyüktür.",
          "A servisi çok daha tutarlıdır; B servisinde yanıt süreleri geniş bir aralığa yayılmıştır.",
          "IQR sadece ortalama 0 olduğunda yorumlanabilir."
        ],
        answerIndex: 2,
        solutionSteps: [
          "IQR, verinin ortadaki %50'lik kısmının yayılımını ölçer.",
          "A servisinde gözlemler merkeze sıkışmıştır (düşük varyasyon), B servisinde ise gecikmeler çok değişkendir."
        ],
        dsNote: "SLA ve gecikme (latency) analizlerinde ortalama yerine medyan (p50) ve p95/p99 yüzdelikleri birlikte raporlanır."
      }
    ]
  },

  {
    id: "l1-bias",
    level: 1,
    levelTitle: "1. Başlangıç Seviyesi: Veriyi Tanıma ve Olasılık Temelleri",
    order: 2,
    title: "Veri Kalitesi ve Yanlılık Kaynakları",
    tag: "core",
    explainability: true,
    summary: "Örnekleme yanlılığı, hayatta kalma yanlılığı ve alt gruplarda eğilimin tersine dönmesi (Simpson Paradoksu).",
    keywords: ["yanlılık", "bias", "sampling", "survivorship", "simpson", "paradoks", "açıklanabilirlik"],
    labId: "lab-simpson",
    theoryHtml: `
      <div class="card">
        <h3>1. Örnekleme ve Hayatta Kalma Yanlılığı</h3>
        <p>En karmaşık makine öğrenmesi modeli bile yanlı (biased) toplanmış veriden doğru sonuç üretemez (<em>Garbage In, Garbage Out</em>).</p>
        <ul>
          <li><strong>Örnekleme Yanlılığı (Sampling Bias):</strong> Örneklemin hedef popülasyonu temsil etmemesidir. Örn: Sadece mobil uygulama kullanan müşterilere anket yapıp tüm müşteriler adına karar vermek.</li>
          <li><strong>Hayatta Kalma Yanlılığı (Survivorship Bias):</strong> Sadece süreci "atlatan" veya görünür kalan örneklere odaklanıp elenenleri görmezden gelmektir. Klasik örnek: II. Dünya Savaşı'nda geri dönen uçakların hasarlı yerlerini değil, <em>geri dönemeyenlerin</em> vurulduğu motor/kokpit bölgelerini zırhlandırmak gerekir. Veri biliminde: Sadece şu an aktif müşterilere bakıp churn (terk) eden eski müşterileri veri setine almamak.</li>
        </ul>
      </div>

      <div class="card">
        <h3>2. Simpson Paradoksu</h3>
        <p>Bir veri setindeki alt grupların her birinde belirli bir eğilim (örneğin A yönteminin B'den iyi olması) görülürken, alt gruplar birleştirildiğinde eğilimin <strong>tam tersine dönmesi</strong> durumudur.</p>
        <p>Bunun temel nedeni genellikle grupların büyüklüklerinin dengesiz olması ve arka planda bir <strong>karıştırıcı değişkenin (confounder)</strong> (ör. vaka zorluğu, yaş, cihaz tipi) bulunmasıdır.</p>
        <div class="callout explain">
          <strong>✱ Açıklanabilirlik Bağlantısı:</strong> Model veya KPI sunumlarında sadece toplam (aggregate) metriğe bakarak karar vermek yönetim kademesini yanlış yönlendirebilir. Segment bazlı kırılımlar mutlaka kontrol edilmelidir.
        </div>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: Simpson Paradoksu — İki Hastane / Tedavi Başarı Oranı",
        problem: "A ve B tedavilerinin hafif ve ağır vakalardaki iyileşme oranları şöyledir:\n- Hafif vakalar: A'da 90/100 (%90), B'de 85/100 (%85)\n- Ağır vakalar: A'da 20/100 (%20), B'de 15/100 (%15)\nAncak gerçek hayatta A'ya 100 hafif + 300 ağır vaka; B'ye 300 hafif + 100 ağır vaka gelmiş olsun (oranlar aynı kalsın: A ağırda 60/300=%20, B hafifde 255/300=%85). Toplam başarı oranlarını hesaplayın.",
        steps: [
          "Tedavi A toplam iyileşen: Hafiften 90 + Ağırdan 60 = 150. Toplam hasta = 100 + 300 = 400. Toplam oran = $150 / 400 = \\%37.5$.",
          "Tedavi B toplam iyileşen: Hafiften 255 + Ağırdan 15 = 270. Toplam hasta = 300 + 100 = 400. Toplam oran = $270 / 400 = \\%67.5$."
        ],
        answer: "Alt gruplarda A daha iyi (%90 > %85 ve %20 > %15) olmasına rağmen toplamda B (%67.5 > %37.5) daha iyi görünür.",
        interpretation: "Tedavi A'ya çok daha fazla ağır vaka geldiği için toplam oranı düşmüştür. Vaka şiddeti (confounder) kontrol edilmeden B'yi seçmek ölümcül bir hata olur."
      },
      {
        title: "Örnek 2: Hayatta Kalma Yanlılığı Hesabı",
        problem: "Bir kredi portföyünde 1.000 başvuru yapılmış, 200'ü reddedilmiş, 800'ü onaylanmıştır. Onaylanan 800 kişinin 760'ı kredisini ödemiş (%95 başarı). Risk ekibi 'kredi modelimiz %95 isabetli' diyebilir mi?",
        steps: [
          "Reddedilen 200 kişinin kredi verilseydi ödeyip ödemeyeceği veri setinde yoktur (reject inference problemi).",
          "Ayrıca sadece 'hala aktif' 800 müşteriye bakıp batıp kapanan geçmiş dönemleri hariç tutmak başarı oranını yapay olarak şişirir."
        ],
        answer: "Hayır, gözlemlenen %95 oranı yalnızca seçilmiş (onaylanmış) alt küme içindir; tüm başvuru popülasyonuna genellenemez.",
        interpretation: "Model eğitilirken seçilim yanlılığı (selection bias) dikkate alınmalı, gerekirse reject inference veya ağırlıklandırma yapılmalıdır."
      }
    ],
    questions: [
      {
        id: "l1-bias-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir A/B testinde A grubunda Mobil'den 100 kişiden 60'ı (%60), Masaüstü'nden 400 kişiden 80'i (%20) satın alma yapmıştır. A grubunun <strong>toplam dönüşüm oranı (%)</strong> kaçtır?",
        hint: "Toplam satın almayı (60 + 80) toplam kullanıcıya (100 + 400) bölüp 100 ile çarpın.",
        answer: 28,
        tolerance: 0.1,
        unit: "%",
        solutionSteps: [
          "Toplam satın alma = $60 + 80 = 140$.",
          "Toplam kullanıcı = $100 + 400 = 500$.",
          "Toplam dönüşüm = $(140 / 500) \\times 100 = \\%28$."
        ],
        dsNote: "Ağırlıklı ortalama, alt grup boyutları (100'e karşı 400) farklı olduğu için doğrudan (%60+%20)/2 = %40 çıkmaz."
      },
      {
        id: "l1-bias-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Önceki sorunun devamı: B grubunda Mobil'den 400 kişiden 220'si (%55), Masaüstü'nden 100 kişiden 15'i (%15) satın alma yapmıştır. B grubunun <strong>toplam dönüşüm oranı (%)</strong> kaçtır?",
        hint: "B'de her alt grupta oran A'dan düşük (%55 < %60 ve %15 < %20), bakalım toplamı kaç çıkacak!",
        answer: 47,
        tolerance: 0.1,
        unit: "%",
        solutionSteps: [
          "Toplam satın alma = $220 + 15 = 235$.",
          "Toplam kullanıcı = $400 + 100 = 500$.",
          "Toplam dönüşüm = $(235 / 500) \\times 100 = \\%47$."
        ],
        dsNote: "İşte Simpson Paradoksu! B grubu hem Mobilde (%55 < %60) hem Masaüstünde (%15 < %20) daha kötü olmasına rağmen toplamda %47 > %28 ile önde görünür."
      },
      {
        id: "l1-bias-q3",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir SaaS şirketi, ürününü 2 yıldır kesintisiz kullanan müşterilerle anket yapıp 'Müşteri memnuniyeti %94, churn riskimiz çok düşük' sonucuna varıyor. Burada hangi yanlılık vardır?",
        options: [
          "Simpson Paradoksu",
          "Hayatta Kalma Yanlılığı (Survivorship Bias)",
          "Çoklu Doğrusal Bağlantı (Multicollinearity)",
          "Overfitting"
        ],
        answerIndex: 1,
        solutionSteps: [
          "Ürünü beğenmeyip ilk 3-6 ayda ayrılan (churn eden) müşteriler 2 yılını dolduranların listesinde yer almaz.",
          "Sadece hayatta kalan/kalan müşterileri incelemek memnuniyeti yapay olarak yüksek gösterir."
        ],
        dsNote: "Churn analizinde tüm kohort (başlangıçta katılan herkes) zaman ekseniyle birlikte izlenmelidir."
      },
      {
        id: "l1-bias-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir şehirdeki trafik kazası tahmin modeli sadece 'akıllı telefon uygulaması üzerinden bildirilen' kazalarla eğitiliyor. Bu durum hangi soruna yol açar?",
        options: [
          "Örnekleme Yanlılığı (Sampling Bias) — akıllı telefon kullanmayan veya bildirim yapmayan bölgeler/kişiler eksik temsil edilir.",
          "Büyük Sayılar Yasası ihlali",
          "L1 Regülarizasyon hatası",
          "Varyans homojenliği artışı"
        ],
        answerIndex: 0,
        solutionSteps: [
          "Veri toplama mekanizması belirli bir demografiyi veya coğrafyayı sistematik olarak dışarıda bırakmaktadır.",
          "Model yoğun uygulama kullanılan bölgeleri 'daha tehlikeli' sanabilir."
        ],
        dsNote: "Veri kaynağının üretim sürecini bilmek, model metriği kadar önemlidir."
      },
      {
        id: "l1-bias-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir veri bilimcisi, toplam veride X özelliği arttıkça Y'nin azaldığını görüyor; ancak veriyi 'Müşteri Segmenti'ne göre böldüğünde her segmentin içinde X arttıkça Y'nin arttığını gözlemliyor. İlk aksiyonu ne olmalıdır?",
        options: [
          "Segment bilgisini modelden çıkarmak",
          "Müşteri Segmenti değişkenini modele dahil ederek veya segment bazlı analiz yaparak Simpson Paradoksu etkisini kontrol etmek",
          "Veriyi rastgele %50 silmek",
          "Sadece ortalamaya bakarak X'in etkisinin negatif olduğunu raporlamak"
        ],
        answerIndex: 1,
        solutionSteps: [
          "Alt gruplarda yön değiştiren ilişki, Müşteri Segmentinin karıştırıcı (confounder) olduğunu gösterir.",
          "Segment değişkeni kontrol edilmeden yapılan yorum hatalı iş kararına yol açar."
        ],
        dsNote: "Explainability (açıklanabilirlik) sunumlarında mutlaka alt kırılım (stratified) grafikler gösterilmelidir."
      }
    ]
  },

  {
    id: "l1-prob",
    level: 1,
    levelTitle: "1. Başlangıç Seviyesi: Veriyi Tanıma ve Olasılık Temelleri",
    order: 3,
    title: "Temel Olasılık ve Bayes Teoremi",
    tag: "core",
    explainability: false,
    summary: "Rastgele değişken, beklenen değer, PMF/PDF/CDF, birleşik-marjinal-koşullu olasılık ve Bayes Teoremi.",
    keywords: ["olasılık", "beklenen değer", "pmf", "pdf", "cdf", "koşullu olasılık", "bayes", "naive bayes"],
    labId: "lab-bayes",
    theoryHtml: `
      <div class="card">
        <h3>1. Rastgele Değişken, Beklenen Değer ve Varyans</h3>
        <p>Bir rastgele deneyin sayısal sonucunu temsil eden değişkene <strong>rastgele değişken ($X$)</strong> denir (ör. bir müşterinin yapacağı harcama tutarı).</p>
        <ul>
          <li><strong>Beklenen Değer $E[X]$ (Uzun Vadeli Ortalama):</strong> Olasılık ağırlıklı ortalamadır: $E[X] = \\sum x_i P(X = x_i)$ (kesikli) veya $\\int x f(x)\\,dx$ (sürekli). <em>Dikkat:</em> Beklenen değer tek bir denemede illa ki çıkacak değer değildir (ör. zar atışında $E[X]=3.5$ çıkar ama zarda 3.5 yüzü yoktur); bu işlemi binlerce kez tekrarlarsak elde edeceğimiz ortalama kazancı/değeri gösterir.</li>
          <li><strong>Varyans $\\text{Var}(X)$ (Belirsizlik ve Risk Ölçüsü):</strong> $E[(X - E[X])^2] = E[X^2] - (E[X])^2$. Beklenen değer etrafındaki sapmanın (riskin/oynaklığın) ölçüsüdür. İki kampanyanın beklenen kârı aynı (ör. 70 TL) olabilir; ancak varyansı büyük olan kampanyada bazen büyük kâr, bazen büyük zarar edilirken, varyansı küçük olan daha öngörülebilirdir.</li>
        </ul>
      </div>

      <div class="card">
        <h3>2. PMF, PDF ve CDF; Birleşik ve Marjinal Dağılımlar</h3>
        <ul>
          <li><strong>PMF (Probability Mass Function):</strong> Kesikli değişkenlerde $P(X = x)$ olasılığını verir. Toplamları 1'dir.</li>
          <li><strong>PDF (Probability Density Function):</strong> Sürekli değişkenlerde olasılık yoğunluğunu verir ($f(x)$). Tek bir noktanın olasılığı 0'dır; olasılık eğri altındaki <strong>alan (integral)</strong> ile bulunur.</li>
          <li><strong>CDF (Cumulative Distribution Function):</strong> $F(x) = P(X \\le x)$ birikimli olasılıktır.</li>
          <li><strong>Birleşik (Joint) $P(X, Y)$ ve Marjinal $P(X)$:</strong> İki olayın birlikte gerçekleşme olasılığı birleşiktir. Diğer değişken üzerinden toplayarak/integre ederek marjinal olasılık elde edilir: $P(X) = \\sum_y P(X, Y=y)$.</li>
        </ul>
      </div>

      <div class="card">
        <h3>3. Koşullu Olasılık, Bağımsızlık ve Bayes Teoremi</h3>
        <p>$B$ olayının gerçekleştiği bilindiğinde $A$'nın olasılığı:</p>
        <div class="formula-box">$$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$$</div>
        <p>Eğer $P(A \\mid B) = P(A)$ ise (yani $P(A \\cap B) = P(A)P(B)$), $A$ ve $B$ <strong>bağımsızdır</strong>.</p>
        <p><strong>Bayes Teoremi:</strong> Yeni kanıt ($B$) geldiğinde inancımızı ($P(A)$) güncellememizi sağlar:</p>
        <div class="formula-box">$$P(A \\mid B) = \\frac{P(B \\mid A)\\, P(A)}{P(B)}$$</div>
        <div class="callout tip">
          <strong>Veri Bilimi Bağlantısı:</strong> Naive Bayes sınıflandırıcısı, Spam filtresi, dolandırıcılık (fraud) tespiti ve tıbbi test yorumlama doğrudan Bayes Teoremi'ne dayanır.
        </div>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: Beklenen Değer ve Varyans Hesabı",
        problem: "Bir e-ticaret kupon kampanyasında müşterinin harcama yapmama olasılığı 0.6 (0 TL kâr), küçük alışveriş olasılığı 0.3 (100 TL kâr), büyük alışveriş olasılığı 0.1 (400 TL kâr) olsun. Beklenen kârı $E[X]$ ve varyansı hesaplayın.",
        steps: [
          "$E[X] = 0(0.6) + 100(0.3) + 400(0.1) = 0 + 30 + 40 = 70$ TL.",
          "$E[X^2] = 0^2(0.6) + 100^2(0.3) + 400^2(0.1) = 0 + 3000 + 16000 = 19000$.",
          "$\\text{Var}(X) = E[X^2] - (E[X])^2 = 19000 - 70^2 = 19000 - 4900 = 14100$.",
          "Standart sapma = $\\sqrt{14100} \\approx 118.74$ TL."
        ],
        answer: "E[X] = 70 TL, Var(X) = 14.100 TL², Standart Sapma ≈ 118.74 TL.",
        interpretation: "Beklenen kâr (70 TL), bu kuponu binlerce müşteriye gönderdiğimizde müşteri başına ortalama 70 TL gelir elde edeceğimizi söyler; yani kupon maliyeti 70 TL'nin altındaysa kampanya uzun vadede kârlıdır. Standart sapmanın 118.74 TL gibi yüksek çıkması ise müşteri bazında harcamaların çok değişken olduğunu (çoğu kişi 0 TL harcarken az sayıda kişinin 400 TL harcadığını) gösterir."
      },
      {
        title: "Örnek 2: Bayes Teoremi — Dolandırıcılık (Fraud) Alarmı",
        problem: "İşlemlerin %1'i dolandırıcılıktır ($P(F)=0.01$). Fraud tespit modeli gerçek bir fraud'u %90 doğrulukla yakalar ($P(+\\mid F)=0.90$), ancak normal işlemlere de %5 oranında yanlış alarm verir ($P(+\\mid F^c)=0.05$). Model alarm verdiğinde işlemin gerçekten fraud olma olasılığı $P(F\\mid +)$ nedir?",
        steps: [
          "Toplam alarm olasılığı: $P(+) = P(+\\mid F)P(F) + P(+\\mid F^c)P(F^c) = 0.90(0.01) + 0.05(0.99) = 0.009 + 0.0495 = 0.0585$.",
          "Bayes formülü: $P(F\\mid +) = \\frac{0.009}{0.0585} \\approx 0.1538$ (%15.38)."
        ],
        answer: "P(Fraud | Alarm) ≈ 0.1538 (%15.38).",
        interpretation: "Model %90 duyarlılığa sahip olsa da gerçek fraud oranı çok düşük (%1) olduğu için alarmların yalnızca %15.4'ü gerçek fraud'dur (base rate fallacy). Bu yüzden precision-recall dengesi kritik önem taşır."
      }
    ],
    questions: [
      {
        id: "l1-prob-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir oyunda zar atılıyor: 6 gelirse 120 TL kazanılıyor, diğer durumlarda 0 TL. Bu oyunun <strong>beklenen değeri</strong> ($E[X]$) kaç TL'dir?",
        hint: "6 gelme olasılığı 1/6, diğer durumlar 5/6.",
        answer: 20,
        tolerance: 0.01,
        unit: "TL",
        solutionSteps: [
          "$E[X] = 120 \\times (1/6) + 0 \\times (5/6) = 20$ TL."
        ],
        dsNote: "Beklenen değer, bir stratejinin çok sayıda tekrardaki ortalama getirisini ölçer."
      },
      {
        id: "l1-prob-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir popülasyonda hastalık oranı %2'dir ($P(H)=0.02$). Test, hasta kişide %95 pozitif ($P(+\\mid H)=0.95$), sağlıklı kişide %10 yanlış pozitif ($P(+\\mid H^c)=0.10$) veriyor. Testi pozitif çıkan birinin <strong>gerçekten hasta olma olasılığı (%)</strong> kaçtır? (1 ondalık basamak)",
        hint: "P(+) = 0.95*0.02 + 0.10*0.98 hesaplayın, sonra (0.95*0.02)/P(+) * 100 yapın.",
        answer: 16.2,
        tolerance: 0.2,
        unit: "%",
        solutionSteps: [
          "$P(+\\cap H) = 0.95 \\times 0.02 = 0.019$.",
          "$P(+\\cap H^c) = 0.10 \\times 0.98 = 0.098$.",
          "$P(+) = 0.019 + 0.098 = 0.117$.",
          "$P(H\\mid +) = 0.019 / 0.117 \\approx 0.1624 = \\%16.2$."
        ],
        dsNote: "Düşük baz oranlı (imbalanced) sınıflandırma problemlerinde yüksek doğruluk (accuracy) yanıltıcıdır; Precision'a bakılmalıdır."
      },
      {
        id: "l1-prob-q3",
        type: "numeric",
        category: "Hesaplama",
        prompt: "İki bağımsız olaydan $P(A) = 0.4$ ve $P(B) = 0.5$'tir. İkisinin birden gerçekleşmeme olasılığı $P(A^c \\cap B^c)$ (yani <strong>hiçbirinin olmama olasılığı</strong>) kaçtır?",
        hint: "Bağımsızlarsa P(A değil ve B değil) = (1 - P(A)) * (1 - P(B)).",
        answer: 0.3,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$P(A^c) = 1 - 0.4 = 0.6$, $P(B^c) = 1 - 0.5 = 0.5$.",
          "Bağımsızlık gereği $P(A^c \\cap B^c) = 0.6 \\times 0.5 = 0.30$."
        ],
        dsNote: "Sistem güvenilirliği ve yedekli sunucu tasarımlarında bağımsızlık varsayımı bu şekilde kullanılır."
      },
      {
        id: "l1-prob-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Sürekli bir rastgele değişkenin PDF grafiğinde $f(x=5) = 1.4$ olarak görünüyor. $P(X = 5)$ olasılığı hakkında hangisi doğrudur?",
        options: [
          "Olasılık 1.4'tür (%140).",
          "Sürekli dağılımda tek bir noktanın olasılığı 0'dır; 1.4 sadece o noktadaki olasılık yoğunluğudur.",
          "PDF değeri hiçbir zaman 1'den büyük olamaz, grafik hatalıdır.",
          "CDF değeri 1.4'tür."
        ],
        answerIndex: 1,
        solutionSteps: [
          "PDF olasılık değil, olasılık yoğunluğudur; toplam alan 1 olduğu sürece dar bir aralıkta $f(x) > 1$ olabilir.",
          "Sürekli değişkende $P(X=5) = \\int_5^5 f(x)\\,dx = 0$'dır."
        ],
        dsNote: "Olasılık yoğunluğu ile olasılığı karıştırmamak, özellikle sürekli dağılımlarda (Normal, Beta) ve MLE'de kritiktir."
      },
      {
        id: "l1-prob-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Naive Bayes algoritması neden 'Naive' (Saf) olarak adlandırılır?",
        options: [
          "Sadece küçük veri setlerinde çalıştığı için",
          "Sınıf verildiğinde tüm özelliklerin birbirinden koşullu bağımsız olduğunu varsaydığı için",
          "Olasılıkları 0 ile 100 arasında tuttuğu için",
          "Bayes Teoremini hiç kullanmadığı için"
        ],
        answerIndex: 1,
        solutionSteps: [
          "Naive Bayes, $P(x_1, x_2, \\dots, x_k \\mid y) = \\prod_{i=1}^k P(x_i \\mid y)$ varsayımını yapar.",
          "Gerçek hayatta özellikler korelasyonlu olsa bile bu sadeleştirme çok hızlı ve şaşırtıcı derecede iyi çalışan bir temel model sunar."
        ],
        dsNote: "Metin sınıflandırma (NLP) ve yüksek boyutlu seyrek verilerde Naive Bayes güçlü bir baseline modeldir."
      }
    ]
  },

  {
    id: "l1-dist",
    level: 1,
    levelTitle: "1. Başlangıç Seviyesi: Veriyi Tanıma ve Olasılık Temelleri",
    order: 4,
    title: "Temel Olasılık Dağılımları",
    tag: "core",
    explainability: false,
    summary: "Kesikli (Bernoulli, Binom, Poisson) ve Sürekli (Normal, Standart Normal Z-skoru, Üniform, Üstel) dağılımlar.",
    keywords: ["bernoulli", "binom", "poisson", "normal", "gaussian", "z-skoru", "üniform", "üstel", "exponential"],
    labId: "lab-normal",
    theoryHtml: `
      <div class="card">
        <h3>1. Kesikli (Discrete) Dağılımlar</h3>
        <p>Formülleri ezberlemek yerine hangi gerçek hayat sürecini modellediklerini bilmek yeterlidir:</p>
        <ul>
          <li><strong>Bernoulli($p$):</strong> Tek bir evet/hayır denemesi (yazı-tura, kullanıcının reklama tıklaması). $E[X]=p$, $\\text{Var}(X)=p(1-p)$.</li>
          <li><strong>Binom($n, p$):</strong> Bağımsız $n$ Bernoulli denemesindeki toplam başarı sayısı (1000 ziyaretçiden kaçı satın aldı?). $E[X]=np$, $\\text{Var}(X)=np(1-p)$.</li>
          <li><strong>Poisson($\\lambda$):</strong> Sabit bir zaman/mekân biriminde nadir olayların gerçekleşme sayısı (saatte gelen çağrı sayısı, dakikadaki sunucu hatası). $E[X]=\\lambda$, $\\text{Var}(X)=\\lambda$.</li>
        </ul>
      </div>

      <div class="card">
        <h3>2. Sürekli (Continuous) Dağılımlar</h3>
        <ul>
          <li><strong>Normal (Gaussian) $\\mathcal{N}(\\mu, \\sigma^2)$:</strong> Doğada ve istatistikte en yaygın çan eğrisi dağılımı. Ortalama $\\mu$ ve standart sapma $\\sigma$ ile tamamen tanımlanır.
            <ul><li><strong>68-95-99.7 Kuralı:</strong> Verinin ~%68'i $\\mu \\pm 1\\sigma$, ~%95'i $\\mu \\pm 2\\sigma$, ~%99.7'si $\\mu \\pm 3\\sigma$ aralığındadır.</li></ul>
          </li>
          <li><strong>Standart Normal &amp; Z-skoru:</strong> $\\mu=0, \\sigma=1$ olan Normal dağılımdır. Herhangi bir gözlemin standartlaştırılmış hali:
            <div class="formula-box">$$Z = \\frac{x - \\mu}{\\sigma}$$</div>
          </li>
          <li><strong>Üniform $U(a, b)$:</strong> $[a, b]$ aralığındaki tüm değerlerin eşit yoğunlukta olması (rastgele sayı üreteçleri, A/B testi trafik bölme).</li>
          <li><strong>Üstel (Exponential) $\\text{Exp}(\\lambda)$:</strong> Poisson sürecinde ardışık iki olay arasında geçen <strong>bekleme süresini</strong> modeller (bir sonraki müşteri ne zaman gelecek?). $E[X] = 1/\\lambda$.</li>
        </ul>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: Z-Skoru ve Standardizasyon",
        problem: "Bir fabrikada üretilen vidaların uzunluğu $\\mathcal{N}(50\\text{ mm}, 2^2)$ dağılımına uyuyor. 54 mm uzunluğundaki bir vidanın Z-skoru nedir ve yaklaşık olarak gözlemlerin yüzde kaçı bundan daha uzundur?",
        steps: [
          "$Z = (54 - 50) / 2 = +2.0$.",
          "68-95-99.7 kuralına göre $\\mu \\pm 2\\sigma$ aralığı verinin %95'ini kapsar; dışarıda %5 kalır.",
          "Dağılım simetrik olduğu için sadece sağ kuyrukta ($Z > 2$) kalan oran $\\%5 / 2 = \\%2.5$'tir."
        ],
        answer: "Z = +2.0, 54 mm'den uzun vidaların oranı yaklaşık %2.5 (tam olarak %2.28).",
        interpretation: "Özellik ölçeklemede (StandardScaler) tam olarak bu Z-skoru formülü kullanılır."
      },
      {
        title: "Örnek 2: Binom ve Poisson Parametreleri",
        problem: "Bir çağrı merkezine saatte ortalama 12 arama gelmektedir (Poisson). Ayrıca aramaların %25'i satışla sonuçlanmaktadır. 20 aramadan beklenen satış sayısı ve standart sapması nedir?",
        steps: [
          "Arama sayısı Poisson($\\lambda = 12$): Ortalama 12, Varyans 12.",
          "20 aramadaki satış sayısı Binom($n = 20, p = 0.25$).",
          "Beklenen satış = $np = 20 \\times 0.25 = 5$.",
          "Standart sapma = $\\sqrt{np(1-p)} = \\sqrt{20 \\times 0.25 \\times 0.75} = \\sqrt{3.75} \\approx 1.94$."
        ],
        answer: "Beklenen satış = 5, Standart Sapma ≈ 1.94.",
        interpretation: "Poisson sayım verilerini modellerken (örn. Poisson regresyon), Binom ise dönüşüm/tıklama sayılarını modeller."
      }
    ],
    questions: [
      {
        id: "l1-dist-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir web sitesinde 100 ziyaretçinin her birinin satın alma olasılığı $p = 0.1$'dir (Binom dağılımı). Beklenen satın alma sayısının <strong>varyansı</strong> kaçtır?",
        hint: "Binom varyansı = n * p * (1 - p).",
        answer: 9,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$\\text{Var}(X) = n p (1 - p) = 100 \\times 0.1 \\times 0.9 = 9$."
        ],
        dsNote: "Standart sapma $\\sqrt{9} = 3$ olduğundan beklenen 10 satışın $\\pm 3$ (yani 7-13 arası) oynaması normaldir."
      },
      {
        id: "l1-dist-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir sınıftaki sınav notları Normal dağılımlı olup $\\mu = 70$, $\\sigma = 10$'dur. 85 alan bir öğrencinin <strong>Z-skoru</strong> kaçtır?",
        hint: "Z = (x - μ) / σ",
        answer: 1.5,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$Z = (85 - 70) / 10 = 15 / 10 = 1.5$."
        ],
        dsNote: "Z-skoru farklı ölçeklerdeki değişkenleri (ör. yaş ve maaş) aynı birime getirerek K-Means, SVM veya Lojistik Regresyonda kullanmamızı sağlar."
      },
      {
        id: "l1-dist-q3",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir sunucuya dakikada ortalama $\\lambda = 4$ istek gelmektedir (Poisson süreci). İki istek arasındaki <strong>beklenen bekleme süresi</strong> ($E[X] = 1/\\lambda$) kaç dakikadır?",
        hint: "Üstel dağılımda ortalama bekleme süresi 1 / λ'dır.",
        answer: 0.25,
        tolerance: 0.01,
        unit: "dakika",
        solutionSteps: [
          "$E[X] = 1 / \\lambda = 1 / 4 = 0.25$ dakika (15 saniye)."
        ],
        dsNote: "Poisson olay sayısını, Üstel dağılım ise olaylar arası süreyi modeller."
      },
      {
        id: "l1-dist-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir e-ticaret sitesinde bir kullanıcının gün içinde yaptığı toplam sipariş sayısını (0, 1, 2, 3...) tahmin etmek için bir regresyon modeli kuracaksınız. Hedef değişken için hangi dağılım varsayımı en uygundur?",
        options: [
          "Üniform Dağılım",
          "Poisson Dağılımı",
          "Bernoulli Dağılımı",
          "Sürekli Üstel Dağılım"
        ],
        answerIndex: 1,
        solutionSteps: [
          "Sipariş sayısı negatif olmayan tam sayılardır (count data) ve belirli bir zaman penceresinde gerçekleşir.",
          "Bu tür sayım verileri Poisson dağılımı (veya aşırı yayılım varsa Negatif Binom) ile modellenir."
        ],
        dsNote: "Poisson Regresyon (GLM) tam olarak bu senaryo için kullanılır."
      },
      {
        id: "l1-dist-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Normal dağılıma uyan bir metrikte gözlemlerin %95'i [120, 200] aralığında yer almaktadır. 68-95-99.7 kuralına göre bu dağılımın ortalaması ($\\mu$) ve standart sapması ($\\sigma$) yaklaşık nedir?",
        options: [
          "μ = 160, σ = 40",
          "μ = 160, σ = 20",
          "μ = 150, σ = 25",
          "μ = 160, σ = 10"
        ],
        answerIndex: 1,
        solutionSteps: [
          "Ortalama aralığın tam ortasıdır: $\\mu = (120 + 200) / 2 = 160$.",
          "Verinin %95'i $\\mu \\pm 2\\sigma$ aralığındadır: $2\\sigma = 200 - 160 = 40 \\implies \\sigma = 20$."
        ],
        dsNote: "Hızlı veri keşfinde (EDA) bu kural sayesinde standart sapmayı saniyeler içinde tahmin edebilirsiniz."
      }
    ]
  },

  {
    id: "l1-corr",
    level: 1,
    levelTitle: "1. Başlangıç Seviyesi: Veriyi Tanıma ve Olasılık Temelleri",
    order: 5,
    title: "Korelasyon ve Kovaryans",
    tag: "core",
    explainability: true,
    summary: "Kovaryans, Pearson (doğrusal) ve Spearman (monotonik) korelasyonları ve nedensellik tuzağı.",
    keywords: ["korelasyon", "kovaryans", "pearson", "spearman", "nedensellik", "causation", "açıklanabilirlik"],
    labId: "lab-corr",
    theoryHtml: `
      <div class="card">
        <h3>1. Kovaryans ve Pearson Korelasyonu ($r$)</h3>
        <p><strong>Kovaryans</strong> iki değişkenin birlikte nasıl hareket ettiğini ölçer (biri artarken diğeri de artıyorsa pozitif, azalıyorsa negatif): </p>
        <div class="formula-box">$$\\text{Cov}(X, Y) = \\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})$$</div>
        <p>Ancak kovaryansın birimi iki değişkenin birimlerinin çarpımıdır (ör. TL × saat) ve büyüklüğü ölçeğe bağlıdır; bu yüzden "Cov = 150 güçlü mü zayıf mı?" sorusunu cevaplayamaz. Kovaryansı standart sapmalara bölerek birimsiz ve her zaman $[-1, +1]$ arasına sıkıştırılmış <strong>Pearson Korelasyon Katsayısı ($r$)</strong> elde edilir:</p>
        <div class="formula-box">$$r = \\frac{\\text{Cov}(X, Y)}{s_X \\, s_Y}$$</div>
        <p>$r = +1$ mükemmel pozitif doğrusal ilişkiyi, $r = -1$ mükemmel negatif doğrusal ilişkiyi, $r = 0$ ise <strong>doğrusal</strong> ilişki olmadığını gösterir (ancak eğrisel/parabolik bir ilişki yine de olabilir!). Aykırı değerlere duyarlıdır.</p>
      </div>

      <div class="card">
        <h3>2. Spearman Sıra Korelasyonu ($\\rho$)</h3>
        <p>Değerlerin kendisi yerine <strong>sıra numaralarını (rank)</strong> kullanarak Pearson hesaplar. Böylece doğrusal olmayan ama <strong>monotonik</strong> (biri artarken diğeri sürekli artan/azalan) ilişkileri de yakalar ve aykırı değerlere karşı dayanıklıdır.</p>
      </div>

      <div class="card">
        <h3>3. Korelasyon Nedensellik Değildir!</h3>
        <div class="callout explain">
          <strong>✱ Açıklanabilirlik Bağlantısı:</strong> Dondurma satışları ile boğulma vakaları arasında yüksek pozitif korelasyon vardır; ancak dondurma boğulmaya neden olmaz — ikisini de artıran gizli değişken <strong>yaz sıcaklığıdır (confounder)</strong>. İş paydaşlarına "X arttıkça Y artıyor" demek başka, "X'i artırırsak Y kesin artar" demek bambaşka şeylerdir.
        </div>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: Kovaryans ve Pearson Korelasyonu Hesabı",
        problem: "X = [1, 2, 3] ve Y = [2, 4, 6] için örneklem kovaryansı ve Pearson r değerini hesaplayın.",
        steps: [
          "$\\bar{x} = 2$, $\\bar{y} = 4$.",
          "$\\text{Cov}(X, Y) = \\frac{(1-2)(2-4) + (2-2)(4-4) + (3-2)(6-4)}{3-1} = \\frac{2 + 0 + 2}{2} = 2$.",
          "$s_X = \\sqrt{\\frac{1+0+1}{2}} = 1$, $s_Y = \\sqrt{\\frac{4+0+4}{2}} = 2$.",
          "$r = \\frac{2}{1 \\times 2} = +1.0$."
        ],
        answer: "Cov(X, Y) = 2, Pearson r = +1.0.",
        interpretation: "Y = 2X tam doğrusal ilişkisi olduğu için r = +1 çıkmıştır."
      },
      {
        title: "Örnek 2: Doğrusal Olmayan İlişkide Pearson vs Spearman",
        problem: "X = [1, 2, 3, 4, 5] ve Y = [1, 8, 27, 64, 125] ($Y = X^3$) için Spearman korelasyonu kaçtır?",
        steps: [
          "X sıraları: [1, 2, 3, 4, 5].",
          "Y sıraları: [1, 2, 3, 4, 5] (çünkü $Y$ kesin artan/monotoniktir).",
          "Sıralar birebir aynı olduğu için Spearman $\\rho = +1.0$ çıkar (Pearson ise eğrisellik yüzünden 1'den küçük, ~0.94 çıkar)."
        ],
        answer: "Spearman ρ = +1.0.",
        interpretation: "Monotonik ama eğrisel ilişkilerde Spearman gerçek bağıntı gücünü daha iyi yakalar."
      }
    ],
    questions: [
      {
        id: "l1-corr-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "İki değişken için $\\text{Cov}(X, Y) = 12$, $s_X = 3$ ve $s_Y = 5$ olarak verilmiştir. <strong>Pearson korelasyon katsayısı ($r$)</strong> kaçtır?",
        hint: "r = Cov(X, Y) / (s_X * s_Y)",
        answer: 0.8,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$r = 12 / (3 \\times 5) = 12 / 15 = 0.80$."
        ],
        dsNote: "0.80 güçlü bir pozitif doğrusal ilişkiye işaret eder."
      },
      {
        id: "l1-corr-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "$X = [2, 4, 6]$ ve $Y = [9, 6, 3]$ veri çiftleri için <strong>örneklem kovaryansı</strong> $\\text{Cov}(X, Y)$ kaçtır?",
        hint: "Ortalamalar 4 ve 6'dır. Fark çarpımlarını toplayıp n-1 = 2'ye bölün.",
        answer: -6,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$\\bar{x} = 4$, $\\bar{y} = 6$.",
          "Çarpımlar: $(2-4)(9-6) + (4-4)(6-6) + (6-4)(3-6) = (-2)(3) + 0 + (2)(-3) = -12$.",
          "$\\text{Cov}(X, Y) = -12 / (3 - 1) = -6$."
        ],
        dsNote: "Negatif kovaryans bir değişken artarken diğerinin azaldığını gösterir."
      },
      {
        id: "l1-corr-q3",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir veri setinde $Y = X^2$ ilişkisi vardır ve $X$ değerleri $[-3, -2, -1, 0, 1, 2, 3]$ şeklindedir. Pearson korelasyonu yaklaşık 0 çıkmıştır. Bu ne anlama gelir?",
        options: [
          "X ile Y arasında hiçbir ilişki yoktur, X modelden atılabilir.",
          "Doğrusal ilişki 0'dır ama güçlü bir doğrusal olmayan (parabolik) ilişki vardır.",
          "Hesaplama kesinlikle yanlıştır, korelasyon 1 çıkmalıydı.",
          "Spearman korelasyonu kesinlikle 1 çıkar."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Simetrik bir U-eğrisinde negatif ve pozitif taraftaki eğimler birbirini götürdüğü için doğrusal korelasyon (Pearson) 0 çıkar.",
          "Ancak $Y = X^2$ deterministik bir ilişkidir! Saçılım grafiği (scatter plot) çizmeden özellik elenmemelidir."
        ],
        dsNote: "Ağaç tabanlı modeller (XGBoost, Random Forest) bu tür doğrusal olmayan ilişkileri yakalarken, lineer modeller için $X^2$ özelliği türetilmelidir."
      },
      {
        id: "l1-corr-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Veri setinde birkaç aşırı aykırı değer (outlier) bulunmaktadır ve iki değişken arasındaki sıralı (monotonik) ilişkiyi ölçmek istiyorsunuz. Hangisini tercih etmelisiniz?",
        options: [
          "Pearson Korelasyonu",
          "Kovaryans",
          "Spearman Sıra Korelasyonu",
          "Standart Sapma"
        ],
        answerIndex: 2,
        solutionSteps: [
          "Spearman ham değerler yerine sıraları (rank) kullandığı için aykırı değerin büyüklüğünden etkilenmez."
        ],
        dsNote: "Özellik seçimi (feature selection) aşamasında hem Pearson hem Spearman'a bakmak gizli örüntüleri yakalamanızı sağlar."
      },
      {
        id: "l1-corr-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir sağlık uygulaması verisinde 'günlük adım sayısı' ile 'hastaneye yatış oranı' arasında $r = -0.65$ korelasyon bulunuyor. Pazarlama ekibi 'Kullanıcılara zorla günde 10 bin adım attırırsak hastaneye yatışlar %65 düşer' demek istiyor. Doğru yaklaşım nedir?",
        options: [
          "Onaylamak, çünkü r = -0.65 çok güçlüdür.",
          "Reddetmek; zaten sağlıklı ve genç olan bireyler daha çok yürüyebildiği için sağlık durumu burada karıştırıcı (confounder) olabilir. Nedensellik için deney/A-B testi gerekir.",
          "Sadece Pearson yerine kovaryans kullanmak.",
          "Korelasyonu karesini alıp %42 düşer demek."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Gözlemsel verideki korelasyon ters nedensellik veya üçüncü bir değişken (yaş/mevcut sağlık) kaynaklı olabilir.",
          "Korelasyon katsayısı yüzde düşüş oranı değildir."
        ],
        dsNote: "İş birimlerine korelasyon sunarken nedensel iddia kurmamak veri bilimcisi güvenilirliğinin temelidir."
      }
    ]
  }
);
