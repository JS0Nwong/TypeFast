import { generate } from "random-words";
import { useBoundStore } from "./stores/boundStore";

export default function generateWords() {
  const { mode, wordsAmount, customWordsAmount, customTest } = useBoundStore(
    (state) => ({
      mode: state.mode,
      wordsAmount: state.wordsAmount,
      customWordsAmount: state.customWordsAmount,
      customTest: state.customTest,
    })
  );

  if (mode === "words") {
    if (customTest) {
      return generate({ exactly: customWordsAmount });
    } else {
      return generate({ exactly: wordsAmount });
    }
  } else {
    const words = generate({ exactly: 250 });
    return words;
  }
}
