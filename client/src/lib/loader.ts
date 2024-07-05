import { LoaderFunctionArgs } from "react-router-dom";
import apiRequest from "./apiRequest";

interface Props {
  params: {
    id: string;
  };
}

export const singlePageLoader = async (args: LoaderFunctionArgs<Props>) => {
  const { params } = args;
  const res = await apiRequest("/posts/" + params.id);
  console.log(res.data.post);
  return res.data.post;
};

export const listPageLoader = async (args: LoaderFunctionArgs<Props>) => {
  const { request } = args;
  console.log(request);
  
  const query = request?.url.split("?")[1];
   console.log(query);
   
  const res = await apiRequest("/posts?" + query);
  console.log(res.data.query);
  return res.data.post  || null ;

}
