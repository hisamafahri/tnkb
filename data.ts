import { RegionCode } from "./types.js";

// Based on https://id.wikipedia.org/wiki/Tanda_Nomor_Kendaraan_Bermotor_Indonesia
export const regionCodes: RegionCode[] = [
  // Aceh
  { code: "BL", province: "Aceh", region: "Aceh" },

  // Sumatera Utara
  { code: "BK", province: "Sumatera Utara", region: "Medan" },
  { code: "BB", province: "Sumatera Utara", region: "Tapanuli" },

  // Sumatera Barat
  { code: "BA", province: "Sumatera Barat", region: "Padang" },

  // Riau
  { code: "BM", province: "Riau", region: "Pekanbaru" },

  // Kepulauan Riau
  { code: "BP", province: "Kepulauan Riau", region: "Batam, Tanjung Pinang" },

  // Jambi
  { code: "BH", province: "Jambi", region: "Jambi" },

  // Sumatera Selatan
  { code: "BG", province: "Sumatera Selatan", region: "Palembang" },

  // Bengkulu
  { code: "BD", province: "Bengkulu", region: "Bengkulu" },

  // Lampung
  { code: "BE", province: "Lampung", region: "Bandar Lampung" },

  // Kepulauan Bangka Belitung
  {
    code: "BN",
    province: "Kepulauan Bangka Belitung",
    region: "Pangkal Pinang",
  },

  // DKI Jakarta
  {
    code: "B",
    province: "DKI Jakarta",
    region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
  },

  // Jawa Barat
  { code: "D", province: "Jawa Barat", region: "Bandung" },
  { code: "F", province: "Jawa Barat", region: "Bogor" },
  { code: "E", province: "Jawa Barat", region: "Cirebon" },
  { code: "Z", province: "Jawa Barat", region: "Garut" },
  { code: "T", province: "Jawa Barat", region: "Purwakarta, Subang, Karawang" },

  // Banten
  { code: "A", province: "Banten", region: "Banten" },

  // Jawa Tengah
  { code: "K", province: "Jawa Tengah", region: "Pati" },
  { code: "R", province: "Jawa Tengah", region: "Banyumas" },
  { code: "G", province: "Jawa Tengah", region: "Brebes, Pemalang, Tegal" },
  { code: "H", province: "Jawa Tengah", region: "Semarang" },
  {
    code: "AA",
    province: "Jawa Tengah",
    region: "Magelang, Temanggung, Wonosobo",
  },
  { code: "AD", province: "Jawa Tengah", region: "Solo" },

  // DI Yogyakarta
  { code: "AB", province: "DI Yogyakarta", region: "Yogyakarta" },

  // Jawa Timur
  { code: "L", province: "Jawa Timur", region: "Surabaya" },
  { code: "N", province: "Jawa Timur", region: "Malang" },
  { code: "M", province: "Jawa Timur", region: "Madura" },
  { code: "S", province: "Jawa Timur", region: "Bojonegoro, Tuban" },
  { code: "W", province: "Jawa Timur", region: "Gresik, Sidoarjo" },
  {
    code: "P",
    province: "Jawa Timur",
    region: "Jember, Banyuwangi, Bondowoso",
  },
  { code: "AG", province: "Jawa Timur", region: "Kediri" },
  { code: "AE", province: "Jawa Timur", region: "Madiun" },

  // Bali
  { code: "DK", province: "Bali", region: "Bali" },

  // Nusa Tenggara Barat
  { code: "DR", province: "Nusa Tenggara Barat", region: "Lombok" },
  { code: "EA", province: "Nusa Tenggara Barat", region: "Sumbawa" },

  // Nusa Tenggara Timur
  { code: "DH", province: "Nusa Tenggara Timur", region: "Kupang" },
  { code: "EB", province: "Nusa Tenggara Timur", region: "Flores" },

  // Kalimantan Barat
  { code: "KB", province: "Kalimantan Barat", region: "Pontianak" },

  // Kalimantan Tengah
  { code: "KH", province: "Kalimantan Tengah", region: "Palangkaraya" },

  // Kalimantan Selatan
  { code: "DA", province: "Kalimantan Selatan", region: "Banjarmasin" },

  // Kalimantan Timur
  { code: "KT", province: "Kalimantan Timur", region: "Samarinda" },

  // Kalimantan Utara
  { code: "KU", province: "Kalimantan Utara", region: "Tanjung Selor" },

  // Sulawesi Utara
  { code: "DB", province: "Sulawesi Utara", region: "Manado" },

  // Sulawesi Tengah
  { code: "DN", province: "Sulawesi Tengah", region: "Palu" },

  // Sulawesi Selatan
  { code: "DD", province: "Sulawesi Selatan", region: "Makassar" },
  {
    code: "DP",
    province: "Sulawesi Selatan",
    region: "Sulawesi Selatan bagian selatan",
  },
  {
    code: "DW",
    province: "Sulawesi Selatan",
    region: "Sulawesi Selatan bagian utara",
  },

  // Sulawesi Tenggara
  { code: "DT", province: "Sulawesi Tenggara", region: "Kendari" },

  // Gorontalo
  { code: "DM", province: "Gorontalo", region: "Gorontalo" },

  // Sulawesi Barat
  { code: "DC", province: "Sulawesi Barat", region: "Mamuju" },

  // Maluku
  { code: "DE", province: "Maluku", region: "Ambon" },

  // Maluku Utara
  { code: "DG", province: "Maluku Utara", region: "Ternate" },

  // Papua
  { code: "PA", province: "Papua", region: "Jayapura" },

  // Papua Barat
  { code: "PB", province: "Papua Barat", region: "Manokwari" },

  // Papua Selatan
  { code: "PS", province: "Papua Selatan", region: "Merauke" },

  // Papua Tengah
  { code: "PT", province: "Papua Tengah", region: "Nabire" },

  // Papua Pegunungan
  { code: "PP", province: "Papua Pegunungan", region: "Jayawijaya" },

  // Papua Barat Daya
  { code: "PD", province: "Papua Barat Daya", region: "Sorong" },
];

