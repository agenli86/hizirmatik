
import { Tool, BlogPost } from './types';

export const TOOLS: Tool[] = [
  { 
    id: 'currency-conv', 
    name: 'Döviz Hesaplayıcı', 
    description: 'Anlık piyasa kurları ile hızlı para birimi dönüştürme.', 
    icon: '💹', 
    category: 'finance'
  },
  { 
    id: 'loan-calc', 
    name: 'Kredi Hesaplayıcı', 
    description: 'Banka kredisi taksitlerini ve toplam geri ödemeyi hesaplayın.', 
    icon: '🏦', 
    category: 'finance'
  },
  { 
    id: 'vat-calc', 
    name: 'KDV Hesaplayıcı', 
    description: 'KDV dahil ve hariç fiyatları saniyeler içinde bulun.', 
    icon: '📊', 
    category: 'finance'
  },
  { 
    id: 'bmi-calc', 
    name: 'Vücut Kitle İndeksi', 
    description: 'İdeal kilonuzu ve sağlık durumunuzu kontrol edin.', 
    icon: '⚖️', 
    category: 'health'
  },
  { 
    id: 'unit-conv', 
    name: 'Birim Dönüştürücü', 
    description: 'Uzunluk, ağırlık ve sıcaklık birimlerini birbirine çevirin.', 
    icon: '📏', 
    category: 'productivity'
  },
  { 
    id: 'ai-recipe', 
    name: 'AI Mutfak Şefi', 
    description: 'Elinizdeki malzemeleri yazın, AI size özel tarif önersin.', 
    icon: '🍳', 
    category: 'kitchen'
  },
  { 
    id: 'pomodoro', 
    name: 'Odaklanma Zamanlayıcı', 
    description: 'Pomodoro tekniği ile çalışma verimliliğinizi artırın.', 
    icon: '⏱️', 
    category: 'productivity'
  },
  { 
    id: 'bg-remover', 
    name: 'AI Arka Plan Kaldırıcı', 
    description: 'Profil fotoğraflarınızın arka planını tek tıkla temizleyin.', 
    icon: '✂️', 
    category: 'ai'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Bütçe Yönetimi: Tasarruf Etmenin 5 Altın Kuralı',
    excerpt: 'Enflasyonist ortamda paranızı nasıl korursunuz? Basit ama etkili finansal taktiklerle bütçenizi kontrol altına alın.',
    content: `Finansal özgürlüğün yolu, ne kadar kazandığınızdan çok ne kadarını tutabildiğinizle ilgilidir. Özellikle ekonomik dalgalanmaların olduğu dönemlerde, bireysel bütçe yönetimi hayati önem taşır. İşte günlük hayatınızda uygulayabileceğiniz, cebinizi rahatlatacak 5 temel taktik:

1. 50/30/20 Kuralını Uygulayın: Bu klasik yöntem, gelirinizi yönetmenin en basit yoludur. Gelirinizin %50'sini barınma, faturalar ve mutfak gibi temel ihtiyaçlara ayırın. %30'u eğlence, hobi ve dışarıda yemek gibi "istekler" için kullanın. Geriye kalan %20'yi ise mutlaka ama mutlaka borç ödemeye veya gelecekteki yatırımlarınız için tasarrufa ayırın.

2. Anlık Harcamalardan Kaçının (72 Saat Kuralı): Mağazada veya online alışveriş sitelerinde bir şey görüp çok beğendiğinizde, hemen "satın al" butonuna basmayın. Kendinize 72 saat süre verin. Eğer 3 gün sonra hala ona ihtiyacınız olduğunu ve hayatınıza değer katacağını düşünüyorsanız satın alın. Göreceksiniz ki çoğu zaman o istek geçiciymiş.

3. Kredi Kartı Yerine Nakit Psikolojisi: Dijital harcamalar, paranın elden çıkış hissini zayıflatır. Haftalık market alışverişi gibi kalemlerde nakit kullanmak, ne kadar harcadığınızı fiziksel olarak görmenizi sağlayarak israfı önler.

4. Borç Yapılandırması ve Faiz Takibi: Yüksek faizli kredi kartı borçları, tasarrufun önündeki en büyük engeldir. Mevcut borçlarınızı daha düşük faizli bir ihtiyaç kredisiyle kapatıp tek bir yerde toplamak, aylık ödeme yükünüzü azaltabilir. Sitemizdeki kredi hesaplayıcısı ile bu yapılandırmanın maliyetini önceden görün.

5. Küçük Abonelikleri ve Otomatik Ödemeleri Denetleyin: Ayda 50 TL, 100 TL ödediğiniz ama neredeyse hiç kullanmadığınız dijital platform üyelikleri, spor salonu kartları veya dergi abonelikleri birleştiğinde yılda hatırı sayılır bir meblağ eder. Her 3 ayda bir banka dökümünüzü inceleyin ve kullanmadıklarınızı iptal edin.

Unutmayın, zenginlik büyük gelirlerle değil, disiplinli gider yönetimiyle başlar. Hızır Matik olarak finansal araçlarımızla her zaman yanınızdayız.`,
    date: '10 Haziran 2024',
    author: 'Hızır Matik Finans',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
    slug: 'butce-yonetimi-ve-tasarruf'
  },
  {
    id: '2',
    title: 'Sağlıklı Yaşam Rehberi: BMI ve İdeal Kilo Kontrolü',
    excerpt: 'Vücut kitle indeksiniz sadece bir rakam mı? Sağlığınızı korumak için kilo yönetiminin püf noktalarını öğrenin.',
    content: `Vücut Kitle İndeksi (BMI), boyunuza göre kilonuzun sağlıklı bir aralıkta olup olmadığını belirleyen uluslararası bir standarttır. Sağlık sadece bu rakamdan ibaret değildir.

Neden BMI Takibi Yapmalısınız?
Dünya Sağlık Örgütü verilerine göre, BMI değerinin 25'in üzerinde olması "fazla kilolu", 30'un üzerinde olması ise "obezite" olarak sınıflandırılır. Bu durum kalp-damar hastalıkları riskini ciddi oranda artırır.

Sağlıklı Bir BMI Değeri İçin 3 Altın İpucu:
- Hidrasyonun Gücü: Su içmek metabolizmayı hızlandırır.
- Sürdürülebilir Hareket: Her gün yapılan 30 dakikalık tempolu yürüyüşler kalp sağlığınızı korur.
- Kaliteli Uyku: Vücudun hormon dengesi uyku sırasında düzenlenir.

Sitemizdeki BMI hesaplayıcıyı kullanarak mevcut durumunuzu görebilirsiniz. Hızır Matik sağlığınızı da önemsiyor.`,
    date: '12 Haziran 2024',
    author: 'Hızır Matik Sağlık',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
    slug: 'saglikli-yasam-ve-bmi'
  },
  {
    id: '3',
    title: 'Pomodoro Tekniği: 25 Dakikada Maksimum Odaklanma',
    excerpt: 'Odaklanma sorunu mu yaşıyorsunuz? Pomodoro tekniği ile çalışma saatlerinizi daha verimli hale getirin.',
    content: `Modern insanın en büyük sorunu "derin çalışma" yapamamaktır. İşte bu noktada 1980'lerde geliştirilen Pomodoro Tekniği devreye giriyor.

Nasıl Uygulanır?
Zamanlayıcıyı 25 dakikaya ayarlayın ve sadece o işe odaklanın. Süre dolduğunda 5 dakikalık kısa bir mola verin. Bu basit döngü, beyninizin tazelenmesini ve verimliliğinizin tavan yapmasını sağlar.

Hemen Hızır Matik Verimlilik araçları altındaki Pomodoro sayacını başlatın ve ilk 25 dakikanıza başlayın!`,
    date: '15 Haziran 2024',
    author: 'Hızır Matik Verimlilik',
    image: 'https://images.unsplash.com/photo-1495480172332-6a192d74a71a?auto=format&fit=crop&w=800&q=80',
    slug: 'pomodoro-ile-verimlilik'
  },
  {
    id: '4',
    title: 'AI Mutfak Devrimi: Elinizdeki Malzemelerle Gurme Tarifler',
    excerpt: 'Yemek yaparken "bugün ne pişirsem?" sorusuna son. AI Mutfak Şefi ile yaratıcı tarifler keşfedin.',
    content: `Buzdolabını açtınız ama ne pişireceğinizi bilemiyor musunuz? Hızır Matik AI Mutfak Şefi, verdiğiniz malzemeler arasındaki uyumu saniyeler içinde analiz eder ve size en lezzetli tarifi sunar.

AI Şefi Kullanmanın Avantajları:
- Gıda İsrafına Dur Deyin: Eldeki malzemeleri değerlendirin.
- Mutfakta Yaratıcılık: Yeni tatlar keşfedin.
- Hız ve Pratiklik: Düşünmekle vakit kaybetmeyin.

Hızır Matik olarak teknolojiyi mutfağınıza taşıyoruz. Malzemelerinizi yazın ve şefinizin size ne hazırlayacağını görün!`,
    date: '18 Haziran 2024',
    author: 'Hızır Matik Mutfak',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    slug: 'mutfakta-ai-donemi'
  }
];

export const LEGAL_PAGES = [
  { id: 'about', name: 'Hakkımızda' },
  { id: 'contact', name: 'İletişim' },
  { id: 'privacy', name: 'Gizlilik Politikası' },
];
