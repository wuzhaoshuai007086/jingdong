window.onload=function(){

//头部banner
	var closeBtn=$('.closebtn')[0];
	var topBannerBox=$('.top_banner_box')[0];
	closeBtn.onclick=function(){
		topBannerBox.style.display='none';
	}


// banner轮播
	var bannerBox=getClass('banner_new')[0];
	var imgs=getClass('img_box',bannerBox)[0].getElementsByTagName('a');
	var imgNum=getClass('img_num',bannerBox)[0].getElementsByTagName('p');
	var btnLeft=getClass('btn_left',bannerBox)[0];
	var btnRight=getClass('btn_right',bannerBox)[0];
	var now=0;
	var next=0;
	var flag=true;
	//自动轮播
	var b=setInterval(bannerMove,4000);
	function bannerMove(){
		if (!flag) {
			return;
		}
		flag=false;
		next++;
		if (next>imgs.length-1) {
			next=0;
		};
		animate(imgs[now],{opacity:0,zIndex:0},300);
		animate(imgs[next],{opacity:1,zIndex:1},300,function(){
			flag=true;
		});
		imgNum[now].className="";
		imgNum[next].className="img_num_style";
		now=next;
	}
	//鼠标移上去停止
	bannerBox.onmouseover=function(){
		clearInterval(b);
	}
	bannerBox.onmouseout=function(){
		b=setInterval(bannerMove,3000);
	}
	//左右按钮切换
	btnRight.onclick=function(){
		bannerMove();
	}
	btnLeft.onclick=function(){
		if (!flag) {
			return;
		}
		flag=false;
		next--;
		if (next<0) {
			next=imgs.length-1;
		}
		animate(imgs[now],{opacity:0,zIndex:0},300);
		animate(imgs[next],{opacity:1,zIndex:1},300,function(){
			flag=true;
		});
		imgNum[now].className="";
		imgNum[next].className="img_num_style";
		now=next;		
	}
	//选项卡模式
	for(var i=0; i<imgNum.length; i++){
		imgNum[i].index=i;
		imgNum[i].onclick=function(){
			if (now==this.index||!flag) {  //如果当前显示的这张就是要点击的这张，就不需要执行下面代码
				                           //或者如果上一个动画还没完成就点击，就不会执行下面的代码
				return;
			}
			flag=false;
			next=this.index;  //让点击和自动轮播关联起来
			animate(imgs[now],{opacity:0,zIndex:0},300);
			animate(imgs[next],{opacity:1,zIndex:1},300,function(){
				flag=true;
			});
			imgNum[now].className="";
			imgNum[next].className="img_num_style";
			now=next;
		}
	}
	
	


//slider轮播
for(var i=0; i<getClass('slider').length; i++){
    var sliderBox=getClass('slider')[i];  //获取大盒子
	// console.log(sliderBox);
	var imgBox=getClass('slider_img_box',sliderBox)[0];  //获取图片盒子
	// console.log(imgBox);
	var images=imgBox.getElementsByTagName('li');   //获取图片集合
	// console.log(images);
	var imgW=parseInt(getStyle(images[0],'width'));  //获取图片宽度,注意转为整形
	// alert(imgW);
	images[0].style.left=0;  //让第一张默认显示
	var imageNum=getClass('slider-num',sliderBox)[0].getElementsByTagName('p');  //获取图片号码
	// console.log(imageNum);
	// alert(imgBox.style.width);
	var btnL=getClass('left',sliderBox)[0];
	// console.log(btnL);
	var btnR=getClass('right',sliderBox)[0];
	// console.log(btnR);
	wheel(sliderBox,images,imgW,imageNum,btnL,btnR,"slider-num-style",2000,200);
}


//热门晒单轮播
	var sdBox=$('.sw')[0];
	// console.log(sdBox);
	var sdSlider=$('ul',sdBox)[0];
	// console.log(sdSlider);
	var sdImgs=$('li',sdBox);
	// console.log(sdImgs);
	var sliderH=parseInt(getStyle(sdImgs[0],'height'))+20;
	sdSlider.style.height=sliderH*sdImgs.length+'px';  //修改ul盒子的高度
	// alert(sdSlider.style.height);
	sdSlider.style.top=-sliderH*(sdImgs.length-2)+'px';
	sdSlider.style.top=-sliderH*(sdImgs.length-2)+'px';
	var y=0;
	var s=setInterval(moveDown,2000);
	function moveDown(){
		animate(sdSlider,{top:-sliderH*(sdImgs.length-3)},300,function(){
			sdSlider.style.top=-sliderH*(sdImgs.length-2)+'px';
			sdSlider.insertBefore(getLastChild(sdSlider),getFirstChild(sdSlider));
		});
	}
	sdBox.onmouseover=function(){
		clearInterval(s);
	}
	sdBox.onmouseout=function(){
		s=setInterval(moveDown,2000);
	}


//今日推荐
    var todayImgBox=getClass('today_img_box')[0];
    var todayImgs=todayImgBox.getElementsByTagName('li');  //获取轮播块
    var todayImgW=parseInt(getStyle(todayImgs[0],'width'));  //获取每个轮播块的宽度
    todayImgs[0].style.left=0;
    var todayBtnL=getClass('btn',getClass('todays-right')[0])[0].getElementsByTagName('a')[0];
    var todayBtnR=getClass('btn',getClass('todays-right')[0])[0].getElementsByTagName('a')[1];
    var now=0;
    var next=0;
    var flag=true;
    todayBtnR.onclick=function(){
    	if (!flag) {
    		return;
    	};
    	flag=false;
    	next++;
    	if (next>todayImgs.length-1) {
    		next=0;
    	};
    	todayImgs[next].style.left=todayImgW+"px";
    	animate(todayImgs[now],{left:-todayImgW},400);
    	animate(todayImgs[next],{left:0},400,function(){
    		flag=true;
    	});
    	now=next;
    }
    todayBtnL.onclick=function(){
    	if (!flag) {
    		return;
    	};
    	flag=false;
    	next--;
    	if (next<0) {
    		next=todayImgs.length-1;
    	};
    	todayImgs[next].style.left=-todayImgW+"px";
    	animate(todayImgs[now],{left:todayImgW},400);
    	animate(todayImgs[next],{left:0},400,function(){
    		flag=true;
    	});
    	now=next;
    }


//搜索输入框
	var shuru=getClass('shuru',getClass('serch-top')[0])[0];
	// console.log(shuru);
	var oldval=shuru.value;
	shuru.onfocus=function(){  //表单事件，光标落在文本框时
		if (this.value==oldval) {  //如果输入框中没有输入文字，也就是说还是默认文本，光标落上去时清空默认值
			this.value=""
		}
	}
	shuru.onblur=function(){  //光标失去焦点时
		if (this.value=="") {  //失去光标是，如果输入框中没有输入文本，则应该显示默认的文本
			this.value=oldval;
		}
	}


//京东品质生活鼠标移上去图片向左动
    var imgMove=getClass('xfx')[0].getElementsByTagName('img')[0];
    // console.log(imgMove);
    imgmove(imgMove,imgMove,0,10);
    function imgmove(objMouse,objMove,newmargin,oldmargin){
		objMouse.onmouseover=function(){
		    animate(objMove,{marginLeft:newmargin},200)
		}
		objMouse.onmouseout=function(){
		    animate(objMove,{marginLeft:oldmargin},200)
		}
    }


//天天低价鼠标移上去图片向左动
    for(var i=0; i<getClass('img_move',getClass('ttdj-c')[0]).length; i++){  //遍历出所有的父元素
		var imgsMouse=getClass('img_move',getClass('ttdj-c')[0])[i];
		// console.log(imgsMouse);
		var imgsMove=imgsMouse.getElementsByTagName('a')[0];   //获取每一个父元素下面的图片盒子
		// console.log(imgsMove);
		imgmove(imgsMouse,imgsMove,-10,0);
    }
    


//侧边竖条
    for(var i=0; i<getClass('box').length; i++){   //把所有的元素遍历出来
		var boxs=getClass('box')[i];
		var boxU=getClass('box_up')[i];
		var boxD=getClass('box_down')[i];
		show(boxs,boxU,boxD);
	}
	function show(boxs,boxU,boxD){
		boxs.onmouseover=function(){
		    animate(boxD,{left:-58},200);
		    boxU.style.backgroundColor="#c81623";
		    boxD.style.backgroundColor="#c81623";
		}
		boxs.onmouseout=function(){
		    animate(boxD,{left:0},800,Tween.Bounce.easeOut);
		    boxU.style.backgroundColor="#7a6e6e";
		    boxD.style.backgroundColor="#7a6e6e";
		}
	}


//今日推荐时钟
	var roundBox=$('.round')[0];
    var ang=0;  //ang为转过的角度
	var r=25;  //转动圆的半径
	var speed=5;  //速度 
	setInterval(function(){
		ang+=speed;
		roundBox.style.top=26-r*Math.cos((Math.PI/180)*ang)+"px"; //因为Math.cos()或者Math.sin()括号里面角度单位都必须是弧度，所有这里速度就定为弧度
		roundBox.style.right=26-r*Math.sin((Math.PI/180)*ang)+"px";
	},100)


//电梯导航
	var elevator=$('.elevator')[0];
	var eleList=$('li',elevator);
	var flNum=$('.elevator-f');
	var flName=$('.elevator-name');
	var floor=$('.floor');
	var flTop=[];
	for(var i=0;i<floor.length;i++){
		flTop.push(floor[i].offsetTop);  //把每层楼的offsetTop值保存到数组中
	}
	// console.log(flTop);
	for(var i=0; i<flNum.length; i++){
		eleList[i].index=i;
		eleList[i].onclick=function(){  //类似于选项卡
			animate(document.body,{scrollTop:flTop[this.index]});
			animate(document.documentElement,{scrollTop:flTop[this.index]});
		}
	}
	window.onscroll=function(){
		var doc=document.body.scrollTop?document.body:document.documentElement;
		for(var i=0;i<flTop.length;i++){
			if (doc.scrollTop>=flTop[i]) {
				for(var j=0; j<flTop.length; j++){   //把所有的样式返回到初始状态
					flNum[j].style.display='block';
					flName[j].style.display='none';
				}
				flNum[i].style.display='none';
				flName[i].style.cssText+="display:block; color:#c81623";
			};
		}
		if (doc.scrollTop<flTop[0]-600||doc.scrollTop>flTop[flTop.length-1]+200) {
			elevator.style.display='none';
		}else{
			elevator.style.display='block';
		}
	}
	



// 选项卡
	for(var i=0; i<getClass('tab_title').length; i++){
		var titles=getClass('tab_title')[i].getElementsByTagName('a');
		var tabs=getClass('tab_content',getClass('tab_box')[i]);
		// console.log(tabTitles);
		// console.log(tabs);
		// alert(tabTitles.length);
		// alert(tabs.length);
		tab(titles,tabs,"tab_style");
	}


//下拉框
	var dorpdown=$('.dorpdown')[0];
	var dorpdownBox=$('.dorpdown_box',dorpdown)[0];
	var dorpdownTop=$('.dorpdown_top',dorpdown)[0];
	hover(dorpdown,overfun,outfun);
	function overfun(){
		dorpdownBox.style.cssText+="display:block;";
		dorpdownTop.style.cssText+="border-bottom:1px solid #fff;";
		dorpdown.style.cssText+="background:#fff; border-left:1px solid #ddd; border-right:1px solid #ddd; padding:0 0 0 1px;";
	}
	function outfun(){
		dorpdownBox.style.cssText+="display:none;";
		dorpdownTop.style.cssText+="border:none;";
		dorpdown.style.cssText+="background:none; border:none; padding:0 2px;";
	}
	dorpdownBox.onclick=function(e){
		var ev=e||window.event;
		var elm=ev.target||ev.srcElement;
		elm.className+=' selected';
	}

	var hoverBox0=$('.hover')[0];
	var hoverDrop0=$('.hover_dorp')[0];
	var hoverTop0=$('.hover_top')[0];
	hover(hoverBox0,function (){
		hoverTop0.style.cssText+="background:#fff; border-left:1px solid #ddd; border-right:1px solid #ddd; padding:0 24px 0 7px";
		hoverDrop0.style.display='block';
	},function (){
		hoverTop0.style.cssText+="background:none; border:none; padding:0 25px 0 8px";
		hoverDrop0.style.display='none';
	});
	
	var hoverBox1=$('.hover')[1];
	var hoverDrop1=$('.hover_dorp')[1];
	var hoverTop1=$('.hover_top')[1];
	hover(hoverBox1,function (){
		hoverTop1.style.cssText+="background:#fff; border-left:1px solid #ddd; border-right:1px solid #ddd; padding:0 24px 0 24px";
		hoverDrop1.style.display='block';
	},function (){
		hoverTop1.style.cssText+="background:none; border:none; padding:0 25px 0 25px";
		hoverDrop1.style.display='none';
	});

	var hoverBox2=$('.hover')[2];
	var hoverDrop2=$('.hover_dorp')[2];
	var hoverTop2=$('.hover_top')[2];
	hover(hoverBox2,function (){
		hoverTop2.style.cssText+="background:#fff; border-left:1px solid #ddd; border-right:1px solid #ddd; padding:0 24px 0 7px";
		hoverDrop2.style.display='block';
	},function (){
		hoverTop2.style.cssText+="background:none; border:none; padding:0 25px 0 8px";
		hoverDrop2.style.display='none';
	});

	var hoverBox3=$('.hover')[3];
	var hoverDrop3=$('.hover_dorp')[3];
	var hoverTop3=$('.hover_top')[3];
	hover(hoverBox3,function (){
		hoverTop3.style.cssText+="background:#fff; border-left:1px solid #ddd; border-right:1px solid #ddd; padding:0 24px 0 7px";
		hoverDrop3.style.display='block';
	},function (){
		hoverTop3.style.cssText+="background:none; border:none; padding:0 25px 0 8px";
		hoverDrop3.style.display='none';
	});

	var hoverBox4=$('.hover')[4];
	var hoverDrop4=$('.hover_dorp')[4];
	var hoverTop4=$('.hover_top')[4];
	hover(hoverBox4,function (){
		hoverTop4.style.cssText+="background:#fff; border-left:1px solid #ddd; border-right:1px solid #ddd; padding:0 24px 0 7px";
		hoverDrop4.style.display='block';
	},function (){
		hoverTop4.style.cssText+="background:none; border:none; padding:0 25px 0 8px";
		hoverDrop4.style.display='none';
	});

//banner左边的右拉框
	var innerDhBox=$('.inner_dh_box')[0];
	var innerItems=$('.inner-item');
	console.log(innerItems);
	var innerDrop=$('.inner_drop')[0];
	var itemSubs=$('.item_sub');
	console.log(itemSubs);
	hover(innerDhBox,function(){
		innerDrop.style.display="block";
	},function(){
		innerDrop.style.display="none";
		for(var i=0; i<innerItems.length; i++){
			innerItems[i].className=innerItems[i].className.substr(0,10);
		}
	});
	for(var i=0; i<innerItems.length; i++){
		innerItems[i].index=i;
		innerItems[i].onmouseover=function(){
			for(var j=0; j<itemSubs.length; j++){
				innerItems[j].className=innerItems[j].className.substr(0,10);
				itemSubs[j].style.display="none";
			}
			innerItems[this.index].className+=" hover";
			itemSubs[this.index].style.display="block";
		}
	}


//按需加载
	var loading=$('.loading');
	var ch=document.documentElement.clientHeight;  //获取浏览器窗口高度
	var arr=[];
	for(var i=0; i<loading.length; i++){
		arr.push(loading[i].offsetTop);   //把每层楼的offsetTop值保存到数组中
	}
	window.onscroll=function(){
		var tops=document.body.scrollTop||document.documentElement.scrollTop; //谷歌支持给body加，其他支持的是给<html>加
		for(var i=0; i<loading.length; i++){
			var imgs=$('img',loading[i]);
			for(var j=0; j<imgs.length; j++){
				if (tops>arr[i]-ch) {
					imgs[j].src=imgs[j].getAttribute('asrc');
				};
			}
		}

		for(var i=0;i<flTop.length;i++){
			if (tops>=flTop[i]) {
				for(var j=0; j<flTop.length; j++){   //把所有的样式返回到初始状态
					flNum[j].style.display='block';
					flName[j].style.display='none';
				}
				flNum[i].style.display='none';
				flName[i].style.cssText+="display:block; color:#c81623";
			};
		}
		if (tops<flTop[0]-600||tops>flTop[flTop.length-1]+200) {
			elevator.style.display='none';
		}else{
			elevator.style.display='block';
		}
	}



}