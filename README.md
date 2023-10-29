# chat-app-fronend
chat-wep-app with Next.js based on React, typescript, Socket-Io

## Features
- User Register
- User Login/ Logout
- Private Chat ( User can select different user and direct message them.
- Send/Receive Message through socket-io
- User has flag `Online` (Whovere is online then show flag as online, if logout or close from socket then not visible `Online` flag.
- Protected Page (Chat Page)
- API Integration with useQuery and useMutation with server of nodeJs

  ## Mostly Used Technology Features
- Next.js
- Typescript
- @mui
- Axios
- Formik
- react-toastify
- react-query

## .env.local Setup
```
NEXT_PUBLIC_API_URL='http://localhost:8080'
NEXT_PUBLIC_SOCKET_URL='http://localhost:8080'
```

## Quickstart
Install dependencies and Run Server in you local System. (Before Run application, Set .env.local file)
```
npm install
npm run dev
```

### Main page
> http://localhost:3000

### Chat page
> http://localhost:3000/chat

### API URL
> http://localhost:8080

### Socket API URL
> http://localhost:8080
