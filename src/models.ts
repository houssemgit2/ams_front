export interface Provider {
  id: number;
  name: string;
  logo: string;
  email: string;
  address: string;
}

export interface Article {
  id: number;
  libelle: string;
  price: string;
  provider: string;
}
