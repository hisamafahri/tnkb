# TNKB

> **Bahasa Indonesia** (saat ini) | [English](README.md)

Library TypeScript/JavaScript untuk memvalidasi dan menguraikan nomor plat kendaraan bermotor Indonesia (TNKB - _Tanda Nomor Kendaraan Bermotor_).

## Fitur

- Validasi nomor plat kendaraan Indonesia
- Parsing dan ekstraksi informasi plat (wilayah, provinsi, jenis kendaraan, dll.)
- Deteksi jenis kendaraan
- Dukungan untuk berbagai jenis plat:
  - Kendaraan umum (plat putih)
  - Pejabat pemerintah (plat merah)
  - Kendaraan diplomatik & konsulat
  - Kendaraan militer & polisi
  - Plat sementara
- Berdasarkan regulasi resmi (Peraturan Polri No. 7 Tahun 2021)
- Deteksi jenis kendaraan akurat berdasarkan rentang nomor registrasi
- Ditulis dalam TypeScript dengan definisi tipe lengkap

## Instalasi

```bash
npm install tnkb
```

```bash
yarn add tnkb
```

```bash
pnpm add tnkb
```

## Penggunaan

### Validasi Dasar

```typescript
import { isValid } from 'tnkb';

console.log(isValid('B 1234 ABC'));  // true
console.log(isValid('B 1234ABC'));   // true (otomatis dinormalisasi)
console.log(isValid('INVALID'));     // false
```

### Parse Informasi Plat

```typescript
import { parse } from 'tnkb';

const result = parse('B 1234 ABC');
console.log(result);
// {
//   isValid: true,
//   type: 'publik',
//   vehicleType: 'Mobil Penumpang',
//   country: 'Indonesia',
//   province: 'DKI Jakarta',
//   region: 'Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan',
//   prefixCode: 'B',
//   code: '1234',
//   suffixCode: 'ABC'
// }
```

### Berbagai Jenis Plat

```typescript
// Kendaraan umum (sepeda motor - Metro Jaya)
parse('B 3456 A');
// { vehicleType: 'Sepeda Motor', ... }

// Pejabat pemerintah
parse('RI 1');
// { type: 'pejabat_pemerintah_pusat', vehicleType: 'Presiden', ... }

// Kendaraan diplomatik
parse('CD 123 15');
// { type: 'diplomatik', country: 'Amerika Serikat', ... }

// Pemerintah provinsi
parse('B 123 RI');
// { type: 'pejabat_pemerintah_provinsi', ... }
```

## Referensi API

### `isValid(value: string): boolean`

Memvalidasi apakah sebuah string merupakan nomor plat kendaraan Indonesia yang valid.

**Parameter:**
- `value`: String nomor plat yang akan divalidasi

**Mengembalikan:** `true` jika valid, `false` jika tidak

### `parse(value: string): ParseResult`

Mengurai dan memvalidasi nomor plat kendaraan Indonesia, mengembalikan informasi detail.

**Parameter:**
- `value`: String nomor plat yang akan diurai

**Mengembalikan:** Objek `ParseResult` dengan status validasi dan data yang diurai

#### Tipe ParseResult

```typescript
type ParseResult = {
  isValid: boolean;
  type?: PlateType;
  vehicleType?: string | null;
  country?: string;
  province?: string | null;
  region?: string | null;
  prefixCode?: string;
  code?: string;
  suffixCode?: string | null;
  error?: string;
}

type PlateType = 
  | "publik"
  | "diplomatik"
  | "konsulat"
  | "konsul_kehormatan"
  | "pejabat_pemerintah_pusat"
  | "pejabat_pemerintah_provinsi"
  | "pejabat_pemerintah_kabupaten_kota"
  | "sementara";
```

## Regulasi

(_Terakhir diperbarui: 29 Jan 2026_)

Paket ini memvalidasi dan menguraikan nomor plat berdasarkan:

- [Wikipedia: Tanda Nomor Kendaraan Bermotor Indonesia](https://id.wikipedia.org/wiki/Tanda_Nomor_Kendaraan_Bermotor_Indonesia)
- [Peraturan Kepolisian Negara Republik Indonesia Nomor 7 Tahun 2021 tentang Registrasi dan Identifikasi Kendaraan Bermotor](https://korlantas.polri.go.id/wp-content/uploads/2021/05/PERATURAN-POLRI-NOMOR-7-TAHUN-2021-TENTANG-REGISTRASI-DAN-IDENTIFIKASI-KENDARAAN-BERMOTOR.pdf)

## Kontribusi

Kontribusi sangat diterima! Silakan kirim Pull Request.

## Penulis

[Hisam Fahri](https://hisam.dev): [@hisamafahri](https://github.com/hisamafahri)

## Lisensi

[MIT](LICENSE)
