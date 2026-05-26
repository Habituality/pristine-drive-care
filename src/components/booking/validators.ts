export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  return /^[0-9\s\-\+]{7,15}$/.test(phone.trim());
}

export function validateAddress(address: string): boolean {
  return address.trim().length >= 5;
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}