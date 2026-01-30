# TNKB

> **English** (current) | [Bahasa Indonesia](README-id.md)

A TypeScript/JavaScript library to validate and parse Indonesian vehicle license plate numbers (TNKB - _Tanda Nomor Kendaraan Bermotor_).

## Features

- Validate Indonesian vehicle plate numbers
- Parse and extract plate information (region, province, vehicle type, etc.)
- Vehicle type detection
- Support for various plate types:
  - Public vehicles (white plates)
  - Government officials (red plates)
  - Diplomatic & consular vehicles
  - Military & police vehicles
  - Temporary plates
- Based on official regulations (Peraturan Polri No. 7 Tahun 2021)
- Accurate vehicle type detection based on registration number ranges
- Written in TypeScript with full type definitions

## Installation

```bash
npm install tnkb
```

```bash
yarn add tnkb
```

```bash
pnpm add tnkb
```

## Usage

### Basic Validation

```typescript
import { isValid } from 'tnkb';

console.log(isValid('B 1234 ABC'));  // true
console.log(isValid('B 1234ABC'));   // true (auto-normalized)
console.log(isValid('INVALID'));     // false
```

### Parse Plate Information

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

### Different Plate Types

```typescript
// Public vehicle (motorcycle - Metro Jaya)
parse('B 3456 A');
// { vehicleType: 'Sepeda Motor', ... }

// Government official
parse('RI 1');
// { type: 'pejabat_pemerintah_pusat', vehicleType: 'Presiden', ... }

// Diplomatic vehicle
parse('CD 123 15');
// { type: 'diplomatik', country: 'Amerika Serikat', ... }

// Provincial government
parse('B 123 RI');
// { type: 'pejabat_pemerintah_provinsi', ... }
```

## API Reference

### `isValid(value: string): boolean`

Validates if a string is a valid Indonesian vehicle plate number.

**Parameters:**
- `value`: The plate number string to validate

**Returns:** `true` if valid, `false` otherwise

### `parse(value: string): ParseResult`

Parses and validates an Indonesian vehicle plate number, returning detailed information.

**Parameters:**
- `value`: The plate number string to parse

**Returns:** `ParseResult` object with validation status and parsed data

#### ParseResult Type

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

## Regulations

(_Last updated: 29 Jan 2026_)

This package validates and decodes plate numbers based on:

- [Wikipedia: Tanda Nomor Kendaraan Bermotor Indonesia](https://id.wikipedia.org/wiki/Tanda_Nomor_Kendaraan_Bermotor_Indonesia)
- [Peraturan Kepolisian Negara Republik Indonesia Nomor 7 Tahun 2021 tentang Registrasi dan Identifikasi Kendaraan Bermotor](https://korlantas.polri.go.id/wp-content/uploads/2021/05/PERATURAN-POLRI-NOMOR-7-TAHUN-2021-TENTANG-REGISTRASI-DAN-IDENTIFIKASI-KENDARAAN-BERMOTOR.pdf)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

[Hisam Fahri](https://hisam.dev): [@hisamafahri](https://github.com/hisamafahri)

## License

[MIT](LICENSE)
