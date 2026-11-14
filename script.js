
// ========================================
// TAMA PHOTO - SERVICE SEARCH & FILTER
// ========================================

// Mengambil elemen HTML
const searchInput = document.getElementById("serviceSearch");
const filterButtons = document.querySelectorAll(".filter-button");
const serviceCards = document.querySelectorAll(".service-card");
const noResult = document.getElementById("noResult");
const serviceCount = document.querySelector(".service-count");

// Menyimpan kategori yang sedang dipilih
let activeCategory = "all";


// ========================================
// FUNGSI PENCARIAN DAN FILTER
// ========================================

function filterServices() {

    // Mengambil kata pencarian
    const searchText = searchInput.value.toLowerCase().trim();

    let visibleCount = 0;

    // Memeriksa setiap kartu layanan
    serviceCards.forEach(function(card) {

        const serviceName = card.textContent.toLowerCase();
        const serviceCategory = card.dataset.category;

        // Memeriksa kecocokan kategori
        const categoryMatch =
            activeCategory === "all" ||
            serviceCategory === activeCategory;

        // Memeriksa kecocokan pencarian
        const searchMatch = serviceName.includes(searchText);

        // Menampilkan kartu jika keduanya cocok
        if (categoryMatch && searchMatch) {

            card.hidden = false;
            visibleCount++;

        } else {

            card.hidden = true;

        }

    });

    // Menampilkan pesan jika tidak ada hasil
    noResult.hidden = visibleCount !== 0;

    // Memperbarui jumlah layanan yang tampil
    serviceCount.textContent = visibleCount + " Layanan";
}


// ========================================
// FITUR PENCARIAN
// ========================================

searchInput.addEventListener("input", function() {

    filterServices();

});


// ========================================
// FITUR FILTER KATEGORI
// ========================================

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Menghapus status aktif dari semua tombol
        filterButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        // Mengaktifkan tombol yang dipilih
        button.classList.add("active");

        // Mengambil kategori tombol
        activeCategory = button.dataset.filter;

        // Menjalankan filter
        filterServices();

    });

});


// ========================================
// MENJALANKAN SAAT HALAMAN DIBUKA
// ========================================

filterServices();
