import {
  ADD_DOGS,
  ON_SEARCH_ID,
  ON_SEARCH_NAME,
  ALL_TEMPERAMENTS,
  FILTER_TEMPERAMENTS,
  FILTER_AOZ,
  FILTER_ORIGINS,
  FILTER_WEIGHT,
  RESET,
 
} from "./actions-type";

const initialState = {
  dogs: [],
  onSearchById: [],
  temperaments: [],
  dogsFilter: [],
  
  dogsApi: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DOGS:
      return {
        ...state,
        dogs: action.payload,
        dogsFilter: action.payload,
      };

    case ON_SEARCH_ID:
      console.log(action.payload);
      return {
        ...state,
        onSearchById: action.payload,
      };

    case ON_SEARCH_NAME:
      return {
        ...state,
        dogs: action.payload,
      };

   
    case ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case FILTER_ORIGINS:
      if (action.payload === "DB") {
        const createdFiltered = state.dogsFilter.filter((el) => el.isCreated);
        return {
          ...state,
          dogs: createdFiltered,
        };
      } else if (action.payload === "API") {
        const createdFiltered = state.dogsFilter.filter((el) => !el.isCreated);
        return {
          ...state,
          dogs: createdFiltered,
        };
      } else {
        return {
          ...state,
          dogs: state.dogsFilter,
        };
      }
    case FILTER_TEMPERAMENTS:
      const dogsFilter = state.dogsFilter;
      return {
        ...state,
        dogs:
          action.payload === "Alldogs"
            ? dogsFilter
            : dogsFilter.filter(
                (dog) =>
                  dog.temperament && dog.temperament.includes(action.payload)
              ),
        pageNumber: 1,
      };

    case FILTER_AOZ:
      const filterAoZ = [...state.dogs];
     

      action.payload === "A"
        ? filterAoZ.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          })
        : filterAoZ.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          });
      return {
        ...state,
        dogs: filterAoZ,
      };

    case FILTER_WEIGHT:
      const filterWeight = [...state.dogs];
      return {
        ...state,
        dogs:
          action.payload === "maximum"
            ? filterWeight.sort(
                (a, b) =>
                  Number(b.weight.split(" - ")[1]) -
                  Number(a.weight.split(" - ")[1])
              )
            : filterWeight.sort(
                (a, b) =>
                  Number(a.weight.split(" - ")[1]) -
                  Number(b.weight.split(" - ")[1])
              ),
        pageNumber: 1,
      };
    case RESET:
      return {
        ...state,
        dogs: [...state.dogsFilter],
      };

    default:
      return state;
  }
};

export default reducer;
