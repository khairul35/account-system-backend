export type LogInParams = {
  username: string;
  password: string;
};

export type CreateUserParams = {
  username: string;
  password_hash: string;
  email: string;
  role: string;
  account_status: string;
  registration_date: Date;
  last_login_date: Date;
  first_name: string;
  last_name: string;
  address: string;
};

export type UpdateUserParams = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
};
