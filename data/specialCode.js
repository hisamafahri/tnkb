// Source:
// Peraturan Kepolisian Negara Republik Indonesia 
// Nomor 7 Tahun 2021 tentang Registrasi dan Identifikasi Kendaraan Bermotor

const specialCode = {
    12: "Amerika Serikat",
    13: "India",
    14: "Perancis",
    15: "Inggris",
    16: "Filipina",
    17: "Vatikan",
    18: "Australia",
    19: "Norwegia",
    20: "Irak",
    21: "Pakistan",
    22: "Belgia",
    23: "Myanmar",
    24: "Uni Emirat Arab",
    25: "China",
    26: "Swedia",
    27: "Saudi Arabia",
    28: "Thailand",
    29: "Mesir",
    30: "Italia",
    31: "Swiss",
    32: "Jerman",
    33: "Srilanka",
    34: "Denmark",
    35: "Kanada",
    36: "Brazil",
    37: "Rusia",
    38: "Afganistan",
    39: "Serbia",
    40: "Ceko",
    41: "Finlandia",
    42: "Meksiko",
    43: "Hungaria",
    44: "Polandia",
    45: "Iran",
    // There's no 46
    47: "Malaysia",
    48: "Turki",
    49: "Jepang",
    50: "Bulgaria",
    51: "Kamboja",
    52: "Argentina",
    53: "Rumania",
    54: "Yunani",
    55: "Yordania",
    56: "Austria",
    57: "Syria",
    58: "United Nations Development Programme (UNDP)",
    59: "Selandia Baru",
    60: "Belanda",
    61: "Yaman",
    62: "Universal Postal Union (UPU)",
    63: "Portugal",
    64: "Aljazair",
    65: "Korea Utara",
    66: "Vietnam",
    67: "Singapura",
    68: "Spanyol",
    69: "Bangladesh",
    70: "Panama",
    71: "United Nations International Children's Emergency Fund (UNICEF)",
    72: "United Nations Educational, Scientific and Cultural Organizationa (UNESCO)",
    73: "Food and Agriculture Organization (FAO)",
    74: "World Health Organization (WHO)",
    75: "Korea Selatan",
    76: "Asian Development Bank (ADB)",
    77: "International Bank for Reconstruction and Development (IBRD)/Bank Dunia",
    78: "International Monetary Fund (IMF)",
    79: "International Labour Organization (ILO)",
    80: "Papua Nugini",
    81: "Nigeria",
    82: "Chili",
    83: "United Nations High Commissioner for Refugees (UNHCR)",
    84: "World Food Programme (WFP)",
    85: "Venezuela",
    86: "Economic and Social Commission for Asia and the Pacific (ESCAP)",
    87: "Kolombia",
    88: "Brunei Darussalam",
    89: "United Nations Information Center (UNIC)",
    90: "International Finance Cooperation (IFC)",
    // There's no 91
    92: "Perutusan Tetap Republik Indonesia (PTRI) ASEAN",
    93: "Fiji",
    94: "Belarus",
    95: "Kazakhtan",
    96: "United Nations Industrial Development Organization (UNIDO)",
    97: "International Committee of the Red Cross (ICRC)",
    98: "Maroko",
    99: "Uni Eropa",
    100: "Association of the Southeast Asian Nations (ASEAN)",
    101: "Tunisia",
    102: "Kuait",
    103: "Laos",
    104: "Palestina",
    105: "Kuba",
    106: "ASEAN Inter-Parliamentary Assembly (AIPA)",
    107: "Libya",
    108: "Peru",
    109: "Slovakia",
    110: "Sudan",
    111: "ASEAN Foundation",
    112: "Utusan Sekjen PBB",
    113: "Center for International Forestry Research (CIFOR)",
    114: "Bosnia Herzegovina",
    115: "Lebanon",
    116: "Afrika Selatan",
    117: "Kroasia",
    118: "Ukraina",
    // There's no 119
    120: "Uzbekistan",
    121: "Qatar",
    122: "United Nations Population Fund (UNFPA)",
    123: "Mozambique",
    // There's no 124
    125: "Timor Leste",
    126: "Suriname",
    127: "Ekuador",
    128: "Zimbabwe",
    129: "Perwakilan International Organization for Migration (IOM)",
    130: "Azerbaijan",
    131: "Somalia",
    132: "Georgia",
    133: "Paraguay",
    134: "Oman",
    135: "Armenia",
    136: "Bahrain",
    137: "Mongolia",
    138: "San Marino",
    139: "Irlandia",
    140: "United Nations Office for REDD+ Coordination in Indonesia (UNORCID)",
    141: "Islamic Development Bank (IDB)",
    142: "Guinea Bissau",
    143: "Ethiopia",
    144: "Kepulauan Solomon",
    145: "International Fund for Agricultural Development (IFAD)"
}