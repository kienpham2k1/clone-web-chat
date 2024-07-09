// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import { create } from 'zustand';
// const brokerURL: string =
//     process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/ws'
// const accessToken: string = 
// 	'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraWVudXNlciIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzIwNDA0MjI3LCJleHAiOjE3MjA0OTA2Mjd9.PgLNMKHoY6XzqjFE5vAkBoYx5JkQVi4m3hbZ0Y3fteBnL5yx5CFywqVB1l58Drsm'

// interface StompClient {
//     stompClient: Client | null;
//     connect: () => void;
//     disconnect: () => void;
// }

// const useStompStore = create<StompClient>((set) => ({
//     stompClient: null,
//     connect: () => {
//         console.log(brokerURL);
        
//         const socket = new SockJS(brokerURL)
//         const stompClient = new Client({
//             webSocketFactory: () => socket as WebSocket,
//             connectHeaders: {
//                 ['Authorization']: `${accessToken}`,
//             },
//             debug: (str) => {
//                 console.log(str)
//             },
//             reconnectDelay: 5000,
//             onConnect: function (frame) {
//                 console.log('Connected: ' + frame);
//                 set({ stompClient: stompClient });
//             },
//             onStompError: function (frame) {
//                 console.error('Broker reported error: ' + frame.headers['message']);
//                 console.error('Additional details: ' + frame.body);
//             },
//         });

//         stompClient.activate();
//     },
//     disconnect: () => {
//         const { stompClient } = useStompStore.getState();
//         if (stompClient) {
//             stompClient.deactivate();
//             set({ stompClient: null });
//         }
//     },
// }));

// export default useStompStore;
