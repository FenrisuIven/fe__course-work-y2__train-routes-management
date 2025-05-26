import Axios, {AxiosRequestConfig} from "axios";

type axiosGetParams = { url: string, config?: AxiosRequestConfig | undefined };
type apiResponse = {
  error: boolean,
  status: number,
  data: {
    rows: Record<string, any>[],
    count: number
  }
};

const getResponse = async (params: axiosGetParams): Promise<apiResponse> => {
  const response = await Axios.get<apiResponse>(params.url, params.config);
  return response.data;
};

const fetchApiResponse = {
  get: (params: axiosGetParams) => getResponse(params)
};

export {fetchApiResponse};