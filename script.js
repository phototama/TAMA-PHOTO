
// ========================================
// TAMA PHOTO - MAIN JAVASCRIPT
// SEARCH, FILTER & WHATSAPP ORDER SYSTEM
// ========================================


// ========================================
// 1. SERVICE SEARCH & FILTER
// ========================================

const searchInput = document.getElementById("serviceSearch");
const filterButtons = document.querySelectorAll(".filter-button");
const serviceCards = document.querySelectorAll(".service-card");
const noResult = document.getElementById("noResult");
const serviceCount = document.querySelector(".service-count");

let activeCategory = "all";

function filterServices() {

    // Hentikan jika halaman tidak memiliki fitur pencarian
    if (!searchInput || !noResult || !serviceCount) return;

    const searchText = searchInput.value.toLowerCase().trim();

    let visibleCount = 0;

    serviceCards.forEach(function(card) {

        const serviceName = card.textContent.toLowerCase();
        const serviceCategory = card.dataset.category;

        const categoryMatch =
            activeCategory === "all" ||
            serviceCategory === activeCategory;

        const searchMatch = serviceName.includes(searchText);

        if (categoryMatch && searchMatch) {
            card.hidden = false;
            visibleCount++;
        } else {
            card.hidden = true;
        }

    });

    noResult.hidden = visibleCount !== 0;
    serviceCount.textContent = visibleCount + " Layanan";
}


// Event pencarian
if (searchInput) {
    searchInput.addEventListener("input", filterServices);
}


// Event filter kategori
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        activeCategory = button.dataset.filter;

        filterServices();

    });

});


// Jalankan filter jika elemen tersedia
filterServices();


// ========================================
// 2. DATA CABANG TAMA PHOTO
// ========================================

const tamaBranches = {

    "Sengkuang": {
        name: "TAMA PHOTO Sengkuang",
        phone: "6281275309281"
    },

    "Melcem": {
        name: "TAMA PHOTO Melcem",
        phone: "6281275309280"
    },

    "Bengkong": {
        name: "TAMA PHOTO Bengkong",
        phone: "6282172355465"
    }

};


// ========================================
// 3. FUNGSI KIRIM PESAN WHATSAPP
// ========================================

function sendWhatsAppOrder(formId, branchId, buttonId, serviceName, fields) {

    const form = document.getElementById(formId);
    const branchSelect = document.getElementById(branchId);
    const sendButton = document.getElementById(buttonId);

    if (!form || !branchSelect || !sendButton) return;

    sendButton.addEventListener("click", function() {

        // Validasi formulir
        if (!form.reportValidity()) return;

        // Ambil cabang pilihan
        const selectedBranch = tamaBranches[branchSelect.value];

        if (!selectedBranch) {
            alert("Silakan pilih cabang TAMA PHOTO terlebih dahulu.");
            branchSelect.focus();
            return;
        }

        // Susun pesan WhatsApp
        let message =
            "*PEMESANAN " + serviceName.toUpperCase() + "*\n\n" +
            "Cabang Tujuan: " + selectedBranch.name + "\n\n";

        fields.forEach(function(field) {

            const element = document.getElementById(field.id);

            if (!element) return;

            const value = element.value.trim();

            if (value !== "") {
                message += field.label + ": " + value + "\n";
            }

        });

        message +=
            "\nMohon informasikan harga dan proses selanjutnya.\n\n" +
            "Terima kasih.";

        // Buat URL WhatsApp
        const whatsappURL =
            "https://wa.me/" +
            selectedBranch.phone +
            "?text=" +
            encodeURIComponent(message);

        // Buka WhatsApp
        window.open(whatsappURL, "_blank");

    });

}


// ========================================
// 4. FORM PEMESANAN CETAK BANNER
// ========================================

sendWhatsAppOrder(
    "bannerOrderForm",
    "orderBranch",
    "sendBannerOrder",
    "Cetak Banner",
    [
        { id: "customerName", label: "Nama Pemesan" },
        { id: "customerPhone", label: "Nomor WhatsApp" },
        { id: "bannerWidth", label: "Lebar Banner (cm)" },
        { id: "bannerHeight", label: "Tinggi Banner (cm)" },
        { id: "bannerQuantity", label: "Jumlah Banner" },
        { id: "bannerMaterial", label: "Jenis Bahan" },
        { id: "bannerFinishing", label: "Finishing" },
        { id: "bannerDesign", label: "Status Desain" },
        { id: "bannerNotes", label: "Catatan Tambahan" }
    ]
);


