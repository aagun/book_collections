
# Book Collections

Aplikasi "Book Collections" adalah sebuah aplikasi sederhana untuk mengelola koleksi buku.


### Fitur

- **Tampilkan Semua Buku**: Lihat daftar semua koleksi buku yang telah ditambahkan.
- **Pencatatan Buku**: Tambahkan buku baru ke dalam koleksi dengan informasi seperti judul, deskripsi, dan tahun terbit.
- **Penyuntingan Buku**: Edit detail buku yang sudah ada di dalam koleksi.
- **Pencarian Buku**: Cari buku berdasarkan judul, penulis, atau kategori lainnya.
- **Penghapusan Buku**: Hapus buku dari koleksi.
- **Penambahan Kategori**: Tambahkan kategori baru untuk mengelompokkan buku.
- **Penghapusan Kategori**: Hapus kategori buku.
- **Penyuntingan Kategori**: Perbarui nama kategori yang sudah ada.
- **Tampilkan Semua Kategori**: Lihat daftar semua kategori yang telah ditambahkan.
- **Tampilan Semua Kategori dengan buku terkait**: Lihat daftar semua kategori yang telah ditambahkan bersama dengan koleksi buku yang terkait.


### Teknologi

- **[NodeJs 18](https://nodejs.org/)**
- **[Express.js](https://expressjs.com/)**
- **[Docker](https://docker.com/)**
- **[MySQL](https://docker.com/)**
- **[Adminer](https://adminer.org/)**
- **[Postman](https://postman.com/)**

### Persiapan

Pastikan sudah menginstal [NodeJs 18](https://nodejs.org/), [Docker](https://docker.com/) dan [Postman](https://postman.com/) sebelum menjalankan aplikasi.


### Menjalankan Aplikasi

1. Clone repositori ini: `git clone https://github.com/aagun/book-collections.git`
2. Pindah ke direktori proyek: `cd book_collections`
3. Instal dependensi: `npm install`
4. Jalankan Docker Compose untuk menjalankan container database dan antarmuka pengelolaan database: `docker-compose up -d`
5. Jalankan migrasi database dengan perintah: `npm run migrate`
6. Jalankan aplikasi: `npm start`

Aplikasi dapat diakses melalui browser di `http://localhost:3000`.

### Menjalankan Database Management UI

Antarmuka pengelolaan database Adminer dapat diakses melalui browser di`http://localhost:8080`.

### Pengujian API dengan Postman

1. Import koleksi API menggunakan file JSON yang disediakan di folder `postman`.
2. Impor environment Postman menggunakan file JSON yang disediakan di folder `postman`.
3. Gunakan Postman untuk menguji API sesuai dengan kebutuhan.

### License

[MIT](https://choosealicense.com/licenses/mit/)

