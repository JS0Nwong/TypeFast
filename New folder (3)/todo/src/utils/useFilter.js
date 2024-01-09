import { useSearchParams } from "react-router-dom";

const useFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterTasks = (filter, query, data, setFilteredData) => {
    var dataClone = structuredClone(data);
    for (const keys in dataClone) {
      Object.assign(dataClone, {
        [keys]: {
          ...dataClone[keys],
          tasks: dataClone[keys].tasks.filter((task) =>
            task.task.toLowerCase().includes(query.toLowerCase())
          ),
        },
      })[dataClone];
    }
    setFilteredData(dataClone);

    setSearchParams({
      filterType: filter,
      filterQuery: query,
    });
    return dataClone;
  };

  const filterLabels = (filter, query, data, setFilteredData) => {
    const dataClone = structuredClone(data);
    if (Array.isArray(query)) {
      for (const key in dataClone) {
        Object.assign(dataClone, {
          [key]: {
            ...dataClone[key],
            tasks: dataClone[key].tasks.filter((task) =>
              task.labels.some((label) =>
                query.some((param) => {
                  if (param !== query) {
                    return label.label
                      .toLowerCase()
                      .includes(param?.toLowerCase());
                  } else {
                    return label.label
                      .toLowerCase()
                      .includes(query?.toLowerCase());
                  }
                })
              )
            ),
          },
        })[dataClone];
      }
    } else {
      for (const key in dataClone) {
        Object.assign(dataClone, {
          [key]: {
            ...dataClone[key],
            tasks: dataClone[key].tasks.filter((task) =>
              task.labels.some((label) =>
                label.label.toLowerCase().includes(query.toLowerCase())
              )
            ),
          },
        })[dataClone];
      }
    }

    setFilteredData(dataClone);

    setSearchParams({
      filterType: filter,
      filterQuery: query,
    });
    return dataClone;
  };

  const filterLabelsByClick = (filter, query, data, setFilteredData) => {
    const dataClone = structuredClone(data);

    if (searchParams.getAll("filterQuery").includes(query)) {
      setSearchParams({
        filterType: filter,
        filterQuery: searchParams
          .getAll("filterQuery")
          .filter((param) => param !== query),
      });
    } else {
      setSearchParams((prevParams) => {
        let paramValues = prevParams.get("filterQuery")?.split(",");
        if (paramValues && query) {
          if (Boolean(searchParams.getAll("filterQuery").length)) {
            prevParams.set("filterType", filter);
            prevParams.append("filterQuery", query);
          } else {
            prevParams.delete("filterType");
            prevParams.delete("filterQuery");
          }
        } else {
          prevParams.set("filterType", filter);
          prevParams.set("filterQuery", [query]);
        }
        return prevParams;
      });
    }

    for (const key in dataClone) {
      Object.assign(dataClone, {
        [key]: {
          ...dataClone[key],
          tasks: dataClone[key].tasks.filter((task) =>
            task.labels.some((label) =>
              searchParams.getAll("filterQuery").some((param) => {
                if (param !== query) {
                  return label.label
                    .toLowerCase()
                    .includes(param?.toLowerCase());
                } else {
                  return label.label
                    .toLowerCase()
                    .includes(query?.toLowerCase());
                }
              })
            )
          ),
        },
      })[dataClone];
    }
    setFilteredData(dataClone);

    return dataClone;
  };

  const filterAll = (query, data, setFilteredData) => {
    const dataClone = structuredClone(data);
    for (const key in dataClone) {
      Object.assign(dataClone, {
        [key]: {
          ...dataClone[key],
          tasks: dataClone[key].tasks.filter(
            (task) =>
              task.task.toLowerCase().includes(query.toLowerCase()) ||
              task.labels.some((label) =>
                label.label.toLowerCase().includes(query.toLowerCase())
              )
          ),
        },
      })[dataClone];
    }
    setFilteredData(dataClone);
    setSearchParams({
      filterQuery: query,
    });
    return dataClone;
  };

  const clearFilters = (filter, data, setFilteredData, query) => {
    const dataClone = structuredClone(data);
    setSearchParams((prevParams) => {
      let values = prevParams.getAll("filterQuery");
      if (values) {
        if (values.includes(query)) {
          values = values.filter((searchValue) => searchValue !== query);
        }
        if (!!values.length) {
          values = values.filter((searchValue) => searchValue !== query);
          prevParams.delete("filterQuery");

          values.filter((searchValue) => {
            if (searchValue !== query) {
              prevParams.append("filterQuery", searchValue);
            }
          });

          for (const key in dataClone) {
            Object.assign(dataClone, {
              [key]: {
                ...dataClone[key],
                tasks: dataClone[key].tasks.filter((task) =>
                  task?.labels.some((label) =>
                    searchParams.getAll("filterQuery").some((param) => {
                      if (param !== query) {
                        return label.label
                          .toLowerCase()
                          .includes(param?.toLowerCase());
                      } else {
                        return label.label
                          .toLowerCase()
                          .includes(query?.toLowerCase());
                      }
                    })
                  )
                ),
              },
            })[dataClone];
          }
          setFilteredData(dataClone);
        } else {
          prevParams.delete("filterType");
          prevParams.delete("filterQuery");
          setFilteredData(data);
        }
      } else {
        prevParams.set("filterType", filter);
        prevParams.set("filterQuery", [query]);
      }
      return prevParams;
    });
  };

  return {
    filterTasks,
    filterLabels,
    filterLabelsByClick,
    filterAll,
    clearFilters,
  };
};

export default useFilter;
