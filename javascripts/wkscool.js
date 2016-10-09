// JavaScript Document
var lrcs,
	index = 0,
	lineH,lines,zxx;
document.addEventListener('DOMContentLoaded', loaded, false);
var myScroll;

function loaded() {
	var audio;
	
	init();
	wkscool_player_QQ398043454();
	
	myScroll = new iScroll('wrapper', {
		snap: true,
		momentum: false,
		hScrollbar: false,
		onScrollEnd: function() {
			document.querySelector('#indicator > li.active').className = '';
			document.querySelector('#indicator > li:nth-child(' + (this.currPageX + 1) + ')').className = 'active';
		}
	});

}

function init(){
	var count = document.getElementById("thelist").getElementsByTagName("li").length;	

for(i=0;i<count;i++){
	document.getElementById("thelist").getElementsByTagName("li").item(i).style.width = document.documentElement.clientWidth+"px";
	document.getElementById("thelist").getElementsByTagName("li").item(i).style.height = document.documentElement.clientHeight+"px";
}
document.getElementById("scroller").style.cssText = " width:"+document.documentElement.clientWidth*count+"px";

setInterval(function(){
	myScroll.scrollToPage('next', 0,400,count);
},3500 );

window.onresize = function(){ 
	for(i=0;i<count;i++){
		document.getElementById("thelist").getElementsByTagName("li").item(i).style.width = document.documentElement.clientWidth+"px";
		document.getElementById("thelist").getElementsByTagName("li").item(i).style.height = document.documentElement.clientHeight+"px";
		//document.getElementById("thelist").getElementsByTagName("img").item(i).style.width = document.documentElement.clientWidth+"px";
		//document.getElementById("thelist").getElementsByTagName("img").item(i).style.height = document.documentElement.clientHeight+"px";
	}
	document.getElementById("scroller").style.cssText = " width:"+document.documentElement.clientWidth*count+"px";
} 


$(function(){
	$(".plug-menu").click(function(){
		var li = $(this).parents('ul').find('li');
		if(li.attr("class") == "themeStyle on"){
			li.removeClass("themeStyle on");
			li.addClass("themeStyle out");
		}else{
			li.removeClass("themeStyle out");
			li.addClass("themeStyle on");
		}
	});
	
	$(".bar").click(function(e){
		
		//e.preventDefault();
        //console.log(e);
        lpzwidth=$('.bar').width();//进度条总长度
		
        mp3zsec=audio.duration;									//歌曲播放总秒数
        //当前点击位置
        left=getX(document.getElementById("bar"));
        curwidth=e.clientX-left+document.documentElement.scrollLeft-8;
        //  当前点击播放位置秒数=（当前点击位置*歌曲播放总秒数）/ 进度条总长度
        curptime=(curwidth*mp3zsec)/lpzwidth;
        //改变当然播放秒数
        audio.currentTime=curptime;
		UPDATALRC(audio.currentTime);
	});
	
	$("#playc").click(function(e){
		if(audio){
			if(audio.paused){
				audio.play();
				document.getElementById("playc").innerHTML="点击暂停"	
			}else{
                audio.pause();
				document.getElementById("playc").innerHTML="点击播放"				
			}	
		}
		
	});
	
	
});


}//end init



//wkscool_player_QQ398043454
function wkscool_player_QQ398043454(){
	audio=new Audio();
	audio.src=qq398043454_src;
	audio.autoplay=true;
	audio.loop=true;
	audio.addEventListener('timeupdate',audio_timeupdata_fun);
	
	lrcs=GETLRC(document.getElementById("lrcc").innerHTML)
	ADDLRC(lrcs);
	//alert( $('.play_bar_load').css( 'width',"30%"))
	audio.play();
	
	
	
}

//播放时间
function timefor60(time) {//默认获取的时间是时间戳改成我们常见的时间格式
    //分钟
    var minute = time / 60;
    var minutes = parseInt(minute);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    //秒
    var second = time % 60;
    seconds = parseInt(second);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var allTime = "" + minutes + "" + ":" + "" + seconds + ""
    return allTime
}

function getX(obj)
{
	var parObj=obj;
	var left=obj.offsetLeft;
	while(parObj=parObj.offsetParent)
	{
		left+=parObj.offsetLeft;
	}
	return left;
}

//wkscool by QQ398043454 lrc

