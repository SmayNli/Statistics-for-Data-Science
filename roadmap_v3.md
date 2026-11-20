# Veri Bilimi İçin İstatistik Yol Haritası (v3)

**Hedef:** Önce veri bilimi projelerinde istatistiksel yetkinliği ve model açıklanabilirliğini artırmak, ardından ML/AI mühendisliğine ilerlemek.

> **Etiketler**
> * **[Çekirdek]:** Ana omurga. Sırayla öğrenilmesi önerilir.
> * **[Seçmeli]:** İhtiyaç ve ilgiye göre sonradan eklenir. Omurgayı yavaşlatmasın diye ayrı tutuldu.
> * ✱ **Açıklanabilirlik bağlantısı:** Projelerde sonuçları yorumlama ve savunma becerisine doğrudan katkı yapan konular.

---

## 1. Başlangıç Seviyesi: Veriyi Tanıma ve Olasılık Temelleri

* **Betimsel İstatistik (Descriptive Statistics):** **[Çekirdek]**
  * **Merkezi Eğilim Ölçüleri:** Ortalama (Mean), Medyan (Median), Mod (Mode); aykırı değerlerin (outliers) etkisi ve medyan seçimi.
  * **Yayılım Ölçüleri:** Varyans, Standart Sapma, Çeyrekler Açıklığı (IQR), Kartiller (Quartiles), Kutu Grafiği (Boxplot).
  * **Çarpıklık ve Basıklık (Skewness & Kurtosis):** Sağa/sola yatıklık ve log-transform gibi özellik mühendisliği adımları.
* **Veri Kalitesi ve Yanlılık Kaynakları:** **[Çekirdek]** ✱
  * Örnekleme yanlılığı (sampling bias), hayatta kalma yanlılığı (survivorship bias).
  * **Simpson Paradoksu:** Alt gruplarda görülen eğilimin birleştirilince tersine dönmesi.
* **Temel Olasılık:** **[Çekirdek]**
  * Rastgele değişken (random variable), beklenen değer (expected value) ve varyans.
  * PMF, PDF ve CDF; birleşik (joint) ve marjinal (marginal) dağılımlar.
  * Koşullu Olasılık (Conditional Probability) ve Bağımsızlık.
  * **Bayes Teoremi:** Naive Bayes algoritmasının ve Bayesçi çıkarımın temeli.
* **Temel Olasılık Dağılımları:** **[Çekirdek]**
  * **Kesikli (Discrete):** Bernoulli, Binom (Binomial), Poisson.
  * **Sürekli (Continuous):** Normal (Gaussian) & Empirik Kural (68-95-99.7), Standart Normal (Z-skoru), Üniform ve Üstel (Exponential) dağılım.
  * *Not:* Dağılımların formüllerini ezberlemek gerekmez. Hangi durumu modellediğini ve parametrelerinin ne anlama geldiğini bilmek yeterlidir.
* **Korelasyon ve Kovaryans:** **[Çekirdek]** ✱
  * Pearson (doğrusal ilişki) ve Spearman (sıralı/monotonik ilişki) korelasyon katsayıları.
  * *"Korelasyon nedensellik değildir" (Correlation does not imply causation)* ilkesi.

---

## 2. Orta Seviye: Çıkarımsal İstatistik (Inferential Statistics)

* **Örnekleme ve Limit Teoremleri:** **[Çekirdek]**
  * Büyük Sayılar Yasası (Law of Large Numbers).
  * **Merkezi Limit Teoremi (CLT):** Örneklem ortalamalarının dağılımının normale yaklaşması.
  * Güven Aralıkları (Confidence Intervals) ve Standart Hata (Standard Error). ✱
* **Tahmin Edicilerin Özellikleri:** **[Çekirdek]**
  * Yanlılık (bias), tutarlılık (consistency) ve etkinlik (efficiency).
