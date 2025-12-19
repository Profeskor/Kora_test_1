import React from "react";
import { CompanyFormData } from "../../../../../src/types/registration";
import FileUpload from "../../../../../src/components/forms/FileUpload";
import StepWrapper from "../../../../../src/components/registration/components/StepWrapper";

interface Step6DocumentsProps {
  data: CompanyFormData;
  errors: Record<string, string>;
  onUpdateField: (field: string, value: any) => void;
}

export default function Step6Documents({
  data,
  errors,
  onUpdateField,
}: Step6DocumentsProps) {
  return (
    <StepWrapper
      stepNumber={6}
      totalSteps={6}
      title="Document Uploads"
      subtitle="Upload required documents"
    >
      <FileUpload
        label="Trade License Copy"
        file={data.trade_license_copy}
        onUpload={(file) => onUpdateField("trade_license_copy", file)}
        error={errors.trade_license_copy}
        required
      />

      <FileUpload
        label="RERA Certificate Copy"
        file={data.rera_certificate_copy}
        onUpload={(file) => onUpdateField("rera_certificate_copy", file)}
        error={errors.rera_certificate_copy}
        required
      />

      <FileUpload
        label="VAT Certificate Copy"
        file={data.vat_certificate_copy}
        onUpload={(file) => onUpdateField("vat_certificate_copy", file)}
        error={errors.vat_certificate_copy}
        required
      />

      <FileUpload
        label="Memorandum of Association"
        file={data.memorandum_of_association}
        onUpload={(file) => onUpdateField("memorandum_of_association", file)}
        error={errors.memorandum_of_association}
        required
      />

      <FileUpload
        label="Passport/Visa Copies (Authorized Signatory)"
        file={data.passport_visa_copies}
        onUpload={(file) => onUpdateField("passport_visa_copies", file)}
        error={errors.passport_visa_copies}
        required
      />
    </StepWrapper>
  );
}
