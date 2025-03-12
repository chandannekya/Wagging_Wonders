// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = "http://localhost:8000/";

export const authEndpoits = {
  SIGNUP_API: `${BASE_URL}user/api/auth/signUp`,
  SIGNIN_API: `${BASE_URL}user/api/auth/login`,
};

export const petsEndpoints = {
  GetAllPets: `${BASE_URL}pet/api/pet/AllPet`,
  ADOPT_PET: `${BASE_URL}pet/api/pet/adopt-pet/`,
  DONATE_PET: `${BASE_URL}pet/api/pet/donatePet`,
};
