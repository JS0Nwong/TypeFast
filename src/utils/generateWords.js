import React from "react";
import { generate, count } from "random-words";

export default function generateWords() {
  const words = generate({exactly: 40})
  return words;
}
