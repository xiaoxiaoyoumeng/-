window.onload=function(){
	left_scroll();
}
function left_scroll(){
	// 获取ul
	var moveUl=document.querySelector(".main_left ul");
	// 获取父盒子
	var parent=document.querySelector(".main_left");
	// 获取header
	var header=document.querySelector(".list_header");
	// 获取高度
	var ulHeight=moveUl.offsetHeight;
	var parentHeight=parent.offsetHeight;
	var headerHeight=header.offsetHeight;

	var maxDistance=0;
	var minDistance=parentHeight-headerHeight-ulHeight;
	var delayDistance=150;

	var startY=0;
	var moveY=0;
	var distanceY=0;
	moveUl.addEventListener("touchstart",function(event){
		startY=event.touches[0].clientY;
	});
	moveUl.addEventListener("touchmove",function(event){
		moveY=event.touches[0].clientY-startY;
		if((moveY+distanceY)<(minDistance-delayDistance)){
			moveY=0;
			distanceY=minDistance-delayDistance;
		}else if((moveY+distanceY)>(maxDistance+delayDistance)){
			moveY=0;
			distanceY=maxDistance+delayDistance;
		}
		moveUl.style.transition="";
		moveUl.style.transform="translateY("+(moveY+distanceY)+"px)";
	})
	moveUl.addEventListener("touchend",function(event){
		distanceY+=moveY;
		if(distanceY>maxDistance){
			distanceY=maxDistance
		}else if(distanceY<minDistance){
			distanceY=minDistance
		}
		moveUl.style.transition="all .5s";
		moveUl.style.transform="translateY("+(distanceY)+"px)";
	})

	// 获取li
	var liArr=document.querySelectorAll(".main_left ul li");
	var liHeight=document.querySelector(".main_left ul li").offsetHeight;
	for (var i = 0; i < liArr.length; i++) {
		liArr[i].dataset["index"]=i;
	}
	fox_tap(moveUl,function(e){
		for (var i = 0; i < liArr.length; i++) {
			liArr[i].className="";
		}
		e.target.parentNode.className="current";
		var currentIndex=e.target.parentNode.dataset["index"];
		var moveDistance=currentIndex*liHeight*-1;
		if(moveDistance>maxDistance){
			moveDistance=maxDistance;
		}else if(moveDistance<minDistance){
			moveDistance=minDistance;
		}
		moveUl.style.transition="all .5s";
		moveUl.style.transform="translateY("+moveDistance+"px)";

	});
}