export function formatPhone(phone: string): string {
  let cleaned = phone.replace(/\D/g, "");
  let length = cleaned.length;

  switch (length) {
    case 9:
      return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    case 10:
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(
        6
      )}`;
    case 11:
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
        7
      )}`;
    case 12:
      return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 4)}) ${cleaned.slice(
        4,
        8
      )}-${cleaned.slice(8)}`;
    case 13:
      return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 4)}) ${cleaned.slice(
        4,
        9
      )}-${cleaned.slice(9)}`;
    default:
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  }
}
