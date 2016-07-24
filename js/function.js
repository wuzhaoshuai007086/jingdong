// 解决获取元素时的兼容性

// 1、getElementsByClassName兼容性解决
function getClass(classname,obj){
	var obj=obj||document;
	if(document.getElementsByClassName!=undefined){  //如果浏览器支持getElementsByClassName这个属性，执行这个条件
		return obj.getElementsByClassName(classname);
	}else{
		var allTag=obj.getElementsByTagName('*');  //先找到对象下面的所有标签
		var arr=[];
		for(var i=0; i<allTag.length; i++){
			if(compare(allTag[i].className,classname)){  //如果标签的标签名和需要的标签名一样，则这个标签就是要找的标签
				arr.push(allTag[i]);
			}
		}
		return arr;
	}
}
function compare(allclassname,needclassname){   //解决多类名时想要获取其中某个类名的时候部分浏览器不兼容，获取不到
	var arr=allclassname.split(" ");  //把类名分割成数组
	for(var i=0; i<arr.length; i++){
		if (arr[i]==needclassname) {  //如果分割后的类名有和需要的类名相同，就返回真
			return true;
		}
	}
	return false;
}

//2、解决操作内容时innerText和textContent兼容性问题
function text(obj,val){  //两个参数，对象和设置文本参数
	if (val==undefined) {    //只有一个obj参数时，就是要获取，val形参没有传入实参，自动复制undefined  
		                     //就是函数重载的思想：根据实际参数的类型和数量的不同来分别实现不同的功能
		if(obj.textContent==undefined){   //若果不支持textContent这个属性，即支持innerText这个属性，就执行这一步
		    // alert(1);
		    return obj.innerText;
	    }else if(obj.textContent){  //如果支持textContent这个属性
		    // alert(2);
		    return obj.textContent;
	    }
	}
	else{    //设置文本内容
		if(obj.textContent==undefineds){
			// alert(1);
			obj.innerText=val;
	    }else if(obj.textContent){
		    // alert(2);
		    obj.textContent=val;
	   }
	}
}

//3、获取行内样式和外部样式的通用方法兼容性解决
function getStyle(obj,attr){
	if (obj.currentStyle) {   //IE支持
		// alert(1);
		return obj.currentStyle[attr];   //因为attr是一个变量，不是属性，所有加上中括号，attr就代表属性的名字，如obj.currentStyle["width"]
	}else {   //FF  chrome支持
		// alert(2);
		return getComputedStyle(obj,null)[attr];
	}
}

//4、简化获取元素操作
	/* select：要获取的元素
	   context：在哪个范围内获取这个元素
	 */
function $(select,context){  //select参数是要获取的元素，或者是在window.onload里面执行的函数; context是在哪个范围内获取
	if (typeof select=="string") {   //如果参数是字符串类型，说明是要获取元素
		var context=context||document;
		if (select.charAt(0)=="#") {  //如果第一个字符时#，说明是获取id
			return document.getElementById(select.substr(1));  //注意传入的形参第一个字符是#，括号里面写的应该是id名，不应该前面带#，所有要截取第一个字符之后的字符
		}
		if (select.charAt(0)==".") {
			return getClass(select.substr(1),context);
		}
		if (/^[a-zA-Z][A-Za-z1-6]*$/.test(select)) {   ///^[a-zA-Z][A-Za-z1-6]*$/.test() 正则表达式，里面的规则是标签名的规则，满足这个规则，说明是获取标签名
			return context.getElementsByTagName(select);
		}
		else if (/^<[a-zA-Z][A-Za-z1-6]{0,10}>$/.test(select)) {
			return document.createElement(select.slice(1,-1));
		}
	}
	if (typeof select=="function") {  //函数的function检测是function
		window.onload=function(){
			select();
		}
	}
}


// 5、去除字符串中空格函数把空格替换为空
	/*  str：要操作的字符串
		weizhi：要替换哪个位置的空格
		其实字符串有trim这个方法，只是ie
	*/
	function trim(str,weizhi){
		weizhi=weizhi||'lr';
		if (weizhi=='a') {  //如果要替换字符串中所有空格
			return str.replace(/\s*/g,"");   //replace替换后返回新的字符串，不改变原来的字符串
		}
		if (weizhi=='l') {  //如果要替换左边的空格
			return str.replace(/^\s*/g,"");
		}
		if (weizhi=='r') {  //如果要去掉右边的空格
			return str.replace(/\s*$/g,"");
		}
		if (weizhi=='lr') {
			return str.replace(/^\s*|\s*$/g,"");
		}
	}

