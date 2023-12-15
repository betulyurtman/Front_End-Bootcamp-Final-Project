# FrontEnd Bootcamp Final Projesi

Merhaba!

Öncelikle sizlerle projemin vercel linkini paylaşmak istiyorum.

Link: https://betul-book-app.vercel.app/

Projem için bir kitap uygulaması yapmak istedim. Kitap okumayı küçüklüğümden beri seven biri olarak projemin beni yansıtan bir konu olmasını istediğim için özellikle bu temayı seçtim.

Projemi hazırlarken Next.js, Redux Toolkit ve tasarım için MUI kullandım.

Projem için gerekli olan veriyi MockAPI ile oluşturdum.


Uygulamanın kullanımı:

![1](https://github.com/betulyurtman/Front_End-Bootcamp-Final-Project/assets/96620871/08a89910-e945-42ed-a2c9-33d416fc9056)

![2](https://github.com/betulyurtman/Front_End-Bootcamp-Final-Project/assets/96620871/33f85e06-1801-4c5d-a812-47669dc40da3)

![3](https://github.com/betulyurtman/Front_End-Bootcamp-Final-Project/assets/96620871/07e8f96d-f142-4266-8bd3-3c1ca5fe5a81)

![4](https://github.com/betulyurtman/Front_End-Bootcamp-Final-Project/assets/96620871/580305b6-0d38-4933-b7d1-915809088387)

![5](https://github.com/betulyurtman/Front_End-Bootcamp-Final-Project/assets/96620871/fbfceae7-588c-4c81-a8af-ab461cdc6898)


Proje Dosyaları:

Projemin "src" klasörü içerisinde "components", "pages" ve "store" şeklinde 3 klasör bulunmaktadır. 

"components" klasörü içerisinde "BookCard" ve "DashboardLayout" componentleri bulunmaktadır.

"pages" klasörü içerisinde "book", "add-book", "edit-book" ve "reading-list" sayfaları bulunmaktadır.

"store" klasörü içerisinde "bookSlice" ve "readingListSlice" slice'ları ve "store" dosyası bulunmaktadır.


BookCard: Her bir kitap için thumbnail, title, author ve page count gösteren bir kart tasarladım. Ayrıca bu karta okuma listesine ekleyip çıkarma ve kitap detayını görüntüleme için butonlar ekledim. Son olarak bu kartı bir component olarak ayırdım ki diğer sayfalarda da içeri aktararak kolayca kullanabileyim ve tekrar tekrar oluşturmam gerekmesin.

DashboardLayout: Her bir sayfaya header olarak tasarladığım bu component'de bir başlık ve ana sayfaya dönme, yeni kitap ekleme sayfasına gitme ve okuma listesi sayfasına gitme butonları bulunmaktadır. 


book: Bu klasör içerisinde her bir kitabın id'sini kullanarak kitabın detay sayfasına gidebiliyoruz. Bu sayfada bizi yine bir kitap kartı karşılıyor. Diğer kartlardan farklı olarak bu kart içerisinde bizi düzenleme sayfasına götüren bir buton bulunuyor.

add-book: Bu sayfada formik ve yup kullanarak bir kitap ekleme formu oluşturdum. Yup kullanarak formda kullandığım alanlar için validation'lar(Kitap adı olması zorunludur gibi.) oluşturdum. Formik kullanarak gerekli form işlemlerini tasarladım.

edit-book: Bu sayfada formik ve yup kullanarak bir kitap güncelleme formu oluşturdum. Yup kullanarak formda kullandığım alanlar için validation'lar(Kitap adı olması zorunludur gibi.) oluşturdum. Formik kullanarak gerekli form işlemlerini tasarladım.

reading-list: Bu sayfada kitap kartında kullandığım okuma listesine ekleme butonuyla listeye eklediğim kitapları gösterdiğim bir sayfa oluşturdum.


bookSlice: Bu bölümde, MockAPI kullanarak oluşturduğum verileri çekme, düzenleme ve veri ekleme işlemlerini createAsyncThunk ve axios kullanarak gerçekleştirdim. Bu işlemler için gerekli olan reducer ve action'ları da burada oluşturdum. Ayrıca ana sayfada kullandığım search fonksiyonunu da burada yazdım.

readingListSlice: Bu bölümde, reading list için gerekli olan listeye ekleme ve listeden çıkarma için reducer ve action'ları hazırladım.

store: Bu bölümde yer alan "store", projenin Redux store'unu tanımlıyor ve yönetiyor, ayrıca reducer'ları, actions'ları ve async işlemleri içeriyor ve bu sayede projedeki global durumu (state) kontrol ediyor.