// Diplomatic country codes (based on CD plates format)
export const diplomaticCountryCodes: Record<string, string> = {
  "11": "Afghanistan",
  "12": "Afrika Selatan",
  "13": "Albania",
  "14": "Aljazair",
  "15": "Amerika Serikat",
  "16": "Arab Saudi",
  "17": "Argentina",
  "18": "Australia",
  "19": "Austria",
  "20": "Bahrain",
  "21": "Bangladesh",
  "22": "Belanda",
  "23": "Belgia",
  "24": "Brasil",
  "25": "Brunei Darussalam",
  "26": "Bulgaria",
  "27": "Myanmar",
  "28": "Kanada",
  "29": "Chili",
  "30": "Tiongkok",
  "31": "Kolombia",
  "32": "Kuba",
  "33": "Denmark",
  "34": "Mesir",
  "35": "Ekuador",
  "36": "Filipina",
  "37": "Finlandia",
  "38": "Prancis",
  "39": "Ghana",
  "40": "Yunani",
  "41": "Guatemala",
  "42": "Hongaria",
  "43": "India",
  "44": "Irak",
  "45": "Iran",
  "46": "Irlandia",
  "47": "Islandia",
  "48": "Israel",
  "49": "Italia",
  "50": "Jamaika",
  "51": "Jepang",
  "52": "Jerman",
  "53": "Yordania",
  "54": "Kamboja",
  "55": "Kenya",
  "56": "Korea Selatan",
  "57": "Korea Utara",
  "58": "Kuwait",
  "59": "Laos",
  "60": "Lebanon",
  "61": "Libya",
  "62": "Luxembourg",
  "63": "Malaysia",
  "64": "Maroko",
  "65": "Meksiko",
  "66": "Nepal",
  "67": "Nigeria",
  "68": "Norwegia",
  "69": "Selandia Baru",
  "70": "Pakistan",
  "71": "Panama",
  "72": "Papua Nugini",
  "73": "Peru",
  "74": "Polandia",
  "75": "Portugal",
  "76": "Rumania",
  "77": "Rusia",
  "78": "Singapura",
  "79": "Spanyol",
  "80": "Sri Lanka",
  "81": "Sudan",
  "82": "Suriah",
  "83": "Swedia",
  "84": "Swiss",
  "85": "Tanzania",
  "86": "Thailand",
  "87": "Tunisia",
  "88": "Turki",
  "89": "Uganda",
  "90": "Uni Emirat Arab",
  "91": "Uruguay",
  "92": "Vatikan",
  "93": "Venezuela",
  "94": "Vietnam",
  "95": "Yaman",
  "96": "Yugoslavia",
  "97": "Zambia",
  "98": "Zimbabwe",
};
