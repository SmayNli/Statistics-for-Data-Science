window.ROADMAP_DATA = window.ROADMAP_DATA || [];

window.ROADMAP_DATA.push(
  {
    id: "l2-clt",
    level: 2,
    levelTitle: "2. Orta Seviye: Çıkarımsal İstatistik (Inferential Statistics)",
    order: 6,
    title: "Örnekleme ve Limit Teoremleri",
    tag: "core",
    explainability: true,
    summary: "Büyük Sayılar Yasası, Merkezi Limit Teoremi (CLT), Standart Hata ve Güven Aralıkları.",
    keywords: ["clt", "merkezi limit", "büyük sayılar", "güven aralığı", "standart hata", "confidence interval"],
    labId: "lab-clt",
    theoryHtml: `
      <div class="card">
        <h3>1. Büyük Sayılar Yasası (LLN) ve Merkezi Limit Teoremi (CLT)</h3>
        <ul>
          <li><strong>Büyük Sayılar Yasası (Law of Large Numbers):</strong> Örneklem büyüklüğü $n$ arttıkça, örneklem ortalaması $\\bar{X}$ gerçek popülasyon ortalaması $\\mu$'ye yaklaşır.</li>
          <li><strong>Merkezi Limit Teoremi (CLT):</strong> Ana popülasyonun dağılımı ne olursa olsun (sağa çarpık, üniform, binom vb. — sonlu varyansa sahip olmak şartıyla), yeterince büyük örneklemlerin ($n \\ge 30$) <strong>örneklem ortalamalarının dağılımı</strong> yaklaşık olarak Normal dağılıma yaklaşır:
            <div class="formula-box">$$\\bar{X} \\sim \\mathcal{N}\\left(\\mu,\\, \\frac{\\sigma^2}{n}\\right)$$</div>
          </li>
        </ul>
      </div>

      <div class="card">
        <h3>2. Standart Hata (SE) ve Güven Aralıkları (CI)</h3>
        <p><strong>Standart Hata (Standard Error):</strong> Örneklem standart sapması $s$, <em>tekil bireylerin</em> birbirinden ne kadar farklı olduğunu ölçerken; Standart Hata ($SE$), farklı örneklemler çektiğimizde <strong>örneklem ortalamasının</strong> gerçek ortalamadan ne kadar dalgalanacağını ölçer. Yani tahminimize duyduğumuz belirsizliğin ölçeğidir; $n$ büyüdükçe $SE$ küçülür çünkü daha büyük örneklem daha kesin tahmin verir:</p>
        <div class="formula-box">$$SE = \\frac{s}{\\sqrt{n}}$$</div>
        <p><strong>%95 Güven Aralığı (Confidence Interval):</strong> Tek bir nokta tahmini yerine, gerçek popülasyon parametresinin makul sınırlarını verir:</p>
        <div class="formula-box">$$\\bar{x} \\pm z_{\\alpha/2} \\cdot SE \\quad (\\%95 \\text{ için } z_{0.025} \\approx 1.96)$$</div>
        <div class="callout explain">
          <strong>✱ Açıklanabilirlik Bağlantısı:</strong> İş paydaşlarına "Yeni modelimizin ortalama hatası 12.4 TL" gibi tek bir nokta tahmini vermek yerine "Ortalama hata 12.4 TL (%95 GA: [11.2, 13.6])" demek belirsizliği şeffaf biçimde raporlar. Ayrıca dikkat: "%95 güven aralığı, gerçek $\\mu$'nün bu aralıkta olma olasılığı %95'tir" demek teknik olarak yanlıştır; doğrusu "Bu yöntemle 100 örneklem çekilse yaklaşık 95'inin oluşturduğu aralık gerçek $\\mu$'yü kapsar" şeklindedir.
        </div>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: Standart Hata ve %95 Güven Aralığı",
        problem: "Bir e-ticaret sitesinden rastgele seçilen $n = 100$ müşterinin ortalama sepet tutarı $\\bar{x} = 450$ TL, standart sapması $s = 80$ TL'dir. Standart hatayı ve %95 güven aralığını ($z = 1.96$) hesaplayın.",
        steps: [
          "$SE = s / \\sqrt{n} = 80 / \\sqrt{100} = 80 / 10 = 8$ TL.",
          "Hata payı (Margin of Error) = $1.96 \\times 8 = 15.68$ TL.",
          "Alt sınır = $450 - 15.68 = 434.32$ TL, Üst sınır = $450 + 15.68 = 465.68$ TL."
        ],
        answer: "SE = 8 TL, %95 Güven Aralığı = [434.32 TL, 465.68 TL].",
        interpretation: "Örneklem büyüklüğünü 100'den 400'e çıkarırsak SE yarıya (4 TL'ye) düşer ve güven aralığı yarı yarıya daralır."
      },
      {
        title: "Örnek 2: Oran (Conversion Rate) İçin Güven Aralığı",
        problem: "400 kullanıcıdan 80'i yeni butona tıklamıştır ($\\hat{p} = 0.20$). Oran için standart hata ve %95 güven aralığı nedir?",
        steps: [
          "Oran standart hatası: $SE = \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}} = \\sqrt{\\frac{0.20 \\times 0.80}{400}} = \\sqrt{\\frac{0.16}{400}} = \\sqrt{0.0004} = 0.02$.",
          "%95 GA: $0.20 \\pm 1.96 \\times 0.02 = 0.20 \\pm 0.0392 = [0.1608, 0.2392]$ (%16.1 – %23.9)."
        ],
        answer: "SE = 0.02, %95 GA = [%16.08, %23.92].",
        interpretation: "Tıklama oranı %20 görünse de belirsizlik payı ±%3.92'dir; küçük örneklemlerde oran metriklerine temkinli yaklaşılmalıdır."
      }
    ],
    questions: [
      {
        id: "l2-clt-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Popülasyon standart sapması $\\sigma = 24$ olan bir dağılımdan $n = 64$ büyüklüğünde örneklem çekiliyor. Örneklem ortalamasının <strong>Standart Hatası (SE)</strong> kaçtır?",
        hint: "SE = σ / √n",
        answer: 3,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$SE = 24 / \\sqrt{64} = 24 / 8 = 3$."
        ],
        dsNote: "Standart hata örneklem büyüklüğünün karekökü ile ters orantılıdır."
      },
      {
        id: "l2-clt-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "$n = 49$ teslimatın ortalama süresi $\\bar{x} = 32$ dk, standart sapması $s = 7$ dk'dır. $z = 1.96$ kullanarak %95 güven aralığının <strong>üst sınırını</strong> hesaplayın.",
        hint: "SE = 7 / √49 = 1. Üst sınır = 32 + 1.96 * SE.",
        answer: 33.96,
        tolerance: 0.05,
        unit: "dk",
        solutionSteps: [
          "$SE = 7 / \\sqrt{49} = 1$ dk.",
          "Üst sınır = $32 + 1.96 \\times 1 = 33.96$ dk."
        ],
        dsNote: "SLA taahhüdü verirken ortalamayı (32 dk) değil üst güven sınırını (~34 dk) baz almak daha güvenlidir."
      },
      {
        id: "l2-clt-q3",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir anketin hata payını (standart hatasını) <strong>3 kat küçültmek</strong> (1/3'üne indirmek) için örneklem büyüklüğünü kaç katına çıkarmalısınız?",
        hint: "SE ∝ 1/√n olduğu için SE'yi 3'e bölmek için √n 3 katına çıkmalıdır.",
        answer: 9,
        tolerance: 0.01,
        unit: "kat",
        solutionSteps: [
          "$SE_{\\text{yeni}} = \\frac{\\sigma}{\\sqrt{k \\cdot n}} = \\frac{1}{3} \\frac{\\sigma}{\\sqrt{n}} \\implies \\sqrt{k} = 3 \\implies k = 9$."
        ],
        dsNote: "A/B testlerinde kesinliği 2 kat artırmak için 4 kat, 3 kat artırmak için 9 kat daha fazla kullanıcı gerekir."
      },
      {
        id: "l2-clt-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Gelir verisi aşırı sağa çarpıktır. Bir veri bilimcisi $n = 500$ kişilik rastgele örneklemler çekip her seferinde örneklem ortalamasını kaydediyor. Bu örneklem ortalamalarının dağılımı hakkında ne söylenebilir?",
        options: [
          "Ana veri sağa çarpık olduğu için örneklem ortalamaları da kesinlikle aşırı sağa çarpık olur.",
          "Merkezi Limit Teoremi gereği örneklem ortalamalarının dağılımı yaklaşık Normal dağılıma yaklaşır.",
          "Örneklem ortalamalarının dağılımı Üniform olur.",
          "Büyük Sayılar Yasası gereği varyans sonsuza gider."
        ],
        answerIndex: 1,
        solutionSteps: [
          "CLT'nin gücü buradan gelir: Ana popülasyon çarpık olsa bile $n$ büyükse ($n=500$), $\\bar{X}$'in dağılımı çan eğrisine yaklaşır."
        ],
        dsNote: "Bu sayede çarpık gelir/harcama verilerinde bile büyük örneklemlerde z-testi / t-testi güvenilir kalır."
      },
      {
        id: "l2-clt-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Modelinizin ROC-AUC skoru %95 güven aralığı ile [0.81, 0.87] olarak hesaplanmıştır. Paydaşlara sunum yaparken hangisi en doğru yorumdur?",
        options: [
          "Modelin test verisindeki gözlemlerinin %95'i 0.81 ile 0.87 arasındadır.",
          "Tahmin yöntemimiz uzun vadede %95 oranında gerçek AUC değerini kapsayan bir aralık üretir; bu örneklemde makul aralık 0.81–0.87'dir.",
          "Model %81 ile %87 olasılıkla doğru çalışacaktır.",
          "Güven aralığı daraltmak için $z$ değerini 2.58 yapmalıyız."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Güven aralığı bireysel gözlemlerin değil, popülasyon parametresinin (gerçek AUC) belirsizliğini ifade eder.",
          "Ayrıca %99 güven düzeyi ($z=2.58$) aralığı daraltmaz, aksine genişletir."
        ],
        dsNote: "İki modelin güven aralıkları büyük ölçüde örtüşüyorsa aralarındaki fark istatistiksel olarak anlamlı olmayabilir."
      }
    ]
  },

  {
    id: "l2-estimators",
    level: 2,
    levelTitle: "2. Orta Seviye: Çıkarımsal İstatistik (Inferential Statistics)",
    order: 7,
    title: "Tahmin Edicilerin Özellikleri",
    tag: "core",
    explainability: false,
    summary: "Bir nokta tahmin edicisinin kalitesini belirleyen üç temel kriter: Yanlılık (Bias), Tutarlılık (Consistency) ve Etkinlik (Efficiency).",
    keywords: ["yanlılık", "bias", "tutarlılık", "consistency", "etkinlik", "efficiency", "bessel", "mse"],
    labId: "lab-estimators",
    theoryHtml: `
      <div class="card">
        <h3>1. İyi Bir Tahmin Edici (Estimator) Nasıl Olmalıdır?</h3>
        <p>Popülasyon parametresi $\\theta$'yı örneklem verisinden tahmin eden formüle tahmin edici ($\\hat{\\theta}$) denir. Üç temel özelliği:</p>
        <ul>
          <li><strong>Yansızlık (Unbiasedness):</strong> Tekrarlanan örneklemlerde tahmin edicinin beklenen değeri gerçek parametreye eşitse yansızdır:
            <div class="formula-box">$$\\text{Bias}(\\hat{\\theta}) = E[\\hat{\\theta}] - \\theta = 0$$</div>
            <em>Örnek:</em> Örneklem varyansında paydada $n$ yerine $n-1$ kullanılması onu yansız yapar.
          </li>
          <li><strong>Tutarlılık (Consistency):</strong> Örneklem sayısı $n \\to \\infty$ iken $\\hat{\\theta}_n$ olasılıkla gerçek $\\theta$'ya yakınsar (hata ve varyans sıfıra gider).</li>
          <li><strong>Etkinlik (Efficiency):</strong> İki yansız tahmin edici arasında <strong>daha düşük varyansa</strong> sahip olanı daha etkindir. (Örn: Normal dağılımda hem ortalama hem medyan $\\mu$ için yansızdır; ama ortalamanın varyansı medyandan küçük olduğu için ortalama daha etkindir.)</li>
        </ul>
        <div class="callout tip">
          <strong>MSE Ayrışımı:</strong> Bir tahmin edicinin Toplam Karesel Hatası: $\\text{MSE}(\\hat{\\theta}) = \\text{Var}(\\hat{\\theta}) + [\\text{Bias}(\\hat{\\theta})]^2$. Bu formül ilerideki <em>Bias-Variance Tradeoff</em> konusunun doğrudan temelidir!
        </div>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: Tahmin Edicinin MSE'sini Hesaplama",
        problem: "Gerçek değeri $\\theta = 10$ olan bir parametre için A tahmin edicisinin $E[\\hat{\\theta}_A] = 10$ ve $\\text{Var}(\\hat{\\theta}_A) = 4$; B tahmin edicisinin $E[\\hat{\\theta}_B] = 11$ ve $\\text{Var}(\\hat{\\theta}_B) = 1.5$'tir. Hangisinin MSE'si daha düşüktür?",
        steps: [
          "A için: $\\text{Bias}_A = 10 - 10 = 0$. $\\text{MSE}_A = \\text{Var} + \\text{Bias}^2 = 4 + 0^2 = 4.0$.",
          "B için: $\\text{Bias}_B = 11 - 10 = 1$. $\\text{MSE}_B = \\text{Var} + \\text{Bias}^2 = 1.5 + 1^2 = 2.5$."
        ],
        answer: "B tahmin edicisi hafif yanlı olmasına rağmen çok düşük varyansı sayesinde daha düşük MSE'ye (2.5 < 4.0) sahiptir.",
        interpretation: "Ridge/Lasso regülarizasyonu da tam olarak bunu yapar: Modele biraz yanlılık (bias) ekleyerek varyansı ciddi oranda düşürür ve toplam hatayı (MSE) azaltır."
      },
      {
        title: "Örnek 2: Yansız Varyans ($n-1$ vs $n$)",
        problem: "Popülasyon varyansı $\\sigma^2 = 100$ olan dağılımdan $n=5$ örneklem çekildiğinde, paydası $n$ olan $\\hat{\\sigma}^2 = \\frac{1}{n}\\sum(x_i-\\bar{x})^2$ tahmin edicisinin beklenen değeri nedir?",
        steps: [
          "Teorik olarak $E[\\hat{\\sigma}^2] = \\frac{n-1}{n}\\sigma^2$.",
          "$n=5$ için: $E[\\hat{\\sigma}^2] = \\frac{4}{5} \\times 100 = 80$."
        ],
        answer: "Beklenen değer 80 çıkar; yani gerçek varyansı (100) sistematik olarak %20 düşük tahmin eder (yanlıdır).",
        interpretation: "Ancak $n \\to \\infty$ iken $(n-1)/n \\to 1$ olduğu için paydası $n$ olan tahmin edici yanlı olsa da <strong>tutarlıdır</strong>."
      }
    ],
    questions: [
      {
        id: "l2-est-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Gerçek parametre $\\theta = 50$'dir. Bir tahmin edicinin beklenen değeri $E[\\hat{\\theta}] = 53$ ve varyansı $\\text{Var}(\\hat{\\theta}) = 7$'dir. Bu tahmin edicinin <strong>MSE (Mean Squared Error)</strong> değeri kaçtır?",
        hint: "MSE = Var + Bias², Bias = E[θ̂] - θ.",
        answer: 16,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$\\text{Bias} = 53 - 50 = 3$.",
          "$\\text{MSE} = 7 + 3^2 = 7 + 9 = 16$."
        ],
        dsNote: "Regresyon ve ML modellerinde hedef toplam hatayı (MSE) minimize etmektir; yansızlık tek başına yeterli değildir."
      },
      {
        id: "l2-est-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Popülasyon varyansı $\\sigma^2 = 90$ olan bir veriden $n = 10$ elemanlı örneklem alınıyor. Paydasında $n-1$ yerine $n$ kullanılan yanlı varyans formülünün beklenen değeri kaç olur?",
        hint: "E[σ̂²] = ((n-1)/n) * σ²",
        answer: 81,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$E[\\hat{\\sigma}^2] = \\frac{10-1}{10} \\times 90 = 0.9 \\times 90 = 81$."
        ],
        dsNote: "Scikit-learn veya NumPy'da `ddof=0` (varsayılan) $n$'e böler, Pandas `std()` ise `ddof=1` ($n-1$'e) böler. Küçük örneklemlerde bu fark önemlidir."
      },
      {
        id: "l2-est-q3",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Normal dağılımdan çekilen bir örneklemde popülasyon ortalaması $\\mu$'yü tahmin etmek için 'örneklem ortalaması' ve 'örneklem medyası' karşılaştırılıyor. İkisi de yansızdır ama hangisi daha etkindir ve neden?",
        options: [
          "Medyan daha etkindir çünkü aykırı değerleri atar.",
          "Ortalama daha etkindir çünkü Normal dağılımda örneklemden örnekleme daha düşük varyansla değişir.",
          "İkisinin varyansı her zaman eşittir.",
          "Mod en etkin tahmin edicidir."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Normal dağılımda medyanın varyansı ortalamanın varyansının yaklaşık $\\pi/2 \\approx 1.57$ katıdır.",
          "Daha düşük varyanslı yansız tahmin edici daha etkindir."
        ],
        dsNote: "Ancak veri Normal değil de ağır kuyruklu (ör. Cauchy veya çok outlier'lı) ise medyan çok daha düşük varyanslı hale gelir."
      },
      {
        id: "l2-est-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir tahmin edici için $\\hat{\\theta}_n = X_1$ (yani $n$ kaç olursa olsun sadece ilk gözlemi kullanıp diğerlerini çöpe atıyor) tanımlanıyor. Bu tahmin edicinin özellikleri nelerdir?",
        options: [
          "Yansızdır ve tutarlıdır.",
          "Yansızdır ama TUTARSIZDIR (n büyüdükçe gerçek değere yakınsamaz).",
          "Yanlıdır ama tutarlıdır.",
          "En etkin tahmin edicidir."
        ],
        answerIndex: 1,
        solutionSteps: [
          "$E[X_1] = \\mu$ olduğu için yansızdır.",
          "Ancak $n = 1.000.000$ bile olsa varyansı $\\sigma^2$ olarak sabit kalır, sıfıra inmez; dolayısıyla tutarsızdır."
        ],
        dsNote: "Büyük veri (Big Data) ile çalışırken tutarlılık, veriyi artırdıkça modelin gerçekten iyileşeceğinin garantisidir."
      },
      {
        id: "l2-est-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Küçük bir eğitim setinde modelinizin katsayı varyansı çok yüksek çıkıyor. Tahmin edici teorisine göre hangi yaklaşım toplam MSE'yi düşürebilir?",
        options: [
          "Modele daha fazla gürültülü özellik eklemek",
          "Katsayılara hafif bir yanlılık (bias) pahasına varyansı sert düşüren L2/L1 regülarizasyonu uygulamak",
          "Örneklem sayısını yarıya indirmek",
          "Bessel düzeltmesini kaldırmak"
        ],
        answerIndex: 1,
        solutionSteps: [
          "MSE = Varyans + Bias² olduğundan, küçük bir Bias² artışı karşılığında büyük bir Varyans düşüşü toplam MSE'yi azaltır."
        ],
        dsNote: "İstatistikte Stein paradoksu ve Ridge regresyon bu ilkeye dayanır."
      }
    ]
  },

  {
    id: "l2-mle",
    level: 2,
    levelTitle: "2. Orta Seviye: Çıkarımsal İstatistik (Inferential Statistics)",
    order: 8,
    title: "En Çok Olabilirlik Tahmini (MLE)",
    tag: "core",
    explainability: false,
    summary: "Olabilirlik (Likelihood) fonksiyonu, log-olabilirlik, OLS regresyon ve Cross-Entropy kaybının MLE ile bağlantısı.",
    keywords: ["mle", "likelihood", "olabilirlik", "log-likelihood", "cross-entropy", "ols", "lojistik regresyon"],
    labId: "lab-mle",
    theoryHtml: `
      <div class="card">
        <h3>1. Olasılık vs. Olabilirlik (Probability vs. Likelihood)</h3>
        <ul>
          <li><strong>Olasılık:</strong> Parametre ($\\theta$) sabittir, "Bu dağılımdan böyle bir veri gelme ihtimali nedir?" ($P(X \\mid \\theta)$).</li>
          <li><strong>Olabilirlik (Likelihood):</strong> Veri ($X$) sabittir, "Elimizdeki bu veriyi üretme ihtimali en yüksek olan parametre $\\theta$ hangisidir?" ($L(\\theta \\mid X)$).</li>
        </ul>
        <p>Bağımsız gözlemler için olabilirlik çarpımı maksimize edilir; çarpımı toplama çevirmek ve sayısal taşmayı (underflow) önlemek için <strong>Log-Likelihood</strong> alınır:</p>
        <div class="formula-box">$$\\ell(\\theta) = \\sum_{i=1}^n \\log P(x_i \\mid \\theta)$$</div>
        <p><strong>Log-Likelihood değeri neden hep negatif çıkar ve nasıl yorumlanır?</strong> Olasılıklar $0$ ile $1$ arasındadır ve $1$'den küçük sayıların logaritması ($\\ln P$) daima negatiftir. Dolayısıyla $\\ell(\\theta)$ tek başına mutlak bir başarı skoru değildir; aday parametreleri karşılaştırmak için kullanılır. <strong>Sıfıra ne kadar yakınsa</strong> (yani ne kadar büyükse, örn. $-6.1 > -6.9$), o parametre elimizdeki veriyi o kadar iyi açıklıyor demektir.</p>
      </div>

      <div class="card">
        <h3>2. ML/DL Kayıp Fonksiyonlarıyla Doğrudan Bağlantısı</h3>
        <ul>
          <li><strong>Lineer Regresyon (OLS):</strong> Hataların Normal dağıldığı varsayımı altında MLE yapmak, kareler toplamını (MSE) minimize etmekle <strong>matematiksel olarak özdeştir</strong>.</li>
          <li><strong>Lojistik Regresyon &amp; Sinir Ağları (Cross-Entropy Loss):</strong> Bernoulli/Kategorik dağılım varsayımı altında <strong>Negative Log-Likelihood (NLL)</strong>'yi minimize etmek, tam olarak <strong>Binary / Categorical Cross-Entropy</strong> kayıp fonksiyonunu minimize etmektir!</li>
        </ul>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: Bernoulli MLE (Tıklama Oranı)",
        problem: "10 kullanıcının 7'si reklama tıkladı ($k=7, n=10$). $p=0.5$ ve $p=0.7$ adayları için Log-Likelihood değerlerini karşılaştırın.",
        steps: [
          "Bernoulli log-likelihood: $\\ell(p) = k \\ln(p) + (n-k) \\ln(1-p) = 7\\ln(p) + 3\\ln(1-p)$.",
          "$p = 0.5$ için: $\\ell(0.5) = 7\\ln(0.5) + 3\\ln(0.5) = 10\\ln(0.5) \\approx -6.931$.",
          "$p = 0.7$ için: $\\ell(0.7) = 7\\ln(0.7) + 3\\ln(0.3) \\approx 7(-0.3567) + 3(-1.2040) = -2.497 - 3.612 = -6.109$."
        ],
        answer: "ℓ(0.7) = -6.109 > ℓ(0.5) = -6.931. Türev alınıp 0'a eşitlendiğinde tam MLE tahmini p̂ = 7/10 = 0.70 çıkar.",
        interpretation: "İki sayının da negatif çıkması normaldir çünkü 0–1 arası olasılıkların logaritması negatiftir. Ancak -6.109, -6.931'den büyük (sıfıra daha yakın) olduğu için p=0.7 adayının elimizdeki 7/10 verisini üretme olasılığı p=0.5'ten e^(-6.109 - (-6.931)) ≈ 2.27 kat daha yüksektir. Sezgisel örneklem oranı (k/n) aslında Bernoulli dağılımının MLE sonucudur."
      },
      {
        title: "Örnek 2: Binary Cross-Entropy = Negative Log-Likelihood",
        problem: "Gerçek etiket $y = 1$ olan bir gözlem için model $\\hat{p} = 0.8$ olasılık tahmin ediyor. Bu gözlemin Binary Cross-Entropy kaybı nedir? ($\\ln(0.8) \\approx -0.223$)",
        steps: [
          "$\\text{BCE} = -[y \\ln(\\hat{p}) + (1-y)\\ln(1-\\hat{p})]$.",
          "$y = 1$ olduğu için: $\\text{BCE} = -\\ln(0.8) \\approx -(-0.223) = 0.223$."
        ],
        answer: "BCE = 0.223.",
        interpretation: "Negative Log-Likelihood başına eksi konduğu için kayıp değeri artık ≥ 0 olur ve hedefimiz bu sayıyı 0'a yaklaştırmaktır. Model doğru sınıfa %80 emin olduğunda ceza 0.223 gibi küçük bir değerken, doğru sınıfa sadece %1 olasılık verseydi ceza -ln(0.01) = 4.605'e fırlar ve gradyan inişi ağırlıkları çok sert güncellerdi."
      }
    ],
    questions: [
      {
        id: "l2-mle-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir madeni para 20 kez atılıyor ve 14 kez tura geliyor. Tura gelme olasılığı $p$'nin <strong>MLE tahmini ($\\hat{p}_{\\text{MLE}}$)</strong> kaçtır?",
        hint: "Binom/Bernoulli dağılımında p'nin MLE tahmini k / n'dir.",
        answer: 0.7,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$\\hat{p}_{\\text{MLE}} = k / n = 14 / 20 = 0.70$."
        ],
        dsNote: "MLE hiçbir önsel inanç (prior) eklemeden tamamen gözlenen veriyi en olası kılan parametreyi seçer."
      },
      {
        id: "l2-mle-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Sürekli bir Normal dağılımdan [10, 14, 18, 22] örneklemi çekilmiştir. Popülasyon ortalaması $\\mu$'nün <strong>MLE tahmini</strong> kaçtır?",
        hint: "Normal dağılımda μ'nün MLE tahmini örneklem ortalamasıdır.",
        answer: 16,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$\\hat{\\mu}_{\\text{MLE}} = (10 + 14 + 18 + 22) / 4 = 64 / 4 = 16$."
        ],
        dsNote: "Normal dağılımda $\\sigma^2$'nin MLE tahmini ise $n-1$'e değil $n$'e bölünür."
      },
      {
        id: "l2-mle-q3",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir sınıflandırma modelinde gerçek sınıf $y=0$'dır ve model sınıf 1 için $\\hat{p} = 0.2$ tahmin etmiştir. Bu gözlem için Binary Cross-Entropy kaybı ($-\\ln(1 - \\hat{p})$) kaçtır? ($\\ln(0.8) \\approx -0.223$)",
        hint: "y=0 olduğunda kayıp -ln(1 - 0.2) = -ln(0.8) olur.",
        answer: 0.223,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$\\text{BCE} = -(0 \\cdot \\ln(0.2) + 1 \\cdot \\ln(1 - 0.2)) = -\\ln(0.8) \\approx 0.223$."
        ],
        dsNote: "Eğer model yanlış sınıfa çok emin olsaydı ($\\hat{p}=0.99$), $-\\ln(0.01) = 4.605$ gibi devasa bir ceza alırdı."
      },
      {
        id: "l2-mle-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Derin öğrenme ve lojistik regresyonda neden ham Olabilirlik (Likelihood) çarpımını maksimize etmek yerine Negative Log-Likelihood (NLL) minimize edilir?",
        options: [
          "Çarpımlar çok küçük olasılıklarda sayısal sıfıra (underflow) gider; logaritma çarpımı toplama çevirir ve eksi işareti optimizasyonu minimizasyona dönüştürür.",
          "Logaritma tüm verileri pozitif tamsayıya çevirir.",
          "Sadece gradyan inişinin (gradient descent) çalışmaması için.",
          "Likelihood her zaman negatif olduğu için."
        ],
        answerIndex: 0,
        solutionSteps: [
          "1000 gözlemin 0.5 olasılıklarını çarpmak $0.5^{1000} \\approx 10^{-301}$ üretir ve bilgisayar belleğinde 0'a yuvarlanır.",
          "Logaritma monotonik artan olduğu için $\\log L$'yi maksimize etmekle $L$'yi maksimize etmek aynı çözümü verir."
        ],
        dsNote: "PyTorch'taki `nn.CrossEntropyLoss` ve `nn.BCEWithLogitsLoss` tam olarak bu NLL mantığını uygular."
      },
      {
        id: "l2-mle-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Doğrusal regresyonda hataların Normal dağıldığı varsayıldığında MLE ile hangi klasik yöntem birebir aynı katsayıları verir?",
        options: [
          "K-Means Kümeleme",
          "En Küçük Kareler (OLS - Ordinary Least Squares)",
          "Spearman Korelasyonu",
          "Mann-Whitney U Testi"
        ],
        answerIndex: 1,
        solutionSteps: [
          "Normal PDF içindeki $\\exp(-(y_i - \\hat{y}_i)^2 / 2\\sigma^2)$ teriminin logaritmasını alıp maksimize etmek, $\\sum(y_i - \\hat{y}_i)^2$ toplamını minimize etmekle eşdeğerdir."
        ],
        dsNote: "Hatalar Laplace dağılımlı varsayılsaydı MLE bize L1 kaybını (MAE) verirdi."
      }
    ]
  },

  {
    id: "l2-hypothesis",
    level: 2,
    levelTitle: "2. Orta Seviye: Çıkarımsal İstatistik (Inferential Statistics)",
    order: 9,
    title: "Hipotez Testleri ve Çoklu Test Düzeltmeleri",
    tag: "core",
    explainability: true,
    summary: "H0/H1, p-değeri, Tip I/II hata, İstatistiksel Güç, Cohen's d, Z/t/F/Ki-kare testleri, varsayım kontrolleri, non-parametrik testler ve Bonferroni/FDR.",
    keywords: ["hipotez", "p-değeri", "p-value", "tip 1", "tip 2", "güç", "power", "cohen", "z-test", "z-testi", "t-test", "anova", "ki-kare", "mann-whitney", "bonferroni", "fdr"],
    labId: "lab-hypothesis",
    theoryHtml: `
      <div class="card">
        <h3>1. Temel Kavramlar, p-değeri ve Hata Türleri</h3>
        <ul>
          <li><strong>$H_0$ (Sıfır Hipotezi):</strong> "Fark yoktur / etki yoktur" varsayımı.</li>
          <li><strong>$H_1$ (Alternatif Hipotez):</strong> Kanıtlamaya çalıştığımız fark/etki.</li>
          <li><strong>p-değeri (p-value):</strong> "$H_0$ doğru olsaydı, elimizdeki veriyi veya daha uç bir sonucu gözlemleme olasılığımız nedir?" <em>(Dikkat: p-değeri "$H_0$'ın doğru olma olasılığı" DEĞİLDİR!)</em></li>
          <li><strong>Tip I Hata ($\\alpha$, False Positive):</strong> Gerçekte fark yokken "fark var" demek ($H_0$ doğruyken reddetmek).</li>
          <li><strong>Tip II Hata ($\\beta$, False Negative):</strong> Gerçekte fark varken yakalayamamak. <strong>İstatistiksel Güç (Power) $= 1 - \\beta$</strong> (genelde %80 hedeflenir).</li>
        </ul>
      </div>

      <div class="card">
        <h3>2. Etki Büyüklüğü (Effect Size) — İstatistiksel vs. Pratik Anlamlılık</h3>
        <p>Çok büyük veride ($n = 1.000.000$) %0.01'lik önemsiz bir fark bile $p < 0.001$ çıkabilir! Çünkü p-değeri sadece farkın "şans eseri mi yoksa gerçek mi" olduğunu söyler, <strong>farkın iş açısından büyük veya önemli olup olmadığını söylemez</strong>. Bu yüzden standart sapma cinsinden farkın büyüklüğünü ölçen <strong>Cohen's d</strong> kullanılır:</p>
        <div class="formula-box">$$d = \\frac{\\bar{x}_1 - \\bar{x}_2}{s_{\\text{havuz}}}$$</div>
        <p><strong>Ne anlatır?</strong> İki grubun ortalamaları arasındaki farkın, verinin kendi doğal yayılımına (standart sapmasına) göre kaç kat olduğunu gösterir. Örneklem büyüklüğünden bağımsızdır. Genel rehber: $|d| \\approx 0.2$ küçük (günlük gürültü içinde zor fark edilir), $0.5$ orta (gözle görülür fark), $0.8$ büyük etki (çok belirgin fark).</p>
      </div>

      <div class="card">
        <h3>3. Z-Testi vs. T-Testi ve Hangi Test Ne Zaman Kullanılır?</h3>
        <p><strong>Z-Testi ile T-Testi Arasındaki Fark Nedir?</strong> İkisi de örneklem ortalamasını karşılaştırır; temel fark popülasyon standart sapmasını ($\\sigma$) bilip bilmediğimizdir:</p>
        <ul>
          <li><strong>Z-Testi:</strong> Popülasyon standart sapması $\\sigma$ <strong>biliniyorsa</strong> veya çok büyük örneklemde ($n \\ge 30$) oran/ortalama testi yapılıyorsa Standart Normal dağılım kullanılır:
            <div class="formula-box">$$Z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}}$$</div>
          </li>
          <li><strong>T-Testi:</strong> Gerçek dünya problemlerinin çoğunda popülasyonun $\\sigma$'sını bilmeyiz; onun yerine örneklem standart sapması $s$'yi kullanırız. $s$ de bir tahmin olduğu için ekstra belirsizlik eklenir ve özellikle küçük örneklemlerde daha kalın kuyruklu <strong>$t$-dağılımı</strong> gerekir ($n$ büyüdükçe $t$-dağılımı $Z$'ye yaklaşır).</li>
        </ul>
        <div class="table-wrap">
          <table class="info-table">
            <thead><tr><th>Senaryo</th><th>Parametrik Test</th><th>Non-Parametrik Alternatif</th></tr></thead>
            <tbody>
              <tr><td>Tek grup ortalaması (<strong>$\\sigma$ biliniyor</strong> / büyük $n$ oran)</td><td>Z-testi</td><td>Binom / İşaret Testi</td></tr>
              <tr><td>Tek grup ortalaması (<strong>$\\sigma$ bilinmiyor</strong>)</td><td>Tek Örneklem t-testi</td><td>Wilcoxon İşaretli Sıra</td></tr>
              <tr><td>2 bağımsız grup karşılaştırması</td><td>Bağımsız 2 Örneklem t-testi (veya büyük $n$ Z-testi)</td><td>Mann-Whitney U</td></tr>
              <tr><td>Aynı kişilerin öncesi / sonrası</td><td>Eşleştirilmiş (Paired) t-testi</td><td>Wilcoxon</td></tr>
              <tr><td>3+ grup ortalaması karşılaştırması</td><td>ANOVA (F-dağılımı)</td><td>Kruskal-Wallis</td></tr>
              <tr><td>2 kategorik değişken bağımsızlığı</td><td>Ki-Kare ($\\chi^2$) Bağımsızlık Testi</td><td>Fisher'ın Kesin Testi</td></tr>
            </tbody>
          </table>
        </div>
        <p><strong>Varsayım Kontrolleri:</strong> Parametrik testler öncesi Normallik (Shapiro-Wilk, Q-Q grafiği) ve Varyans Homojenliği (Levene testi) kontrol edilir.</p>
      </div>

      <div class="card">
        <h3>4. Çoklu Test Düzeltmeleri (Bonferroni &amp; Benjamini-Hochberg FDR)</h3>
        <p>Aynı anda 20 farklı özelliği $\\alpha = 0.05$ ile test ederseniz, hiçbir gerçek etki olmasa bile şans eseri $20 \\times 0.05 = 1$ tanesi "anlamlı" çıkar! Bunu önlemek için:</p>
        <ul>
          <li><strong>Bonferroni Düzeltmesi:</strong> Çok katıdır, yeni eşik $\\alpha_{\\text{yeni}} = \\alpha / m$ ($m$: test sayısı).</li>
          <li><strong>Benjamini-Hochberg (FDR):</strong> Yanlış Keşif Oranını (False Discovery Rate) kontrol eder, veri biliminde daha esnek ve yaygın tercih edilir.</li>
        </ul>
        <div class="callout explain">
          <strong>✱ Açıklanabilirlik Bağlantısı:</strong> "p = 0.02 çıktı, özellik anlamlı" demek yerine etki büyüklüğünü ve çoklu test düzeltmesi sonrası durumunu raporlamak model savunmasını güçlendirir.
        </div>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: Tek Örneklem t-istatistiği ve Cohen's d",
        problem: "Eski modelin ortalama hatası $\\mu_0 = 50$ ms'dir. Yeni modelin $n = 25$ testindeki ortalaması $\\bar{x} = 46$ ms, standart sapması $s = 10$ ms'dir. t-istatistiğini ve Cohen's d etki büyüklüğünü hesaplayın.",
        steps: [
          "Standart hata: $SE = s / \\sqrt{n} = 10 / \\sqrt{25} = 2$ ms.",
          "t-istatistiği: $t = (46 - 50) / 2 = -2.0$ ($df = 24$).",
          "Cohen's d: $d = (46 - 50) / 10 = -0.40$ (orta-küçük arası etki)."
        ],
        answer: "t = -2.0 (df=24), Cohen's d = -0.40.",
        interpretation: "$df=24$ için çift yönlü kritik t değeri ~2.064 olduğundan $|t|=2.0 < 2.064$ kalır ve $\\alpha=0.05$'te $H_0$ sınırda reddedilemez."
      },
      {
        title: "Örnek 2: Bonferroni Çoklu Test Düzeltmesi",
        problem: "Bir özellik seçimi (feature selection) adımında 50 farklı değişkenin hedefle ilişkisi $\\alpha = 0.05$ aile-bazlı hata oranıyla test ediliyor. Bonferroni düzeltmesine göre yeni p-değeri eşiği kaçtır?",
        steps: [
          "$\\alpha_{\\text{Bonferroni}} = \\alpha / m = 0.05 / 50 = 0.001$."
        ],
        answer: "Yeni anlamlılık eşiği = 0.001.",
        interpretation: "p-değeri 0.02 olan bir özellik düzeltmesiz anlamlı görünse de Bonferroni sonrası (0.02 > 0.001) şans eseri çıkmış olabileceği için elenir."
      },
      {
        title: "Örnek 3: Z-Testi ile Sistem Gecikmesi Kontrolü (σ Biliniyor)",
        problem: "Bir API servisinin tarihsel ortalama yanıt süresi $\\mu_0 = 100$ ms ve popülasyon standart sapması bilinen şekilde $\\sigma = 15$ ms'dir. Güncelleme sonrası $n = 36$ isteğin ortalaması $\\bar{x} = 106$ ms ölçülmüştür. $\\alpha = 0.05$ (çift yönlü kritik $|Z| = 1.96$) düzeyinde gecikme anlamlı şekilde değişmiş midir?",
        steps: [
          "Popülasyon $\\sigma$ bilindiği için t-testi değil <strong>Z-testi</strong> uygulanır.",
          "Standart hata: $SE = \\sigma / \\sqrt{n} = 15 / \\sqrt{36} = 15 / 6 = 2.5$ ms.",
          "Z-istatistiği: $Z = (106 - 100) / 2.5 = 2.40$.",
          "$|Z| = 2.40 > 1.96$ ($p \\approx 0.016 < 0.05$) olduğundan $H_0$ reddedilir."
        ],
        answer: "Z = +2.40 (p ≈ 0.016). Yanıt süresindeki +6 ms'lik artış istatistiksel olarak anlamlıdır.",
        interpretation: "Gözlenen 6 ms'lik fark, rastgele standart hata (2.5 ms) cinsinden 2.4 standart sapma uzakta olduğu için şansla açıklanamaz; güncelleme API'yi yavaşlatmıştır."
      }
    ],
    questions: [
      {
        id: "l2-hyp-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "A ve B gruplarının ortalamaları $\\bar{x}_1 = 85$, $\\bar{x}_2 = 75$ ve havuzlanmış standart sapma $s_{\\text{havuz}} = 20$'dir. <strong>Cohen's d</strong> etki büyüklüğü kaçtır?",
        hint: "d = (85 - 75) / 20",
        answer: 0.5,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$d = (85 - 75) / 20 = 10 / 20 = 0.50$ (orta düzeyde etki)."
        ],
        dsNote: "Örneklem sayısı 10 milyon olsa da 100 olsa da Cohen's d değişmez; pratik etkiyi gösterir."
      },
      {
        id: "l2-hyp-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Aynı veri seti üzerinde 25 farklı hipotez testi yapıyorsunuz ve toplam aile-bazlı Tip I hata oranını $\\alpha = 0.05$'te tutmak için <strong>Bonferroni düzeltmesi</strong> uyguluyorsunuz. Yeni eşik değeriniz kaç olur?",
        hint: "0.05 / 25",
        answer: 0.002,
        tolerance: 0.0001,
        unit: "",
        solutionSteps: [
          "$\\alpha_{\\text{yeni}} = 0.05 / 25 = 0.002$."
        ],
        dsNote: "Çok sayıda A/B test metriğine aynı anda bakarken bu düzeltme yapılmazsa yanlış pozitif patlaması yaşanır."
      },
      {
        id: "l2-hyp-q3",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir testin Tip II hata olasılığı $\\beta = 0.15$ olarak hesaplanmıştır. Bu testin <strong>İstatistiksel Gücü (Statistical Power)</strong> yüzde (%) kaçtır?",
        hint: "Power = (1 - β) * 100",
        answer: 85,
        tolerance: 0.1,
        unit: "%",
        solutionSteps: [
          "$\\text{Power} = 1 - \\beta = 1 - 0.15 = 0.85 = \\%85$."
        ],
        dsNote: "Endüstride yeni bir deney planlanırken genellikle en az %80 güç hedeflenir."
      },
      {
        id: "l2-hyp-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "İki müşteri segmentinin (n1=18, n2=20) harcama tutarlarını karşılaştırmak istiyorsunuz. Shapiro-Wilk testi her iki grubun da aşırı sağa çarpık olduğunu ($p < 0.001$) gösteriyor. Hangi testi seçmelisiniz?",
        options: [
          "Bağımsız İki Örneklem t-testi",
          "Mann-Whitney U Testi",
          "Ki-Kare Bağımsızlık Testi",
          "Eşleştirilmiş t-testi"
        ],
        answerIndex: 1,
        solutionSteps: [
          "Örneklemler küçük ($n < 30$) ve normallik varsayımı bozulmuş durumda.",
          "İki bağımsız grubun non-parametrik alternatifi Mann-Whitney U testidir."
        ],
        dsNote: "Non-parametrik testler sıralamalar (ranks) üzerinden çalıştığı için aykırı değerlerden ve çarpıklıktan etkilenmez."
      },
      {
        id: "l2-hyp-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir A/B testinde p-değeri 0.03 çıkmıştır ($\\alpha = 0.05$). Bir yönetici 'Yani yeni tasarımın eski tasarımdan kötü olma ihtimali sadece %3, değil mi?' diye sorar. Doğru düzeltme hangisidir?",
        options: [
          "Evet, tam olarak öyledir.",
          "Hayır; p=0.03, 'gerçekte hiçbir fark yokken (H0 doğruyken) bu kadar uç bir farkı şans eseri görme olasılığımız %3'tür' demektir.",
          "Hayır, eski tasarımın daha iyi olma ihtimali %97'dir.",
          "p-değeri Tip II hata oranıdır."
        ],
        answerIndex: 1,
        solutionSteps: [
          "p-değeri $P(\\text{Veri} \\mid H_0)$ koşullu olasılığıdır; $P(H_0 \\mid \\text{Veri})$ değildir.",
          "Hipotezlerin olasılığını doğrudan söylemek için Bayesçi analiz gerekir."
        ],
        dsNote: "p-değerini yanlış yorumlamamak, istatistik mülakatlarında ve yönetici sunumlarında en sık test edilen noktadır."
      }
    ]
  },

  {
    id: "l2-metrics",
    level: 2,
    levelTitle: "2. Orta Seviye: Çıkarımsal İstatistik (Inferential Statistics)",
    order: 10,
    title: "Confusion Matrix ve Sınıflandırma Metrikleri",
    tag: "core",
    explainability: true,
    summary: "TP, FP, TN, FN matrisi; Tip I/II hata ve Bayes bağlantısı; Accuracy, Precision, Recall ve F1-Score.",
    keywords: ["confusion matrix", "accuracy", "precision", "recall", "f1", "f1-score", "sensitivity", "specificity", "tip 1", "tip 2"],
    labId: "lab-confusion",
    theoryHtml: `
      <div class="card">
        <h3>1. Confusion Matrix (Karışıklık Matrisi) ve Hipotez Testi Bağlantısı</h3>
        <p>Bir ikili sınıflandırma modelinin (ör. Fraud var/yok, Hasta/Sağlıklı) tahminlerini gerçek durumla karşılaştıran $2 \\times 2$ tabloya <strong>Confusion Matrix</strong> denir. Aslında bu tablo, Konu 9'daki Hipotez Testi hatalarının makine öğrenmesindeki birebir karşılığıdır:</p>
        <div class="table-wrap">
          <table class="info-table">
            <thead><tr><th></th><th>Gerçek: Pozitif (1)</th><th>Gerçek: Negatif (0)</th></tr></thead>
            <tbody>
              <tr><td><strong>Tahmin: Pozitif (1)</strong></td><td><strong>TP (True Positive)</strong> — Doğru tespit (İstatistiksel Güç)</td><td><strong>FP (False Positive)</strong> — Yanlış alarm (<strong>Tip I Hata, $\\alpha$</strong>)</td></tr>
              <tr><td><strong>Tahmin: Negatif (0)</strong></td><td><strong>FN (False Negative)</strong> — Kaçırılan vaka (<strong>Tip II Hata, $\\beta$</strong>)</td><td><strong>TN (True Negative)</strong> — Doğru eleme</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h3>2. Accuracy, Precision, Recall ve F1-Score Ne Anlatır?</h3>
        <ul>
          <li><strong>Accuracy (Doğruluk):</strong> Tüm tahminlerin yüzde kaçı doğru?
            <div class="formula-box">$$\\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN}$$</div>
            <em>Ne zaman yanıltır?</em> Dengesiz verilerde (ör. %99 normal, %1 fraud) her şeye "normal" diyen işe yaramaz bir model bile %99 Accuracy alır (<em>Accuracy Paradox</em>)!
          </li>
          <li><strong>Precision (Kesinlik):</strong> Modelin <strong>"Pozitif" dediği</strong> vakaların yüzde kaçı gerçekten pozitif? (Bayes Teoremi'ndeki $P(\\text{Gerçek}+ \\mid \\text{Tahmin}+)$ değeridir!)
            <div class="formula-box">$$\\text{Precision} = \\frac{TP}{TP + FP}$$</div>
            <em>Ne zaman kritiktir?</em> Yanlış alarmın (FP) pahalı olduğu durumlarda (örn. spam filtresinde önemli iş mailini spam'a atmamak, müşteriye hatalı suçlama/bloke koymamak).
          </li>
          <li><strong>Recall / Sensitivity (Duyarlılık):</strong> Gerçekte pozitif olan tüm vakaların yüzde kaçını yakalayabildik? (Hipotez testindeki <strong>İstatistiksel Güç $= 1 - \\beta$</strong>'nın birebir karşılığıdır!)
            <div class="formula-box">$$\\text{Recall} = \\frac{TP}{TP + FN}$$</div>
            <em>Ne zaman kritiktir?</em> Kaçırılan vakanın (FN) çok tehlikeli olduğu durumlarda (örn. kanser teşhisi, dolandırıcılık tespiti, arıza tahmini).
          </li>
          <li><strong>F1-Score:</strong> Precision ile Recall'un <strong>harmonik ortalamasıdır</strong>:
            <div class="formula-box">$$F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2TP}{2TP + FP + FN}$$</div>
            <strong>Neden aritmetik değil de harmonik ortalama?</strong> Aritmetik ortalama kullansaydık Precision = 1.0, Recall = 0.02 olan bir model bile 0.51 alırdı. Harmonik ortalama küçük olan sayıya yakın çekilir; yani F1'in yüksek çıkması için <strong>hem Precision'ın hem Recall'un aynı anda iyi olması</strong> gerekir.
          </li>
        </ul>
        <div class="callout explain">
          <strong>✱ Açıklanabilirlik Bağlantısı:</strong> İş birimlerine sadece "Modelimizin doğruluğu %94" demek yerine Confusion Matrix üzerinden "100 gerçek dolandırıcılığın 80'ini yakalıyoruz (Recall %80), ancak her 10 alarmdan ~5'i yanlış alarm (Precision %44)" demek gerçek iş maliyetini ve karar eşiğini (threshold) şeffaf biçimde anlatır.
        </div>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: Dengesiz Fraud Veri Setinde 4 Metriğin Hesabı",
        problem: "1.000 kredi kartı işleminde 50 gerçek fraud vardır. Model 40 fraud'u yakalamış (TP=40), 10'unu kaçırmış (FN=10); ayrıca 50 normal işleme yanlışlıkla fraud alarmı vermiş (FP=50) ve 900 normal işlemi doğru geçmiş (TN=900). Accuracy, Precision, Recall ve F1-Score'u hesaplayın.",
        steps: [
          "Accuracy = $(40 + 900) / 1000 = 940 / 1000 = 0.94$ (%94.0).",
          "Precision = $40 / (40 + 50) = 40 / 90 \\approx 0.444$ (%44.4).",
          "Recall = $40 / (40 + 10) = 40 / 50 = 0.80$ (%80.0).",
          "F1-Score = $2 \\times \\frac{0.4444 \\times 0.80}{0.4444 + 0.80} = \\frac{0.7111}{1.2444} \\approx 0.571$ (%57.1)."
        ],
        answer: "Accuracy = %94.0, Precision = %44.4, Recall = %80.0, F1-Score = %57.1.",
        interpretation: "Accuracy %94 gibi çok yüksek görünse de modelin ürettiği 90 alarmın 50'si yanlış alarm olduğu için Precision %44.4'tür. Öte yandan gerçek dolandırıcılıkların %80'ini yakaladığı için Recall güçlüdür. F1 (%57.1) ise bu iki metriğin dengeli özetini verir."
      },
      {
        title: "Örnek 2: Accuracy Tuzağı (Accuracy Paradox)",
        problem: "1.000 işlemden sadece 10'u fraud (%1). Hiç öğrenmeyen ve gelen her işleme 'Normal (0)' diyen bir sahte modelin Accuracy ve Recall değerleri ne olur?",
        steps: [
          "TP = 0, FP = 0, FN = 10, TN = 990.",
          "Accuracy = $(0 + 990) / 1000 = \\%99.0$.",
          "Recall = $0 / (0 + 10) = \\%0$ (Precision ise $0/0$ tanımsız)."
        ],
        answer: "Accuracy = %99.0, Recall = %0.",
        interpretation: "Model tek bir fraud bile yakalamadan %99 doğruluk almıştır! Bu yüzden sınıf dengesizliği (class imbalance) olduğunda Accuracy asla tek başına kullanılmamalıdır."
      }
    ],
    questions: [
      {
        id: "l2-met-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir sınıflandırma modelinin test sonuçları: $TP = 80$, $FP = 20$, $FN = 40$, $TN = 860$. Modelin <strong>Precision (%)</strong> değeri kaçtır?",
        hint: "Precision = TP / (TP + FP) * 100",
        answer: 80,
        tolerance: 0.1,
        unit: "%",
        solutionSteps: [
          "$\\text{Precision} = \\frac{80}{80 + 20} = \\frac{80}{100} = 0.80 = \\%80$."
        ],
        dsNote: "Modelin pozitif tahmin ettiği 100 örneğin 80'i gerçekten pozitiftir (%20 yanlış alarm oranı)."
      },
      {
        id: "l2-met-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Aynı test sonuçlarında ($TP = 80$, $FP = 20$, $FN = 40$, $TN = 860$) modelin <strong>Recall (%)</strong> değeri kaçtır? (1 ondalık basamak)",
        hint: "Recall = TP / (TP + FN) * 100",
        answer: 66.7,
        tolerance: 0.2,
        unit: "%",
        solutionSteps: [
          "Gerçek pozitif sayısı = $TP + FN = 80 + 40 = 120$.",
          "$\\text{Recall} = \\frac{80}{120} \\approx 0.6667 = \\%66.7$."
        ],
        dsNote: "Gerçek 120 pozitif vakanın 40'ı (%33.3'ü) model tarafından kaçırılmıştır (Tip II Hata / False Negative)."
      },
      {
        id: "l2-met-q3",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir modelin Precision değeri $0.60$ ve Recall değeri $0.40$ olarak ölçülmüştür. Bu modelin <strong>F1-Score</strong> değeri (0 ile 1 arasında) kaçtır?",
        hint: "F1 = 2 * P * R / (P + R)",
        answer: 0.48,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$F_1 = 2 \\times \\frac{0.60 \\times 0.40}{0.60 + 0.40} = \\frac{0.48}{1.00} = 0.48$."
        ],
        dsNote: "Dikkat: Aritmetik ortalama 0.50 çıkarken, harmonik ortalama olan F1-Score düşük tarafa doğru çekilerek 0.48 çıkar."
      },
      {
        id: "l2-met-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir hastanede erken evre kanser taraması için ML modeli kuruyorsunuz. Hasta bir kişiyi 'sağlıklı' sanıp eve göndermenin (FN) maliyeti, sağlıklı bir kişiye ek tetkik istemenin (FP) maliyetinden katbekat büyüktür. Model karar eşiğini ayarlarken hangi metriği önceliklendirmelisiniz?",
        options: [
          "Precision — yanlış alarm sayısını sıfıra indirmek için",
          "Recall (Duyarlılık) — gerçek hastaların hiçbirini kaçırmamak (FN'yi düşürmek) için",
          "Sadece Accuracy — genel oran yüksek çıksın diye",
          "Specificity — negatifleri korumak için"
        ],
        answerIndex: 1,
        solutionSteps: [
          "Kaçırılan hasta (FN) Tip II hatadır ve hayati risk taşır.",
          "Karar eşiğini düşürerek daha fazla şüpheli vakayı yakalamak Recall'u yükseltir."
        ],
        dsNote: "Tıbbi tarama, fraud ve güvenlik alarmı gibi alanlarda Recall kritikken; spam filtresi veya çocuk içerik önerisinde Precision kritik olur."
      },
      {
        id: "l2-met-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "E-posta spam veya nadir arıza tespiti gibi pozitif sınıfın sadece %1 olduğu bir veri setinde yönetici 'Model %99 Accuracy alıyor, mükemmel!' diyor. Neden dikkatli olmalısınız?",
        options: [
          "%99 Accuracy her zaman mükemmel model demektir.",
          "Sınıf dengesizliği nedeniyle her gözleme 'Negatif (0)' diyen aptal bir model bile %99 Accuracy alır; Precision, Recall, F1 veya PR-AUC kontrol edilmelidir.",
          "Confusion Matrix sadece regresyon modellerinde kullanılır.",
          "Accuracy formülünde TP yer almaz."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Pozitif sınıf %1 iken tüm tahminleri 0 yapmak TN=%99, FN=%1 üretir → Accuracy = %99 ama Recall = %0."
        ],
        dsNote: "Dengesiz sınıflandırma projelerinde mutlaka Confusion Matrix ile birlikte F1-Score veya PR-AUC raporlanmalıdır."
      }
    ]
  },

  {
    id: "l2-missing",
    level: 2,
    levelTitle: "2. Orta Seviye: Çıkarımsal İstatistik (Inferential Statistics)",
    order: 11,
    title: "Eksik Veri Mekanizmaları (MCAR, MAR, MNAR)",
    tag: "core",
    explainability: false,
    summary: "Eksik verinin neden oluştuğunu anlamak (MCAR, MAR, MNAR) ve buna göre doğru doldurma (imputation) stratejisini seçmek.",
    keywords: ["eksik veri", "missing data", "mcar", "mar", "mnar", "imputation"],
    labId: "lab-missing",
    theoryHtml: `
      <div class="card">
        <h3>1. Üç Eksik Veri Mekanizması</h3>
        <ul>
          <li><strong>MCAR (Missing Completely at Random):</strong> Eksiklik tamamen rastgeledir; ne eksik değişkenin kendi değerine ne de diğer sütunlara bağlıdır. (Örn: Anket kağıtlarının rastgele bir kısmının kahve dökülüp kaybolması.) <em>Çözüm:</em> Satır silmek (listwise deletion) bile yanlılık yaratmaz, basit ortalama/medyan doldurma da güvenlidir.</li>
          <li><strong>MAR (Missing at Random):</strong> Eksiklik, <strong>gözlemlenen diğer değişkenlere</strong> bağlıdır ama eksik değerin kendi gizli değerine bağlı değildir. (Örn: Genç erkeklerin gelir sorusunu daha az yanıtlaması — yaş ve cinsiyet biliniyorsa eksiklik açıklanabilir.) <em>Çözüm:</em> Silmek yanlılık yaratır! MICE, KNN veya regresyon tabanlı çoklu imputation kullanılmalıdır.</li>
          <li><strong>MNAR (Missing Not at Random):</strong> Eksiklik bizzat <strong>eksik olan değerin kendisine</strong> bağlıdır. (Örn: Çok yüksek gelirlilerin veya çok borçluların gelirini bilerek yazmaması; sensörün aşırı yüksek sıcaklıkta bozulması.) <em>Çözüm:</em> Standart imputation yanlı kalır! "Eksik mi?" (<code>is_missing</code>) ikili gösterge sütunu eklemek veya alan bilgisiyle modellemek gerekir.</li>
        </ul>
        <div class="callout explain">
          <strong>✱ Açıklanabilirlik Bağlantısı:</strong> "Neden ortalama ile doldurmadık da MICE + missing indicator kullandık?" sorusunun cevabı doğrudan veri mekanizmasıdır.
        </div>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: Eksiklik Analizi ile MAR Tespiti",
        problem: "Bir sağlık veri setinde 'Kolesterol' sütununun %30'u boştur. Yaş < 30 grubunda eksiklik oranı %55, Yaş ≥ 30 grubunda ise %10 olarak bulunmuştur. Kolesterol ölçümünün kendisi eksiklikten bağımsızsa bu mekanizma nedir?",
        steps: [
          "Eksiklik oranı 'Yaş' değişkenine (gözlenen başka bir sütuna) göre dramatik biçimde değişmektedir (%55 vs %10).",
          "Dolayısıyla eksiklik tamamen rastgele (MCAR) değildir; ancak yaş verisi elimizde olduğu için <strong>MAR</strong> mekanizmasıdır."
        ],
        answer: "MAR (Missing at Random).",
        interpretation: "Eksik satırları silersek veri setimiz yaşlılara doğru yanlı hale gelir. Yaş grubuna göre (veya MICE ile) doldurma yapılmalıdır."
      }
    ],
    questions: [
      {
        id: "l2-miss-q1",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir anket çalışmasında, alkol bağımlılığı yüksek olan kişilerin 'Haftalık alkol tüketimi' sorusunu boş bırakma olasılığı diğerlerine göre çok daha yüksektir. Bu mekanizma hangisidir?",
        options: ["MCAR", "MAR", "MNAR", "Simpson Paradoksu"],
        answerIndex: 2,
        solutionSteps: [
          "Değerin eksik olma olasılığı doğrudan cevabın kendi büyüklüğüne (gizli değere) bağlıdır.",
          "Bu durum MNAR (Missing Not at Random) olarak sınıflandırılır."
        ],
        dsNote: "MNAR verisinde ortalama ile doldurma gerçek ortalamayı olduğundan düşük gösterir; 'eksik_mi' bayrağı (indicator) eklemek kritik sinyal taşır."
      },
      {
        id: "l2-miss-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "1000 satırlık veride Gelir sütununda 200 eksik değer var (MNAR: eksik olanların gerçek geliri ortalama 90.000 TL, dolu olan 800 kişinin ortalaması ise 40.000 TL). Eğer eksik değerleri sadece mevcut 800 kişinin ortalamasıyla doldurursanız veri setinin yeni ortalaması gerçek ortalamadan (50.000 TL) <strong>kaç TL daha düşük</strong> çıkar?",
        hint: "Mevcut ortalama ile doldurunca tüm 1000 kişinin ortalaması yine 40.000 TL olur. Gerçek ortalama 50.000 TL idi.",
        answer: 10000,
        tolerance: 1,
        unit: "TL",
        solutionSteps: [
          "Gerçek toplam = $800 \\times 40.000 + 200 \\times 90.000 = 32M + 18M = 50M \\implies$ Gerçek ortalama = $50.000$ TL.",
          "Mevcut ortalama (40.000) ile doldurulursa ortalama 40.000 TL kalır.",
          "Fark = $50.000 - 40.000 = 10.000$ TL yanlılık."
        ],
        dsNote: "MNAR durumlarında körü körüne ortalama doldurmak veriyi ciddi şekilde bozar."
      },
      {
        id: "l2-miss-q3",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir IoT veri boru hattında ağ kopması nedeniyle sensör paketlerinin %2'si günün tamamen rastgele anlarında düşmektedir. Eksik satırları silmek veya medyanla doldurmak modelde yanlılık yaratır mı?",
        options: [
          "Evet, çünkü MNAR'dır.",
          "Hayır, mekanizma MCAR olduğu için silme işlemi yanlılık yaratmaz (yalnızca örneklem gücü biraz azalır).",
          "Evet, çünkü MAR'dır.",
          "Model kesinlikle çöker."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Rastgele ağ kopması sensör değerinden veya diğer özelliklerden bağımsızdır → MCAR."
        ],
        dsNote: "MCAR'da bile çok fazla sütun varsa satır silmek verinin büyük kısmını kaybettirebilir; bu yüzden imputation yine tercih edilebilir."
      },
      {
        id: "l2-miss-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir kredi risk modelinde 'Ek Teminat Tutarı' sütunu sadece teminat sunmayan müşterilerde (riskli segmentte) boş bırakılmıştır. XGBoost veya Lojistik Regresyon kurarken en iyi pratik nedir?",
        options: [
          "Boş satırların tamamını eğitim setinden silmek.",
          "Doldurma yapmadan önce `teminat_eksik_mi` (1/0) ikili gösterge sütunu oluşturmak ve alan bilgisiyle 0 ile doldurmak.",
          "Tüm sütunu rastgele sayılarla doldurmak.",
          "Sütunu medyanla doldurup gösterge eklememek."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Buradaki eksiklik aslında 'teminat yok' bilgisini (yapısal sıfır / MNAR) taşır.",
          "Gösterge sütunu modelin bu risk sinyalini korumasını sağlar."
        ],
        dsNote: "Eksikliğin kendisi bazen en güçlü özniteliktir (feature)."
      },
      {
        id: "l2-miss-q5",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir veri setinde [10, 20, NaN, 30, 40] değerleri vardır. NaN değerini medyan ile doldurursak yeni serinin <strong>ortalaması</strong> kaç olur?",
        hint: "Mevcut sayıların [10, 20, 30, 40] medyanı 25'tir.",
        answer: 25,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "Mevcut verinin medyanı = $(20 + 30)/2 = 25$.",
          "Yeni seri: [10, 20, 25, 30, 40]. Ortalama = $125 / 5 = 25$."
        ],
        dsNote: "Tek bir değişkenin ortalaması/medyanı ile doldurma yapmak değişkenin varyansını yapay olarak düşürür; belirsizliği korumak için MICE (çoklu doldurma) kullanılır."
      }
    ]
  },

  {
    id: "l2-resampling",
    level: 2,
    levelTitle: "2. Orta Seviye: Çıkarımsal İstatistik (Inferential Statistics)",
    order: 12,
    title: "Yeniden Örnekleme Yöntemleri (Resampling)",
    tag: "core",
    explainability: true,
    summary: "Bootstrapping ile güven aralığı üretme, Random Forest/Bagging mantığı ve Permütasyon Testleri.",
    keywords: ["bootstrap", "bootstrapping", "bagging", "random forest", "permütasyon", "resampling"],
    labId: "lab-bootstrap",
    theoryHtml: `
      <div class="card">
        <h3>1. Bootstrapping</h3>
        <p>Elimizdeki $n$ boyutlu örneklemden <strong>yerine koyarak (with replacement)</strong> binlerce ($B = 1000$ veya $10.000$) yeni $n$ boyutlu alt örneklem çekme yöntemidir.</p>
        <ul>
          <li><strong>Neden Güçlüdür?</strong> Medyan, 90. yüzdelik (p90) veya F1-skoru gibi formülü zor/kapalı olmayan metrikler için bile dağılım varsayımı yapmadan <strong>Güven Aralığı</strong> üretmemizi sağlar.</li>
          <li><strong>ML Bağlantısı (Bagging &amp; Random Forest):</strong> Bootstrap Aggregating (Bagging), her karar ağacını verinin farklı bir bootstrap örneklemi üzerinde eğitip sonuçları birleştirerek varyansı düşürür. (Her bootstrap örnekleminde verinin ortalama $1 - e^{-1} \\approx \\%63.2$'si seçilir, %36.8'i <em>Out-of-Bag</em> kalır.)</li>
        </ul>
      </div>

      <div class="card">
        <h3>2. Permütasyon Testleri (Permutation Tests)</h3>
        <p>İki grubun ($A$ ve $B$) gerçekten farklı olup olmadığını test etmek için $H_0$ ("etiketler önemsizdir") varsayımı altında grup etiketlerini rastgele karıştırıp (shuffle) farkı binlerce kez hesaplarız. Gözlenen gerçek farkın bu permütasyon dağılımında ne kadar uçta kaldığı doğrudan <strong>kesin p-değerini</strong> verir.</p>
        <div class="callout explain">
          <strong>✱ Açıklanabilirlik Bağlantısı:</strong> Normallik veya formül tartışmasına girmeden "Etiketleri 10.000 kez rastgele karıştırdık, gerçek farkımız bu kadar büyük sadece 12 kez oluştu ($p = 0.0012$)" demek her kesimden paydaşa son derece ikna edici gelir.
        </div>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: Bootstrap Yüzdelik Güven Aralığı",
        problem: "Bir modelin F1 skoru üzerinde 1000 kez bootstrap yapılmış ve skorlar küçükten büyüğe sıralanmıştır. %95 güven aralığı için hangi sıradaki değerler alınır?",
        steps: [
          "Alt sınır: %2.5 yüzdelik = $1000 \\times 0.025 = 25$. sıradaki değer.",
          "Üst sınır: %97.5 yüzdelik = $1000 \\times 0.975 = 975$. sıradaki değer."
        ],
        answer: "25. ve 975. sıradaki bootstrap değerleri %95 güven aralığını oluşturur.",
        interpretation: "Hiçbir t-tablosu veya normallik varsayımı gerekmeden F1 skoru gibi karmaşık bir metrik için güven aralığı elde edilmiş olur."
      },
      {
        title: "Örnek 2: Permütasyon Testi p-değeri",
        problem: "A ve B gruplarının medyan farkı +15 birim ölçülmüştür. Etiketler 2000 kez rastgele karıştırıldığında, mutlak farkı $\\ge 15$ olan 30 durum gözlenmiştir. Çift yönlü p-değeri nedir?",
        steps: [
          "$p = 30 / 2000 = 0.015$."
        ],
        answer: "p = 0.015.",
        interpretation: "$p < 0.05$ olduğu için iki grubun medyanları arasındaki fark istatistiksel olarak anlamlıdır."
      }
    ],
    questions: [
      {
        id: "l2-res-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "4000 kez yapılan bir bootstrap simülasyonunda elde edilen ortalama değerleri küçükten büyüğe sıralanıyor. %90 güven aralığı (%5 ile %95 arası) için <strong>alt sınır kaçıncı sıradaki</strong> değerdir?",
        hint: "4000 * 0.05",
        answer: 200,
        tolerance: 1,
        unit: ". sıra",
        solutionSteps: [
          "%90 güven aralığı dışarıda %10 bırakır (her iki kuyrukta %5).",
          "Alt sınır = $4000 \\times 0.05 = 200$. sıradaki değer (üst sınır ise 3800. sıra)."
        ],
        dsNote: "Python'da `np.percentile(boot_stats, [5, 95])` ile tek satırda hesaplanır."
      },
      {
        id: "l2-res-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir permütasyon testinde gözlenen gerçek fark +8.5'tir. 5000 rastgele permütasyonun 125 tanesinde fark +8.5 veya daha büyük çıkmıştır. Tek yönlü <strong>p-değeri</strong> kaçtır?",
        hint: "125 / 5000",
        answer: 0.025,
        tolerance: 0.001,
        unit: "",
        solutionSteps: [
          "$p = 125 / 5000 = 0.025$."
        ],
        dsNote: "Permütasyon testi hem küçük örneklemlerde hem de sıra dışı metriklerde (ör. Gini, AUC farkı) güvenle çalışır."
      },
      {
        id: "l2-res-q3",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Büyük bir veri setinden ($n$ büyük) yerine koyarak $n$ boyutlu bir bootstrap örneklemi çekildiğinde, orijinal gözlemlerin yaklaşık <strong>yüzde (%) kaçı</strong> en az bir kez seçilir?",
        hint: "1 - e^(-1) ≈ 0.632",
        answer: 63.2,
        tolerance: 0.5,
        unit: "%",
        solutionSteps: [
          "Bir gözlemin $n$ çekilişte hiç seçilmeme olasılığı $(1 - 1/n)^n \\to e^{-1} \\approx 0.368$.",
          "En az bir kez seçilme olasılığı $= 1 - 0.368 = 0.632 = \\%63.2$."
        ],
        dsNote: "Random Forest'ta seçilmeyen %36.8'lik kısma Out-of-Bag (OOB) denir ve ücretsiz doğrulama seti olarak kullanılır."
      },
      {
        id: "l2-res-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Random Forest algoritmasında 'Bagging' adımının temel amacı nedir?",
        options: [
          "Her ağacın yanlılığını (bias) artırmak",
          "Farklı bootstrap örneklemleriyle eğitilen ağaçların ortalamasını alarak modelin varyansını düşürmek",
          "Eğitim verisindeki tüm aykırı değerleri silmek",
          "Doğrusal regresyon katsayılarını hesaplamak"
        ],
        answerIndex: 1,
        solutionSteps: [
          "Tek bir derin karar ağacı düşük yanlılığa ama çok yüksek varyansa (overfitting'e) sahiptir.",
          "Bootstrap ile oluşturulan farklı ağaçların ortalaması varyansı ciddi ölçüde azaltır."
        ],
        dsNote: "Random Forest ayrıca her bölünmede rastgele özellik alt kümesi seçerek ağaçlar arası korelasyonu daha da düşürür."
      },
      {
        id: "l2-res-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "İki farklı öneri algoritmasının kullanıcı başına p95 (95. yüzdelik) oturum süresine etkisini karşılaştırmak istiyorsunuz. p95 için standart bir t-testi formülü yoktur. Nasıl güven aralığı ve anlamlılık testi yaparsınız?",
        options: [
          "Test yapılamaz, sadece ortalamaya bakılır.",
          "Kullanıcıları bootstrap ile yeniden örnekleyip p95 farkı için güven aralığı üretir ve/veya permütasyon testi uygularım.",
          "p95 değerini 1.96 ile çarparım.",
          "Ki-kare testi uygularım."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Bootstrap ve permütasyon testleri yüzdelik dilimler, oranlar ve özel iş metrikleri dahil her istatistiğe uygulanabilir."
        ],
        dsNote: "Gerçek dünya veri biliminde p50, p95 veya kâr/maliyet oranı gibi metriklerde resampling altın standarttır."
      }
    ]
  },

  {
    id: "l2-regression",
    level: 2,
    levelTitle: "2. Orta Seviye: Çıkarımsal İstatistik (Inferential Statistics)",
    order: 13,
    title: "Regresyonun İstatistiksel Temelleri ve GLM",
    tag: "core",
    explainability: true,
    summary: "OLS varsayımları, R² ve Düzeltilmiş R², Çoklu Doğrusal Bağlantı (VIF), Lojistik/Poisson Regresyon (GLM) ve Odds Ratio yorumlama.",
    keywords: ["ols", "regresyon", "homoscedasticity", "r2", "vif", "multicollinearity", "glm", "lojistik", "odds ratio", "poisson"],
    labId: "lab-regression",
    theoryHtml: `
      <div class="card">
        <h3>1. OLS Varsayımları (Doğrusal Regresyon)</h3>
        <ul>
          <li><strong>Doğrusallık:</strong> $Y$ ile $X$'ler arasındaki ilişki parametrelerde doğrusaldır.</li>
          <li><strong>Hataların Bağımsızlığı:</strong> Gözlemlerin hataları birbirinden bağımsızdır (zaman serilerinde otokorelasyon bunu bozar!).</li>
          <li><strong>Eşvaryanslılık (Homoscedasticity):</strong> Hata varyansı tüm tahmin aralığında sabit olmalıdır (huni şeklinde açılıyorsa <em>heteroscedasticity</em> vardır; standart hatalar bozulur).</li>
          <li><strong>Artıkların Normalliği:</strong> <em>Kritik Not:</em> Artıkların normalliği katsayı tahmini ($\\hat{\\beta}$) için <strong>değil</strong>, güven aralığı ve p-değeri çıkarımı için gereklidir.</li>
        </ul>
      </div>

      <div class="card">
        <h3>2. $R^2$, Düzeltilmiş $R^2$ ve Çoklu Doğrusal Bağlantı (VIF)</h3>
        <ul>
          <li><strong>$R^2$:</strong> Modelin hedef değişkendeki varyansın yüzde kaçını açıkladığını gösterir. Ancak modele rastgele gürültü sütunu eklense bile $R^2$ asla düşmez!</li>
          <li><strong>Düzeltilmiş $R^2$ (Adjusted $R^2$):</strong> Gereksiz özellik eklendiğinde ceza uygular; model karşılaştırmada bu kullanılmalıdır.</li>
          <li><strong>VIF (Variance Inflation Factor):</strong> Özellikler birbirine çok yüksek korelasyonluysa (Multicollinearity) model hangi özelliğin etkisinin ne kadar olduğunu ayırt edemez; katsayıların standart hatası şişer, işaretleri bile ters dönebilir.
            <div class="formula-box">$$\\text{VIF}_j = \\frac{1}{1 - R_j^2}$$</div>
            <strong>Ne anlatır?</strong> Katsayının varyansının, özellikler tamamen bağımsız olsaydı oluşacak varyansa göre kaç kat şiştiğini gösterir. $\\text{VIF} = 1$ sıfır korelasyon (ideal), $\\text{VIF} = 5$ varyansın 5 kat şişmesi (uyarı), $\\text{VIF} > 10$ ise ciddi çoklu doğrusal bağlantı ve güvenilmez katsayı demektir.
          </li>
        </ul>
      </div>

      <div class="card">
        <h3>3. Genelleştirilmiş Doğrusal Modeller (GLM): Lojistik &amp; Poisson</h3>
        <p><strong>Lojistik Regresyon:</strong> İkili ($0/1$) sonuçları modeller; log-odds (logit) doğrusaldır: $\\ln\\left(\\frac{p}{1-p}\\right) = \\beta_0 + \\beta_1 x_1$.</p>
        <p><strong>Odds Ratio (OR):</strong> $\\text{OR} = e^{\\beta_1}$. Özellik 1 birim arttığında olayın gerçekleşme bahis oranının (odds) kaç katına çıktığını gösterir.</p>
        <div class="callout explain">
          <strong>✱ Açıklanabilirlik Bağlantısı:</strong> Paydaşa "beta = 0.693" demek yerine "$e^{0.693} = 2.0$, yani bu özellik 1 birim arttığında müşterinin satın alma bahis oranı 2 katına çıkıyor" demek çok nettir.
        </div>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: VIF Hesabı ve Yorumu",
        problem: "'Deneyim Yılı' özelliğini diğer bağımsız değişkenlerle (Yaş, Kıdem) tahmin eden yardımcı regresyonun $R_j^2 = 0.80$ çıkmıştır. VIF değeri kaçtır?",
        steps: [
          "$\\text{VIF} = \\frac{1}{1 - R_j^2} = \\frac{1}{1 - 0.80} = \\frac{1}{0.20} = 5.0$."
        ],
        answer: "VIF = 5.0.",
        interpretation: "Katsayının varyansı, korelasyonsuz duruma göre 5 kat şişmiştir. Katsayı yorumu yapılacaksa Yaş veya Kıdem'den biri çıkarılmalıdır."
      },
      {
        title: "Örnek 2: Lojistik Regresyonda Odds Ratio",
        problem: "Bir churn modelinde 'Son ayda destek talebi sayısı' katsayısı $\\beta = 0.405$ çıkmıştır ($e^{0.405} \\approx 1.50$). Yorumlayın.",
        steps: [
          "$\\text{Odds Ratio} = e^{0.405} \\approx 1.50$."
        ],
        answer: "OR = 1.50.",
        interpretation: "Diğer değişkenler sabitken, müşterinin açtığı her ek destek talebi churn etme bahis oranını (odds) %50 artırır (1.5 katına çıkarır)."
      }
    ],
    questions: [
      {
        id: "l2-reg-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir özellik için diğer özelliklerle kurulan yardımcı regresyonun $R_j^2 = 0.90$ bulunmuştur. Bu özelliğin <strong>VIF (Variance Inflation Factor)</strong> değeri kaçtır?",
        hint: "VIF = 1 / (1 - R²)",
        answer: 10,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$\\text{VIF} = 1 / (1 - 0.90) = 1 / 0.10 = 10$."
        ],
        dsNote: "VIF = 10 ciddi çoklu doğrusal bağlantı olduğunu ve katsayı yorumunun güvenilmezleştiğini gösterir."
      },
      {
        id: "l2-reg-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir ev fiyat tahmin modelinde toplam varyans (TSS) = 200, modelin açıklayamadığı artık kareler toplamı (RSS) = 50'dir. Modelin <strong>$R^2$ değeri</strong> kaçtır?",
        hint: "R² = 1 - (RSS / TSS)",
        answer: 0.75,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$R^2 = 1 - (50 / 200) = 1 - 0.25 = 0.75$."
        ],
        dsNote: "Model ev fiyatlarındaki değişkenliğin %75'ini açıklamaktadır."
      },
      {
        id: "l2-reg-q3",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Lojistik regresyonda bir özelliğin katsayısı $\\beta = 0$ (sıfır) çıktığında <strong>Odds Ratio ($e^\\beta$)</strong> değeri kaç olur?",
        hint: "e⁰ = ?",
        answer: 1,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$\\text{OR} = e^0 = 1$. Bahis oranı 1 katına çıkar, yani hiçbir etkisi yoktur."
        ],
        dsNote: "OR > 1 riski/olasılığı artırır, OR < 1 azaltır, OR = 1 etkisizdir."
      },
      {
        id: "l2-reg-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Doğrusal regresyonda artıkların (residuals) grafiğine baktığınızda tahmin edilen değer büyüdükçe artıkların yayılımının huni gibi genişlediğini (heteroscedasticity) görüyorsunuz. Bunun temel sonucu nedir?",
        options: [
          "OLS katsayı tahminleri tamamen yanlı hale gelir.",
          "Katsayı tahminleri yansız kalır ama standart hatalar, güven aralıkları ve p-değerleri güvenilmez hale gelir.",
          "R² her zaman 1 olur.",
          "Model Lojistik Regresyona dönüşür."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Heteroscedasticity katsayıların yansızlığını bozmaz ancak varyans formülünü geçersiz kılar.",
          "Çözüm olarak hedef değişkene log dönüşümü uygulanabilir veya Robust (HC3) standart hatalar kullanılır."
        ],
        dsNote: "Özellikle fiyat/gelir modellerinde log(y) kullanmak eşvaryanslılığı büyük ölçüde düzeltir."
      },
      {
        id: "l2-reg-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Lineer regresyon modeline iş anlamı olmayan 15 tane rastgele gürültü sütunu eklediniz. Eğitim setindeki $R^2$ ve Düzeltilmiş $R^2$ nasıl değişir?",
        options: [
          "İkisi de artar.",
          "R² hafifçe artar (veya aynı kalır), Düzeltilmiş R² ise gereksiz parametre cezası yüzünden düşer.",
          "İkisi de sıfıra düşer.",
          "R² düşer, Düzeltilmiş R² artar."
        ],
        answerIndex: 1,
        solutionSteps: [
          "$R^2$ eklenen her değişkenle matematiksel olarak asla azalmaz.",
          "Adjusted $R^2$ ise serbestlik derecesini hesaba kattığı için katkısı olmayan sütunlarda düşer."
        ],
        dsNote: "Özellik eklerken her zaman Düzeltilmiş $R^2$ veya Cross-Validation skoru takip edilmelidir."
      }
    ]
  },

  {
    id: "l2-biasvar",
    level: 2,
    levelTitle: "2. Orta Seviye: Çıkarımsal İstatistik (Inferential Statistics)",
    order: 14,
    title: "Yanlılık-Varyans Dengesi (Bias-Variance Tradeoff)",
    tag: "core",
    explainability: false,
    summary: "Overfitting, Underfitting, Cross-Validation ve L1 (Lasso) / L2 (Ridge) regülarizasyonu.",
    keywords: ["bias-variance", "overfitting", "underfitting", "cross-validation", "lasso", "ridge", "l1", "l2"],
    labId: "lab-biasvar",
    theoryHtml: `
      <div class="card">
        <h3>1. Overfitting vs. Underfitting</h3>
        <p>Bir modelin test hatası üç bileşenden oluşur:</p>
        <div class="formula-box">$$\\text{Beklenen Hata} = \\text{Bias}^2 + \\text{Variance} + \\text{İndirgenemez Gürültü } (\\sigma^2)$$</div>
        <p><strong>Bu üç sayı bize ne anlatır?</strong> <strong>Bias (Yanlılık)</strong>, modelin gerçek ilişkiyi ne kadar basitleştirip ıskaladığını ölçer (yüksekse model kördür). <strong>Variance (Varyans)</strong>, eğitim verisindeki küçük bir değişiklikte modelin tahminlerinin ne kadar savrulduğunu ölçer (yüksekse model ezbercidir). <strong>$\\sigma^2$</strong> ise verinin doğasındaki ölçüm gürültüsüdür; hiçbir model bunun altına inemez.</p>
        <ul>
          <li><strong>Underfitting (Yüksek Bias):</strong> Model verideki gerçek örüntüyü yakalayamayacak kadar basittir. Hem eğitim hem test hatası yüksektir.</li>
          <li><strong>Overfitting (Yüksek Varyans):</strong> Model eğitim verisindeki gürültüyü bile ezberlemiştir. Eğitim hatası çok düşük, test/validasyon hatası yüksektir.</li>
        </ul>
      </div>

      <div class="card">
        <h3>2. Çapraz Doğrulama (Cross-Validation) ve Regülarizasyon</h3>
        <ul>
          <li><strong>k-Fold Cross-Validation:</strong> Veriyi $k$ parçaya bölüp her seferinde $k-1$ parça ile eğitip 1 parça ile test ederek genelleme hatasını güvenilir ölçeriz.</li>
          <li><strong>L2 Regülarizasyonu (Ridge):</strong> Kayıp fonksiyonuna $\\lambda \\sum \\beta_j^2$ ekler. Katsayıları sıfıra yaklaştırır (küçültür) ama tam sıfır yapmaz. Çoklu doğrusal bağlantıda çok etkilidir.</li>
          <li><strong>L1 Regülarizasyonu (Lasso):</strong> Kayıp fonksiyonuna $\\lambda \\sum |\\beta_j|$ ekler. Önemsiz katsayıları <strong>tam sıfır (0)</strong> yaparak otomatik <strong>özellik seçimi (feature selection)</strong> sağlar.</li>
        </ul>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: L1 ve L2 Ceza Terimi Hesabı",
        problem: "Bir regresyon modelinin MSE = 10 ve katsayıları $\\beta = [3, -4]$'tür. $\\lambda = 0.5$ için Ridge (L2) ve Lasso (L1) toplam kayıp değerlerini hesaplayın.",
        steps: [
          "L2 cezası = $\\lambda (\\beta_1^2 + \\beta_2^2) = 0.5 \\times (9 + 16) = 12.5$. Toplam Ridge kaybı = $10 + 12.5 = 22.5$.",
          "L1 cezası = $\\lambda (|\\beta_1| + |\\beta_2|) = 0.5 \\times (3 + 4) = 3.5$. Toplam Lasso kaybı = $10 + 3.5 = 13.5$."
        ],
        answer: "Ridge Toplam Kayıp = 22.5, Lasso Toplam Kayıp = 13.5.",
        interpretation: "Model artık yalnızca MSE'yi (10) küçültmeye değil, toplam kaybı (MSE + Ceza) küçültmeye çalışır. Burada katsayılardan β₂=-4 büyük olduğu için L2 karesini alarak ona 0.5×16 = 8 birimlik ağır bir ceza keser (toplam ceza 12.5); L1 ise mutlak değer aldığı için tüm katsayılara doğrusal (toplam 3.5) ceza uygular ve optimizasyon sırasında küçük/önemsiz katsayıları tam 0'a indirir. λ büyüdükçe bu ceza ağırlığı artar, katsayılar küçülür ve modelin varyansı (overfitting riski) düşer."
      }
    ],
    questions: [
      {
        id: "l2-bv-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir modelin $\\text{Bias} = 3$, $\\text{Variance} = 16$ ve indirgenemez gürültü $\\sigma^2 = 5$'tir. Bu modelin <strong>toplam beklenen hatası</strong> kaçtır?",
        hint: "Toplam Hata = Bias² + Variance + σ²",
        answer: 30,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$\\text{Toplam Hata} = 3^2 + 16 + 5 = 9 + 16 + 5 = 30$."
        ],
        dsNote: "İndirgenemez gürültü $\\sigma^2$ hiçbir modelle sıfırlanamaz; en iyi modelin bile ulaşabileceği alt sınırdır."
      },
      {
        id: "l2-bv-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Katsayıları $\\beta = [2, -1, 4]$ olan bir modele $\\lambda = 0.2$ ile <strong>L2 (Ridge)</strong> cezası uygulanıyor. Sadece L2 ceza teriminin değeri ($\\lambda \\sum \\beta_j^2$) kaçtır?",
        hint: "0.2 * (2² + (-1)² + 4²)",
        answer: 4.2,
        tolerance: 0.01,
        unit: "",
        solutionSteps: [
          "$\\sum \\beta_j^2 = 4 + 1 + 16 = 21$.",
          "Ceza = $0.2 \\times 21 = 4.2$."
        ],
        dsNote: "Regülarizasyon öncesi özelliklerin ölçeklenmesi (StandardScaler) şarttır; aksi halde birimi büyük özellikler haksız ceza alır."
      },
      {
        id: "l2-bv-q3",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir modelin eğitim doğruluğu %99.2, 5-fold Cross-Validation doğruluğu ise %68.4 çıkmıştır. Teşhis ve çözüm nedir?",
        options: [
          "Underfitting (Yüksek Bias) — modeli daha karmaşık yapmalıyız.",
          "Overfitting (Yüksek Varyans) — regülarizasyon artırmalı, model karmaşıklığını azaltmalı veya daha fazla veri toplamalıyız.",
          "Veri mükemmel öğrenilmiştir, doğrudan canlıya alınmalıdır.",
          "k-Fold sayısını 2'ye düşürmeliyiz."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Eğitim ile validasyon skoru arasındaki büyük uçurum (%99.2 vs %68.4) klasik aşırı öğrenme (overfitting) belirtisidir."
        ],
        dsNote: "Ağaç modellerinde `max_depth` düşürmek, sinir ağlarında `dropout` veya ağırlık çürümesi (L2) kullanmak varyansı azaltır."
      },
      {
        id: "l2-bv-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Elinde 500 tane özellik (sütun) var ve bunların sadece ~20 tanesinin gerçekten önemli olduğunu düşünüyorsun. Hem overfitting'i önlemek hem de otomatik özellik seçimi (seyrek model) elde etmek için hangisini seçersin?",
        options: [
          "Sadece OLS (regülarizasyonsuz)",
          "L1 (Lasso) Regülarizasyonu",
          "L2 (Ridge) Regülarizasyonu",
          "Ortalama Imputation"
        ],
        answerIndex: 1,
        solutionSteps: [
          "L1 cezası geometrik olarak (elmas/eşkenar dörtgen kısıtı) köşelerde kesiştiği için gereksiz katsayıları tam 0 yapar."
        ],
        dsNote: "L1 ve L2'yi birleştiren yönteme ise ElasticNet denir."
      },
      {
        id: "l2-bv-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Cross-validation yaparken StandardScaler'ı (ortalama ve standart sapma hesabını) tüm veri setine bölmeden ÖNCE uygulamak neden hatalıdır?",
        options: [
          "Hesaplama süresini uzatır.",
          "Veri sızıntısına (Data Leakage) yol açar; validasyon katmanının bilgisi eğitim ölçeklemesine sızar ve test skoru yapay olarak yüksek çıkar.",
          "Sayıları negatif yapar.",
          "L1 regülarizasyonunu bozar."
        ],
        answerIndex: 1,
        solutionSteps: [
          "Ölçekleme parametreleri (μ, σ) sadece eğitim katmanlarından öğrenilip validasyon katmanına `transform` olarak uygulanmalıdır."
        ],
        dsNote: "Scikit-learn `Pipeline` kullanmak bu veri sızıntısını otomatik olarak önler."
      }
    ]
  },

  {
    id: "l2-abtest",
    level: 2,
    levelTitle: "2. Orta Seviye: Çıkarımsal İstatistik (Inferential Statistics)",
    order: 15,
    title: "Deney Tasarımı ve A/B Test Pratiği",
    tag: "optional",
    explainability: false,
    summary: "Randomizasyon, bloklama, tabakalandırma, güç analizi, örneklem büyüklüğü hesabı ve 'peeking' problemi.",
    keywords: ["a/b testi", "deney tasarımı", "randomizasyon", "bloklama", "peeking", "örneklem büyüklüğü", "mde"],
    labId: "lab-abtest",
    theoryHtml: `
      <div class="card">
        <h3>1. Sağlam Deney Tasarımının Temelleri</h3>
        <ul>
          <li><strong>Randomizasyon:</strong> Kullanıcıları kontrol (A) ve deney (B) gruplarına rastgele atamak, bilinen ve bilinmeyen tüm karıştırıcıları (confounders) dengeler.</li>
          <li><strong>Bloklama ve Tabakalandırma (Stratification):</strong> Cihaz tipi (iOS/Android) veya ülke gibi kritik değişkenlerin iki grupta eşit oranda dağılmasını garanti altına almak.</li>
        </ul>
      </div>

      <div class="card">
        <h3>2. Örneklem Büyüklüğü Hesabı ve 'Peeking' Problemi</h3>
        <p>Test başlamadan önce 4 şey belirlenir: Baz oran ($p_0$), yakalamak istediğimiz en küçük anlamlı fark (Minimum Algılanabilir Etki, $\\Delta$ / MDE), Yanlış Pozitif eşiği ($\\alpha$, genelde 0.05) ve İstatistiksel Güç ($1-\\beta$, genelde 0.80). İki grup için grup başına yaklaşık örneklem büyüklüğü formülü:</p>
        <div class="formula-box">$$n \\approx \\frac{16 \\cdot \\sigma^2}{\\Delta^2} \\quad (\\%80 \\text{ güç ve } \\alpha=0.05 \\text{ için})$$</div>
        <p><strong>Bu formül bize ne anlatır?</strong> (1) Metrik ne kadar oynaksa ($\\sigma^2$ büyükse), o kadar çok kullanıcı gerekir. (2) Çok küçük bir farkı ($\\Delta$ küçük) yakalamak istiyorsanız paydadaki $\\Delta^2$ yüzünden gereken kullanıcı sayısı karesel olarak patlar (farkı yarıya indirmek 4 kat daha fazla kullanıcı gerektirir).</p>
        <div class="callout warn">
          <strong>Peeking (Erken Bakıp Durdurma) Problemi:</strong> Test süresi dolmadan her gün p-değerine bakıp $p < 0.05$ gördüğünüz anda testi durdurursanız, gerçek Tip I hata oranınız %5'ten %20–30'lara fırlar! Çözüm: Sabit örneklem dolana kadar beklemek veya Sequential Testing (ardışık test) kullanmak.
        </div>
      </div>
    `,
    examples: [
      {
        title: "Örnek 1: Yaklaşık Örneklem Büyüklüğü Hesabı",
        problem: "Mevcut dönüşüm oranı $p_0 = 0.10$ (%10). En az $\\Delta = 0.02$ (%2 puanlık, yani %10'dan %12'ye) bir artışı %80 güç ve $\\alpha=0.05$ ile yakalamak için grup başına kaç kullanıcı gerekir?",
        steps: [
          "Bernoulli varyansı $\\sigma^2 = p_0(1-p_0) = 0.10 \\times 0.90 = 0.09$.",
          "%80 güç ($z_\\beta \\approx 0.84$) ve $\\alpha=0.05$ ($z_{\\alpha/2} \\approx 1.96$) için iki bağımsız grup formülü: $n \\approx \\frac{2 (z_{\\alpha/2}+z_\\beta)^2 \\sigma^2}{\\Delta^2} = \\frac{2 \\times (1.96+0.84)^2 \\sigma^2}{\\Delta^2} = \\frac{15.68 \\cdot \\sigma^2}{\\Delta^2} \\approx \\frac{16 \\cdot \\sigma^2}{\\Delta^2}$.",
          "Yani iki grup için grup başına $n \\approx \\frac{16 \\times 0.09}{(0.02)^2} = \\frac{1.44}{0.0004} = 3600$ kullanıcı."
        ],
        answer: "Grup başına yaklaşık 3.600 (toplam 7.200) kullanıcı gerekir.",
        interpretation: "Eğer daha küçük bir etkiyi ($\\%1$ puanlık artışı) yakalamak isteseydik $n$ 4 katına (14.400'e) çıkardı."
      }
    ],
    questions: [
      {
        id: "l2-ab-q1",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Pratik güç formülü $n \\approx \\frac{16 \\sigma^2}{\\Delta^2}$ kullanılarak, standart sapması $\\sigma = 50$ TL olan bir metrikte $\\Delta = 10$ TL'lik farkı yakalamak için grup başına kaç kullanıcı gerekir?",
        hint: "σ² = 2500, Δ² = 100. 16 * 2500 / 100.",
        answer: 400,
        tolerance: 5,
        unit: "kullanıcı",
        solutionSteps: [
          "$n \\approx \\frac{16 \\times 50^2}{10^2} = \\frac{16 \\times 2500}{100} = 400$ kullanıcı (grup başına)."
        ],
        dsNote: "Varyansı (σ²) düşürmek için CUPED gibi teknikler kullanıldığında gereken örneklem büyüklüğü de azalır."
      },
      {
        id: "l2-ab-q2",
        type: "numeric",
        category: "Hesaplama",
        prompt: "Bir A/B testinde Minimum Algılanabilir Etkiyi (MDE, $\\Delta$) <strong>yarıya indirmek</strong> (örneğin %2 fark yerine %1 farkı yakalamak) isterseniz gereken örneklem büyüklüğü kaç katına çıkar?",
        hint: "n ∝ 1 / Δ²",
        answer: 4,
        tolerance: 0.01,
        unit: "kat",
        solutionSteps: [
          "$\\Delta$ yarıya inerse $\\Delta^2$ dörtte birine iner; dolayısıyla $n$ $4$ katına çıkar."
        ],
        dsNote: "Küçük iyileştirmeleri ölçmek çok yüksek trafik veya çok uzun test süresi gerektirir."
      },
      {
        id: "l2-ab-q3",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Bir ürün yöneticisi 14 gün sürmesi planlanan A/B testinin 3. gününde $p = 0.04$ görüp 'Kazanan belli oldu, testi hemen bitirip B'yi herkese açalım' diyor. Bu durumun adı ve tehlikesi nedir?",
        options: [
          "Peeking problemi — erken durdurma gerçek Tip I hata (yanlış pozitif) oranını ciddi şekilde şişirir.",
          "Simpson Paradoksu — veriler otomatik düzelir.",
          "Overfitting — eğitim verisi azalmıştır.",
          "Hiçbir tehlikesi yoktur, zaman kazandırır."
        ],
        answerIndex: 0,
        solutionSteps: [
          "Rastgele dalgalanmalar ilk günlerde sıkça $p < 0.05$ sınırına dokunup geri döner.",
          "Ayrıca haftanın günleri (hafta içi vs hafta sonu) davranışı yakalanmadan test bitirilmiş olur."
        ],
        dsNote: "Test süresi en az 1-2 tam hafta (haftalık döngü) ve hedeflenen $n$ dolana kadar sürdürülmelidir."
      },
      {
        id: "l2-ab-q4",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "A/B testinizde kullanıcıların %80'i Android, %20'si iOS kullanıyor. Toplamda sadece 200 kullanıcıyla test yaparken iki gruptaki iOS oranlarının şans eseri bozulmasını önlemek için ne yaparsınız?",
        options: [
          "Tabakalı Randomizasyon (Stratified Randomization) uygulamak",
          "iOS kullanıcılarını tamamen silmek",
          "Peeking yapmak",
          "Bonferroni düzeltmesi uygulamak"
        ],
        answerIndex: 0,
        solutionSteps: [
          "Tabakalandırma, her cihaz segmentinin kendi içinde %50-%50 A ve B'ye bölünmesini garanti eder."
        ],
        dsNote: "Küçük ve orta ölçekli deneylerde tabakalandırma varyansı azaltır."
      },
      {
        id: "l2-ab-q5",
        type: "mcq",
        category: "Veri Bilimi Problemi",
        prompt: "Aynı kullanıcı gün içinde farklı cihazlardan girse de tutarlı deneyim yaşaması ve gözlemlerin bağımsız kalması için randomizasyon birimi (unit of randomization) ne olmalıdır?",
        options: [
          "Sayfa yenileme (Pageview)",
          "Kullanıcı ID (User ID)",
          "Saniye bazlı zaman damgası",
          "Tarayıcı pencere boyutu"
        ],
        answerIndex: 1,
        solutionSteps: [
          "Sayfa bazlı bölme yapılırsa aynı kullanıcı bir sayfada A, diğer sayfada B görür ve gözlemler bağımsız olmaz (OLS/t-testi bozulur)."
        ],
        dsNote: "Analiz birimi ile randomizasyon birimi uyumlu olmalıdır; aksi halde küme-düzeltmeli (cluster-robust) standart hatalar gerekir."
      }
    ]
  }
);