function GETLRC (content) {
	content=content.replace("<!--","");
	content=content.replace("-->","");
	content = content.replace(/\[\:\][^$\n]*(\n|$)/g,"$1");		//去掉注解
	content = content.replace(/\[[^\[\]\:]*\]/g,"");
	content = content.replace(/\[[^\[\]]*[^\[\]\d]+[^\[\]]*\:[^\[\]]*\]/g,"");
	content = content.replace(/\[[^\[\]]*\:[^\[\]]*[^\[\]\d\.]+[^\[\]]*\]/g,"");
	//alert(content)
	var result = new Array();
	var cArr = content.split("[");
	cArr.shift();
	//alert(cArr)
	for (var i = 0; i < cArr.length; i++) {
		//alert(cArr(i))
		var o = cArr[i].split("]");

		if (o.length >= 2 && o[1] != "") {
			var tArr = o[0].split(":"), t = 0;

			if (tArr.length >= 2) {
				var mtArr = tArr[0].split(""), mt = 0;

				for (var k = 0; k < mtArr.length; k++) {
					if (Number(mtArr[k]) > 0) {
						mt += mtArr[k] * Math.pow(10, mtArr.length - k - 1);
					}
				}

				t += mt * 60;

				var stArr = tArr[1].split("."), intStArr = stArr[0].split(""), st = 0;

				for (var j = 0; j < intStArr.length; j++) {
					if (Number(intStArr[j]) > 0) {
						st += intStArr[j] * Math.pow(10, intStArr.length - j - 1);					
					}
				}

				t += Number(st + "." + stArr[1]);
			}

			result.push({time : t, content : o[1]});
		}
	}
	return result;
}

function getOffset(text){
   var offset = 0;
        try {
            // Pattern matches [offset:1000]
            var offsetPattern = /\[offset:\-?\+?\d+\]/g,
                // Get only the first match.
                offset_line = text.match(offsetPattern)[0],
                // Get the second part of the offset.
                offset_str = offset_line.split(':')[1];
            // Convert it to Int.
            offset = parseInt(offset_str);
        } catch (err) {
            //alert("offset error: "+err.message);
            offset = 0;
        }
        return offset;
}//end fun getOffset

function ADDLRC(text){
	var fragment = document.createDocumentFragment();
	var lrc=document.getElementById("lrcc");
	for (var i = 0; i < text.length; i++) {
		var line = document.createElement('p');
        line.id = 'line-' + i;
        line.textContent =text[i].content;
        fragment.appendChild(line);
	}
	lrc.appendChild(fragment);
	$('#lrc').css( 'height', window.innerHeight/3);
	zxx=document.getElementById("lrcc").offsetTop;
	lines=text.length;//63
	lineH=document.getElementById("lrcc").offsetHeight/lines;//40
	//alert(lineH)
	//lrc.style.top = window.innerHeight/2
	//setInterval(function(){lrc.scrollTop++;},60)
	//$("#lrcc").animate({top:"0px"},6000);
}//end fun appendLyric

function UPDATALRC(at) {

	if (index >= lrcs.length) {
		return;
	}
	
	for(var i=0;i<lines;i++){
		
		//alert(lines)
		if(at>lrcs[i+1].time){
			
		}else{
			index=i;
			break;
		}
	}
	
	
	

	var ct = audio.currentTime;
	//alert(lrcs[index+1].time)
	var minT = lrcs[index].time,
	maxT = ((index + 1) < lrcs.length) ? lrcs[index + 1].time : audio.duration;
	//maxT=lrcs[index+1].time;
	///alert(ct>minT)
	
	preTxt
	if (ct >= minT && ct <= maxT) {
		$("#lrcc").stop();
		
		var perS=index-1;
		var preTxt = document.getElementById('line-' + perS);
		var hg=document.getElementById("lrcc").offsetHeight/lrcs.length;
		
		var currentTxt = document.getElementById('line-' + index);
		//alert(document.getElementById('line-' + index).innerHTML)
		if (currentTxt) {
			$("#lrcc").animate({top:zxx-lineH*index},(maxT-minT)*100,function(){index++;});
			//currentTxt.animate({color:"#fff"},(maxT-minT)*1000);
			
			document.getElementById('line-' + index).style.color="#F00";
			
			
		}
		if (preTxt) {
			document.getElementById('line-' + perS).style.color="#fff";
			//preTxt.style.color="#fff";
			//document.getElementById("lrcc").style=zxx-lineH*index;
			
			
			
			
		}
		
	}else{
		document.getElementById("cur_time").innerHTML="sss"
	}
}
//audio 事件
function audio_timeupdata_fun(e){
    //document.getElementById("cur_time").innerHTML=timefor60(audio.currentTime);
	document.getElementById("cur_time").innerHTML=timefor60(audio.currentTime);
	document.getElementById("tot_time").innerHTML=timefor60(audio.duration);
	document.getElementById("playc").innerHTML="点击暂停";
	var width = parseInt($('.bar').css('width'));
    var percentPlayed = audio.currentTime / audio.duration * 100+"%";
    var barWidth = Math.ceil(percentPlayed * (width / 100));
    $('.play_bar_play').css( 'width', percentPlayed);
    //$('.bar .play_bar_play').css( 'left', percentPlayed);	
	//document.getElementById("play_bar_load").style.width=percentPlayed;
	
	//updata lrc
	if(lrcs){
	UPDATALRC(audio.currentTime);}
}


