window.onload=function(){
	// 通栏滚动
	headerScroll();
	// 倒计时
	cutDownTime();
	// 轮播图效果
	banner();
}
function headerScroll(){
	var jd_header=document.querySelector(".jd_header");
	var jd_nav=document.querySelector(".jd_nav");
	var maxDistance=jd_nav.offsetHeight+jd_nav.offsetTop;
	// console.log(maxDistance);
	jd_header.style.background='rgba(201,21,35,0)';
	window.onscroll=function(){
		var scrollDistance=document.body.scrollTop||document.documentElement.scrollTop;
		var percent=scrollDistance/maxDistance;
		// console.log(percent);
		if(percent>1){
			percent=1;
		}
		jd_header.style.background='rgba(201,21,35,'+percent+')';

	}
}
function cutDownTime(){
	var totalHour=3;
	var totalSec=3*60*60;
	var liArr=document.querySelectorAll(".main_content:nth-child(1) .content_top li");
	var timeId=setInterval(function(){
		if(totalSec<=0){
			clearInterval(timeId);
			console.log("结束啦，你买不到了");
			return;
		}
		totalSec--;
		var hour=Math.floor(totalSec/3600);
		var min=Math.floor(totalSec%3600/60);
		var sec=totalSec%60;

		liArr[0].innerHTML=Math.floor(hour/10);
		liArr[1].innerHTML=hour%10;
		liArr[3].innerHTML=Math.floor(min/10);
		liArr[4].innerHTML=min%10;
		liArr[6].innerHTML=Math.floor(sec/10);
		liArr[7].innerHTML=sec%10;
	},1000);
}
function banner(){
	var width=document.body.offsetWidth;
	// 轮播ul
	var moveUl=document.querySelector(".banner_images");
	// 索引li
	var indexLiArr=document.querySelectorAll(".banner_index li");
	moveUl.style.transform="translateX("+-width+"px)";

	var startTransition=function(){
		moveUl.style.transition="all .3s";
	}
	var endTransition=function(){
		moveUl.style.transition="";
	}
	var setTransform=function(distance){
		moveUl.style.transform="translateX("+distance+"px)"
	}
	var index=1;
	var timeId=setInterval(function(){
		index++;
		// moveUl.style.transition="all .3s";
		// console.log(index);
		startTransition();
		
		// moveUl.style.transform="translateX("+index*width*-1+"px)"
		setTransform(index*width*-1);
		
	},1000);
	moveUl.addEventListener('webkitTransitionEnd',function(){
		if(index>8){
			index=1;
			// moveUl.style.transition="";
			endTransition();
			// moveUl.style.transform="translateX("+-width+"px)";
			setTransform(-width);
		}else if(index<1){
			index=8;
			// moveUl.style.transition="";
			endTransition();
			// moveUl.style.transform="translateX("+-width*index+"px)";
			setTransform(-width*index);
		}
		for(var i=0;i<indexLiArr.length;i++){
			indexLiArr[i].className="";
		}
		indexLiArr[index-1].className="current";

	})

	var startX=0;
	var moveX=0;
	var distanceX=0;
	moveUl.addEventListener('touchstart',function(event){
		console.log("触摸开始");
		clearInterval(timeId);
		// moveUl.style.transition="";
		endTransition();
		startX=event.touches[0].clientX;
	});

	moveUl.addEventListener('touchmove',function(event){
		moveX=event.touches[0].clientX-startX;
		console.log(moveX);
		// moveUl.style.transform="translateX("+(moveX+index*width*-1)+"px)";
		setTransform(moveX+index*width*-1);
	});

	moveUl.addEventListener('touchend',function(){
		var maxDistance=width/3;
		if(Math.abs(moveX)>maxDistance){
			if(moveX>0){
				index--;
			}
			else{
				index++;
			}
			// moveUl.style.transition="all .3s";
			startTransition();
			setTransform(index*width*-1);
			// moveUl.style.transform="translateX("+(index*width*-1)+"px)";
		}
		else{
			// moveUl.style.transition="all .3s";
			startTransition();
			// moveUl.style.transform="translateX("+(index*width*-1)+"px)";
			setTransform(index*width*-1);
		}
		timeId=setInterval(function(){
			index++;
			// moveUl.style.transition="all .3s";
			startTransition();
			// moveUl.style.transform="translateX("+(index*width*-1)+"px)";
			setTransform(index*width*-1);
		},1000);
	});
}