// ========================================
// 5. TEMPAT PENDAFTARAN FORM LAYANAN LAIN
// ========================================

// Layanan lainnya akan kita hubungkan
// setelah struktur formulir masing-masing diperiksa.
//
// Contoh:
// sendWhatsAppOrder(
//     "spandukOrderForm",
//     "orderBranch",
//     "sendSpandukOrder",
//     "Cetak Spanduk",
//     [
//         { id: "customerName", label: "Nama Pemesan" }
//     ]
// );



// ========================================
// FORM PEMBAYARAN AIR / PDAM
// ========================================

sendWhatsAppOrder(
    "bayarAirOrderForm",
    "orderBranch",
    "sendBayarAirOrder",
    "Pembayaran Air / PDAM",
    [
        { id: "bayarAirCustomerName", label: "Nama Pemesan" },
        { id: "bayarAirCustomerPhone", label: "Nomor WhatsApp" },
        { id: "bayarAirProvider", label: "Penyedia Layanan Air" },
        { id: "bayarAirCustomerId", label: "Nomor Pelanggan" },
        { id: "bayarAirAccountName", label: "Nama Pelanggan Air" },
        { id: "bayarAirPeriod", label: "Periode Tagihan" },
        { id: "bayarAirNotes", label: "Catatan Tambahan" }
    ]
);



// ========================================
// FORM PEMBAYARAN LISTRIK PLN
// ========================================

sendWhatsAppOrder(
    "bayarListrikOrderForm",
    "orderBranch",
    "sendBayarListrikOrder",
    "Pembayaran Tagihan Listrik",
    [
        { id: "bayarListrikCustomerName", label: "Nama Pemesan" },
        { id: "bayarListrikCustomerPhone", label: "Nomor WhatsApp" },
        { id: "bayarListrikCustomerId", label: "ID Pelanggan / Nomor Meter" },
        { id: "bayarListrikAccountName", label: "Nama Pelanggan" },
        { id: "bayarListrikPeriod", label: "Periode Tagihan" },
        { id: "bayarListrikNotes", label: "Catatan Tambahan" }
    ]
);


sendWhatsAppOrder(
    "buatCvOrderForm",
    "orderBranch",
    "sendBuatCvOrder",
    "Jasa Pembuatan CV",
    [
        { id: "cvCustomerName", label: "Nama Pemesan" },
        { id: "cvCustomerPhone", label: "Nomor WhatsApp Pemesan" },
        { id: "cvFullName", label: "Nama Lengkap untuk CV" },
        { id: "cvBirth", label: "Tempat dan Tanggal Lahir" },
        { id: "cvAddress", label: "Alamat" },
        { id: "cvEmail", label: "Email" },
        { id: "cvEducation", label: "Riwayat Pendidikan" },
        { id: "cvExperience", label: "Pengalaman Kerja" },
        { id: "cvSkills", label: "Keahlian" },
        { id: "cvAdditional", label: "Informasi Tambahan" },
        { id: "cvDesign", label: "Pilihan Desain CV" },
        { id: "cvPhoto", label: "Foto untuk CV" },
        { id: "cvNotes", label: "Catatan Tambahan" }
    ]
);



sendWhatsAppOrder(
    "cetakKartuOrderForm",
    "orderBranch",
    "sendCetakKartuOrder",
    "Cetak Kartu",
    [
        { id: "kartuCustomerName", label: "Nama Pemesan" },
        { id: "kartuCustomerPhone", label: "Nomor WhatsApp" },
        { id: "kartuType", label: "Jenis Kartu" },
        { id: "kartuSize", label: "Ukuran Kartu" },
        { id: "kartuCustomSize", label: "Ukuran Khusus" },
        { id: "kartuMaterial", label: "Jenis Bahan" },
        { id: "kartuQuantity", label: "Jumlah Cetak" },
        { id: "kartuPrintSide", label: "Sisi Cetak" },
        { id: "kartuFinishing", label: "Finishing" },
        { id: "kartuDesign", label: "Status Desain" },
        { id: "kartuNotes", label: "Catatan Tambahan" }
    ]
);



