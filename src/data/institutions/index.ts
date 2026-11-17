import type { Institution, InstitutionKey } from "@/types/institution";
import { ramapuram } from "./ramapuram";
import { tiruchirappalli } from "./tiruchirappalli";
import { easwari } from "./easwari";
import { trp } from "./trp";

export const institutions: Record<InstitutionKey, Institution> = {
  rmp: ramapuram,
  trichy: tiruchirappalli,
  eec: easwari,
  trp,
};

export const institutionList: Institution[] = [ramapuram, tiruchirappalli, easwari, trp];

export const isInstitutionKey = (v: unknown): v is InstitutionKey =>
  typeof v === "string" && v in institutions;

export { ramapuram, tiruchirappalli, easwari, trp };
