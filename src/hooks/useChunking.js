import chunk from "lodash/chunk";

const useChunking = () => {
  const dataChunking = (chunkSize, data) => {
    return chunk(data, chunkSize);
  };

  return { dataChunking };
};

export { useChunking };
