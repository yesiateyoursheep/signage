"use strict";
// noise.min.js
!function(){var r=.5*(Math.sqrt(3)-1),e=(3-Math.sqrt(3))/6,t=1/6,a=(Math.sqrt(5)-1)/4,o=(5-Math.sqrt(5))/20;function i(r){var e;e="function"==typeof r?r:r?function(){var r=0,e=0,t=0,a=1,o=(i=4022871197,function(r){r=r.toString();for(var e=0;e<r.length;e++){var t=.02519603282416938*(i+=r.charCodeAt(e));t-=i=t>>>0,i=(t*=i)>>>0,i+=4294967296*(t-=i)}return 2.3283064365386963e-10*(i>>>0)});var i;r=o(" "),e=o(" "),t=o(" ");for(var n=0;n<arguments.length;n++)(r-=o(arguments[n]))<0&&(r+=1),(e-=o(arguments[n]))<0&&(e+=1),(t-=o(arguments[n]))<0&&(t+=1);return o=null,function(){var o=2091639*r+2.3283064365386963e-10*a;return r=e,e=t,t=o-(a=0|o)}}(r):Math.random,this.p=n(e),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(var t=0;t<512;t++)this.perm[t]=this.p[255&t],this.permMod12[t]=this.perm[t]%12}function n(r){var e,t=new Uint8Array(256);for(e=0;e<256;e++)t[e]=e;for(e=0;e<255;e++){var a=e+~~(r()*(256-e)),o=t[e];t[e]=t[a],t[a]=o}return t}i.prototype={grad3:new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),grad4:new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]),noise2D:function(t,a){var o,i,n=this.permMod12,f=this.perm,s=this.grad3,v=0,h=0,l=0,u=(t+a)*r,d=Math.floor(t+u),p=Math.floor(a+u),M=(d+p)*e,m=t-(d-M),c=a-(p-M);m>c?(o=1,i=0):(o=0,i=1);var y=m-o+e,w=c-i+e,g=m-1+2*e,A=c-1+2*e,x=255&d,q=255&p,D=.5-m*m-c*c;if(D>=0){var S=3*n[x+f[q]];v=(D*=D)*D*(s[S]*m+s[S+1]*c)}var U=.5-y*y-w*w;if(U>=0){var b=3*n[x+o+f[q+i]];h=(U*=U)*U*(s[b]*y+s[b+1]*w)}var F=.5-g*g-A*A;if(F>=0){var N=3*n[x+1+f[q+1]];l=(F*=F)*F*(s[N]*g+s[N+1]*A)}return 70*(v+h+l)},noise3D:function(r,e,a){var o,i,n,f,s,v,h,l,u,d,p=this.permMod12,M=this.perm,m=this.grad3,c=(r+e+a)*(1/3),y=Math.floor(r+c),w=Math.floor(e+c),g=Math.floor(a+c),A=(y+w+g)*t,x=r-(y-A),q=e-(w-A),D=a-(g-A);x>=q?q>=D?(s=1,v=0,h=0,l=1,u=1,d=0):x>=D?(s=1,v=0,h=0,l=1,u=0,d=1):(s=0,v=0,h=1,l=1,u=0,d=1):q<D?(s=0,v=0,h=1,l=0,u=1,d=1):x<D?(s=0,v=1,h=0,l=0,u=1,d=1):(s=0,v=1,h=0,l=1,u=1,d=0);var S=x-s+t,U=q-v+t,b=D-h+t,F=x-l+2*t,N=q-u+2*t,C=D-d+2*t,P=x-1+.5,T=q-1+.5,_=D-1+.5,j=255&y,k=255&w,z=255&g,B=.6-x*x-q*q-D*D;if(B<0)o=0;else{var E=3*p[j+M[k+M[z]]];o=(B*=B)*B*(m[E]*x+m[E+1]*q+m[E+2]*D)}var G=.6-S*S-U*U-b*b;if(G<0)i=0;else{var H=3*p[j+s+M[k+v+M[z+h]]];i=(G*=G)*G*(m[H]*S+m[H+1]*U+m[H+2]*b)}var I=.6-F*F-N*N-C*C;if(I<0)n=0;else{var J=3*p[j+l+M[k+u+M[z+d]]];n=(I*=I)*I*(m[J]*F+m[J+1]*N+m[J+2]*C)}var K=.6-P*P-T*T-_*_;if(K<0)f=0;else{var L=3*p[j+1+M[k+1+M[z+1]]];f=(K*=K)*K*(m[L]*P+m[L+1]*T+m[L+2]*_)}return 32*(o+i+n+f)},noise4D:function(r,e,t,i){var n,f,s,v,h,l,u,d,p,M,m,c,y,w,g,A,x,q=this.perm,D=this.grad4,S=(r+e+t+i)*a,U=Math.floor(r+S),b=Math.floor(e+S),F=Math.floor(t+S),N=Math.floor(i+S),C=(U+b+F+N)*o,P=r-(U-C),T=e-(b-C),_=t-(F-C),j=i-(N-C),k=0,z=0,B=0,E=0;P>T?k++:z++,P>_?k++:B++,P>j?k++:E++,T>_?z++:B++,T>j?z++:E++,_>j?B++:E++;var G=P-(l=k>=3?1:0)+o,H=T-(u=z>=3?1:0)+o,I=_-(d=B>=3?1:0)+o,J=j-(p=E>=3?1:0)+o,K=P-(M=k>=2?1:0)+2*o,L=T-(m=z>=2?1:0)+2*o,O=_-(c=B>=2?1:0)+2*o,Q=j-(y=E>=2?1:0)+2*o,R=P-(w=k>=1?1:0)+3*o,V=T-(g=z>=1?1:0)+3*o,W=_-(A=B>=1?1:0)+3*o,X=j-(x=E>=1?1:0)+3*o,Y=P-1+4*o,Z=T-1+4*o,$=_-1+4*o,rr=j-1+4*o,er=255&U,tr=255&b,ar=255&F,or=255&N,ir=.6-P*P-T*T-_*_-j*j;if(ir<0)n=0;else{var nr=q[er+q[tr+q[ar+q[or]]]]%32*4;n=(ir*=ir)*ir*(D[nr]*P+D[nr+1]*T+D[nr+2]*_+D[nr+3]*j)}var fr=.6-G*G-H*H-I*I-J*J;if(fr<0)f=0;else{var sr=q[er+l+q[tr+u+q[ar+d+q[or+p]]]]%32*4;f=(fr*=fr)*fr*(D[sr]*G+D[sr+1]*H+D[sr+2]*I+D[sr+3]*J)}var vr=.6-K*K-L*L-O*O-Q*Q;if(vr<0)s=0;else{var hr=q[er+M+q[tr+m+q[ar+c+q[or+y]]]]%32*4;s=(vr*=vr)*vr*(D[hr]*K+D[hr+1]*L+D[hr+2]*O+D[hr+3]*Q)}var lr=.6-R*R-V*V-W*W-X*X;if(lr<0)v=0;else{var ur=q[er+w+q[tr+g+q[ar+A+q[or+x]]]]%32*4;v=(lr*=lr)*lr*(D[ur]*R+D[ur+1]*V+D[ur+2]*W+D[ur+3]*X)}var dr=.6-Y*Y-Z*Z-$*$-rr*rr;if(dr<0)h=0;else{var pr=q[er+1+q[tr+1+q[ar+1+q[or+1]]]]%32*4;h=(dr*=dr)*dr*(D[pr]*Y+D[pr+1]*Z+D[pr+2]*$+D[pr+3]*rr)}return 27*(n+f+s+v+h)}},i._buildPermutationTable=n,"undefined"!=typeof define&&define.amd&&define(function(){return i}),"undefined"!=typeof exports?exports.SimplexNoise=i:"undefined"!=typeof window&&(window.SimplexNoise=i),"undefined"!=typeof module&&(module.exports=i)}();
// util.js
const{PI:PI,cos:cos,sin:sin,abs:abs,sqrt:sqrt,pow:pow,round:round,random:random,atan2:atan2}=Math,HALF_PI=.5*PI,TAU=2*PI,TO_RAD=PI/180,floor=a=>0|a,rand=a=>a*random(),randIn=(a,n)=>rand(n-a)+a,randRange=a=>a-rand(2*a),fadeIn=(a,n)=>a/n,fadeOut=(a,n)=>(n-a)/n,fadeInOut=(a,n)=>{let r=.5*n;return abs((a+r)%n-r)/r},dist=(a,n,r,d)=>sqrt(pow(r-a,2)+pow(d-n,2)),angle=(a,n,r,d)=>atan2(d-n,r-a),lerp=(a,n,r)=>(1-r)*a+r*n;
// shift.js
const circleCount=75,circlePropCount=8,circlePropsLength=circleCount*circlePropCount,baseSpeed=.1,rangeSpeed=1,baseTTL=150,rangeTTL=200,baseRadius=100,rangeRadius=200,rangeHue=60,xOff=.0015,yOff=.0015,zOff=.0015,backgroundColor="hsla(0,0%,5%,1)";let container,canvas,ctx,circles,circleProps,simplex,baseHue;function setup(){createCanvas(),resize(),initCircles(),draw()}function initCircles(){let e;for(circleProps=new Float32Array(circlePropsLength),simplex=new SimplexNoise,baseHue=220,e=0;e<circlePropsLength;e+=circlePropCount)initCircle(e)}function initCircle(e){let a,c,t,n,r,i,s,o,l,d,u;a=rand(canvas.a.width),c=rand(canvas.a.height),t=simplex.noise3D(a*xOff,c*yOff,baseHue*zOff),n=rand(TAU),i=(r=baseSpeed+rand(rangeSpeed))*cos(n),s=r*sin(n),o=0,l=baseTTL+rand(rangeTTL),d=baseRadius+rand(rangeRadius),u=baseHue+t*rangeHue,circleProps.set([a,c,i,s,0,l,d,u],e)}function updateCircles(){let e;for(baseHue++,e=0;e<circlePropsLength;e+=circlePropCount)updateCircle(e)}function updateCircle(e){let a,c,t,n,r,i,s,o,l=1+e,d=2+e,u=3+e,p=4+e,h=5+e,f=6+e,b=7+e;a=circleProps[e],c=circleProps[l],t=circleProps[d],n=circleProps[u],drawCircle(Math.floor(a),Math.floor(c),r=circleProps[p],i=circleProps[h],s=circleProps[f],o=circleProps[b]),r++,circleProps[e]=a+t,circleProps[l]=c+n,circleProps[p]=r,(checkBounds(a,c,s)||r>i)&&initCircle(e)}function drawCircle(e,a,c,t,n,r){ctx.a.save(),ctx.a.fillStyle=`hsla(${r},60%,30%,${fadeInOut(c,t)})`,ctx.a.beginPath(),ctx.a.arc(e,a,n,0,TAU),ctx.a.fill(),ctx.a.closePath(),ctx.a.restore()}function checkBounds(e,a,c){return e<-c||e>canvas.a.width+c||a<-c||a>canvas.a.height+c}function createCanvas(){container=document.querySelector(".content--canvas"),(canvas={a:document.createElement("canvas"),b:document.createElement("canvas")}).b.style="\n\t\tposition: fixed;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t",container.appendChild(canvas.b),ctx={a:canvas.a.getContext("2d"),b:canvas.b.getContext("2d")}}function resize(){let{innerWidth:e,innerHeight:a}=window;if(e>3000|a>2000){e=e/2;a=a/2};if(e>5000|a>3000){e=e/4;a=a/4};canvas.a.width=e,canvas.a.height=a,ctx.a.drawImage(canvas.b,0,0),canvas.b.width=e,canvas.b.height=a,ctx.b.drawImage(canvas.a,0,0)}function render(){ctx.b.save(),/*ctx.b.filter="blur(50px)",*/ctx.b.drawImage(canvas.a,0,0),ctx.b.restore()}function draw(){ctx.a.clearRect(0,0,canvas.a.width,canvas.a.height),ctx.b.fillStyle=backgroundColor,ctx.b.fillRect(0,0,canvas.b.width,canvas.b.height),updateCircles(),render(),window.requestAnimationFrame(draw)}window.addEventListener("load",setup),window.addEventListener("resize",resize);
// demo.js
setTimeout(() => document.body.classList.add('render'), 60);
