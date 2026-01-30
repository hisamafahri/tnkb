import { ParseResult, PlateType } from "./types.js";
import { regionCodes, diplomaticCountryCodes } from "./data.js";

/**
 * Validates if a given string is a valid Indonesian vehicle plate number
 * @param value - The plate number string to validate
 * @returns true if valid, false otherwise
 */
export function isValid(value: string): boolean {
  const result = parse(value);
  return result.isValid;
}

/**
 * Parses and validates an Indonesian vehicle plate number
 * @param value - The plate number string to parse
 * @returns ParseResult with validation status and parsed data
 */
export function parse(value: string): ParseResult {
  if (!value || typeof value !== "string") {
    return {
      isValid: false,
      error: "Input must be a non-empty string",
    };
  }

  // Normalize input: remove extra spaces and convert to uppercase
  let normalized = value.trim().toUpperCase().replace(/\s+/g, " ");

  // Handle input without spaces (e.g., "B1234ABC" -> "B 1234 ABC")
  // Insert space after region code (1-2 letters at start)
  // Insert space before suffix (1-3 letters at end)
  if (!normalized.includes(" ")) {
    // Match pattern: [LETTERS][NUMBERS][LETTERS?]
    const noSpaceMatch = normalized.match(/^([A-Z]{1,3})(\d+)([A-Z]*)$/);
    if (noSpaceMatch) {
      const regionPart = noSpaceMatch[1];
      const numberPart = noSpaceMatch[2];
      const suffixPart = noSpaceMatch[3];

      if (suffixPart) {
        normalized = `${regionPart} ${numberPart} ${suffixPart}`;
      } else {
        normalized = `${regionPart} ${numberPart}`;
      }
    }
  }

  // Check for diplomatic plates (CD format)
  const diplomaticMatch = normalized.match(/^CD\s+(\d{1,4})\s+(\d{2})$/);
  if (diplomaticMatch) {
    const vehicleNumber = diplomaticMatch[1];
    const countryCode = diplomaticMatch[2];

    if (!diplomaticCountryCodes[countryCode]) {
      return {
        isValid: false,
        error: `Unknown diplomatic country code: ${countryCode}`,
      };
    }

    return {
      isValid: true,
      type: "diplomatik",
      vehicleType: null,
      country: diplomaticCountryCodes[countryCode],
      province: null,
      region: null,
      prefixCode: "CD",
      code: vehicleNumber,
      suffixCode: countryCode,
    };
  }

  // Check for consulate plates (CC format)
  const consulateMatch = normalized.match(/^CC\s+(\d{1,4})\s+(\d{2})$/);
  if (consulateMatch) {
    const vehicleNumber = consulateMatch[1];
    const countryCode = consulateMatch[2];

    if (!diplomaticCountryCodes[countryCode]) {
      return {
        isValid: false,
        error: `Unknown consulate country code: ${countryCode}`,
      };
    }

    return {
      isValid: true,
      type: "konsulat",
      vehicleType: null,
      country: diplomaticCountryCodes[countryCode],
      province: null,
      region: null,
      prefixCode: "CC",
      code: vehicleNumber,
      suffixCode: countryCode,
    };
  }

  // Check for honorary consul plates (CDH format)
  const honoraryConsulMatch = normalized.match(/^CDH\s+(\d{1,4})\s+(\d{2})$/);
  if (honoraryConsulMatch) {
    const vehicleNumber = honoraryConsulMatch[1];
    const countryCode = honoraryConsulMatch[2];

    if (!diplomaticCountryCodes[countryCode]) {
      return {
        isValid: false,
        error: `Unknown honorary consul country code: ${countryCode}`,
      };
    }

    return {
      isValid: true,
      type: "konsul_kehormatan",
      vehicleType: null,
      country: diplomaticCountryCodes[countryCode],
      province: null,
      region: null,
      prefixCode: "CDH",
      code: vehicleNumber,
      suffixCode: countryCode,
    };
  }

  // Check for diplomatic staff operational plates (format: 12345 12)
  const diplomaticStaffMatch = normalized.match(/^(\d{5})\s+(\d{2})$/);
  if (diplomaticStaffMatch) {
    const vehicleNumber = diplomaticStaffMatch[1];
    const countryCode = diplomaticStaffMatch[2];

    if (!diplomaticCountryCodes[countryCode]) {
      return {
        isValid: false,
        error: `Unknown diplomatic staff country code: ${countryCode}`,
      };
    }

    return {
      isValid: true,
      type: "diplomatik",
      vehicleType: "Operasional Staff Diplomatik",
      country: diplomaticCountryCodes[countryCode],
      province: null,
      region: null,
      prefixCode: "",
      code: vehicleNumber,
      suffixCode: countryCode,
    };
  }

  // Check for central government official plates (RI prefix)
  const centralGovMatch = normalized.match(/^RI\s+(\d{1,4})$/);
  if (centralGovMatch) {
    const vehicleNumber = centralGovMatch[1];

    // Determine type based on number range
    let vehicleType: string | null = null;
    const num = parseInt(vehicleNumber);

    if (num === 1) {
      vehicleType = "Presiden";
    } else if (num === 2) {
      vehicleType = "Wakil Presiden";
    } else if (num >= 3 && num <= 99) {
      vehicleType = "Menteri & Pejabat Setingkat Menteri";
    } else {
      vehicleType = "Pejabat Pemerintah Pusat Lainnya";
    }

    return {
      isValid: true,
      type: "pejabat_pemerintah_pusat",
      vehicleType,
      country: "Indonesia",
      province: null,
      region: null,
      prefixCode: "RI",
      code: vehicleNumber,
      suffixCode: null,
    };
  }

  // Check for DPR (Parliament) plates
  const dprMatch = normalized.match(/^(DPR|MPR|DPD)\s+(\d{1,4})$/);
  if (dprMatch) {
    const institution = dprMatch[1];
    const vehicleNumber = dprMatch[2];

    let vehicleType: string | null = null;
    if (institution === "DPR") {
      vehicleType = "Dewan Perwakilan Rakyat";
    } else if (institution === "MPR") {
      vehicleType = "Majelis Permusyawaratan Rakyat";
    } else if (institution === "DPD") {
      vehicleType = "Dewan Perwakilan Daerah";
    }

    return {
      isValid: true,
      type: "pejabat_pemerintah_pusat",
      vehicleType,
      country: "Indonesia",
      province: null,
      region: null,
      prefixCode: institution,
      code: vehicleNumber,
      suffixCode: null,
    };
  }

  // Check for military plates (TNI, AD, AL, AU, KM format)
  const militaryMatch = normalized.match(
    /^(TNI|AD|AL|AU|KM)\s+(\d{1,4})\s*([A-Z]{0,2})$/,
  );
  if (militaryMatch) {
    const branch = militaryMatch[1];
    const vehicleNumber = militaryMatch[2];
    const suffix = militaryMatch[3] || null;

    let vehicleType: string | null = null;
    if (branch === "TNI") {
      vehicleType = "Tentara Nasional Indonesia";
    } else if (branch === "AD") {
      vehicleType = "TNI Angkatan Darat";
    } else if (branch === "AL") {
      vehicleType = "TNI Angkatan Laut";
    } else if (branch === "AU") {
      vehicleType = "TNI Angkatan Udara";
    } else if (branch === "KM") {
      vehicleType = "Kementerian Pertahanan";
    }

    return {
      isValid: true,
      type: "pejabat_pemerintah_pusat",
      vehicleType,
      country: "Indonesia",
      province: null,
      region: null,
      prefixCode: branch,
      code: vehicleNumber,
      suffixCode: suffix,
    };
  }

  // Check for police plates (POLRI format)
  const policeMatch = normalized.match(
    /^(POLRI|NOPOL)\s+(\d{1,4})\s*([A-Z]{0,2})$/,
  );
  if (policeMatch) {
    const prefix = policeMatch[1];
    const vehicleNumber = policeMatch[2];
    const suffix = policeMatch[3] || null;

    return {
      isValid: true,
      type: "pejabat_pemerintah_pusat",
      vehicleType: "Kepolisian Negara Republik Indonesia",
      country: "Indonesia",
      province: null,
      region: null,
      prefixCode: prefix,
      code: vehicleNumber,
      suffixCode: suffix,
    };
  }

  // Check for province government plates (format: RI-1, RI-2, etc. with province code)
  const provinceGovMatch = normalized.match(/^([A-Z]{1,2})\s+(\d{1,4})\s+RI$/);
  if (provinceGovMatch) {
    const regionCode = provinceGovMatch[1];
    const vehicleNumber = provinceGovMatch[2];

    const region = regionCodes.find((r) => r.code === regionCode);
    if (!region) {
      return {
        isValid: false,
        error: `Unknown region code: ${regionCode}`,
      };
    }

    return {
      isValid: true,
      type: "pejabat_pemerintah_provinsi",
      vehicleType: "Pejabat Pemerintah Provinsi",
      country: "Indonesia",
      province: region.province,
      region: region.region,
      prefixCode: regionCode,
      code: vehicleNumber,
      suffixCode: "RI",
    };
  }

  // Check for temporary plates (T format)
  const temporaryMatch = normalized.match(/^T\s+(\d{1,4})\s+([A-Z]{1,3})$/);
  if (temporaryMatch) {
    const vehicleNumber = temporaryMatch[1];
    const regionSuffix = temporaryMatch[2];

    return {
      isValid: true,
      type: "sementara",
      vehicleType: "Sementara",
      country: "Indonesia",
      province: null,
      region: "Temporary",
      prefixCode: "T",
      code: vehicleNumber,
      suffixCode: regionSuffix,
    };
  }

  // Check for DKI Jakarta province government plates (format: B [1-150] DKI)
  const dkiGovMatch = normalized.match(/^([A-Z]{1,2})\s+(\d{1,3})\s+DKI$/);
  if (dkiGovMatch) {
    const regionCode = dkiGovMatch[1];
    const vehicleNumber = dkiGovMatch[2];
    const num = parseInt(vehicleNumber);

    const region = regionCodes.find((r) => r.code === regionCode);
    if (!region) {
      return {
        isValid: false,
        error: `Unknown region code: ${regionCode}`,
      };
    }

    // Validate it's actually a DKI Jakarta region code
    if (region.province !== "DKI Jakarta") {
      return {
        isValid: false,
        error: "DKI suffix can only be used with DKI Jakarta region codes",
      };
    }

    // Validate number range
    if (num < 1 || num > 150) {
      return {
        isValid: false,
        error: "DKI government plate numbers must be between 1 and 150",
      };
    }

    // Determine vehicle type based on number
    let vehicleType: string | null = null;
    if (num === 1) {
      vehicleType = "Gubernur";
    } else if (num === 2) {
      vehicleType = "Wakil Gubernur";
    } else if (num === 3) {
      vehicleType = "Ketua DPRD Provinsi";
    } else if (num >= 4 && num <= 150) {
      vehicleType = "Pejabat Pemerintah Provinsi Lainnya";
    }

    return {
      isValid: true,
      type: "pejabat_pemerintah_provinsi",
      vehicleType,
      country: "Indonesia",
      province: region.province,
      region: region.region,
      prefixCode: regionCode,
      code: vehicleNumber,
      suffixCode: "DKI",
    };
  }

  // Check for regency/city government plates (format: [CODE] [1-30] [SUFFIX])
  // This needs to be checked before standard public plates
  const regencyCityGovMatch = normalized.match(
    /^([A-Z]{1,2})\s+(\d{1,2})\s+([A-Z]{1,3})$/,
  );
  if (regencyCityGovMatch) {
    const regionCode = regencyCityGovMatch[1];
    const vehicleNumber = regencyCityGovMatch[2];
    const suffix = regencyCityGovMatch[3];
    const num = parseInt(vehicleNumber);

    // Only process if number is between 1-30 (government official range)
    if (num >= 1 && num <= 30) {
      const region = regionCodes.find((r) => r.code === regionCode);
      if (!region) {
        return {
          isValid: false,
          error: `Unknown region code: ${regionCode}`,
        };
      }

      // Determine vehicle type based on number
      let vehicleType: string | null = null;
      if (num === 1) {
        vehicleType = "Bupati/Walikota";
      } else if (num === 2) {
        vehicleType = "Wakil Bupati/Wakil Walikota";
      } else if (num === 3) {
        vehicleType = "Ketua DPRD Kabupaten/Kota";
      } else if (num >= 4 && num <= 30) {
        vehicleType = "Pejabat Pemerintah Kabupaten/Kota Lainnya";
      }

      return {
        isValid: true,
        type: "pejabat_pemerintah_kabupaten_kota",
        vehicleType,
        country: "Indonesia",
        province: region.province,
        region: region.region,
        prefixCode: regionCode,
        code: vehicleNumber,
        suffixCode: suffix,
      };
    }
  }

  // Standard public plate format: [REGION] [NUMBER] [SUFFIX]
  // Examples: B 1234 ABC, L 5678 XY, DK 9999 AB
  // Also supports format without suffix (Pasal 6 ayat 6a): B 1234
  const publicMatch = normalized.match(
    /^([A-Z]{1,2})\s+(\d{1,4})(?:\s+([A-Z]{1,3}))?$/,
  );
  if (publicMatch) {
    const regionCode = publicMatch[1];
    const vehicleNumber = publicMatch[2];
    const suffix = publicMatch[3] || null;

    const region = regionCodes.find((r) => r.code === regionCode);
    if (!region) {
      return {
        isValid: false,
        error: `Unknown region code: ${regionCode}`,
      };
    }

    // Determine vehicle type based on number range (registration regulation)
    let vehicleType: string | null = null;
    const num = parseInt(vehicleNumber);

    // Check if this is Polda Metro Jaya (DKI Jakarta - code "B")
    if (regionCode === "B") {
      // Special allocation for Polda Metro Jaya
      if (num >= 1 && num <= 2999) {
        vehicleType = "Mobil Penumpang";
      } else if (num >= 3000 && num <= 6999) {
        vehicleType = "Sepeda Motor";
      } else if (num >= 7000 && num <= 7999) {
        vehicleType = "Mobil Bus";
      } else if (num >= 8000 && num <= 8999) {
        vehicleType = "Mobil Penumpang";
      } else if (num >= 9000 && num <= 9999) {
        vehicleType = "Mobil Barang dan Kendaraan Khusus";
      }
    } else {
      // General allocation for other regions
      if (num >= 1 && num <= 1999) {
        vehicleType = "Mobil Penumpang";
      } else if (num >= 2000 && num <= 6999) {
        vehicleType = "Sepeda Motor";
      } else if (num >= 7000 && num <= 7999) {
        vehicleType = "Mobil Bus";
      } else if (num >= 8000 && num <= 8999) {
        vehicleType = "Mobil Barang";
      } else if (num >= 9000 && num <= 9999) {
        vehicleType = "Kendaraan Khusus";
      }
    }

    return {
      isValid: true,
      type: "publik",
      vehicleType,
      country: "Indonesia",
      province: region.province,
      region: region.region,
      prefixCode: regionCode,
      code: vehicleNumber,
      suffixCode: suffix,
    };
  }

  return {
    isValid: false,
    error: "Invalid plate number format",
  };
}

// Export types for consumers
export * from "./types.js";
