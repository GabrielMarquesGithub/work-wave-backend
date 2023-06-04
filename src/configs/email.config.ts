interface IEmail {
  email: string | undefined;
  password: string | undefined;
}

const emailConfig: IEmail = {
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
};

export { emailConfig };
