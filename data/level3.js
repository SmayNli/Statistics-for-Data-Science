window.ROADMAP_DATA = window.ROADMAP_DATA || [];

window.ROADMAP_DATA.push(
  {
    id: "l3-infotheory",
    level: 3,
    levelTitle: "3. İleri Seviye: Modelleme, Bilgi Teorisi ve Nedensellik",
    order: 15,
    title: "Bilgi Teorisi (Information Theory)",
    tag: "core",
    explainability: false,
    summary: "Entropi, Çapraz Entropi (Cross-Entropy) ve KL Iraksaması (Kullback-Leibler Divergence); sinir ağlarının eğitimiyle bağlantısı.",
    keywords: ["entropi", "entropy", "cross-entropy", "kl", "kullback-leibler", "bilgi teorisi", "yapay zeka"],
    labId: "lab-entropy",
    theoryHtml: `
      <div class="card">
        <h3>1. Entropi (Entropy) — Belirsizliğin Ölçüsü</h3>
        <p>Bir olasılık dağılımındaki belirsizliği (veya ortalama sürpriz miktarını) ölçer. Kesikli dağılım $P$ için:</p>
        <div class="formula-box">$$H(P) = -\\sum_{i} P(x_i) \\log_2 P(x_i) \\quad (\\text{bit cinsinden; veya } \\ln \\text{ ile nat cinsinden})$$</div>
        <p><strong>"Bit" cinsinden sayı bize ne anlatır?</strong> Bir sonucu tahmin etmek için ortalama kaç tane en verimli "evet/hayır" sorusu sormamız (veya kodu kaç bitle sıkıştırabileceğimiz) gerektiğini gösterir.</p>
        <ul>
          <li>Sonuç kesin ise ($P=[1, 0]$): $H(P) = 0$ bit (sıfır belirsizlik, hiç soru sormaya gerek yok).</li>
          <li>Tamamen eşit/rastgele ise ($P=[0.5, 0.5]$): $H(P) = 1$ bit (maksimum belirsizlik, sonucu bilmek için en az 1 evet/hayır sorusu şarttır).</li>
        </ul>
      </div>

      <div class="card">
        <h3>2. Çapraz Entropi (Cross-Entropy) ve KL Iraksaması</h3>
        <p>Gerçek dağılım $P$ iken modelimizin tahmin ettiği dağılım $Q$ olsun:</p>
        <div class="formula-box">$$H(P, Q) = -\\sum_{i} P(x_i) \\log Q(x_i)$$</div>
        <p><strong>KL Iraksaması (Kullback-Leibler Divergence):</strong> $Q$ dağılımının gerçek $P$ dağılımından ne kadar saptığını (ekstra bilgi kaybını) ölçer (asimetriktir: $D_{KL}(P \\parallel Q) \\ne D_{KL}(Q \\parallel P)$):</p>
        <div class="formula-box">$$D_{KL}(P \\parallel Q) = \\sum_{i} P(x_i) \\log \\frac{P(x_i)}{Q(x_i)} = H(P, Q) - H(P)$$</div>
        <div class="callout tip">
          <strong>ML / Derin Öğrenme Bağlantısı:</strong> Gerçek dağılım $P$ sabit olduğu için $H(P)$ sabittir. Bu yüzden bir sinir ağında <strong>Cross-Entropy kaybını $H(P, Q)$ minimize etmek, modelin tahmin dağılımı $Q$ ile gerçek veri dağılımı $P$ arasındaki KL Iraksamasını minimize etmekle birebir aynıdır!</strong> Ayrıca karar ağaçlarında (ID3/C4.5) bölünme kalitesi Entropi düşüşü (Information Gain) ile ölçülür.
        </div>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: İkili Entropi Hesabı",
        problem: "Bir veri setinde müşteri churn oranı %50 ($P=[0.5, 0.5]$) iken başka bir veri setinde %10 ($P=[0.1, 0.9]$)'dur. İki dağılımın bit cinsinden ($\\log_2$) entropisini karşılaştırın.",
        steps: [
          "1. durum: $H = -(0.5\\log_2 0.5 + 0.5\\log_2 0.5) = -(0.5(-1) + 0.5(-1)) = 1.0$ bit.",
          "2. durum: $H = -(0.1\\log_2 0.1 + 0.9\\log_2 0.9) \\approx -(0.1(-3.322) + 0.9(-0.152)) = 0.332 + 0.137 = 0.469$ bit."
        ],
        answer: "P=[0.5, 0.5] için 1.0 bit; P=[0.1, 0.9] için ≈ 0.469 bit.",
        interpretation: "Sınıflar %50-%50 iken belirsizlik zirvededir (1.0 bit); her gözlem tamamen sürprizdir. Oran %10-%90'a kaydığında zaten %90 olasılıkla ne olacağını tahmin edebildiğimiz için ortalama sürpriz/belirsizlik yarıdan fazla düşer (0.469 bit). Karar ağaçları düğümleri bölerken işte bu entropi sayısını düşürmeye çalışır."
      },
      {
        title: "Örnek 2: Cross-Entropy ve KL Iraksaması",
        problem: "Gerçek dağılım $P = [0.8, 0.2]$, modelin tahmini $Q = [0.5, 0.5]$ olsun ($\\log_2$ kullanın). $H(P, Q)$ ve $D_{KL}(P \\parallel Q)$'yu hesaplayın.",
        steps: [
          "$H(P) = -(0.8 \\log_2 0.8 + 0.2 \\log_2 0.2) \\approx -(0.8(-0.322) + 0.2(-2.322)) = 0.258 + 0.464 = 0.722$ bit.",
          "$H(P, Q) = -(0.8 \\log_2 0.5 + 0.2 \\log_2 0.5) = -(0.8(-1) + 0.2(-1)) = 1.0$ bit.",
          "$D_{KL}(P \\parallel Q) = H(P, Q) - H(P) = 1.0 - 0.722 = 0.278$ bit."
        ],
        answer: "H(P, Q) = 1.0 bit, D_KL(P || Q) ≈ 0.278 bit.",
        interpretation: "Gerçek doğa $P$'nin kaçınılmaz içsel belirsizliği 0.722 bittir; ancak modelimiz yanlışlıkla $Q=[0.5, 0.5]$ tahmin ettiği için her gözlem başına ortalama 1.0 bit maliyet öder. Aradaki fark olan 0.278 bit ($D_{KL}$), tamamen modelimizin gerçek dağılımdan sapmasının ürettiği 'gereksiz ekstra kayıp'tır. Eğer model $Q = [0.8, 0.2]$ tahmin etseydi $D_{KL} = 0$ olurdu."
      }
    ],
    questions: [
      {
        id: "l3-info-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "4 eşit olasılıklı sınıfa sahip ($P = [0.25, 0.25, 0.25, 0.25]$) bir dağılımın $\\log_2$ tabanında <strong>Entropisi $H(P)$</strong> kaç bittir?",
        hint: "log₂(0.25) = -2. Formülde -4 * (0.25 * (-2)).",
        answer: 2,
        tolerance: 0.01,
        unit: "bit",
        solutionSteps: [
          "$H(P) = -4 \\times (0.25 \\times \\log_2 0.25) = -4 \\times (0.25 \\times (-2)) = 2$ bit."
        ],
        dsNote: "Genel olarak $K$ eşit olasılıklı sınıfın maksimum entropisi $\\log_2(K)$'dır."
      },
      {
        id: "l3-info-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir gözlemde gerçek dağılım tek sıcak (one-hot) $P = [1, 0]$ ve model tahmini $Q = [0.5, 0.5]$'tir. $\\log_2$ tabanında <strong>KL Iraksaması $D_{KL}(P \\parallel Q)$</strong> kaç bittir?",
        hint: "H(P) = 0'dır. H(P, Q) = -1 * log₂(0.5).",
        answer: 1,
        tolerance: 0.01,
        unit: "bit",
        solutionSteps: [
          "$H(P) = 0$ (kesin dağılım).",
          "$H(P, Q) = -1 \\cdot \\log_2(0.5) = 1$ bit.",
          "$D_{KL}(P \\parallel Q) = 1 - 0 = 1$ bit."
        ],
        dsNote: "One-hot etiketlerde $H(P)=0$ olduğu için Cross-Entropy ile KL Iraksaması sayısal olarak birbirine eşitlenir."
      },
      {
        id: "l3-info-q3",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir dağılım için $H(P) = 1.2$ nat ve modelin çapraz entropisi $H(P, Q) = 1.65$ nat ölçülmüştür. <strong>KL Iraksaması $D_{KL}(P \\parallel Q)$</strong> kaç nattır?",
        hint: "D_KL(P || Q) = H(P, Q) - H(P)",
        answer: 0.45,
        tolerance: 0.01,
        unit: "nat",
        solutionSteps: [
          "$D_{KL}(P \\parallel Q) = 1.65 - 1.20 = 0.45$ nat."
        ],
        dsNote: "KL Iraksaması her zaman $\\ge 0$'dır ve yalnızca $P = Q$ olduğunda 0 olur."
      },
      {
        id: "l3-info-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir üretim modelinde canlıya gelen girdi verisinin (ör. yaş dağılımı) eğitim verisinden kayıp kaymadığını (Data Drift) izlemek istiyorsunuz. KL Iraksaması kullanırken hangi özelliğine dikkat etmelisiniz?",
        options: [
          "KL Iraksaması negatif çıkabilir.",
          "KL Iraksaması simetrik değildir ($D_{KL}(P \\parallel Q) \\ne D_{KL}(Q \\parallel P)$) ve $Q(x)=0$ iken $P(x)>0$ olursa sonsuza gider.",
          "KL Iraksaması sadece tamsayılarda çalışır.",
          "KL Iraksaması her zaman 1'den küçüktür."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Asimetri ve sıfıra bölünme sorunu nedeniyle Data Drift izlemede genellikle simetrik ve sonlu olan Jensen-Shannon Divergence veya PSI (Population Stability Index) tercih edilir."
        ],
        dsNote: "Mülakatlarda KL Iraksamasının neden gerçek bir 'mesafe metriği' olmadığı sıkça sorulur (simetrik değil ve üçgen eşitsizliğini sağlamaz)."
      },
      {
        id: "l3-info-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Karar ağacı (Decision Tree) bir düğümde veriyi ikiye bölerken üst düğümün entropisi 0.95, bölünme sonrası alt düğümlerin ağırlıklı ortalama entropisi 0.40 olmuştur. Bu bölünmenin Bilgi Kazancı (Information Gain) nedir ve iyi bir bölünme midir?",
        options: [
          "Information Gain = 0.55; belirsizliği ciddi oranda azalttığı için çok iyi bir bölünmedir.",
          "Information Gain = -0.55; kötü bir bölünmedir.",
          "Information Gain = 1.35.",
          "Entropi sıfır olmadığı için ağaç durmalıdır."
        ],
        answerIndex: 0,
        solutionSteps: [
          "$\\text{Information Gain} = H_{\\text{önce}} - H_{\\text{sonra}} = 0.95 - 0.40 = 0.55$."
        ],
        dsNote: "Ağaç her adımda Information Gain'i (veya Gini impurity düşüşünü) maksimize eden özelliği ve eşiği seçer."
      }
    ]
  },

  {
    id: "l3-multivariate",
    level: 3,
    levelTitle: "3. İleri Seviye: Modelleme, Bilgi Teorisi ve Nedensellik",
    order: 16,
    title: "Çok Değişkenli İstatistik (PCA & Mahalanobis)",
    tag: "core",
    explainability: false,
    summary: "Özdeğerler, Özvektörler, Kovaryans Matrisi üzerinden Temel Bileşenler Analizi (PCA) ve Mahalanobis Uzaklığı.",
    keywords: ["pca", "özdeğer", "eigenvalue", "özvektör", "kovaryans matrisi", "mahalanobis", "boyut indirgeme"],
    labId: "lab-pca",
    theoryHtml: `
      <div class="card">
        <h3>1. Kovaryans Matrisi, Özdeğerler ve PCA</h3>
        <p>Çok boyutlu veride ($p$ özellik) değişkenler arası ilişkileri $p \\times p$ boyutlu <strong>Kovaryans Matrisi ($\\Sigma$)</strong> özetler. Bu matrisin özvektörleri (eigenvectors) verinin en çok yayıldığı birbirine dik yönleri (<strong>Temel Bileşenler / Principal Components</strong>), özdeğerleri (eigenvalues, $\\lambda_i$) ise o yöndeki <strong>varyans (bilgi) miktarını</strong> verir.</p>
        <div class="formula-box">$$\\text{Açıklanan Varyans Oranı}_k = \\frac{\\lambda_k}{\\sum_{j=1}^p \\lambda_j}$$</div>
        <p><strong>Bu oran ne anlatır?</strong> Örneğin 10 özellikli bir veriyi 2 bileşene (PC1, PC2) indirdiğimizde bu iki bileşenin açıklanan varyans oranı toplamı %88 çıkarsa, "8 boyutu attık ama orijinal verideki bilginin/değişkenliğin %88'ini koruduk" demektir. Özdeğeri 1'in çok altında kalan bileşenler genellikle gürültüdür ve elenebilir.</p>
        <div class="callout warn">
          <strong>Kritik Kural:</strong> PCA öncesi veriyi mutlaka <strong>standardize edin (Z-skoru)</strong>! Aksi halde birimi büyük olan değişken (ör. TL cinsinden maaş vs yaş) tüm varyansı domine eder.
        </div>
      </div>

      <div class="card">
        <h3>2. Mahalanobis Uzaklığı (Çok Boyutlu Aykırı Değer Tespiti)</h3>
        <p>Öklid uzaklığı değişkenlerin ölçeğini ve aralarındaki korelasyonu görmezden gelir. <strong>Mahalanobis Uzaklığı</strong> ise kovaryans matrisini ($\\Sigma^{-1}$) kullanarak ölçekten bağımsız, korelasyona duyarlı ve <em>"veri bulutunun merkezinden kaç standart sapma uzakta"</em> olduğumuzu ölçen mesafedir:</p>
        <div class="formula-box">$$D_M(x) = \\sqrt{(x - \\mu)^T \\Sigma^{-1} (x - \\mu)}$$</div>
        <p><strong>Ne işe yarar?</strong> Boy ile kilo arasında güçlü pozitif korelasyon varken "1.90 m boy + 50 kg kilo" noktası tek başına boy veya kiloda normal görünse bile normal veri bulutunun dışında kaldığı için Mahalanobis uzaklığı büyük çıkar ve <strong>çok boyutlu aykırı değer</strong> olarak yakalanır.</p>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: PCA Açıklanan Varyans Oranı",
        problem: "4 özellikli bir veri setinin kovaryans matrisi özdeğerleri $\\lambda = [4.5, 2.5, 0.7, 0.3]$ olarak bulunmuştur. İlk 2 bileşen toplam varyansın yüzde kaçını açıklar?",
        steps: [
          "Toplam varyans = $4.5 + 2.5 + 0.7 + 0.3 = 8.0$.",
          "İlk 2 bileşen toplamı = $4.5 + 2.5 = 7.0$.",
          "Açıklanan oran = $(7.0 / 8.0) \\times 100 = \\%87.5$."
        ],
        answer: "%87.5.",
        interpretation: "4 boyutu 2 boyuta indirgeyerek bilginin %87.5'ini koruyup %50 boyut tasarrufu sağlamış oluruz."
      },
      {
        title: "Örnek 2: Korelasyonsuz Durumda Mahalanobis Uzaklığı",
        problem: "İki bağımsız özelliğin ortalaması $\\mu = [10, 50]$, standart sapmaları $\\sigma_1 = 2, \\sigma_2 = 10$'dur. $x = [14, 70]$ noktasının Mahalanobis uzaklığı kaçtır?",
        steps: [
          "Değişkenler bağımsız olduğundan Mahalanobis uzaklığı standardize edilmiş Z-skorlarının Öklid normuna indirgenir:",
          "$z_1 = (14 - 10)/2 = 2$, $z_2 = (70 - 50)/10 = 2$.",
          "$D_M = \\sqrt{2^2 + 2^2} = \\sqrt{8} \\approx 2.83$."
        ],
        answer: "D_M ≈ 2.83.",
        interpretation: "Öklid uzaklığı $\\sqrt{4^2 + 20^2} = 20.4$ çıkıp ikinci özelliğe aldanırken, Mahalanobis her iki ekseni de kendi standart sapmasına göre normalize etmiştir."
      }
    ],
    questions: [
      {
        id: "l3-mv-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "3 boyutlu bir veri setinde PCA özdeğerleri $\\lambda = [6, 3, 1]$ bulunmuştur. Yalnızca <strong>1. Temel Bileşen (PC1)</strong> toplam varyansın yüzde (%) kaçını açıklar?",
        hint: "6 / (6 + 3 + 1) * 100",
        answer: 60,
        tolerance: 0.1,
        unit: "%",
        solutionSteps: [
          "Toplam = $6 + 3 + 1 = 10$.",
          "PC1 oranı = $(6 / 10) \\times 100 = \\%60$."
        ],
        dsNote: "Genelde toplam varyansın %80–%95'ini koruyacak kadar bileşen seçilir."
      },
      {
        id: "l3-mv-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Korelasyonsuz iki özelliğin ortalaması $\\mu = [0, 0]$ ve varyansları $\\sigma_1^2 = 4$, $\\sigma_2^2 = 25$'tir. $x = [6, 20]$ noktasının <strong>Mahalanobis uzaklığı ($D_M$)</strong> kaçtır?",
        hint: "D_M = √( (6-0)²/4 + (20-0)²/25 )",
        answer: 5,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$D_M = \\sqrt{\\frac{6^2}{4} + \\frac{20^2}{25}} = \\sqrt{\\frac{36}{4} + \\frac{400}{25}} = \\sqrt{9 + 16} = \\sqrt{25} = 5$."
        ],
        dsNote: "$D_M^2$ değeri $p$ serbestlik dereceli Ki-Kare ($\\chi^2_p$) dağılımına uyar; buradan çok boyutlu anomali eşiği belirlenir."
      },
      {
        id: "l3-mv-q3",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir müşteri veri setinde 'Yaş' (18–70) ve 'Yıllık Harcama' (1.000–500.000 TL) sütunlarına standardizasyon yapmadan doğrudan PCA uyguladınız. PC1'in yükünün neredeyse %99.9'unun Yıllık Harcama'ya ait olduğunu gördünüz. Nedeni nedir?",
        options: [
          "Yaş önemsiz bir değişkendir.",
          "Yıllık Harcama'nın sayısal ölçeği ve ham varyansı çok büyük olduğu için kovaryans matrisini domine etmiştir.",
          "PCA sadece 3+ değişkende çalışır.",
          "Korelasyon matrisi yerine standart sapma kullanılmıştır."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Ham kovaryans matrisi ölçeğe duyarlıdır; TL'den Kuruş'a geçmek bile özvektörleri değiştirir.",
          "Önce StandardScaler uygulanmalıdır (bu da korelasyon matrisi üzerinde PCA yapmaya eşdeğerdir)."
        ],
        dsNote: "PCA her zaman `StandardScaler` sonrası `PCA` pipeline'ı ile uygulanmalıdır."
      },
      {
        id: "l3-mv-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "PCA uyguladıktan sonra elde edilen yeni bileşenler (PC1, PC2, ...) arasındaki korelasyon nedir?",
        options: [
          "Her zaman +1'dir.",
          "Birbirlerine dik (orthogonal) oldukları için aralarındaki korelasyon 0'dır.",
          "Orijinal korelasyonların ortalamasıdır.",
          "-1'dir."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Simetrik kovaryans matrisinin farklı özdeğerlere ait özvektörleri birbirine diktir."
        ],
        dsNote: "Bu özelliği sayesinde PCA, çoklu doğrusal bağlantıyı (multicollinearity) tamamen ortadan kaldırır; ancak bileşenlerin iş yorumlanabilirliği zorlaşır."
      },
      {
        id: "l3-mv-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Üretim bandında bir motorun sıcaklığı ve titreşimi normalde birlikte artar ($r = 0.90$). Bir gün sıcaklık düşük ama titreşim orta-yüksek bir noktada ölçülür. Tek değişkenli Z-skorları normal sınırda kalsa bile bu arızayı hangi yöntem yakalar?",
        options: [
          "Tek değişkenli IQR kuralı",
          "Mahalanobis Uzaklığı",
          "Mod hesabı",
          "Büyük Sayılar Yasası"
        ],
        answerIndex: 1,
        solutionSteps: [
          "Mahalanobis uzaklığı değişkenlerin ortak kovaryans yapısını hesaba kattığı için normal korelasyon elipsinin dışına düşen noktaları tespit eder."
        ],
        dsNote: "Endüstriyel IoT ve finansal anomali tespitinde Mahalanobis uzaklığı klasik bir çok değişkenli dedektördür."
      }
    ]
  },

  {
    id: "l3-bayesian",
    level: 3,
    levelTitle: "3. İleri Seviye: Modelleme, Bilgi Teorisi ve Nedensellik",
    order: 17,
    title: "Bayesçi İstatistik (Bayesian Statistics)",
    tag: "core",
    explainability: false,
    summary: "Prior, Likelihood, Posterior; MAP tahmini ve L1/L2 regülarizasyonu bağlantısı; Beta-Binom eşlenik önseli; MCMC ve Bayesçi A/B testi.",
    keywords: ["bayesçi", "prior", "posterior", "map", "beta", "gamma", "conjugate", "mcmc", "regülarizasyon"],
    labId: "lab-bayesian",
    theoryHtml: `
      <div class="card">
        <h3>1. Prior, Likelihood ve Posterior</h3>
        <p>Frekansçı (frequentist) yaklaşımda parametre $\\theta$ sabit ama bilinmeyen bir sayıdır. <strong>Bayesçi yaklaşımda</strong> ise $\\theta$ bir <strong>rastgele değişkendir</strong> ve belirsizliğini bir olasılık dağılımıyla ifade ederiz:</p>
        <div class="formula-box">$$P(\\theta \\mid \\text{Veri}) = \\frac{P(\\text{Veri} \\mid \\theta)\\, P(\\theta)}{P(\\text{Veri})} \\propto \\text{Likelihood} \\times \\text{Prior}$$</div>
      </div>

      <div class="card">
        <h3>2. MAP Tahmini ve L1/L2 Regülarizasyonu Bağlantısı</h3>
        <p>Sonsal dağılımın tepe noktasını bulmaya <strong>Maksimum Sonsal Tahmin (MAP)</strong> denir: $\\arg\\max_\\theta [\\log P(\\text{Veri} \\mid \\theta) + \\log P(\\theta)]$.</p>
        <ul>
          <li>Ağırlıklar $\\beta$ için <strong>Normal (Gaussian) Prior</strong> seçerseniz $\\log P(\\beta) \\propto -\\beta^2$ olur → <strong>L2 (Ridge) Regülarizasyonu!</strong></li>
          <li>Ağırlıklar $\\beta$ için <strong>Laplace Prior</strong> seçerseniz $\\log P(\\beta) \\propto -|\\beta|$ olur → <strong>L1 (Lasso) Regülarizasyonu!</strong></li>
        </ul>
      </div>

      <div class="card">
        <h3>3. Beta-Binom Eşlenik Önseli ve MCMC [Seçmeli]</h3>
        <p>Oran $p \\in [0, 1]$ için <strong>Beta($\\alpha, \\beta$)</strong> önseli kullanılırsa ve Binom verisinde $k$ başarı, $n-k$ başarısızlık gözlenirse, sonsal dağılım yine Beta olur (eşlenik/conjugate):</p>
        <div class="formula-box">$$\\text{Posterior} = \\text{Beta}(\\alpha + k,\\; \\beta + n - k), \\quad E[p\\mid \\text{Veri}] = \\frac{\\alpha + k}{\\alpha + \\beta + n}$$</div>
        <p><strong>$\\alpha$ ve $\\beta$ sayıları neyi temsil eder?</strong> Önsel dağılımdaki $\\alpha$ "daha önce gördüğümüzü varsaydığımız başarı sayısı" (pseudo-success), $\\beta$ ise "başarısızlık sayısı" gibi düşünülebilir. Örneğin $\\text{Beta}(2, 8)$ demek, elimizde sanki önceden $2+8=10$ denemelik (%20 başarılı) bir ön bilgi varmış gibi davranmaktır. $\\alpha + \\beta$ büyüdükçe önsel inancımız o kadar güçlüdür ve yeni veriye karşı direnç gösterir.</p>
        <p><strong>Gamma Dağılımı:</strong> Pozitif sürekli parametreleri (ör. Poisson $\\lambda$ hızı) modellerken eşlenik önsel olarak kullanılır.</p>
        <p><strong>MCMC &amp; Bayesçi A/B Testi [Seçmeli]:</strong> Kapalı form çözümü olmayan karmaşık modellerde sonsal dağılımdan örnekleme yapmak için Markov Zinciri Monte Carlo (MCMC) kullanılır. Bayesçi A/B testi, "p < 0.05 mi?" yerine doğrudan <strong>"B'nin A'dan iyi olma olasılığı %94'tür"</strong> diyebilmemizi sağlar.</p>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: Beta-Binom Güncellemesi (Yeni Ürün Tıklama Oranı)",
        problem: "Yeni bir reklam için önsel inancımız $\\text{Beta}(\\alpha=2, \\beta=8)$ (ortalama %20 tıklama). İlk 10 gösterimde 4 tıklama ($k=4, n=10$) alınırsa sonsal dağılım ve yeni beklenen tıklama oranı nedir?",
        steps: [
          "$\\alpha_{\\text{post}} = \\alpha + k = 2 + 4 = 6$.",
          "$\\beta_{\\text{post}} = \\beta + (n - k) = 8 + (10 - 4) = 14$.",
          "Yeni beklenen oran = $6 / (6 + 14) = 6 / 20 = 0.30$ (%30)."
        ],
        answer: "Posterior = Beta(6, 14), Beklenen Oran = %30.",
        interpretation: "Sadece eldeki 10 gösterime baksaydık (MLE) 4/10 = %40 derdik; ancak 10 gösterim küçük bir örneklemdir ve şans eseri yüksek çıkmış olabilir. Beta(2, 8) önseli sanki geçmişten 10 gösterimlik %20'lik bir ön kanıt ekleyerek tahmini %40'tan %30'a doğru dengeler (shrinkage). Eğer 1000 gösterimde 400 tıklama alsaydık, posterior (402 / 1010 ≈ %39.8) neredeyse tamamen veriye yaklaşacaktı."
      }
    ],
    questions: [
      {
        id: "l3-bay-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Önsel dağılımı $\\text{Beta}(\\alpha=3, \\beta=7)$ olan bir dönüşüm oranı için 20 denemede 8 başarı ($k=8, n=20$) gözleniyor. Sonsal (Posterior) dağılımın <strong>beklenen değeri</strong> kaçtır?",
        hint: "(α + k) / (α + β + n)",
        answer: 0.367,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$\\alpha_{\\text{post}} = 3 + 8 = 11$, $\\beta_{\\text{post}} = 7 + (20 - 8) = 19$.",
          "$E[p\\mid \\text{Veri}] = 11 / (11 + 19) = 11 / 30 \\approx 0.367$."
        ],
        dsNote: "Veri sayısı $n$ büyüdükçe $\\alpha, \\beta$ önselinin etkisi azalır ve Bayesçi tahmin MLE'ye yaklaşır."
      },
      {
        id: "l3-bay-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Önsel olarak $\\text{Beta}(1, 1)$ (Üniform / bilgisiz önsel) kullanılıyor. 10 denemede 3 başarı gözlenirse sonsal dağılımın <strong>$\\alpha_{\\text{post}}$</strong> parametresi kaç olur?",
        hint: "α_post = α + k",
        answer: 4,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$\\alpha_{\\text{post}} = 1 + 3 = 4$ (ve $\\beta_{\\text{post}} = 1 + 7 = 8$)."
        ],
        dsNote: "Laplace'ın ardışık kuralı (Laplace smoothing) tam olarak Beta(1,1) önselinin sonucudur ve 0/10 gibi durumlarda sıfır olasılık hatasını önler."
      },
      {
        id: "l3-bay-q3",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Doğrusal regresyonda ağırlık parametreleri üzerine sıfır merkezli <strong>Gaussian (Normal)</strong> önsel koyarak MAP tahmini yapmak hangi regülarizasyon yöntemine matematiksel olarak denktir?",
        options: [
          "L1 (Lasso) Regülarizasyonu",
          "L2 (Ridge) Regülarizasyonu",
          "Dropout",
          "PCA"
        ],
        answerIndex: 1,
        solutionSteps: [
          "Normal dağılımın logaritması $-\\frac{\\beta^2}{2\\tau^2}$ karesel ceza terimi üretir; bu da L2 (Ridge) cezasıdır."
        ],
        dsNote: "Laplace önseli ise $-|\\beta|/b$ ürettiği için L1 (Lasso) regülarizasyonuna denktir."
      },
      {
        id: "l3-bay-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Karmaşık bir hiyerarşik Bayes modelinde sonsal dağılımın analitik integrali alınamıyor. Parametrelerin sonsal dağılımını yaklaşık olarak elde etmek için hangi yöntem kullanılır?",
        options: [
          "OLS",
          "MCMC (Markov Zinciri Monte Carlo)",
          "Bonferroni düzeltmesi",
          "Shapiro-Wilk testi"
        ],
        answerIndex: 1,
        solutionSteps: [
          "MCMC (ör. Metropolis-Hastings, Gibbs, HMC/NUTS) kapalı formu olmayan sonsal dağılımlardan örneklem çekmemizi sağlar."
        ],
        dsNote: "Python'da `PyMC` veya `Stan` kütüphaneleri MCMC ile Bayesçi modelleme yapar."
      },
      {
        id: "l3-bay-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Yönetici 'Yeni tasarımın eskisinden iyi olma ihtimali yüzde kaç?' diye soruyor. Klasik p-değeri bu soruyu doğrudan cevaplayamazken hangi yaklaşım 'B'nin A'dan iyi olma olasılığı %92'dir' şeklinde doğrudan yanıt verebilir?",
        options: [
          "Bayesçi A/B Testi",
          "Bonferroni Düzeltmesi",
          "Levene Testi",
          "VIF Analizi"
        ],
        answerIndex: 0,
        solutionSteps: [
          "Bayesçi A/B testinde A ve B'nin sonsal dağılımlarından örnekler çekilip $P(\\theta_B > \\theta_A \\mid \\text{Veri})$ doğrudan hesaplanır."
        ],
        dsNote: "Bu yönüyle Bayesçi A/B testi iş paydaşları için çok daha sezgisel ve açıklanabilir sonuçlar üretir."
      }
    ]
  },

  {
    id: "l3-causal",
    level: 3,
    levelTitle: "3. İleri Seviye: Modelleme, Bilgi Teorisi ve Nedensellik",
    order: 18,
    title: "Nedensel Çıkarım (Causal Inference)",
    tag: "core",
    explainability: true,
    summary: "Confounder, Collider yanlılığı, temel DAG mantığı [Çekirdek] ve gözlemsel yöntemler: PSM, DiD, IV, RDD [Seçmeli].",
    keywords: ["nedensellik", "causal", "confounder", "collider", "dag", "psm", "did", "iv", "rdd"],
    labId: "lab-causal",
    theoryHtml: `
      <div class="card">
        <h3>1. Temel DAG (Nedensel Grafik) Yapıları [Çekirdek]</h3>
        <p>Gözlemsel veride "X'i artırırsak Y ne olur?" sorusunu yanıtlamak için değişkenler arasındaki okların yönünü (DAG) bilmek gerekir:</p>
        <ul>
          <li><strong>Confounder (Karıştırıcı):</strong> $X \\leftarrow Z \\rightarrow Y$. $Z$ hem $X$'e hem $Y$'ye neden olur. $Z$'yi kontrol etmezseniz $X$ ile $Y$ arasında sahte ilişki görürsünüz. <em>(Kontrol edilmelidir!)</em></li>
          <li><strong>Mediator (Aracı):</strong> $X \\rightarrow M \\rightarrow Y$. $X$'in toplam etkisini ölçmek istiyorsanız $M$'yi kontrol <em>etmemelisiniz</em>.</li>
          <li><strong>Collider (Çarpıştırıcı):</strong> $X \\rightarrow C \\leftarrow Y$. İki bağımsız nedenin ortak sonucudur. <strong>Tehlike:</strong> $C$'yi kontrol ederseniz (veya $C$'ye göre veri filtrelerseniz) $X$ ile $Y$ arasında <strong>sahte bir negatif korelasyon (Collider Bias)</strong> yaratırsınız! <em>(Örn: Yetenek $\\to$ Ünlü Olmak $\\leftarrow$ Şans; sadece ünlülere bakarsanız yetenek ile şans ters orantılı görünür.)</em></li>
        </ul>
        <div class="callout explain">
          <strong>✱ Açıklanabilirlik Bağlantısı:</strong> "Tüm sütunları modele atalım" yaklaşımı Collider veya Mediator değişkenleri kontrol ederek nedensel yorumu tamamen bozabilir.
        </div>
      </div>

      <div class="card">
        <h3>2. İleri Gözlemsel Yöntemler [Seçmeli]</h3>
        <ul>
          <li><strong>Propensity Score Matching (PSM):</strong> Tedavi alan ve almayan bireyleri, tedavi alma olasılıklarına (propensity score) göre eşleştirip karıştırıcıları dengeler.</li>
          <li><strong>Difference-in-Differences (DiD):</strong> Müdahale öncesi ve sonrası değişimi kontrol grubuyla kıyaslar (paralel eğilimler varsayımı altında).</li>
          <li><strong>Enstrümantal Değişkenler (IV):</strong> Sadece müdahaleyi etkileyip sonucu doğrudan etkilemeyen bir "araç" değişken kullanır.</li>
          <li><strong>Regresyon Süreksizliği (RDD):</strong> Keskin bir eşik değerinin (ör. sınav puanı $\\ge 70$ burs alır) hemen altı ve üstünü karşılaştırır.</li>
        </ul>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: Difference-in-Differences (DiD) Hesabı",
        problem: "A şehrinde yeni kurye teşviki uygulanıyor, B şehrinde uygulanmıyor.\n- A şehri: Öncesi 100 sipariş, Sonrası 135 sipariş\n- B şehri (Kontrol): Öncesi 80 sipariş, Sonrası 95 sipariş\nTeşvikin net nedensel (DiD) etkisi kaç sipariştir?",
        steps: [
          "A şehrindeki değişim: $135 - 100 = +35$ sipariş.",
          "B şehrindeki (genel trend) değişim: $95 - 80 = +15$ sipariş.",
          "DiD Nedensel Etki = $(135 - 100) - (95 - 80) = 35 - 15 = +20$ sipariş."
        ],
        answer: "+20 sipariş.",
        interpretation: "B şehrinde de mevsimsel olarak +15 artış yaşandığı için A şehrindeki +35'lik artışın yalnızca +20'si teşvike atfedilebilir."
      }
    ],
    questions: [
      {
        id: "l3-cau-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir DiD (Difference-in-Differences) çalışmasında Müdahale grubunun ortalaması 50'den 68'e çıkmıştır. Kontrol grubunun ortalaması ise aynı dönemde 40'tan 46'ya çıkmıştır. Müdahalenin <strong>net DiD etkisi</strong> kaçtır?",
        hint: "(68 - 50) - (46 - 40)",
        answer: 12,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "Müdahale farkı = $68 - 50 = 18$.",
          "Kontrol farkı = $46 - 40 = 6$.",
          "DiD = $18 - 6 = 12$."
        ],
        dsNote: "DiD'nin geçerli olması için müdahale olmasaydı iki grubun aynı trendi izleyeceği (Paralel Eğilimler) varsayımı sağlanmalıdır."
      },
      {
        id: "l3-cau-q2",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir teknoloji şirketinde işe alım için sadece 'Teknik Puan + İletişim Puanı' yüksek olanlar seçiliyor. Şirket içinde Teknik Puan ile İletişim Puanı arasında negatif korelasyon gözlemleniyor. Gerçekte bu iki özellik bağımsızsa, bu sahte negatif korelasyonun nedeni nedir?",
        options: [
          "Confounder Yanlılığı",
          "Collider Yanlılığı (İşe Alınma bir çarpıştırıcıdır: Teknik → İşe Alınma ← İletişim)",
          "Otokorelasyon",
          "L1 Regülarizasyonu"
        ],
        answerIndex: 1,
        solutionSteps: [
          "Ortak sonuç olan 'İşe Alınma' değişkenine göre filtreleme (koşullandırma) yapıldığı için iki bağımsız neden arasında sahte negatif ilişki doğmuştur."
        ],
        dsNote: "Collider değişkenleri regresyon modeline kontrol değişkeni olarak eklemek de aynı yanlılığı yaratır!"
      },
      {
        id: "l3-cau-q3",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir üniversite, giriş sınavından 80 ve üzeri alan öğrencilere ücretsiz mentorluk veriyor. Mentorluğun mezuniyet notuna nedensel etkisini ölçmek için 79 alanlarla 81 alanları karşılaştırıyorsunuz. Bu yöntem hangisidir?",
        options: [
          "Regresyon Süreksizliği Tasarımı (RDD)",
          "Enstrümantal Değişkenler (IV)",
          "PCA",
          "Kruskal-Wallis Testi"
        ],
        answerIndex: 0,
        solutionSteps: [
          "Keskin bir eşik (cutoff = 80) etrafındaki bireyler neredeyse özdeş kabul edilir ve yerel bir randomize deney gibi analiz edilir (RDD)."
        ],
        dsNote: "Kredi skoru eşikleri, indirim barajları gibi iş kurallarında RDD çok güçlü bir nedensel çıkarım aracıdır."
      },
      {
        id: "l3-cau-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Gözlemsel veride 'Premium Üyelik ($X$)' alanların daha çok harcama ($Y$) yaptığı görülüyor; ancak 'Gelir Düzeyi ($Z$)' hem Premium üyelik almayı hem de harcamayı artırıyor ($X \\leftarrow Z \\rightarrow Y$). $Z$ nedir ve ne yapılmalıdır?",
        options: [
          "Collider'dır, modelden atılmalıdır.",
          "Confounder'dır (Karıştırıcı); nedensel etkiyi bulmak için modele dahil edilmeli veya PSM ile dengelenmelidir.",
          "Mediator'dır, dokunulmamalıdır.",
          "Rastgele gürültüdür."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Gelir hem tedaviyi ($X$) hem sonucu ($Y$) etkilediği için klasik bir Confounder'dır ve kontrol edilmesi gerekir."
        ],
        dsNote: "Gözlenemeyen confounder'lar varsa PSM tek başına yetmez; IV veya DiD gerekir."
      },
      {
        id: "l3-cau-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir reklam kampanyasının satışa toplam nedensel etkisini ölçmek istiyorsunuz: Reklam ($X$) $\\to$ Site Ziyareti ($M$) $\\to$ Satış ($Y$). Regresyon modeline 'Site Ziyareti ($M$)' değişkenini eklerseniz ne olur?",
        options: [
          "Reklamın satışa etkisi daha doğru ölçülür.",
          "Aracı değişkeni ($M$) kontrol etmiş olursunuz ve reklamın site ziyareti üzerinden yarattığı dolaylı etkiyi yok edersiniz (Overcontrol Bias).",
          "VIF sıfır olur.",
          "R² azalır."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Toplam nedensel etkiyi ($X \\to Y$) ölçerken Mediator ($M$) kontrol edilmez."
        ],
        dsNote: "Her sütunu düşünmeden modele eklemek nedensel çıkarımda en sık yapılan hatalardan biridir."
      }
    ]
  },

  {
    id: "l3-timeseries",
    level: 3,
    levelTitle: "3. İleri Seviye: Modelleme, Bilgi Teorisi ve Nedensellik",
    order: 19,
    title: "Zaman Serisi İstatistiği (Time Series)",
    tag: "optional",
    explainability: false,
    summary: "Durağanlık, ACF/PACF, ARIMA/SARIMA, ayrıştırma, tahmin metrikleri (MAE, RMSE, MAPE), walk-forward doğrulama; Kointegrasyon ve ARCH/GARCH.",
    keywords: ["zaman serisi", "time series", "durağanlık", "stationarity", "acf", "pacf", "arima", "sarima", "walk-forward", "mape", "garch"],
    labId: "lab-timeseries",
    theoryHtml: `
      <div class="card">
        <h3>1. Durağanlık (Stationarity), ACF ve PACF</h3>
        <ul>
          <li><strong>Durağanlık:</strong> Zaman serisinin ortalaması, varyansı ve otokovaryansının zamanla değişmemesidir. Trend veya mevsimsellik varsa seri durağan değildir; fark alma ($y_t - y_{t-1}$) veya log dönüşümü ile durağanlaştırılır (ADF testi ile kontrol edilir).</li>
          <li><strong>ACF (Otokorelasyon):</strong> $y_t$ ile $y_{t-k}$ arasındaki toplam korelasyon (MA($q$) derecesini seçmede yardımcı olur).</li>
          <li><strong>PACF (Kısmi Otokorelasyon):</strong> Aradaki gecikmelerin etkisi arındırıldıktan sonra $y_t$ ile $y_{t-k}$ arasındaki doğrudan korelasyon (AR($p$) derecesini seçmede yardımcı olur).</li>
          <li><strong>ARIMA($p, d, q$) / SARIMA:</strong> $p$: Otoregresif (AR) gecikme, $d$: Fark alma derecesi, $q$: Hareketli Ortalama (MA) gecikmesi.</li>
        </ul>
      </div>

      <div class="card">
        <h3>2. Tahmin Metrikleri ve Walk-Forward Doğrulama</h3>
        <ul>
          <li><strong>MAE (Mean Absolute Error):</strong> $\\frac{1}{n}\\sum |y_t - \\hat{y}_t|$. Tahminlerimizin ortalama kaç birim (ör. kaç adet/TL) saptığını gösterir; tüm hatalara eşit ağırlık verir, aykırı değerlere dayanıklıdır.</li>
          <li><strong>RMSE (Root Mean Squared Error):</strong> $\\sqrt{\\frac{1}{n}\\sum (y_t - \\hat{y}_t)^2}$. Hataların karesini aldığı için büyük sapmaları çok daha sert cezalandırır. <em>RMSE ile MAE arasındaki fark büyükse</em> model bazı günlerde çok büyük hatalar yapıyor demektir.</li>
          <li><strong>MAPE (Mean Absolute Percentage Error):</strong> $\\frac{100}{n}\\sum \\left|\\frac{y_t - \\hat{y}_t}{y_t}\\right|$. Hatayı yüzde cinsinden verdiği için farklı ölçekteki ürünleri kıyaslamayı kolaylaştırır; ancak gerçek değer $y_t = 0$ olduğunda tanımsızdır!</li>
          <li><strong>Walk-Forward Validation:</strong> Zaman serilerinde rastgele K-Fold <strong>ASLA</strong> kullanılmaz (gelecekten geçmişe veri sızıntısı olur). Eğitim penceresi zamanla ileri kaydırılarak test edilir.</li>
        </ul>
        <p><strong>İleri Seçmeli:</strong> <em>Kointegrasyon</em> (durağan olmayan iki serinin doğrusal birleşiminin durağan olması — pairs trading) ve <em>ARCH/GARCH</em> (zamanla değişen oynaklık/volatilite kümelemesi modelleme).</p>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: MAE, RMSE ve MAPE Hesabı",
        problem: "Gerçek değerler $y = [100, 200]$, tahminler $\\hat{y} = [110, 180]$ olsun. MAE, RMSE ve MAPE'yi hesaplayın.",
        steps: [
          "Hatalar: $e_1 = |100 - 110| = 10$, $e_2 = |200 - 180| = 20$.",
          "$\\text{MAE} = (10 + 20) / 2 = 15$.",
          "$\\text{RMSE} = \\sqrt{(10^2 + 20^2)/2} = \\sqrt{500/2} = \\sqrt{250} \\approx 15.81$.",
          "$\\text{MAPE} = \\frac{100}{2} \\left(\\frac{10}{100} + \\frac{20}{200}\\right) = 50 \\times (0.10 + 0.10) = \\%10$."
        ],
        answer: "MAE = 15, RMSE ≈ 15.81, MAPE = %10.",
        interpretation: "Hatalar farklı büyüklükte olduğu için RMSE (15.81), MAE'den (15) biraz daha büyük çıkmıştır."
      }
    ],
    questions: [
      {
        id: "l3-ts-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir talep tahmin modelinde 3 günlük gerçek satışlar [100, 150, 200] ve tahminler [90, 150, 220]'dir. Modelin <strong>MAE (Mean Absolute Error)</strong> değeri kaçtır?",
        hint: "(|100-90| + |150-150| + |200-220|) / 3",
        answer: 10,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "Mutlak hatalar: $|100-90|=10$, $|150-150|=0$, $|200-220|=20$.",
          "$\\text{MAE} = (10 + 0 + 20) / 3 = 30 / 3 = 10$."
        ],
        dsNote: "MAE doğrudan satış adedi cinsinden ortalama sapmayı verdiği için iş birimlerine anlatması en kolay metriktir."
      },
      {
        id: "l3-ts-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Önceki sorudaki hatalar [10, 0, -20] için modelin <strong>RMSE</strong> değeri kaçtır? (2 ondalık basamak)",
        hint: "√((10² + 0² + (-20)²) / 3)",
        answer: 12.91,
        tolerance: 0.05,
        unit: "",
        solutionSteps: [
          "$\\text{MSE} = (100 + 0 + 400) / 3 = 500 / 3 \\approx 166.67$.",
          "$\\text{RMSE} = \\sqrt{166.67} \\approx 12.91$."
        ],
        dsNote: "Büyük tekil sapmaların (stok tükenmesi gibi) çok maliyetli olduğu durumlarda RMSE tercih edilir."
      },
      {
        id: "l3-ts-q3",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "2022–2025 arası günlük elektrik tüketimi verisinde XGBoost veya ARIMA modelini değerlendirirken standart rastgele 5-fold Cross-Validation kullanmak neden yanlıştır?",
        options: [
          "Hesaplama çok yavaş olur.",
          "Gelecekteki günlerin bilgisi eğitim setine girip geçmişteki günleri tahmin etmeye çalışır (gelecekten sızıntı / look-ahead bias); bunun yerine Walk-Forward doğrulama kullanılmalıdır.",
          "XGBoost zaman serisinde çalışmaz.",
          "MAE negatif çıkar."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Zaman serilerinde gözlemler bağımsız değildir ve zamansal sıralama korunmalıdır.",
          "Walk-forward (TimeSeriesSplit) her zaman geçmişle eğitip geleceği test eder."
        ],
        dsNote: "Gecikme (lag) ve kayan ortalama özellikleri üretirken de sadece geçmiş pencereler kullanılmalıdır."
      },
      {
        id: "l3-ts-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Finansal hisse senedi getirilerinde 'büyük fiyat hareketlerini büyük hareketlerin, sakin dönemleri sakin dönemlerin takip etmesi' (volatilite kümelemesi) gözleniyor. Bunu modellemek için hangi istatistiksel model ailesi uygundur?",
        options: [
          "ARCH / GARCH",
          "Tek Örneklem t-testi",
          "Bernoulli Naive Bayes",
          "Poisson Regresyon"
        ],
        answerIndex: 0,
        solutionSteps: [
          "ARCH ve GARCH modelleri koşullu varyansın (volatilitenin) zamana bağlı olarak nasıl değiştiğini modeller."
        ],
        dsNote: "Risk yönetimi (VaR) ve opsiyon fiyatlamasında temel araçtır."
      },
      {
        id: "l3-ts-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Günlük mağaza satışlarında bazı günlerde satış 0 (sıfır) olmaktadır. Bu veride model başarısını ölçmek için neden MAPE kullanmaktan kaçınmalısınız?",
        options: [
          "MAPE sadece 100'den büyük sayılarda çalışır.",
          "Gerçek değer $y_t = 0$ olduğunda payda sıfır olur ve MAPE tanımsız/sonsuz çıkar.",
          "MAPE her zaman 0 çıkar.",
          "MAPE negatif hataları saymaz."
        ],
        answerIndex: 1,
        solutionSteps: [
          "$|y_t - \\hat{y}_t| / y_t$ formülünde $y_t = 0$ ise sıfıra bölme hatası oluşur; ayrıca $y_t$ çok küçükken (ör. 1) hata aşırı şişer."
        ],
        dsNote: "Sıfır içeren serilerde WAPE (Weighted Absolute Percentage Error) veya sMAPE / MASE tercih edilir."
      }
    ]
  }
);
