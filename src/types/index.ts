export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
}

export interface Blog {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  featuredImage: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  password: string;
}