* **En Çok Olabilirlik Tahmini (MLE):** **[Çekirdek]**
  * Olabilirlik fonksiyonu mantığı; OLS, lojistik regresyon ve sinir ağlarındaki Cross-Entropy kaybının temeli.
* **Hipotez Testleri:** **[Çekirdek]** ✱
  * Sıfır Hipotezi ($H_0$), Alternatif Hipotez ($H_1$), Anlamlılık Düzeyi ($\alpha$), **p-değeri** yorumlama ve yaygın yanlış yorumları.
  * Tip I Hata (False Positive), Tip II Hata (False Negative), İstatistiksel Güç (Statistical Power).
  * **Etki Büyüklüğü (Effect Size):** İstatistiksel anlamlılık ile pratik anlamlılığın farkı (Cohen's d vb.).
  * **Örnekleme dağılımları ve testleri:** Standart Normal → Z-testi; t dağılımı → t-testleri (tek örneklem, bağımsız iki örneklem, eşleştirilmiş); F dağılımı → ANOVA; Ki-Kare dağılımı → Ki-Kare Bağımsızlık Testi. *(Dağılımlar testlerle birlikte öğrenilir.)*
  * **Varsayım Kontrolleri:** Normallik (Shapiro-Wilk, Q-Q grafiği) ve varyans homojenliği (Levene).
  * **Parametrik Olmayan (Non-parametric) Testler:** Mann-Whitney U, Wilcoxon, Kruskal-Wallis.
  * **Çoklu Test Düzeltmeleri:** Bonferroni, Benjamini-Hochberg (FDR). *(Aynı veriyle çok sayıda özelliği test ederken şans eseri anlamlı sonuçları elemek için.)*
* **Confusion Matrix ve Sınıflandırma Metrikleri:** **[Çekirdek]** ✱
  * TP, FP, TN, FN matrisi ve Tip I / Tip II hata, İstatistiksel Güç ve Bayes bağlantısı.
  * Accuracy, Precision, Recall (Sensitivity), Specificity ve F1-Score; dengesiz sınıflarda doğru metrik seçimi.
* **Eksik Veri Mekanizmaları:** **[Çekirdek]**
  * MCAR, MAR, MNAR ve bunların imputation (doldurma) kararına etkisi.
* **Yeniden Örnekleme Yöntemleri (Resampling):** **[Çekirdek]** ✱
  * **Bootstrapping:** Güven aralığı üretme ve Random Forest / Bagging mantığının temeli.
  * Permütasyon Testleri (Permutation Tests).
* **Regresyonun İstatistiksel Temelleri:** **[Çekirdek]** ✱
  * OLS varsayımları: doğrusallık, **hataların bağımsızlığı**, eşvaryanslılık (homoscedasticity), artıkların normalliği.
  * *Not:* Artıkların normalliği katsayı tahmini için değil, güven aralığı ve p-değeri çıkarımı için gereklidir.
  * $R^2$, Düzeltilmiş $R^2$, katsayı anlamlılığı ve yorumlama, Çoklu Doğrusal Bağlantı (Multicollinearity - VIF).
  * **Genelleştirilmiş Doğrusal Modeller (GLM):** Lojistik ve Poisson regresyon; katsayı yorumlama (odds ratio).
* **Yanlılık-Varyans Dengesi (Bias-Variance Tradeoff):** **[Çekirdek]**
  * Aşırı öğrenme (overfitting) ve eksik öğrenme (underfitting), çapraz doğrulama (cross-validation).
  * L1 (Lasso) ve L2 (Ridge) regülarizasyonu.
* **Deney Tasarımı ve A/B Test Pratiği:** **[Seçmeli]**
  * Randomizasyon, kontrol grubu, bloklama ve tabakalandırma.
  * Güç analizi ve örneklem büyüklüğü hesabı, "peeking" problemi.

---

## 3. İleri Seviye: Modelleme, Bilgi Teorisi ve Nedensellik

* **Bilgi Teorisi (Information Theory):** **[Çekirdek]** *(ML/AI hedefi için zorunlu)*
  * Entropi (Entropy), Çapraz Entropi (Cross-Entropy) ve **KL Iraksaması (Kullback-Leibler Divergence)**.
  * Sinir ağı eğitiminin dağılımlar arası KL ıraksamasını minimize etmekle bağlantısı.
* **Çok Değişkenli İstatistik (Multivariate Statistics):** **[Çekirdek]**
  * Özdeğerler (Eigenvalues), Özvektörler (Eigenvectors) ve Kovaryans Matrisi üzerinden **Temel Bileşenler Analizi (PCA)**.
  * Mahalanobis Uzaklığı (çok boyutlu verilerde aykırı değer tespiti).
* **Bayesçi İstatistik (Bayesian Statistics):** **[Çekirdek / İleri]**
  * Önsel (Prior), Olabilirlik (Likelihood) ve Sonsal (Posterior) dağılımlar.
  * **Maksimum Sonsal Tahmin (MAP):** L1 ve L2 regülarizasyonlarının Bayesçi karşılığı.
  * **Beta ve Gamma dağılımları** ve eşlenik (conjugate) önseller (ör. Beta-Binom).
  * Markov Zinciri Monte Carlo (MCMC) yöntemleri ve Bayesçi A/B testleri. **[Seçmeli]**
* **Nedensel Çıkarım (Causal Inference):**
  * **[Çekirdek, hafif düzey]** ✱ Karıştırıcı değişkenler (confounders), collider yanlılığı ve temel DAG (nedensel grafik) mantığı. Gözlemsel verinin yorumunda hata yapmamak için.
  * **[Seçmeli]** Propensity Score Matching (PSM), Difference-in-Differences (DiD), Enstrümantal Değişkenler (IV), Regresyon Süreksizliği (RDD).
* **Zaman Serisi İstatistiği (Time Series):** **[Seçmeli]**
  * Durağanlık (Stationarity), Otokorelasyon (ACF ve PACF), ARIMA/SARIMA.
  * Mevsimsellik ve trend ayrıştırması, tahmin metrikleri (MAE, RMSE, MAPE), walk-forward doğrulama.
  * **[İleri seçmeli]** Kointegrasyon, ARCH/GARCH (finansal zaman serileri için).

---

## Projelerde Açıklanabilirlik İçin Kısa Eşleştirme

| Kavram | Projede nasıl kullanılır |
|---|---|
| Güven aralığı ve bootstrap | Metrik ve katsayılara belirsizlik aralığı ekleyip "tek bir sayı" yerine aralık raporlamak |
| Etki büyüklüğü + p-değeri | "Anlamlı mı?" yerine "ne kadar büyük ve pratikte önemli mi?" sorusunu yanıtlamak |
| OLS / GLM katsayı yorumu | Özelliklerin etkisini sade dille (ör. odds ratio) anlatmak |
| VIF ve çoklu doğrusal bağlantı | Katsayıların neden kararsız olduğunu açıklamak |
| Çoklu test düzeltmesi | Çok sayıda özellik testinde yanlış keşifleri kontrol etmek |
| Eksik veri mekanizması | Imputation seçimini gerekçelendirmek |
| Bias-variance ve cross-validation | Overfitting'i ölçüp modelin genellemesini savunmak |
| Confounder / DAG mantığı | Korelasyonel bulguları nedensel iddiaya çevirmeden raporlamak |

---

## Önerilen Çalışma Sırası

1. Seviye 1'in tamamı (Çekirdek).
2. Seviye 2: Limit teoremleri → güven aralığı → MLE → hipotez testleri (+ ilgili dağılımlar) → bootstrap → regresyon ve GLM → bias-variance.
3. Seviye 3: Bilgi teorisi → PCA → Bayesçi temel → hafif nedensel çıkarım.
4. Seçmeliler: İhtiyaç doğdukça (A/B testi, zaman serisi, ileri nedensellik).
