import { describe, it, expect } from "vitest";
import { isValid, parse } from "../index.js";

describe("isValid", () => {
  it("should validate a valid public plate number", () => {
    expect(isValid("B 1234 ABC")).toBe(true);
  });

  it("should reject an invalid plate number", () => {
    expect(isValid("INVALID")).toBe(false);
  });

  it("should handle empty string", () => {
    expect(isValid("")).toBe(false);
  });

  it("should handle null input", () => {
    expect(isValid(null as any)).toBe(false);
  });

  it("should handle undefined input", () => {
    expect(isValid(undefined as any)).toBe(false);
  });
});

describe("parse", () => {
  describe("input normalization", () => {
    it("should handle lowercase input", () => {
      const result = parse("b 1234 abc");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Mobil Penumpang",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "1234",
        suffixCode: "ABC",
      });
    });

    it("should handle extra spaces", () => {
      const result = parse("B  1234  ABC");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Mobil Penumpang",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "1234",
        suffixCode: "ABC",
      });
    });

    it("should handle leading/trailing spaces", () => {
      const result = parse("  B 1234 ABC  ");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Mobil Penumpang",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "1234",
        suffixCode: "ABC",
      });
    });

    it("should handle input without spaces", () => {
      const result = parse("B1234abc");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Mobil Penumpang",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "1234",
        suffixCode: "ABC",
      });
    });
  });


  describe("public plates - Pasal 6: NRKB Format", () => {
    it("should parse valid public plate with 3 letter suffix (Pasal 6 ayat 1)", () => {
      const result = parse("B 1234 ABC");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Mobil Penumpang",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "1234",
        suffixCode: "ABC",
      });
    });

    it("should parse valid public plate with 1 letter suffix (Pasal 6 ayat 6b)", () => {
      const result = parse("B 1234 A");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Mobil Penumpang",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "1234",
        suffixCode: "A",
      });
    });

    it("should parse valid public plate with 2 letter suffix (Pasal 6 ayat 6c)", () => {
      const result = parse("B 1234 AB");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Mobil Penumpang",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "1234",
        suffixCode: "AB",
      });
    });

    it("should parse valid public plate without letter suffix (Pasal 6 ayat 6a - tanpa huruf)", () => {
      const result = parse("B 1234");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Mobil Penumpang",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "1234",
        suffixCode: null,
      });
    });

    it("should accept 1-4 digit registration numbers (Pasal 6 ayat 5)", () => {
      expect(isValid("B 1 ABC")).toBe(true);
      expect(isValid("B 12 ABC")).toBe(true);
      expect(isValid("B 123 ABC")).toBe(true);
      expect(isValid("B 1234 ABC")).toBe(true);
    });

    it("should reject registration numbers with more than 4 digits", () => {
      expect(isValid("B 12345 ABC")).toBe(false);
    });

    it("should reject registration numbers with 0 digits", () => {
      expect(isValid("B ABC")).toBe(false);
    });
  });

  describe("diplomatic plates - Pasal 10 ayat 6c, Pasal 19", () => {
    it("should parse CD format diplomatic plate (PNA - Perwakilan Negara Asing)", () => {
      const result = parse("CD 123 15");
      expect(result).toEqual({
        isValid: true,
        type: "diplomatik",
        vehicleType: null,
        country: "Amerika Serikat",
        province: null,
        region: null,
        prefixCode: "CD",
        code: "123",
        suffixCode: "15",
      });
    });

    it("should parse CC format consulate plate (Pasal 1 angka 35)", () => {
      const result = parse("CC 123 51");
      expect(result).toEqual({
        isValid: true,
        type: "konsulat",
        vehicleType: null,
        country: "Jepang",
        province: null,
        region: null,
        prefixCode: "CC",
        code: "123",
        suffixCode: "51",
      });
    });

    it("should parse CDH format honorary consul plate (Pasal 1 angka 36: Konsul Kehormatan)", () => {
      const result = parse("CDH 123 30");
      expect(result).toEqual({
        isValid: true,
        type: "konsul_kehormatan",
        vehicleType: null,
        country: "Tiongkok",
        province: null,
        region: null,
        prefixCode: "CDH",
        code: "123",
        suffixCode: "30",
      });
    });
  });

  describe("government plates - Pasal 4 ayat 1b, Pasal 45 ayat 1c (TNKB merah)", () => {
    it("should parse RI central government plate (Pasal 4 ayat 1b: instansi pemerintah)", () => {
      const result = parse("RI 1");
      expect(result).toEqual({
        isValid: true,
        type: "pejabat_pemerintah_pusat",
        vehicleType: "Presiden",
        country: "Indonesia",
        province: null,
        region: null,
        prefixCode: "RI",
        code: "1",
        suffixCode: null,
      });
    });

    it("should parse DPR parliament plate", () => {
      const result = parse("DPR 123");
      expect(result).toEqual({
        isValid: true,
        type: "pejabat_pemerintah_pusat",
        vehicleType: "Dewan Perwakilan Rakyat",
        country: "Indonesia",
        province: null,
        region: null,
        prefixCode: "DPR",
        code: "123",
        suffixCode: null,
      });
    });

    it("should parse provincial government plate (format: [REGION] [NUMBER] RI)", () => {
      const result = parse("B 123 RI");
      expect(result).toEqual({
        isValid: true,
        type: "pejabat_pemerintah_provinsi",
        vehicleType: "Pejabat Pemerintah Provinsi",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "123",
        suffixCode: "RI",
      });
    });
  });

  describe("military and police plates - Pasal 4 ayat 1b (instansi pemerintah)", () => {
    it("should parse TNI military plate (TNI/Polri - Pasal 9 ayat 2a)", () => {
      const result = parse("TNI 123");
      expect(result).toEqual({
        isValid: true,
        type: "pejabat_pemerintah_pusat",
        vehicleType: "Tentara Nasional Indonesia",
        country: "Indonesia",
        province: null,
        region: null,
        prefixCode: "TNI",
        code: "123",
        suffixCode: null,
      });
    });

    it("should parse POLRI police plate (Pasal 1 angka 2: Kepolisian Negara RI)", () => {
      const result = parse("POLRI 123");
      expect(result).toEqual({
        isValid: true,
        type: "pejabat_pemerintah_pusat",
        vehicleType: "Kepolisian Negara Republik Indonesia",
        country: "Indonesia",
        province: null,
        region: null,
        prefixCode: "POLRI",
        code: "123",
        suffixCode: null,
      });
    });
  });

  describe("temporary plates - Pasal 1 angka 12-13 (STCK dan TCKB)", () => {
    it("should parse temporary plate (Surat Tanda Coba Kendaraan Bermotor)", () => {
      const result = parse("T 123 ABC");
      expect(result).toEqual({
        isValid: true,
        type: "sementara",
        vehicleType: "Sementara",
        country: "Indonesia",
        province: null,
        region: "Temporary",
        prefixCode: "T",
        code: "123",
        suffixCode: "ABC",
      });
    });
  });

  describe("NRKB Pilihan - Pasal 7 (Nomor Registrasi Pilihan)", () => {
    it("should accept NRKB pilihan with chosen number (Pasal 7 ayat 2)", () => {
      // NRKB pilihan can have custom numbers
      expect(isValid("B 1 ABC")).toBe(true);
      expect(isValid("B 88 ABC")).toBe(true);
      expect(isValid("B 888 ABC")).toBe(true);
    });

    it("should accept NRKB pilihan without suffix (Pasal 7 ayat 2: tanpa seri huruf)", () => {
      expect(isValid("B 1")).toBe(true);
      expect(isValid("B 88")).toBe(true);
    });

    it("should accept NRKB pilihan with custom suffix (Pasal 7 ayat 2: pilihan seri huruf)", () => {
      expect(isValid("B 1 A")).toBe(true);
      expect(isValid("B 1 AB")).toBe(true);
      expect(isValid("B 1 ABC")).toBe(true);
    });
  });

  describe("vehicle ownership types - Pasal 4 ayat 1 (jenis kepemilikan)", () => {
    it("should validate plates for perorangan (personal) - Pasal 4 ayat 1a", () => {
      const result = parse("B 1234 ABC");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Mobil Penumpang",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "1234",
        suffixCode: "ABC",
      });
    });

    it("should validate plates for instansi pemerintah - Pasal 4 ayat 1b", () => {
      const result = parse("B 123 RI");
      expect(result).toEqual({
        isValid: true,
        type: "pejabat_pemerintah_provinsi",
        vehicleType: "Pejabat Pemerintah Provinsi",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "123",
        suffixCode: "RI",
      });
    });

    it("should validate plates for badan usaha - Pasal 4 ayat 1c", () => {
      // Badan usaha uses same format as personal (white TNKB)
      const result = parse("B 9999 XYZ");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Mobil Barang dan Kendaraan Khusus",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "9999",
        suffixCode: "XYZ",
      });
    });

    it("should validate plates for PNA - Pasal 4 ayat 1d", () => {
      const result = parse("CD 123 15");
      expect(result).toEqual({
        isValid: true,
        type: "diplomatik",
        vehicleType: null,
        country: "Amerika Serikat",
        province: null,
        region: null,
        prefixCode: "CD",
        code: "123",
        suffixCode: "15",
      });
    });

    it("should validate plates for Badan Internasional - Pasal 4 ayat 1e", () => {
      // International bodies may use similar format to diplomatic
      const result = parse("CD 456 12");
      expect(result).toEqual({
        isValid: true,
        type: "diplomatik",
        vehicleType: null,
        country: "Afrika Selatan",
        province: null,
        region: null,
        prefixCode: "CD",
        code: "456",
        suffixCode: "12",
      });
    });
  });

  describe("vehicle types based on number range - Registration Regulations", () => {
    it("should identify motorcycle based on number range (3000-6999 for Metro Jaya)", () => {
      const result = parse("B 3456 A");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Sepeda Motor",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "3456",
        suffixCode: "A",
      });
    });

    it("should identify car based on number range (8000-8999 for Metro Jaya = Mobil Penumpang)", () => {
      const result = parse("B 8456 AB");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Mobil Penumpang",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "8456",
        suffixCode: "AB",
      });
    });

    it("should identify bus based on number range (7000-7999 = Mobil Bus)", () => {
      const result = parse("B 7456 ABC");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Mobil Bus",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "7456",
        suffixCode: "ABC",
      });
    });
  });

  describe("error handling", () => {
    it("should return error for invalid format", () => {
      const result = parse("INVALID FORMAT");
      expect(result).toEqual({
        isValid: false,
        error: "Invalid plate number format",
      });
    });

    it("should return error for empty string", () => {
      const result = parse("");
      expect(result).toEqual({
        isValid: false,
        error: "Input must be a non-empty string",
      });
    });

    it("should handle non-string input", () => {
      const result = parse(123 as any);
      expect(result).toEqual({
        isValid: false,
        error: "Input must be a non-empty string",
      });
    });

    it("should return error for unknown region code", () => {
      const result = parse("ZZ 1234 ABC");
      expect(result).toEqual({
        isValid: false,
        error: "Unknown region code: ZZ",
      });
    });
  });


  describe("registrasi Ranmor baru - Pasal 9 (sumber perolehan)", () => {
    it("should validate plate from pembelian baru (new purchase) - Pasal 9 ayat 1a", () => {
      const result = parse("B 1234 XYZ");
      expect(result.isValid).toBe(true);
    });

    it("should validate plate from lelang (auction) - Pasal 9 ayat 1b", () => {
      // Plates from TNI/POLRI auction, customs auction, etc.
      const result = parse("B 5678 ABC");
      expect(result.isValid).toBe(true);
    });

    it("should validate plate from hibah (grant) - Pasal 9 ayat 1c", () => {
      const result = parse("B 9999 DEF");
      expect(result.isValid).toBe(true);
    });
  });

  describe("TNKB color classification - Pasal 45", () => {
    describe("white background (Pasal 45 ayat 1a - putih tulisan hitam)", () => {
      it("should classify personal vehicle plates", () => {
        const result = parse("B 1234 ABC");
        expect(result).toEqual({
          isValid: true,
          type: "publik",
          vehicleType: "Mobil Penumpang",
          country: "Indonesia",
          province: "DKI Jakarta",
          region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
          prefixCode: "B",
          code: "1234",
          suffixCode: "ABC",
        });
      });

      it("should classify legal entity (badan hukum) plates", () => {
        const result = parse("DK 5678 XY");
        expect(result).toEqual({
          isValid: true,
          type: "publik",
          vehicleType: "Sepeda Motor",
          country: "Indonesia",
          province: "Bali",
          region: "Bali",
          prefixCode: "DK",
          code: "5678",
          suffixCode: "XY",
        });
      });

      it("should classify PNA (diplomatic) plates", () => {
        const result = parse("CD 123 15");
        expect(result).toEqual({
          isValid: true,
          type: "diplomatik",
          vehicleType: null,
          country: "Amerika Serikat",
          province: null,
          region: null,
          prefixCode: "CD",
          code: "123",
          suffixCode: "15",
        });
      });
    });

    describe("red background (Pasal 45 ayat 1c - merah tulisan putih)", () => {
      it("should classify government institution plates", () => {
        const result = parse("B 123 RI");
        expect(result).toEqual({
          isValid: true,
          type: "pejabat_pemerintah_provinsi",
          vehicleType: "Pejabat Pemerintah Provinsi",
          country: "Indonesia",
          province: "DKI Jakarta",
          region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
          prefixCode: "B",
          code: "123",
          suffixCode: "RI",
        });
      });

      it("should classify central government plates", () => {
        const result = parse("RI 99");
        expect(result).toEqual({
          isValid: true,
          type: "pejabat_pemerintah_pusat",
          vehicleType: "Menteri & Pejabat Setingkat Menteri",
          country: "Indonesia",
          province: null,
          region: null,
          prefixCode: "RI",
          code: "99",
          suffixCode: null,
        });
      });
    });
  });

  describe("edge cases and validation rules", () => {
    it("should reject plate numbers with invalid characters", () => {
      expect(isValid("B 12@34 ABC")).toBe(false);
      expect(isValid("B 1234 AB@")).toBe(false);
    });

    it("should reject plate with numbers in suffix position", () => {
      expect(isValid("B 1234 12A")).toBe(false);
    });

    it("should reject malformed diplomatic plates", () => {
      expect(isValid("CD ABC 15")).toBe(false);
      expect(isValid("CD 123")).toBe(false);
    });

    it("should validate maximum registration number length (4 digits - Pasal 6 ayat 5)", () => {
      expect(isValid("B 9999 ABC")).toBe(true);
      expect(isValid("B 10000 ABC")).toBe(false);
    });

    it("should validate minimum registration number (at least 1 digit - Pasal 6 ayat 5)", () => {
      expect(isValid("B 0 ABC")).toBe(true);
      expect(isValid("B 1 ABC")).toBe(true);
    });
  });

  describe("regional codes - Pasal 6 ayat 3 (kode wilayah)", () => {
    it("should validate Jakarta region code (B)", () => {
      const result = parse("B 1234 ABC");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Mobil Penumpang",
        country: "Indonesia",
        province: "DKI Jakarta",
        region: "Jakarta, Bekasi, Depok, Tangerang, Tangerang Selatan",
        prefixCode: "B",
        code: "1234",
        suffixCode: "ABC",
      });
    });

    it("should validate Bali region code (DK)", () => {
      const result = parse("DK 5678 XY");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Sepeda Motor",
        country: "Indonesia",
        province: "Bali",
        region: "Bali",
        prefixCode: "DK",
        code: "5678",
        suffixCode: "XY",
      });
    });

    it("should validate two-letter region codes", () => {
      expect(isValid("AA 1234 ABC")).toBe(true);
      expect(isValid("AB 1234 ABC")).toBe(true);
    });

    it("should reject unknown region codes", () => {
      const result = parse("ZZ 1234 ABC");
      expect(result).toEqual({
        isValid: false,
        error: "Unknown region code: ZZ",
      });
    });
  });

  describe("types of registration - Pasal 2 ayat 2", () => {
    it("should support registrasi Ranmor baru (new registration) - Pasal 2 ayat 2a", () => {
      const result = parse("B 1234 NEW");
      expect(result.isValid).toBe(true);
    });

    it("should support registrasi perubahan identitas (identity change) - Pasal 2 ayat 2b", () => {
      // Same format but represents change in vehicle/owner identity
      const result = parse("B 5678 XYZ");
      expect(result.isValid).toBe(true);
    });

    it("should support registrasi perpanjangan (renewal) - Pasal 2 ayat 2c", () => {
      // Same NRKB for renewal
      const result = parse("B 9999 OLD");
      expect(result.isValid).toBe(true);
    });

    it("should support registrasi pengesahan (annual validation) - Pasal 2 ayat 2d", () => {
      const result = parse("B 1111 AAA");
      expect(result.isValid).toBe(true);
    });
  });

  describe("mutasi (transfer) scenarios - Pasal 13", () => {
    it("should validate plate for transfer within same region - Pasal 13 ayat 1b1", () => {
      const result = parse("B 1234 ABC");
      expect(result.isValid).toBe(true);
      if (result.isValid) {
        expect(result.province).toContain("Jakarta");
      }
    });

    it("should validate plate for transfer to different region - Pasal 13 ayat 1b2", () => {
      // Owner moves from Jakarta (B) to another area
      const result = parse("B 5678 XYZ");
      expect(result.isValid).toBe(true);
    });

    it("should validate plate format for ownership change - Pasal 13 ayat 2", () => {
      // Scenarios: jual beli, hibah, warisan, lelang, etc.
      const result = parse("L 9876 DEF");
      expect(result.isValid).toBe(true);
    });
  });

  describe("special vehicle categories from regulations", () => {
    it("should validate Ranmor CKD (domestically assembled) - Pasal 4 ayat 2", () => {
      const result = parse("B 1234 CKD");
      expect(result.isValid).toBe(true);
    });

    it("should validate Ranmor CBU (imported fully built) - Pasal 4 ayat 2", () => {
      const result = parse("B 5678 CBU");
      expect(result.isValid).toBe(true);
    });

    it("should validate angkutan umum (public transport) - implied yellow TNKB", () => {
      // Public transport uses yellow TNKB (Pasal 45 ayat 1b)
      const result = parse("B 1234 YLW");
      expect(result.isValid).toBe(true);
    });
  });

  describe("comprehensive format validation", () => {
    it("should validate all valid suffix lengths per Pasal 6 ayat 6", () => {
      // tanpa huruf (no letters)
      expect(isValid("B 1234")).toBe(true);
      // 1 huruf (1 letter)
      expect(isValid("B 1234 A")).toBe(true);
      // 2 huruf (2 letters)
      expect(isValid("B 1234 AB")).toBe(true);
      // 3 huruf (3 letters) - most common
      expect(isValid("B 1234 ABC")).toBe(true);
    });

    it("should validate format with kode wilayah + nomor urut + seri huruf (Pasal 6 ayat 2)", () => {
      const result = parse("DK 999 XYZ");
      expect(result).toEqual({
        isValid: true,
        type: "publik",
        vehicleType: "Mobil Penumpang",
        country: "Indonesia",
        province: "Bali",
        region: "Bali",
        prefixCode: "DK",
        code: "999",
        suffixCode: "XYZ",
      });
    });

    it("should reject suffix with more than 3 letters (unless specifically approved - Pasal 6 ayat 7)", () => {
      // Note: More than 2 letters requires approval from Kakorlantas (Pasal 6 ayat 7)
      // For standard validation, we only accept up to 3 letters
      expect(isValid("B 1234 ABCD")).toBe(false);
      expect(isValid("B 1234 ABCDE")).toBe(false);
    });
  });
});
