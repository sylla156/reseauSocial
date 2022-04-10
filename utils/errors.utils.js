const signUpErrors = (error) => {
  let errors = { pseudo: "", email: " ", password: "" };

  if (error.message.includes("pseudo")) errors.pseudo = "Pseudo incorrect";

  if (error.message.includes("email")) errors.email = "email incorrect";

  if (error.message.includes("password"))
    errors.password = "le mot de passe doit faire mininum 6 charatere";

  if (error.code === 11000 && error.keyPattern.email == 1)
    errors.email = "Cet email est deja utiliser";

  if (error.code === 11000 && error.keyPattern.pseudo == 1)
    errors.pseudo = "Cet pseudo est deja utiliser";

  return errors;
};

const signInErrors = (error) => {
  let errors = { email: "", password: "" };

  return errors;
};

module.exports = { signUpErrors, signInErrors };
