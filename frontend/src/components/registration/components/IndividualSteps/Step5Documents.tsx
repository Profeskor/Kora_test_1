import React from "react";
import { IndividualFormData } from "@/src/types/registration";
import FileUpload from "@/src/components/forms/FileUpload";
import StepWrapper from "../StepWrapper";

interface Step5DocumentsProps {
  data: IndividualFormData;
  errors: Record<string, string>;
  onUpdateField: (field: string, value: any) => void;
  stepNumber: number;
  totalSteps: number;
}

export default function Step5Documents({
  data,
  errors,
  onUpdateField,
  stepNumber,
  totalSteps,
}: Step5DocumentsProps) {
  return (
    <StepWrapper
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      title="Document Uploads"
      subtitle="Upload required documents"
    >
      <FileUpload
        label="Passport Copy"
        file={data.passport_copy}
        onUpload={(file) => onUpdateField("passport_copy", file)}
        error={errors.passport_copy}
        required
      />

      <FileUpload
        label="Emirates ID (Front)"
        file={data.emirates_id_front}
        onUpload={(file) => onUpdateField("emirates_id_front", file)}
        error={errors.emirates_id_front}
        required
      />

      <FileUpload
        label="Emirates ID (Back)"
        file={data.emirates_id_back}
        onUpload={(file) => onUpdateField("emirates_id_back", file)}
        error={errors.emirates_id_back}
        required
      />

      {/* <FileUpload
        label="RERA Certificate"
        file={data.rera_certificate}
        onUpload={(file) => onUpdateField("rera_certificate", file)}
        error={errors.rera_certificate}
        required
      /> */}
    </StepWrapper>
  );
}