sendWhatsAppOrder(
    "editDokumenOrderForm",
    "orderBranch",
    "sendEditDokumenOrder",
    "Jasa Edit Dokumen",
    [
        { id: "editDokumenCustomerName", label: "Nama Pemesan" },
        { id: "editDokumenCustomerPhone", label: "Nomor WhatsApp" },
        { id: "editDokumenType", label: "Jenis Dokumen" },
        { id: "editDokumenTask", label: "Jenis Pekerjaan" },
        { id: "editDokumenPage", label: "Jumlah Halaman" },
        { id: "editDokumenFormat", label: "Format File" },
        { id: "editDokumenDeadline", label: "Target Penyelesaian" },
        { id: "editDokumenDescription", label: "Penjelasan Pekerjaan" },
        { id: "editDokumenNotes", label: "Catatan Tambahan" }
    ]
);




sendWhatsAppOrder(
    "editPasFotoOrderForm",
    "orderBranch",
    "sendEditPasFotoOrder",
    "Edit Pas Foto",
    [
        { id: "pasFotoCustomerName", label: "Nama Pemesan" },
        { id: "pasFotoCustomerPhone", label: "Nomor WhatsApp" },
        { id: "pasFotoGender", label: "Jenis Kelamin" },
        { id: "pasFotoClothing", label: "Pilihan Pakaian" },
        { id: "pasFotoSize", label: "Ukuran Pas Foto" },
        { id: "pasFotoCustomSize", label: "Ukuran Khusus" },
        { id: "pasFotoBackground", label: "Warna Background" },
        { id: "pasFotoEditing", label: "Permintaan Editing" },
        { id: "pasFotoQuantity", label: "Jumlah Orang / Foto" },
        { id: "pasFotoOutput", label: "Format Hasil" },
        { id: "pasFotoPrintQuantity", label: "Jumlah Cetak" },
        { id: "pasFotoNotes", label: "Catatan Tambahan" }
    ]
);




sendWhatsAppOrder(
    "gantiBajuFotoOrderForm",
    "orderBranch",
    "sendGantiBajuFotoOrder",
    "Jasa Ganti Baju Foto",
    [
        { id: "gantiBajuCustomerName", label: "Nama Pemesan" },
        { id: "gantiBajuCustomerPhone", label: "Nomor WhatsApp" },
        { id: "gantiBajuGender", label: "Jenis Pakaian" },
        { id: "gantiBajuStyle", label: "Model Pakaian" },
        { id: "gantiBajuColor", label: "Warna Pakaian" },
        { id: "gantiBajuQuantity", label: "Jumlah Foto" },
        { id: "gantiBajuOutput", label: "Format Hasil" },
        { id: "gantiBajuPhotoSize", label: "Ukuran Cetak" },
        { id: "gantiBajuBackground", label: "Background Foto" },
        { id: "gantiBajuNotes", label: "Catatan Tambahan" }
    ]
);



sendWhatsAppOrder(
    "isiPulsaOrderForm",
    "orderBranch",
    "sendIsiPulsaOrder",
    "Isi Pulsa",
    [
        { id: "pulsaCustomerName", label: "Nama Pemesan" },
        { id: "pulsaCustomerPhone", label: "Nomor WhatsApp Pemesan" },
        { id: "pulsaOperator", label: "Operator" },
        { id: "pulsaTargetNumber", label: "Nomor Tujuan" },
        { id: "pulsaNominal", label: "Nominal Pulsa" },
        { id: "pulsaCustomNominal", label: "Nominal Lainnya" },
        { id: "pulsaNotes", label: "Catatan Tambahan" }
    ]
);



sendWhatsAppOrder(
    "jasaKetikOrderForm",
    "orderBranch",
    "sendJasaKetikOrder",
    "Jasa Pengetikan",
    [
        { id: "ketikCustomerName", label: "Nama Pemesan" },
        { id: "ketikCustomerPhone", label: "Nomor WhatsApp" },
        { id: "ketikDocumentType", label: "Jenis Dokumen" },
        { id: "ketikSource", label: "Sumber Materi" },
        { id: "ketikPage", label: "Perkiraan Jumlah Halaman" },
        { id: "ketikFormat", label: "Format Hasil" },
        { id: "ketikDeadline", label: "Target Penyelesaian" },
        { id: "ketikDescription", label: "Detail Pekerjaan" },
        { id: "ketikNotes", label: "Catatan Tambahan" }
    ]
);



