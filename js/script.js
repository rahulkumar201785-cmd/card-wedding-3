(function(){
  var gate=document.getElementById('gate'),medal=document.getElementById('medal');
  function open(){gate.classList.add('open');document.body.classList.remove('lock');window.scrollTo(0,0)}
  document.body.classList.add('lock');
  medal.addEventListener('click',open);
  medal.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});

  // marigold toran: hanging strands along a drooping string
  var svg=document.getElementById('toran'),NS='http://www.w3.org/2000/svg',h='';
  h+='<path d="M0 6 Q200 34 400 6" fill="none" stroke="#073b3a" stroke-width="2.5"/>';
  for(var i=0;i<9;i++){
    var x=22+i*44.5,t=(x/400),y=6+4*t*(1-t)*14;
    var len=[42,70,52,86,60,86,52,70,42][i];
    for(var k=0;k<len/9;k++){
      var cy=y+6+k*9,c=(k%2?'#f2a516':'#e8780c');
      h+='<circle cx="'+x+'" cy="'+cy+'" r="5.2" fill="'+c+'"/>';
    }
    var ey=y+6+Math.floor(len/9)*9+4;
    h+='<path d="M'+x+' '+ey+' q-8 6 0 16 q8 -10 0 -16z" fill="#0d5654"/>';
  }
  svg.innerHTML=h;

  // scratch card
  var c=document.getElementById('sc'),x=c.getContext('2d'),down=false,n=0;
  var g=x.createLinearGradient(0,0,320,160);g.addColorStop(0,'#c98a0d');g.addColorStop(.5,'#f8d27a');g.addColorStop(1,'#c98a0d');
  x.fillStyle=g;x.fillRect(0,0,320,160);
  x.fillStyle='#5a3a06';x.font='500 22px Mukta,sans-serif';x.textAlign='center';x.fillText('Yahan scratch karein',160,88);
  function pt(e){var r=c.getBoundingClientRect(),p=e.touches?e.touches[0]:e;return[(p.clientX-r.left)*320/r.width,(p.clientY-r.top)*160/r.height]}
  function sc(e){if(!down)return;e.preventDefault();var p=pt(e);x.globalCompositeOperation='destination-out';x.beginPath();x.arc(p[0],p[1],22,0,7);x.fill();
    if(++n%10===0){var d=x.getImageData(0,0,320,160).data,k=0,tot=0;for(var i=3;i<d.length;i+=32){tot++;if(d[i]===0)k++}if(k/tot>.4)c.classList.add('done')}}
  ['mousedown','touchstart'].forEach(function(ev){c.addEventListener(ev,function(e){down=true;sc(e)},{passive:false})});
  ['mousemove','touchmove'].forEach(function(ev){c.addEventListener(ev,sc,{passive:false})});
  ['mouseup','mouseleave','touchend','touchcancel'].forEach(function(ev){c.addEventListener(ev,function(){down=false})});

  // countdown to Lagan: 24 Nov 2026, 4:00 PM IST
  var T=new Date('2026-11-24T16:00:00+05:30').getTime();
  function p2(v){return String(v).padStart(2,'0')}
  function tick(){var s=Math.max(0,Math.floor((T-Date.now())/1000));
    d.textContent=Math.floor(s/86400);h_.textContent=p2(Math.floor(s%86400/3600));m_.textContent=p2(Math.floor(s%3600/60));s_.textContent=p2(s%60)}
  var d=document.getElementById('d'),h_=document.getElementById('h'),m_=document.getElementById('m'),s_=document.getElementById('s');
  tick();setInterval(tick,1000);

  var msg='Jai Kumar & Manisha ke shaadi ka invitation (24-26 November 2026, Shagun Vatika, Ramgarh Bhagwanpur, Rewari): '+location.href;
  document.getElementById('wa').href='https://wa.me/?text='+encodeURIComponent(msg);
})();
