const regexName = /^(?!.*\d)[A-Za-z\s]{3,24}$/;
const regexImage = /(?!.*\d)[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,24}$/;
const RegexNumber = /^[0-9]+$/;
const regexLife = /^[0-9]+$/;

const validation = (dogsData) => {
  const errors = {};

  if (!regexName.test(dogsData.name)) errors.name = "Your name is invalid";
  //que permita espacios
  //que permita caracteres especiales
  if (!regexImage.test(dogsData.image)) errors.image = "Should be a picture";

  if (
    !RegexNumber.test(dogsData.min_height) ||
    !RegexNumber.test(dogsData.max_height)
  ) {
    errors.min_height = "You can only put numbers";
    errors.max_height = "You can only put numbers";
  } else if (!dogsData.min_height || !dogsData.max_height)
    errors.min_height = "You must fill in both fields";
  else if (Number(dogsData.max_height) <= Number(dogsData.min_height))
    errors.min_height = "The second value must be greater than the first";

  if (
    !RegexNumber.test(dogsData.min_weight) ||
    !RegexNumber.test(dogsData.max_weight)
  ) {
    errors.min_weight = "You can only put numbers";
    errors.max_height = "You can only put numbers";
  } else if (!dogsData.min_weight || !dogsData.max_weight)
    errors.min_weight = "You must fill in both fields";
  else if (Number(dogsData.min_weight) >= Number(dogsData.max_weight))
    errors.min_weight = "The second value must be greater than the first";

  if (
    !regexLife.test(dogsData.min_lifeSpan) ||
    !regexLife.test(dogsData.max_lifeSpan)
  )
    errors.min_lifeSpan = "You can only put numbers";
  else if (!dogsData.min_lifeSpan || !dogsData.max_lifeSpan)
    errors.min_lifeSpan = "You must fill in both fields";
  else if (Number(dogsData.min_lifeSpan) >= Number(dogsData.max_lifeSpan))
    errors.min_lifeSpan = "The second value must be greater than the first";

  if (dogsData.temperaments.length === 0)
    errors.temperaments = "You must select at least 1 temperament";

  return errors;
};

export default validation;
