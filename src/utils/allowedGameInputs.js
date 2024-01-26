const allowedGameInputs = (code) => {
  return (
    code.startsWith("Key") ||
    code === "Backspace" ||
    code === "Space" ||
    code === "Tab"
  );
};
export { allowedGameInputs };
