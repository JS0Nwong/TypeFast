import { generate, count } from "random-words";

export default function generateWords() {
  const words = generate({exactly: 250})
  return words;
}
