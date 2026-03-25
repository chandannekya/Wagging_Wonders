const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000/";

export const authEndpoits = {
  SIGNUP_API: `${BASE_URL}user/api/auth/signUp`,
  SIGNIN_API: `${BASE_URL}user/api/auth/login`,
};

export const petsEndpoints = {
  GetAllPets: `${BASE_URL}pet/api/pet/AllPet`,
  ADOPT_PET: `${BASE_URL}pet/api/pet/adopt-pet/`,
  DONATE_PET: `${BASE_URL}pet/api/pet/donatePet`,
};

export const chatEndpoints = {
  GET_CHATS: `${BASE_URL}chat/api/chatroom/`,
  SEND_MESSAGE: `${BASE_URL}chat/api/message/`,
  GET_CHAT: `${BASE_URL}chat/api/message/`,

  CHATROOM: `${BASE_URL}chat/api/chatroom/`,
};

export const donationEndpoints = {
  DONATE_FUNDS_API: `${BASE_URL}donate/`,
  GET_DONATIONS: `${BASE_URL}donate/`,
  MAKE_DONATION: `${BASE_URL}donate/`,
  DONATION_CHECKOUT: `${BASE_URL}donate/create-checkout-session`,
};

export const groomingEndpoints = {
  GET_GROOMERS: `${BASE_URL}grooming/`,
  BOOK_GROOMER: `${BASE_URL}grooming/book`,
};

export const vetEndpoints = {
  GET_VETS: `${BASE_URL}vet/`,
  BOOK_VET: `${BASE_URL}vet/book`,
};

export const trainingEndpoints = {
  GET_COURSES: `${BASE_URL}training/`,
  ENROLL_COURSE: `${BASE_URL}training/enroll`,
};

export const blogEndpoints = {
  GET_ARTICLES: `${BASE_URL}blog/`,
  GET_ARTICLE: `${BASE_URL}blog/`,
};

export const storeEndpoints = {
  GET_PRODUCTS: `${BASE_URL}store/`,
  PLACE_ORDER: `${BASE_URL}store/order`,
  STORE_CHECKOUT: `${BASE_URL}store/create-checkout-session`,
};
