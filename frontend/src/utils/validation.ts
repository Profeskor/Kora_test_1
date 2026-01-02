import { IndividualFormData, CompanyFormData } from "../types/registration";

// Email validation regex
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// IBAN validation (basic - UAE format: AE + 21 digits)
export const ibanRegex = /^AE\d{21}$/i;

// TRN validation (UAE Tax Registration Number format)
export const trnRegex = /^\d{15}$/;

export function validateEmail(email: string): string | null {
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  return null;
}

export function validatePasswordMatch(
  password: string,
  confirmPassword: string
): string | null {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone) return "Mobile number is required";
  // UAE phone format: +971 XX XXX XXXX (total 13 characters with +971)
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 9 || cleaned.length > 12) {
    return "Please enter a valid UAE mobile number";
  }
  return null;
}

export function validateRequired(
  value: string,
  fieldName: string
): string | null {
  if (!value || value.trim() === "") {
    return `${fieldName} is required`;
  }
  return null;
}

export function validateDate(
  date: Date | null,
  fieldName: string
): string | null {
  if (!date) return `${fieldName} is required`;
  return null;
}

export function validateFutureDate(
  date: Date | null,
  fieldName: string
): string | null {
  if (!date) return `${fieldName} is required`;
  if (date <= new Date()) {
    return `${fieldName} must be a future date`;
  }
  return null;
}

export function validateIBAN(iban: string): string | null {
  if (!iban) return "IBAN is required";
  const cleaned = iban.replace(/\s/g, "");
  if (!ibanRegex.test(cleaned)) {
    return "Please enter a valid UAE IBAN (AE followed by 21 digits)";
  }
  return null;
}

export function validateTRN(trn: string): string | null {
  if (!trn) return "TRN is required";
  if (!trnRegex.test(trn)) {
    return "Please enter a valid TRN (15 digits)";
  }
  return null;
}

export function validateFile(
  file: any | null,
  fieldName: string
): string | null {
  if (!file) return `${fieldName} is required`;
  return null;
}

// Individual Account Step Validations
export function validateIndividualStep1(
  data: Partial<IndividualFormData>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const emailError = validateEmail(data.email || "");
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.password || "");
  if (passwordError) errors.password = passwordError;

  const confirmPasswordError = validatePasswordMatch(
    data.password || "",
    data.confirm_password || ""
  );
  if (confirmPasswordError) errors.confirm_password = confirmPasswordError;

  const phoneError = validatePhone(data.mobile_number || "");
  if (phoneError) errors.mobile_number = phoneError;

  return errors;
}

export function validateIndividualStep2(
  data: Partial<IndividualFormData>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const nameError = validateRequired(data.full_name || "", "Full name");
  if (nameError) errors.full_name = nameError;

  const nationalityError = validateRequired(
    data.nationality || "",
    "Nationality"
  );
  if (nationalityError) errors.nationality = nationalityError;

  const dobError = validateDate(data.dob || null, "Date of birth");
  if (dobError) errors.dob = dobError;

  return errors;
}

export function validateIndividualStep3(
  data: Partial<IndividualFormData>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const addressError = validateRequired(
    data.address_line_1 || "",
    "Address line 1"
  );
  if (addressError) errors.address_line_1 = addressError;

  const cityError = validateRequired(data.city || "", "City");
  if (cityError) errors.city = cityError;

  const countryError = validateRequired(data.country || "", "Country");
  if (countryError) errors.country = countryError;

  return errors;
}

export function validateIndividualStep4(
  data: Partial<IndividualFormData>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const bankError = validateRequired(data.bank_name || "", "Bank name");
  if (bankError) errors.bank_name = bankError;

  const accountHolderError = validateRequired(
    data.account_holder_name || "",
    "Account holder name"
  );
  if (accountHolderError) errors.account_holder_name = accountHolderError;

  const ibanError = validateIBAN(data.iban || "");
  if (ibanError) errors.iban = ibanError;

  const swiftError = validateRequired(data.swift_code || "", "SWIFT code");
  if (swiftError) errors.swift_code = swiftError;

  return errors;
}

