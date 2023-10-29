import { useMutation, useQuery } from 'react-query';
import { ApiError } from '../utils/api-error';
import { chatApiClient } from '../utils/chat-api-client';

export function userLoginAPI() {
  const client = chatApiClient();

  return useMutation<any, ApiError, any>(
    async (params) => client.userLogin(params)
  );
}

export function userSignUpAPI() {
  const client = chatApiClient();

  return useMutation<any, ApiError, any>(
    async (params) => client.userSignup(params)
  );
}

export function userConnectionAPI(search:string, option:any) {
  const client = chatApiClient();

  return useQuery(['connection', search], () => client.userConnection(search), option);
}

export function userConversationAPI(receiverId:string) {
  const client = chatApiClient();

  return useQuery(['conversation', receiverId], () => client.userConversation(receiverId));
}

// export function query() {
//   const client = chatApiClient();

//   return useQuery(['name'], () =>
//   client.queryfunc()
// );
// }
