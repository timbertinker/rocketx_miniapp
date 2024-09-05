import React, { useEffect, useRef, useState,useContext } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import MainPage from "./pages/MainPage"
import Footer from './component1/Footer';
import Earned from './pages/Earned';
import Friends from './pages/Friends';
import Stats from './pages/Stats';
import Wallet from './pages/Wallet';
import { Toaster } from 'react-hot-toast';
import UserInfo from './pages/UserInfo';
import Stars from './component1/Stars';
import Loading from './pages/Loading';
import Layout from './component/atom/layoutmain.jsx';
import JotaiProvider from "./providers/jotaiProvider"
import AppContext from './component1/AppContext';
import { REACT_APP_WS_SERVER } from './utils/privateData.js';
import Help from './pages/Help.jsx';

const wsServerUrl = REACT_APP_WS_SERVER;

function App() {
  const [isLoading, setLoadingState] = useState(true);

  const [socket, setSocket] = useState();
  
  const handleLoadingState = (loading) =>{
     setLoadingState(loading); 
  }

  useEffect(() => {
    const adjustHeight = () =>{
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    return () =>{
      window.removeEventListener('resize',adjustHeight);
    };
  },[]);
  // useEffect(()=>{
  //   location.search
  //     .substr(1)
  //     .split('&')
  //     .foreach(function (item) {
  //       const tmp = item.split('=')
  //         if(tmp[0] == 'ref') localStorage.setItem('referral',decodeURIComponent(tmp[1]))
  //     })
  // }, [])

  useEffect (() => {
    let socket
    try{
      socket = new WebSocket(wsServerUrl)
    }catch (e) {
      //eslint-disable-next-line no-self-assign
      document.location.href = document.location.href
    }
    setSocket(socket);
    return () => socket.close();    
  },[])
  
  useEffect(() => {
    let isMounted = true
    if(isMounted) {
      const installGoogleAds = () => {
        const elem = document.createElement('script')
        elem.src = 
          '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
        elem.async = true
        elem.defer = true
        document.body.insertBefore(elem, document.body.firstChild)
      }
      installGoogleAds()
    }
    return () =>{ isMounted = false }
  }, [])


  const adsRef = useRef(false)

  if(!adsRef.current && typeof adsbygoogle !=='undefined') {
    adsRef.current = true
    //eslint-disable-next-line no-undef
    (adsbygoogle = window.adsbygoogle || []).push({})
  }

  const overlayRef = useRef()
  const contextValues = {
    socket,
    overlayRef
  }


  
  return (
    <AppContext.Provider value={contextValues}>
    <JotaiProvider>
    <div className="App h-screen overflow-hidden flex flex-col relative">
      
      {!isLoading?
          ( <>
          <Stars/>
          <BrowserRouter>
            <Toaster />
           
              <Routes>  
                <Route path="/" element={<MainPage />} />
                <Route path='/play' element={<MainPage />} />
                <Route path='/earn' element={<Layout><Earned /></Layout>} />
                <Route path='/friends' element={<Layout><Friends /></Layout>} />
                <Route path='/stats' element={<Layout><Stats /></Layout>} />
                <Route path='/wallet' element={<Layout><Wallet /></Layout>} />
                <Route path='/userInfo' element={<Layout><UserInfo /></Layout>} />
                <Route path='/help' element={<Layout><Help /></Layout>} />
              </Routes>
            
            <Footer />
          </BrowserRouter>
          </>)
      : <Loading setLoading ={handleLoadingState} />
      
      }
    </div>
    </JotaiProvider>
    </AppContext.Provider>
  );
}

export default App;
