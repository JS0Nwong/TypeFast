import { generate } from "random-words";

export default function generateWords(amount) {
  amount = amount || 250;
  const words = generate({ exactly: amount });
  return words;
}
