const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modalCloseButton = document.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input",
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// add cards
const addCardButton = document.querySelector("#add-card-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardTitleInput = document.querySelector("#card-title-input");
const cardImageInput = document.querySelector("#card-link-input");
const modalCardCloseButton = document.querySelector("#modal-card-close-button");

// functions add and close card modal
function openAddCardModal() {
  addCardForm.reset();
  addCardModal.classList.add("modal_opened");
}

function closeAddCardModal() {
  addCardModal.classList.remove("modal_opened");
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();

  const cardData = {
    name: cardTitleInput.value,
    link: cardImageInput.value,
  };

  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
  closeAddCardModal();
}

addCardButton.addEventListener("click", openAddCardModal);
modalCardCloseButton.addEventListener("click", closeAddCardModal);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// functions edit and close profile modal
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImageElement.addEventListener("click", () => {
    openImagePreviewModal(cardData);
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", () => openModal(profileEditModal));

profileTitleInput.value = profileTitle.textContent;
profileDescriptionInput.value = profileDescription.textContent;

modalCloseButton.addEventListener("click", () => closeModal(profileEditModal));

profileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.appendChild(cardElement);
});

// modal for image preview

const imagePreviewModal = document.querySelector("#image-preview-modal");
const imagePreview = imagePreviewModal.querySelector(".modal__image");
const imagePreviewTitle = imagePreviewModal.querySelector(
  ".modal__image-title",
);
const modalImageCloseButton = document.querySelector(
  "#modal-image-close-button",
);

// function to open image preview modal
function openImagePreviewModal(cardData) {
  imagePreview.src = cardData.link;
  imagePreview.alt = cardData.name;
  imagePreviewTitle.textContent = cardData.name;

  imagePreviewModal.classList.add("modal_opened");
}

function closeImagePreviewModal() {
  imagePreviewModal.classList.remove("modal_opened");
}

modalImageCloseButton.addEventListener("click", closeImagePreviewModal);
