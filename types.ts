export type PlateType =
  | "publik"
  | "diplomatik"
  | "konsulat"
  | "konsul_kehormatan"
  | "pejabat_pemerintah_pusat"
  | "pejabat_pemerintah_provinsi"
  | "pejabat_pemerintah_kabupaten_kota"
  | "sementara";

export interface ParseResultValid {
  isValid: true;
  type: PlateType;
  vehicleType: string | null;

  country: string;
  province: string | null;
  region: string | null;

  prefixCode: string;
  code: string;
  suffixCode: string | null;
}

export interface ParseResultInvalid {
  isValid: false;
  error: string;
}

export type ParseResult = ParseResultValid | ParseResultInvalid;

export interface RegionCode {
  code: string;
  province: string;
  region: string;
}
