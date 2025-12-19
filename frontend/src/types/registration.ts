import { FileInfo } from "../components/forms/FileUpload";

export type BrokerType = "company" | "individual";

// Individual Account Form Data
export interface IndividualFormData {
  // Step 1: Credentials & Auth
  email: string;
  password: string;
  confirm_password: string;
  mobile_number: string;

  // Step 2: Personal Details
  full_name: string;
  nationality: string;
  dob: Date | null;

  // Step 3: Address Information
  address_line_1: string;
  city: string;
  country: string;
  po_box: string;

  // Step 4: Bank Details
  bank_name: string;
  account_holder_name: string;
  iban: string;
  swift_code: string;

  // Step 5: Document Uploads
  passport_copy: FileInfo | null;
  emirates_id_front: FileInfo | null;
  emirates_id_back: FileInfo | null;
  rera_certificate: FileInfo | null;
}

// Company Account Form Data
export interface CompanyFormData {
  // Step 1: Representative Credentials
  email: string;
  password: string;
  confirm_password: string;
  mobile_number: string;
  rep_designation: string;

  // Step 2: Agency Details
  company_name: string;
  trade_license_number: string;
  trade_license_expiry: Date | null;
  rera_registration_number: string;
  rera_expiry_date: Date | null;

  // Step 3: Contact & Address
  office_address: string;
  landline_number: string;
  website_url: string;

  // Step 4: Tax Information
  trn_number: string;
  vat_certificate_expiry: Date | null;

  // Step 5: Bank Details
  bank_name: string;
  account_holder_name: string;
  iban: string;
  swift_code: string;

  // Step 6: Document Uploads
  trade_license_copy: FileInfo | null;
  rera_certificate_copy: FileInfo | null;
  vat_certificate_copy: FileInfo | null;
  memorandum_of_association: FileInfo | null;
  passport_visa_copies: FileInfo | null;
}

export type RegistrationFormData = IndividualFormData | CompanyFormData;
