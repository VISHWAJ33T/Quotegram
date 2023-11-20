"use client";
import Head from "next/head";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import Script from "next/script";
export default function Translate({ children }) {
  
  return (
    <>
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        onLoad={() => {
          const googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages:
                "in,hi,bn,te,mr,ta,ur,gu,ml,kn,or,pa",
                //   "af,sq,am,ar,hy,az,eu,bn,my,bs,bg,ceb,ny,zh-TW,zh-CN,da,de,en,eo,et,tl,fi,fr,fy,gl,ka,el,gu,ht,ha,haw,iw,hi,hmn,ig,id,ga,is,it,ja,jw,yi,kn,kk,ca,km,rw,ky,ko,co,hr,ku,lo,la,lv,lt,lb,mg,ml,ms,mt,mi,mr,mk,mn,ne,nl,no,or,ps,fa,pl,pt,pa,ro,ru,sm,gd,sv,sr,st,sn,sd,si,sk,sl,so,es,sw,su,tg,ta,tt,te,th,cs,tr,tk,ug,uk,hu,ur,uz,vi,cy,be,xh,yo,zu",
              },
              "google_translate_element"
            );
          };
          window.googleTranslateElementInit = googleTranslateElementInit;
        }}
      />
      {children}
    </>
  );
}
