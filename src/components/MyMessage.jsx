//import socket from '../api/services/socket';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { userApi } from '../api/services/user';
import { useEffect } from 'react';
import { useState } from 'react';
import myMessage from "./css_module/MyMessage.module.css"
import Swal from "sweetalert2";
const drawerBleeding = 56;


const Root = styled('div')(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

function SwipeableEdgeDrawer({openDrawer,toggleDrawer}) {

  const token = localStorage.getItem("token")
  const [notis, setNotis] = useState([]);

  const GetNotification = async () => {
    try {
      const res = await userApi.getNotification(token);
      if (!res.data.payload || res.data.payload.length === 0) {
        setNotis(["알림이 없습니다"]);
      }else{
        setNotis(res.data.payload);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    GetNotification();
  }, [openDrawer]); // useEffect를 이 함수 내에서 호출하도록 이동

  const deleteNotification = async (id) => {
    const res = await userApi.deleteNotification(id, localStorage.getItem("token"));
    if (res.data.code === 200) {
      setNotis(notis.filter((c) => c.id !== id));
      Swal.fire({
        text: res.data.message,
        icon: "success",
      });
    }
  };


  return (
    <Root>
      <SwipeableDrawer
        open={openDrawer}
        onClose={() => { toggleDrawer(false); }}
        onOpen={() => { toggleDrawer(true); }}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{ keepMounted: true }}
        sx={{ width: '400px' }}
      >
        <div className={myMessage.messageHeader}>
          <p>&lt;My Message/&gt;</p>
        </div>
        <div className={myMessage.Messages}>
          {notis.map((noti, index) => (
            <div key={noti.id || index} className={myMessage.messageContainer}>
              <p className={myMessage.Message}>{noti.content || noti}</p>
              <button className={myMessage.deleteButton} onClick={() => deleteNotification(noti.id)}>
                삭제
              </button>
            </div>
          ))}
        </div>
        <p className={myMessage.Footer}>CHALLEN.GG</p>
      </SwipeableDrawer>
    </Root>
  );
}

export default SwipeableEdgeDrawer;
