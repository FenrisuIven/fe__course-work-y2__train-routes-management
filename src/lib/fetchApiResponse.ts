import Axios, {AxiosRequestConfig} from "axios";

type axiosGetParams = { url: string, config?: AxiosRequestConfig | undefined };

const getResponse = async (params: axiosGetParams) => {
  const response = await Axios.get(params.url, params.config);
  return {error: response.data.error, status: response.status, data: response.data};
};

const fetchApiResponse = {
  get: (params: axiosGetParams) => getResponse(params)
};

export {fetchApiResponse};