import CryptoJS from "crypto-js";

const SECRET_KEY = "ZIMOWE KWIATY KWITNĄ WIOSNĄ"; // Tajny klucz do szyfrowania

// 🔐 Zapisz zaszyfrowane dane do localStorage
export const zapiszRozmowe = (istotaKey, rozmowa) => {
  try {
    const zaszyfrowane = CryptoJS.AES.encrypt(
      JSON.stringify(rozmowa),
      SECRET_KEY
    ).toString();
    localStorage.setItem(`rozmowa-${istotaKey}`, zaszyfrowane);
  } catch (err) {
    console.error("Błąd przy zapisie:", err);
  }
};

// 🔓 Odczytaj i odszyfruj dane z localStorage
export const odczytajRozmowe = (istotaKey) => {
  const szyfr = localStorage.getItem(`rozmowa-${istotaKey}`);
  if (!szyfr) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(szyfr, SECRET_KEY);
    const odszyfrowane = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(odszyfrowane);
  } catch (err) {
    console.error("Błąd przy odszyfrowywaniu:", err);
    return null;
  }
};
