const danceData = [
    {
        id: 1,
        title: "Tari Radap Rahayu",
        region: "Kalimantan Selatan",
        image: "Radap_Rahayu.jpg",
        description: "Tari klasik tradisional masyarakat Banjar yang awalnya ditarikan di lingkungan istana kesultanan untuk menyambut tamu agung kenegaraan, upacara adat penting, serta ungkapan rasa syukur dan doa keselamatan.",
        attire: "Busana tradisional Banjar berkonsep gemerlap khas kerajaan, mengenakan baju bebas, kain sampur (selendang), serta hiasan kepala mahkota khas penari istana.",
        props: "Kipas tangan tradisional atau selendang panjang yang melambangkan kelembutan dan keanggunan."
    },
    {
        id: 2,
        title: "Tari Gantar",
        region: "Kalimantan Timur",
        image: "gantar.jpg",
        description: "Tari tradisional yang berasal dari suku Dayak Benuaq dan Tunjung. Tarian ini merepresentasikan seluruh tahapan ritual sakral dalam proses bercocok tanam padi, mulai dari menugal tanah hingga masa panen.",
        attire: "Pakaian adat suku Dayak bernuansa etnik khas Kalimantan Timur, dilengkapi manik-manik tradisional, kain tenun khas, serta ikat kepala berhiaskan bulu enggang.",
        props: "Tongkat panjang (sentak) dan bambu pendek berisi biji-bijian yang dihentakkan ke lantai menghasilkan irama ritmis."
    },
    {
        id: 3,
        title: "Tari Hudoq",
        region: "Kalimantan Timur",
        image: "hudoq.jpg",
        description: "Tari ritual agung rumpun Dayak yang bertujuan untuk mengusir hama tanaman, memanggil roh para leluhur, serta memohon kesuburan serta keberkahan hasil panen kepada Sang Pencipta.",
        attire: "Kostum seluruh tubuh yang tertutup rapat oleh jalinan daun pisang atau ijuk pohon serta mengenakan topeng kayu berukir wajah roh pelindung yang menyeramkan namun sakral.",
        props: "Topeng kayu ritual sakral dan dedaunan alami."
    },
    {
        id: 4,
        title: "Tari Balean Dadas",
        region: "Kalimantan Tengah",
        image: "Balean_Dadas.jpg",
        description: "Tarian penyembuhan sakral dari suku Dayak Maanyan di Kalimantan Tengah. Dulu dipentaskan oleh para wadian (dukun adat) untuk memohon kesembuhan bagi anggota masyarakat yang sedang sakit keras.",
        attire: "Busana tradisional khas Dayak Maanyan didominasi warna hitam atau merah marun dengan atribut kain adat bermotif etnik serta penutup kepala penari ritual.",
        props: "Anyaman janur kelapa, selendang khusus ritual, dan gelang manik-manik tradisional."
    },
    {
        id: 5,
        title: "Tari Monong",
        region: "Kalimantan Barat",
        image: "monong.jpg",
        description: "Tari penyembuhan tradisional suku Dayak di Kalimantan Barat. Tarian ini berfungsi sebagai penolak bala serta sarana magis religius untuk mengusir penyakit dan kekuatan roh jahat yang mengganggu.",
        attire: "Pakaian adat dayak kalbar lengkap dengan rompi pelindung kain tebal, hiasan manik-manik khas, dan ikat kepala berhias bulu burung.",
        props: "Perisai kayu tradisional (Kenyau) dan mandau yang diselipkan di pinggang."
    },
    {
        id: 6,
        title: "Tari Jepen",
        region: "Kalimantan Utara",
        image: "jepen.jpg",
        description: "Tari tradisional yang berkembang di kawasan pesisir Kalimantan Utara dengan pengaruh budaya Melayu Islam yang kuat, menampilkan kelincahan gerak kaki mengikuti irama musik Tingkilan.",
        attire: "Busana pesisir bercorak tradisional Melayu, baju kurung, kain songket, serta penutup kepala khas.",
        props: "Selendang atau kipas yang dimainkan secara dinamis mengikuti tempo musik pengiring."
    }
];

const danceGrid = document.getElementById("danceGrid");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const workshopForm = document.getElementById("workshopForm");
const detailContainer = document.getElementById("detailContainer");
const reviewForm = document.getElementById("reviewForm");
const reviewsList = document.getElementById("reviewsList");