export function validateIndividualStep5(
  data: Partial<IndividualFormData>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const passportError = validateFile(data.passport_copy, "Passport copy");
  if (passportError) errors.passport_copy = passportError;

  const emiratesIdFrontError = validateFile(
    data.emirates_id_front,
    "Emirates ID (Front)"
  );
  if (emiratesIdFrontError) errors.emirates_id_front = emiratesIdFrontError;

  const emiratesIdBackError = validateFile(
    data.emirates_id_back,
    "Emirates ID (Back)"
  );
  if (emiratesIdBackError) errors.emirates_id_back = emiratesIdBackError;

  // const reraError = validateFile(data.rera_certificate, "RERA certificate");
  // if (reraError) errors.rera_certificate = reraError;

  return errors;
}

// Company Account Step Validations
export function validateCompanyStep1(
  data: Partial<CompanyFormData>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const emailError = validateEmail(data.email || "");
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.password || "");
  if (passwordError) errors.password = passwordError;

  const confirmPasswordError = validatePasswordMatch(
    data.password || "",
    data.confirm_password || ""
  );
  if (confirmPasswordError) errors.confirm_password = confirmPasswordError;

  const phoneError = validatePhone(data.mobile_number || "");
  if (phoneError) errors.mobile_number = phoneError;

  const designationError = validateRequired(
    data.rep_designation || "",
    "Representative designation"
  );
  if (designationError) errors.rep_designation = designationError;

  return errors;
}

export function validateCompanyStep2(
  data: Partial<CompanyFormData>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const companyError = validateRequired(
    data.company_name || "",
    "Company name"
  );
  if (companyError) errors.company_name = companyError;

  const licenseError = validateRequired(
    data.trade_license_number || "",
    "Trade license number"
  );
  if (licenseError) errors.trade_license_number = licenseError;

  const licenseExpiryError = validateFutureDate(
    data.trade_license_expiry || null,
    "Trade license expiry"
  );
  if (licenseExpiryError) errors.trade_license_expiry = licenseExpiryError;

  const reraRegError = validateRequired(
    data.rera_registration_number || "",
    "RERA registration number"
  );
  if (reraRegError) errors.rera_registration_number = reraRegError;

  const reraExpiryError = validateDate(
    data.rera_expiry_date || null,
    "RERA expiry date"
  );
  if (reraExpiryError) errors.rera_expiry_date = reraExpiryError;

  return errors;
}

export function validateCompanyStep3(
  data: Partial<CompanyFormData>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const addressError = validateRequired(
    data.office_address || "",
    "Office address"
  );
  if (addressError) errors.office_address = addressError;

  const landlineError = validatePhone(data.landline_number || "");
  if (landlineError) errors.landline_number = landlineError;

  return errors;
}

export function validateCompanyStep4(
  data: Partial<CompanyFormData>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const trnError = validateTRN(data.trn_number || "");
  if (trnError) errors.trn_number = trnError;

  const vatExpiryError = validateDate(
    data.vat_certificate_expiry || null,
    "VAT certificate expiry"
  );
  if (vatExpiryError) errors.vat_certificate_expiry = vatExpiryError;

  return errors;
}

export function validateCompanyStep5(
  data: Partial<CompanyFormData>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const bankError = validateRequired(data.bank_name || "", "Bank name");
  if (bankError) errors.bank_name = bankError;

  const accountHolderError = validateRequired(
    data.account_holder_name || "",
    "Account holder name"
  );
  if (accountHolderError) errors.account_holder_name = accountHolderError;

  const ibanError = validateIBAN(data.iban || "");
  if (ibanError) errors.iban = ibanError;

  const swiftError = validateRequired(data.swift_code || "", "SWIFT code");
  if (swiftError) errors.swift_code = swiftError;

  return errors;
}

export function validateCompanyStep6(
  data: Partial<CompanyFormData>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const tradeLicenseError = validateFile(
    data.trade_license_copy,
    "Trade license copy"
  );
  if (tradeLicenseError) errors.trade_license_copy = tradeLicenseError;

  const reraCertError = validateFile(
    data.rera_certificate_copy,
    "RERA certificate copy"
  );
  if (reraCertError) errors.rera_certificate_copy = reraCertError;

  const vatCertError = validateFile(
    data.vat_certificate_copy,
    "VAT certificate copy"
  );
  if (vatCertError) errors.vat_certificate_copy = vatCertError;

  const moaError = validateFile(
    data.memorandum_of_association,
    "Memorandum of Association"
  );
  if (moaError) errors.memorandum_of_association = moaError;

  const passportVisaError = validateFile(
    data.passport_visa_copies,
    "Passport/Visa copies"
  );
  if (passportVisaError) errors.passport_visa_copies = passportVisaError;

  return errors;
}
