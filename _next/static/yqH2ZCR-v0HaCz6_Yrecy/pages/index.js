(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"/EDR":function(e,n,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a("QeBL")}])},QeBL:function(e,n,a){"use strict";a.r(n),a.d(n,"__N_SSG",(function(){return m}));var t=a("q1tI"),o=a.n(t),i=a("vOnD"),r=a("Nhdc"),s=a("2eiZ"),d=o.a.createElement;var c=function(e){console.log("The following error occured: "+e)},l=i.a.main.withConfig({displayName:"pages__Main",componentId:"o2672c-0"})(["min-height:100vh;display:flex;"]),u=i.a.aside.withConfig({displayName:"pages__Create",componentId:"o2672c-1"})(["h1{font-size:2rem;margin-bottom:2rem;}h2{font-weight:100;font-size:1.2rem;font-family:sans-serif;margin-bottom:2rem;}.record{background:var(--background-dark);h4{margin-bottom:1rem;}padding:1rem;margin-bottom:1rem;}input[type='text']{width:100%;font-size:inherit;line-height:1.5rem;font-weight:100;padding:4px;font-family:inherit;}.wrap{display:grid;grid-template-columns:1fr 1fr;grid-gap:20px;.whiteButton{display:flex;background:white;justify-content:space-between;font-weight:100;cursor:pointer;span{padding:14px 10px;}.blackButton{padding:15px;color:white;border:none;background:black;display:flex;justify-content:center;align-items:center;}}input{display:none;}}padding:2rem;flex:1;background:white;.info{font-size:10px;font-weight:100;}button{cursor:pointer;}.continue{width:100%;background:black;color:white;display:flex;justify-content:space-between;border:none;padding:1rem;span{margin:auto;}}"]),p=i.a.div.withConfig({displayName:"pages__Canvas",componentId:"o2672c-2"})(["flex:2;background:var(--background-dark);"]),m=!0;n.default=function(e){var n=e.translations,a=e.pics,o=e.seo,i=Object(t.useState)(),m=i[0],f=i[1],g=Object(t.useState)(!1),h=g[0],w=g[1],b=function(e){var n=[],a=new MediaRecorder(e);a.onstop=function(e){document.getElementById("canvas");console.log(n);var a=new Blob(n,{type:"audio/ogg; codecs=opus"}),t=window.URL.createObjectURL(a),o=document.createElement("audio");n=[],o.src=t,o.controls=!0,document.getElementById("test").appendChild(o)},a.ondataavailable=function(e){n.push(e.data)},f(a)};Object(t.useEffect)((function(){if(navigator.mediaDevices.getUserMedia){navigator.mediaDevices.getUserMedia({audio:!0}).then(b,c)}}),[]);return d(s.a.Provider,{value:a},d(s.b.Provider,{value:o},d(s.c.Provider,{value:n},d(r.a,{page:"home"},d(r.b,{seo:o}),d(l,null,d(u,null,d("h1",null,"Create your own soundwave print"),d("h2",null,"Turn your spoken words into beautiful art."),d("div",{className:"record"},d("h4",null,"Your spoken words "),d("div",{className:"wrap"},d("label",{className:"whiteButton",htmlFor:"inputAudio"},d("span",null,"Upload Audio"),d("span",{className:"blackButton"},d("i",{className:"fa fa-upload"})),d("input",{type:"file",name:"inputAudio",id:"inputAudio"})),d("div",{onClick:function(){h?m.stop():m.start(),w(!h)},className:"whiteButton"},d("span",null,h?"Stop":"Record Audio"),d("button",{className:"blackButton"},d("i",h?{className:"fa fa-stop"}:{className:"fa fa-microphone"})))),d("div",{id:"test"}),d("span",{className:"info"},"Upload or record audio up to 60 seconds long. Supported files are .mp3 and .wav")),d("div",{className:"record"},d("h4",null,"Add text to your art"),d("input",{type:"text",name:"",id:""})),d("div",{className:"record"},d("h4",null,"When was your special occasion"),d("input",{type:"text",name:"",id:""})),d("div",{className:"record"},d("h4",null,"Where was your special occasion"),d("input",{type:"text",name:"",id:""})),d("button",{className:"continue"},d("span",null,"Continue"),d("i",{className:"fa fa-arrow-right"}))),d(p,null,d("canvas",{id:"canvas"})))))))}}},[["/EDR",0,2,1,3]]]);