function displayDances(data) {
    if(!danceGrid) return;
    danceGrid.innerHTML = "";
    if(data.length === 0) {
        danceGrid.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Tarian tidak ditemukan.</p>";
        return;
    }
    data.forEach(dance => {
        const card = document.createElement("div");
        card.className = "dance-card";
        card.innerHTML = `
            <img src="${dance.image}" alt="${dance.title}" class="dance-img">
            <div class="dance-info">
                <span class="region-tag">${dance.region}</span>
                <h4>${dance.title}</h4>
                <p>${dance.description.substring(0, 100)}...</p>
            </div>
            <div style="padding: 0 1.5rem 1.5rem 1.5rem;">
                <a href="detail.html?id=${dance.id}" class="btn-detail">Lihat Detail Lengkap</a>
            </div>
        `;
        danceGrid.appendChild(card);
    });
}

function filterDances() {
    if(!searchInput || !regionFilter) return;
    const keyword = searchInput.value.toLowerCase();
    const region = regionFilter.value;

    const filtered = danceData.filter(dance => {
        const matchKeyword = dance.title.toLowerCase().includes(keyword) || dance.description.toLowerCase().includes(keyword) || dance.attire.toLowerCase().includes(keyword) || dance.props.toLowerCase().includes(keyword);
        const matchRegion = region === "all" || dance.region === region;
        return matchKeyword && matchRegion;
    });

    displayDances(filtered);
}

if(searchInput) searchInput.addEventListener("input", filterDances);
if(regionFilter) regionFilter.addEventListener("change", filterDances);

if(detailContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const danceId = parseInt(urlParams.get("id")) || 1;
    const currentDance = danceData.find(item => item.id === danceId) || danceData[0];

    detailContainer.innerHTML = `
        <img src="${currentDance.image}" alt="${currentDance.title}" class="detail-img">
        <span class="region-tag">${currentDance.region}</span>
        <h2>${currentDance.title}</h2>
        <p><strong>Deskripsi Lengkap:</strong> ${currentDance.description}</p>
        <p><strong>Busana / Pakaian Adat:</strong> ${currentDance.attire}</p>
        <p><strong>Properti Utama:</strong> ${currentDance.props}</p>
    `;

    const storageKey = `reviews_dance_${danceId}`;

    function loadReviews() {
        const savedReviews = JSON.parse(localStorage.getItem(storageKey)) || [];
        reviewsList.innerHTML = "";
        if(savedReviews.length === 0) {
            reviewsList.innerHTML = "<p>Belum ada ulasan untuk tarian ini. Jadilah yang pertama memberikan ulasan!</p>";
            return;
        }
        savedReviews.forEach((rev, index) => {
            const item = document.createElement("div");
            item.className = "review-item";
            item.innerHTML = `
                <div class="review-content">
                    <h4>${rev.name}</h4>
                    <p>${rev.comment}</p>
                </div>
                <button class="btn-delete" data-index="${index}">Hapus</button>
            `;
            reviewsList.appendChild(item);
        });

        document.querySelectorAll(".btn-delete").forEach(button => {
            button.addEventListener("click", (e) => {
                const indexToDelete = parseInt(e.target.getAttribute("data-index"));
                let savedReviews = JSON.parse(localStorage.getItem(storageKey)) || [];
                savedReviews.splice(indexToDelete, 1);
                localStorage.setItem(storageKey, JSON.stringify(savedReviews));
                loadReviews();
            });
        });
    }

    loadReviews();

    if(reviewForm) {
        reviewForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("reviewerName").value;
            const comment = document.getElementById("reviewerComment").value;

            const savedReviews = JSON.parse(localStorage.getItem(storageKey)) || [];
            savedReviews.push({ name, comment });
            localStorage.setItem(storageKey, JSON.stringify(savedReviews));

            reviewForm.reset();
            loadReviews();
        });
    }
}

if(workshopForm) {
    workshopForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nama = document.getElementById("nama").value;
        const pilihanTari = document.getElementById("pilihanTari").value;

        Swal.fire({
            title: 'Good job!',
            text: `Terima kasih ${nama}, pendaftaran workshop ${pilihanTari} berhasil dikirim!`,
            icon: 'success',
            confirmButtonText: 'OK'
        });

        workshopForm.reset();
    });
}

if(danceGrid) {
    displayDances(danceData);
}