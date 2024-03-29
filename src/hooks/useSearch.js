import * as fonts from "../static/fonts/fonts.json";

const useSearch = () => {
  const fontsData = fonts.default;

  // theme search
  const searchByQuery = (query, data) => {
    const keys = Object.keys(data);
    return keys.filter((theme) =>
      theme.toLowerCase().includes(query.toLowerCase())
    );
  };

  const searchByFilter = (query, data) => {
    const keys = Object.keys(data);

    const res = keys.filter((theme) => 
      data[theme].themeType?.toLowerCase() === query?.toLowerCase()
    );

    return res
  };

  // font search
  const searchFonts = (query) => {
    const res = fontsData.filter((font) => {
      return font.family.toLowerCase().includes(query.toLowerCase());
    });
    return res
  };

  const searchFontsByFilter = (filter) => {
    console.log(filter)
    const res = filter.map((filter) =>
      fontsData.filter((font) =>
        font.category.toLowerCase().includes(filter.toLowerCase())
      )
    );
    return res[0];
  };

  return { searchByFilter, searchByQuery, searchFonts, searchFontsByFilter };
};
export { useSearch };
