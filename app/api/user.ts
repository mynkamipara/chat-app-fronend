import { useMutation, useQuery } from 'react-query';
import { ApiError } from '../utils/api-error';
import { chatApiClient } from '../utils/chat-api-client';
import { ILoginParams, ISignupParams } from '../Interfaces/user.interface';

export function userLoginAPI() {
  const client = chatApiClient();

  return useMutation<any, ApiError, ILoginParams>(
    async (params) => client.userLogin(params)
  );
}

export function userSignUpAPI() {
  const client = chatApiClient();

  return useMutation<any, ApiError, ISignupParams>(
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
