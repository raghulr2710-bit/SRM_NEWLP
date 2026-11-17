import type { Institution } from "@/types/institution";
import type { EnquiryFormProps } from "@/components/forms/EnquiryForm";

export const programmeValue = (p: { degree: string; name: string }) => `${p.degree} ${p.name}`;

/** Serialisable slice of the institution config for the client-side form. */
export function toFormProps(inst: Institution): Omit<EnquiryFormProps, "tone" | "variant"> {
  const phone = inst.contact.phones[0];
  return {
    institution: inst.key,
    institutionName: inst.shortName,
    applyUrl: inst.applyUrl,
    programmes: inst.programmes.items.map((p) => ({
      value: programmeValue(p),
      level: p.level,
      department: p.department,
    })),
    levels: inst.enquiry.levels,
    faculties: inst.enquiry.faculties,
    consent: inst.enquiry.consent,
    helpline: phone ? { display: phone.display, tel: phone.tel } : undefined,
  };
}
