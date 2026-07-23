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

function handleAddCardFormSubmit(event) {
  event.preventDefault();

  const cardData = {
    name: cardTitleInput.value,
    link: cardImageInput.value,
  };

  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
  closeModal(addCardModal);
}

function resetValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector),
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
  toggleButtonState(inputList, buttonElement, config);
}
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
  resetValidation(addCardForm, validationConfig);
});

modalCardCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// functions edit and close profile modal

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
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
  resetValidation(profileEditForm, validationConfig);
  openModal(profileEditModal);
});

profileTitleInput.value = profileTitle.textContent;
profileDescriptionInput.value = profileDescription.textContent;

modalCloseButton.addEventListener("click", () => closeModal(profileEditModal));

profileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
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

  openModal(imagePreviewModal);
}

modalImageCloseButton.addEventListener("click", () => {
  closeModal(imagePreviewModal);
});

// validation
const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config,
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector),
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

enableValidation(validationConfig);

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}