//6、解决除ie6-8外其他浏览器获取子节点时把换行回车都当做文本节点,用这个函数提出不需要的文本节点
	/* parent：要获取哪个父元素的子节点
	   type：是否需要这个父节点中的子文本节点 
	      y：需要
	      n：不需要
	*/
	function getChilds(parent,type){
		var childs=parent.childNodes;
		var arr=[];  //子节点是一个集合，所以要创建一个空的数组来接收这些子节点
		type=type||'y';  //默认获取子文本节点
		if (type=='n') {
			for(var i=0; i<childs.length; i++){
				if (childs[i].nodeType==1) {
					arr.push(childs[i]);
				}
			}
			return arr;
		}else if (type=='y') {
			for(var i=0; i<childs.length; i++){
				if (childs[i].nodeType==1||(childs[i].nodeType==3&&trim(childs[i].nodeValue)!="")) {
					arr.push(childs[i]);
				}
			}
			return arr;
		}
	}
	//获取第一个子节点
	function getFirstChild(parent,type){
		return getChilds(parent,type)[0];
	}
	//获取最后一个子节点
	function getLastChild(parent,type){
		var childs=getChilds(parent,type);
		return childs[childs.length-1];
	}
	//获取任意一个子节点
	function getAnyChild(parent,num,type){  //num：下标
		var childs=getChilds(parent,type);
		return childs[num];
	}
	//获取下一个兄弟节点
	function getNext(obj,type){
		var next=obj.nextSibling;
		type=type||'y';  //默认需要文本节点
		if (type=='y') {  //需要文本节点
			if (next==null) {
				return false;
			}
			while(next.nodeType==8||(next.nodeType==3&&trim(next.nodeValue)=="")){
				next=next.nextSibling;
				if (next==null) {  //如果不加这个判断条件，当满足条件一直找到最后一个节点，而最后一个节点后面没有回车换行，就会报错
					return false;
				}
			}
			if (next.nodeType==3) {
				next.nodeValue=trim(next.nodeValue);
				return next;
			}
			return next;
		}
		if (type=='n') {  //不需要文本节点
			if (next==null) {
				return false;
			}
			while(next.nodeType==8||next.nodeType==3){
				next=next.nextSibling
				if (next==null) {
					return false;
				}
			}
			return next;
		}
	}
	//获取上一个兄弟节点
	function getPrevious(obj,type){
		var next=obj.previousSibling;
		type=type||'y';  //默认需要文本节点
		if (type=='y') {  //需要文本节点
			if (next==null) {   //也得加上这句
				return false;
			}
			while(next.nodeType==8||(next.nodeType==3&&trim(next.nodeValue)=="")){
				next=next.previousSibling;
				if (next==null) {  //如果不加这个判断条件，当满足条件一直找到最后一个节点，而最后一个节点后面没有回车换行，就会报错
					return false;
				}
			}
			return next;
		}
		if (type=='n') {  //不需要文本节点
			if (next==null) {
				return false;
			}
			while(next.nodeType==8||next.nodeType==3){
				next=next.previousSibling
				if (next==null) {
					return false;
				}
			}
			return next;
		}
	}


	//给一个对象后面插入新的节点
	/*  obj1：在obj1这个对象后面添加
		obj2：添加obj2这个对象
	 */
	function insertAfter(obj1,obj2){
		var next=getNext(obj1);
		if (next==false) {
			return obj1.parentNode.appendChild(obj2);
		}
		else{
			return obj1.parentNode.insertBefore(obj2,next);
		}
	}


//7、滑动无缝轮播函数
	function wheel(wheelBox,imgs,imgW,imgNum,btnL,btnR,numStyle,wheelTime,sliderTime){
		//自动轮播
			var t=setInterval(move,wheelTime);
			var now=0;
			var next=0;
			var flag=true;
			function move(){
				if (!flag) {
					return;
				}
				flag=false;
				next++;
				if (next>imgs.length-1) {
					next=0;
				}
				fromRight();
			}
			function fromRight () {  //封装从右往左滑动画函数
				imgs[next].style.left=imgW+"px";
				animate(imgs[now],{left:-imgW},sliderTime);
				animate(imgs[next],{left:0},sliderTime,function(){
					flag=true;
				});
				imgNum[now].className="";  //因为知道上一个图片是谁，所以直接让上一个图片的样式清空，给next图片加上样式即可
				imgNum[next].className=numStyle;
				now=next;  //下一次动画的now(当前显示图片下标)是上一次动画的next
			}
			function fromLeft () {  //封装从右往左滑动画函数
				imgs[next].style.left=-imgW+"px";
				animate(imgs[now],{left:imgW},sliderTime);
				animate(imgs[next],{left:0},sliderTime,function(){
					flag=true;
				});
				imgNum[now].className="";
				imgNum[next].className=numStyle;
				now=next;
			}
		//鼠标移上去停止
			wheelBox.onmouseover=function(){
				clearInterval(t);
			}
			wheelBox.onmouseout=function(){
				t=setInterval(move,wheelTime);
			}
		//点击左右按钮切换
			btnR.onclick=function(){
				move();
			}
			btnL.onclick=function(){
				if (!flag) {
					return;
				}
				flag=false;
				next--;
				if (next<0) {
					next=imgs.length-1;
				}
				fromLeft();
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
					if (this.index>now) {
						fromRight();
					}
					if (this.index<now) {
						fromLeft();
					}
				}
			}
	}