sendWhatsAppOrder(
    "kartuNamaOrderForm",
    "orderBranch",
    "sendKartuNamaOrder",
    "Cetak Kartu Nama",
    [
        { id: "kartuNamaCustomerName", label: "Nama Pemesan" },
        { id: "kartuNamaCustomerPhone", label: "Nomor WhatsApp Pemesan" },
        { id: "kartuNamaOwner", label: "Nama pada Kartu" },
        { id: "kartuNamaBusiness", label: "Nama Perusahaan / Usaha" },
        { id: "kartuNamaPosition", label: "Jabatan / Profesi" },
        { id: "kartuNamaPhone", label: "Nomor Telepon pada Kartu" },
        { id: "kartuNamaEmail", label: "Email pada Kartu" },
        { id: "kartuNamaAddress", label: "Alamat pada Kartu" },
        { id: "kartuNamaSize", label: "Ukuran Kartu Nama" },
        { id: "kartuNamaMaterial", label: "Jenis Bahan" },
        { id: "kartuNamaQuantity", label: "Jumlah Cetak" },
        { id: "kartuNamaSide", label: "Sisi Cetak" },
        { id: "kartuNamaFinishing", label: "Finishing" },
        { id: "kartuNamaDesign", label: "Status Desain" },
        { id: "kartuNamaNotes", label: "Catatan Tambahan" }
    ]
);



sendWhatsAppOrder(
    "pembayaranKreditOrderForm",
    "orderBranch",
    "sendPembayaranKreditOrder",
    "Pembayaran Kredit",
    [
        { id: "kreditCustomerName", label: "Nama Pemesan" },
        { id: "kreditCustomerPhone", label: "Nomor WhatsApp Pemesan" },
        { id: "kreditProvider", label: "Perusahaan Pembiayaan" },
        { id: "kreditType", label: "Jenis Kredit" },
        { id: "kreditCustomerId", label: "Nomor Kontrak / Pelanggan" },
        { id: "kreditAccountName", label: "Nama Pemilik Tagihan" },
        { id: "kreditPeriod", label: "Periode Cicilan" },
        { id: "kreditInstallment", label: "Angsuran Ke-" },
        { id: "kreditAmount", label: "Perkiraan Nominal Pembayaran" },
        { id: "kreditNotes", label: "Catatan Tambahan" }
    ]
);



sendWhatsAppOrder(
    "printOrderForm",
    "orderBranch",
    "sendPrintOrder",
    "Print Dokumen",
    [
        { id: "printCustomerName", label: "Nama Pemesan" },
        { id: "printCustomerPhone", label: "Nomor WhatsApp Pemesan" },
        { id: "printDocumentName", label: "Nama Dokumen" },
        { id: "printFileType", label: "Format File" },
        { id: "printPaperSize", label: "Ukuran Kertas" },
        { id: "printColor", label: "Jenis Cetak" },
        { id: "printSide", label: "Sisi Cetak" },
        { id: "printPages", label: "Jumlah Halaman File" },
        { id: "printPageRange", label: "Halaman yang Dicetak" },
        { id: "printQuantity", label: "Jumlah Salinan" },
        { id: "printFinishing", label: "Finishing" },
        { id: "printNotes", label: "Catatan Tambahan" }
    ]
);



sendWhatsAppOrder(
    "spandukOrderForm",
    "orderBranch",
    "sendSpandukOrder",
    "Cetak Spanduk",
    [
        { id: "spandukCustomerName", label: "Nama Pemesan" },
        { id: "spandukCustomerPhone", label: "Nomor WhatsApp Pemesan" },
        { id: "spandukWidth", label: "Lebar Spanduk (meter)" },
        { id: "spandukHeight", label: "Tinggi Spanduk (meter)" },
        { id: "spandukQuantity", label: "Jumlah Spanduk" },
        { id: "spandukMaterial", label: "Jenis Bahan" },
        { id: "spandukFinishing", label: "Finishing" },
        { id: "spandukDesign", label: "Status Desain" },
        { id: "spandukDeadline", label: "Target Penyelesaian" },
        { id: "spandukNotes", label: "Catatan Tambahan" }
    ]
);



sendWhatsAppOrder(
    "tokenListrikOrderForm",
    "orderBranch",
    "sendTokenListrikOrder",
    "Pembelian Token Listrik",
    [
        { id: "tokenCustomerName", label: "Nama Pemesan" },
        { id: "tokenCustomerPhone", label: "Nomor WhatsApp Pemesan" },
        { id: "tokenCustomerId", label: "Nomor Meter / ID Pelanggan" },
        { id: "tokenAccountName", label: "Nama Pelanggan PLN" },
        { id: "tokenNominal", label: "Nominal Token" },
        { id: "tokenCustomNominal", label: "Nominal Lainnya" },
        { id: "tokenNotes", label: "Catatan Tambahan" }
    ]
);
