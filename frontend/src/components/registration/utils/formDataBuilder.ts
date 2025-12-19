import {
  IndividualFormData,
  CompanyFormData,
  BrokerType,
} from "../../../../src/types/registration";

export function buildFormData(
  individualData: IndividualFormData,
  companyData: CompanyFormData,
  brokerType: BrokerType
): FormData {
  const formDataToSend = new FormData();
  const isCompany = brokerType === "company";

  if (isCompany) {
    const data = companyData;
    // Add all text fields
    Object.entries(data).forEach(([key, value]) => {
      if (
        key.includes("_copy") ||
        key.includes("_copies") ||
        key.includes("_front") ||
        key.includes("_back")
      ) {
        return;
      }
      if (value instanceof Date) {
        formDataToSend.append(key, value.toISOString());
      } else if (value !== null && value !== undefined && value !== "") {
        formDataToSend.append(key, String(value));
      }
    });

    // Add files
    if (data.trade_license_copy) {
      formDataToSend.append("trade_license_copy", {
        uri: data.trade_license_copy.uri,
        name: data.trade_license_copy.name,
        type: data.trade_license_copy.type,
      } as any);
    }
    if (data.rera_certificate_copy) {
      formDataToSend.append("rera_certificate_copy", {
        uri: data.rera_certificate_copy.uri,
        name: data.rera_certificate_copy.name,
        type: data.rera_certificate_copy.type,
      } as any);
    }
    if (data.vat_certificate_copy) {
      formDataToSend.append("vat_certificate_copy", {
        uri: data.vat_certificate_copy.uri,
        name: data.vat_certificate_copy.name,
        type: data.vat_certificate_copy.type,
      } as any);
    }
    if (data.memorandum_of_association) {
      formDataToSend.append("memorandum_of_association", {
        uri: data.memorandum_of_association.uri,
        name: data.memorandum_of_association.name,
        type: data.memorandum_of_association.type,
      } as any);
    }
    if (data.passport_visa_copies) {
      formDataToSend.append("passport_visa_copies", {
        uri: data.passport_visa_copies.uri,
        name: data.passport_visa_copies.name,
        type: data.passport_visa_copies.type,
      } as any);
    }
  } else {
    const data = individualData;
    // Add all text fields
    Object.entries(data).forEach(([key, value]) => {
      if (
        key.includes("_copy") ||
        key.includes("_front") ||
        key.includes("_back")
      ) {
        return;
      }
      if (value instanceof Date) {
        formDataToSend.append(key, value.toISOString());
      } else if (value !== null && value !== undefined && value !== "") {
        formDataToSend.append(key, String(value));
      }
    });

    // Add files
    if (data.passport_copy) {
      formDataToSend.append("passport_copy", {
        uri: data.passport_copy.uri,
        name: data.passport_copy.name,
        type: data.passport_copy.type,
      } as any);
    }
    if (data.emirates_id_front) {
      formDataToSend.append("emirates_id_front", {
        uri: data.emirates_id_front.uri,
        name: data.emirates_id_front.name,
        type: data.emirates_id_front.type,
      } as any);
    }
    if (data.emirates_id_back) {
      formDataToSend.append("emirates_id_back", {
        uri: data.emirates_id_back.uri,
        name: data.emirates_id_back.name,
        type: data.emirates_id_back.type,
      } as any);
    }
    if (data.rera_certificate) {
      formDataToSend.append("rera_certificate", {
        uri: data.rera_certificate.uri,
        name: data.rera_certificate.name,
        type: data.rera_certificate.type,
      } as any);
    }
  }

  formDataToSend.append("broker_type", brokerType);
  return formDataToSend;
}