/*
	解决给同一个事件绑定多个处理程序兼容性问题
	obj：要处理的对象
	event：事件（不用加‘on’，已经在函数中处理）
	fn：处理程序的引用（处理函数的名字）
*/
	function on(obj,event,fn){
	//火狐、谷歌、IE9-11，满足标准的当然先按照标准来，所以if先判断是否满足标准
		if (obj.addEventListener) {
			obj.addEventListener(event,fn,false);
		}
	//IE6-10支持
		else {
			obj.attachEvent('on'+event,fn);
		}
	}


/*
	解决删除多个事件中的指定事件时兼容性问题
	obj：要处理的对象
	event：事件（不用加‘on’，已经在函数中处理）
	fn：要删除的处理程序
*/
	function off(obj,event,fn){
	//火狐、谷歌、IE9-11，满足标准的当然先按照标准来，所以if先判断是否满足标准
		if (obj.removeEventListener) {
			obj.removeEventListener(event,fn,false);
		}
	//IE6-10支持
		else {
			obj.detachEvent('on'+event,fn);
		}
	}


//选项卡函数
	function tab(titles,tabs,titlestyle){
		for(var i=0; i<titles.length; i++){
			titles[i].index=i;
			titles[i].onmouseover=function(){
				for(var j=0; j<titles.length; j++){
					tabs[j].style.display="none";
					titles[j].className="";
				}
				tabs[this.index].style.display="block";
				titles[this.index].className=titlestyle;
			}
		}
	}



	//判断某个元素是否包含有另外一个元素
	function contains (parent,child) {//返回 true  parent 包含 child    返回false 不是包含关系
		if(parent.contains){//如果对象支持contains
			// 如果  父对象 包含 子对象   并且  父对象不等于 子对象 返回 true 
			return parent.contains(child) && parent!=child;
		}else{
			//父对象 包含 子对象  16   父对象 在子对象之前 4  = 20
			return (parent.compareDocumentPosition(child)===20);
		}
	}
	//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
	function checkHover (e,target) {
		//target 对象 
		if(getEvent(e).type=="mouseover"){
			return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
				!((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
		}else{
			return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
				!((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
		}
	}

	/*
	  hover(obj,overfun,outfun)  鼠标移入移除事件 
	  obj   要操作的对象
	  overfun   鼠标移入需要处理的函数
	  outfun     鼠标移除需要处理的函数
	*/
	function hover (obj,overfun,outfun) {
		if(overfun){
		    obj.onmouseover=function  (e) {
				if(checkHover(e,obj)){
					overfun.call(obj);
				}
		    }
		}
		if(outfun){
			obj.onmouseout=function  (e) {
				if(checkHover(e,obj)){
					outfun.call(obj);
				}
		    }
		}
	}

	//获得事件对象
	function getEvent (e) {
		return e||window.event;
	}



/*
	obj：要操作的对象
	upbackfn：向上滑动时候让对象干什么（回调函数）
	downbackfn：向下滑动时候让对象干什么（回调函数）
	通过滑动滚轮时浏览器返回的值来判断是向下还是向上：滚轮事件对象有一个属性是用来获取滚轮的方向
		事件对象.wheelDelta  获取滚轮滚动的方向  IE、chorm  向上：120  向下：-120
		事件对象.detail      获取滚轮滚动的方向  FF         向上：-3   向下：3
*/ 
	function mouseWheel (obj,upbackfn,downbackfn) {
		if(obj.addEventListener){
			obj.addEventListener("mousewheel",scrollFn,false);
			//chrome,safari -webkit
			obj.addEventListener("DOMMouseScroll",scrollFn,false);
			//firefox -moz-
		}else {
			obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
		}
		function scrollFn (e) {
			var ev=e||window.event;
			var ward=ev.wheelDelta||ev.detail;
			if (ward==120||ward==-3) { //向上
				upbackfn&&upbackfn.call(obj);
			}
			if (ward==-120||ward==3) { //向下
				downbackfn&&downbackfn.call(obj);
			}
			if (ev.preventDefault ){
				ev.preventDefault(); //阻止默认浏览器动作(W3C)
			}
			else{
				ev.returnValue = false;//IE中阻止函数器默认动作的方式
			}
		}
	}