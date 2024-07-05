/// <reference types="vite/client" />

interface PostDetail {
    id: string;
    desc: string;
    utilities: string;
    pet: string;
    income: string;
    size: number;
    school: number;
    bus: number;
    restaurant: number;
    postId: string;
  }
  
  interface User {
    username: string;
    avatar: string;
  }
  
  interface Post {
    id: string;
    title: string;
    price: number;
    images: string[];
    address: string;
    city: string;
    bedroom: number;
    bathroom: number;
    latitude: string  ;
    longitude: string;
    type: string;
    property: string;
    createdAt: string;
    userId: string;
    postDetail: PostDetail;
    user: User;
  }

export interface types{
    id: number | string;
    title: string;
    images: string[];
    bedroom: number;
    bathroom: number;
    price: number;
    address: string;
    latitude: number |  string ;
    longitude: number | string;
}
