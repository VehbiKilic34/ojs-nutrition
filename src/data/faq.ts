export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Whey protein ne zaman kullanılmalıdır?",
    answer: "Whey protein en iyi antrenman sonrası 30 dakika içinde kullanılır. Bu süre kasların protein sentezine en açık olduğu zamandır. Ayrıca sabah kahvaltısında veya öğün aralarında da kullanılabilir.",
    category: "Protein"
  },
  {
    id: 2,
    question: "Kreatin kullanımı güvenli midir?",
    answer: "Evet, kreatin uzun yıllardır araştırılan ve güvenli olduğu kanıtlanmış bir supplementtir. Günlük 3-5 gram dozda kullanımı önerilir. Böbrek hastalığı olan kişiler doktor kontrolünde kullanmalıdır.",
    category: "Kreatin"
  },
  {
    id: 3,
    question: "BCAA ne işe yarar?",
    answer: "BCAA (Branched Chain Amino Acids) kas yıkımını önler, kas onarımını hızlandırır ve yorgunluğu azaltır. Özellikle aç karnına antrenman yapanlar için faydalıdır.",
    category: "Amino Asit"
  },
  {
    id: 4,
    question: "Yağ yakıcılar gerçekten işe yarar mı?",
    answer: "Yağ yakıcılar tek başına mucize çözüm değildir. Düzenli egzersiz ve sağlıklı beslenme ile birlikte kullanıldığında etkili olabilir. Kalp hastalığı olan kişiler kullanmamalıdır.",
    category: "Yağ Yakıcı"
  },
  {
    id: 5,
    question: "Supplementlerin son kullanma tarihi önemli midir?",
    answer: "Evet, supplementlerin son kullanma tarihi çok önemlidir. Süresi geçmiş ürünler etkisiz olabilir veya sağlık riski oluşturabilir. Serin ve kuru yerde saklanmalıdır.",
    category: "Genel"
  },
  {
    id: 6,
    question: "Pre-workout ne zaman kullanılmalıdır?",
    answer: "Pre-workout supplementleri antrenman öncesi 30-45 dakika kullanılmalıdır. Bu süre içerikteki aktif maddelerin kana karışması için gereklidir. Akşam antrenmanlarında kullanımı uyku kalitesini etkileyebilir.",
    category: "Pre-Workout"
  },
  {
    id: 7,
    question: "Casein protein ne zaman kullanılır?",
    answer: "Casein protein yavaş sindirildiği için gece yatmadan önce kullanılması önerilir. Bu sayede gece boyunca kaslara sürekli amino asit sağlar.",
    category: "Protein"
  },
  {
    id: 8,
    question: "Omega-3 supplementi gerekli midir?",
    answer: "Balık tüketimi az olan kişiler için omega-3 supplementi faydalı olabilir. Kalp sağlığı, beyin fonksiyonları ve iltihap azaltma konularında etkilidir.",
    category: "Vitamin & Mineral"
  },
  {
    id: 9,
    question: "Multivitamin kullanımı önerilir mi?",
    answer: "Dengeli beslenemeyen kişiler için multivitamin kullanımı önerilir. Ancak doğal besinlerden alınan vitaminler her zaman daha etkilidir.",
    category: "Vitamin & Mineral"
  },
  {
    id: 10,
    question: "Glutamin supplementi ne işe yarar?",
    answer: "Glutamin bağırsak sağlığını destekler, bağışıklık sistemini güçlendirir ve kas onarımını hızlandırır. Yoğun antrenman yapan sporcular için faydalıdır.",
    category: "Amino Asit"
  },
  {
    id: 11,
    question: "Kafein supplementi güvenli midir?",
    answer: "Kafein güvenli bir stimülandır ancak günlük 400mg'ı geçmemek gerekir. Kalp hastalığı olan kişiler ve hamileler kullanmamalıdır.",
    category: "Pre-Workout"
  },
  {
    id: 12,
    question: "Siparişlerim ne zaman teslim edilir?",
    answer: "Siparişleriniz genellikle 1-3 iş günü içinde kargoya verilir. Teslimat süresi bulunduğunuz bölgeye göre 1-3 gün arasında değişir.",
    category: "Sipariş & Teslimat"
  },
  {
    id: 13,
    question: "Ücretsiz kargo şartları nelerdir?",
    answer: "150 TL ve üzeri alışverişlerde ücretsiz kargo hizmeti sunuyoruz. Bu tutarın altındaki siparişlerde 15 TL kargo ücreti alınır.",
    category: "Sipariş & Teslimat"
  },
  {
    id: 14,
    question: "İade ve değişim politikası nasıldır?",
    answer: "Ürünlerimizi 14 gün içinde iade edebilirsiniz. Açılmamış ve orijinal ambalajında olan ürünler için tam iade yapılır.",
    category: "Sipariş & Teslimat"
  },
  {
    id: 15,
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer: "Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini kabul ediyoruz. Tüm ödemeler güvenli SSL sertifikası ile korunmaktadır.",
    category: "Ödeme"
  }
]; 