export default function GenerateReceiptNumber() {
  const prefix = "ADSC";
  const randomNumbers = Math.floor(100000 + Math.random() * 900000); // Generates a number between 100000 and 999999
  return `${prefix}${randomNumbers}`;
}
