//加载左部，顶部 遮罩层
$(document).ready(function(){
	$('#left').load('/left.html', function() {
		
		$(".menu > li.level1 > a").click(function() {
			$(this).addClass('active').next().show()// 下一个元素显示
			.parent().siblings().children("a").removeClass('active')//父元素的兄弟元素的子元素<a>移除'active'
			.next().hide();//他的下一个元素隐藏
		})
		
		$("ul.level2 a").each(function(index, aObj) {
			var curIndexHref = $(aObj).attr("href");
			if( curIndexHref== location.pathname) {
				$(".menu > li.level1 > a").removeClass("active");
				$(this).parent().parent().prev().addClass("active");
				
				$("ul.level2 a").removeClass("active");
				$(this).addClass("active");
				$(this).parent().parent().addClass("in");
				return false;
			};
		})
		
		$("ul.level2 a").click(function() {
			$.cookie("pathname", this.href.replace("http://" + location.host, ""), {'path': '/'});
		})
		
		if($.cookie("pathname")) {
			if(navigator.userAgent.indexOf("MSIE 6.0") > 0)
				var curMenu = $(".menu").find("a[href='http://'" + location.host + $.cookie("pathname") + "']");
			else 
				var curMenu = $(".menu").find("a[href='" + $.cookie("pathname") + "']");
		}
		
		if(curMenu.length > 0) {
			$(curMenu).parent().parent().css("display", "block");
			$(curMenu).addClass("active");
		}
	});
	
	$("#top").load("/top.html", function() {
		$("#adminName").text($.cookie("adminName"))
	});
	
	$(".modal-backdrop, .close, .hiddenFade").click(function() {
		$(".modal, .modal-backdrop").css("display", "none");
	})
	/*$('#fileModalHtml').load('/fileModal.html');*/
});


/*  打印
 * <!--startprint-->
	<!--endprint-->
<input type="button" value="打印" onclick="javascript:preview();">*/
function preview() { 
	bdhtml=window.document.body.innerHTML; 
	sprnstr="<!--startprint-->"; 
	eprnstr="<!--endprint-->"; 
	prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17); 
	prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr)); 
	window.document.body.innerHTML=prnhtml; 
	window.print(); 
} 

//ajax同步
$.ajaxSetup({   
    async : false  
}); 

//显示模态框
function showModel() {
	$(".modal, .modal-backdrop").css("display", "block");
}
//显示模态框
function hideModel() {
	$(".modal, .modal-backdrop").css("display", "none");
}

//上传文件
function myAjaxFileUpload() {
	$.ajaxFileUpload({
		url : apphost() +"/ash/doc/upload/sys;token=" + $.cookie("token"),
		secureuri: false,
		fileElementId: 'file',
		dataType : "json",
		success : function(data, status) {
			uploadCallback(data);
		}
	});
}

//判断返回是否正确
function isRight(data) {
	
	if(data.status == 'succ') {
		return true;
	}else if(data.result != null) {
		if(data.result.err != null) {
			tip(data.result.err);
			return false;
		}
	}else {
		return false;
	}
	
	
/*	if(data.result != null) {
		if(data.result.err != null) {
			tip("data.result.err");
			return false;
		}
	}else if(data.status == 'succ') {
		return true;
	}else {
		return false;
	}*/
}

//查看图片
function fetchImg(fullFileName) {
	return apphost() + "/ash/doc/fetchImg/" + fullFileName + "/sys";
}

//两秒后跳转指定页面
function reloadSecond() {
	setTimeout(function() {
		location.reload()
	}, 2000)
}

//两秒后跳转指定页面
function twoSecondTurn(href) {
	setTimeout(function() {
		window.location = href;
	}, 2000)
}

function imageValueTo(el, val) {
	$(el).attr("src", fetchImg(val));
}

//<input type="hidden" name="news.typ" function="radioValueTo"/>
function radioValueTo(el, val) {
	if(val == true)
		val = "true";
	if(val == false)
		val = "false";
		
	var radioName = $(el).attr("name").split(".")[1];
	$("input[name=" + radioName + "]").each(function(){
		if($(this).val() == val) 
			$(this).attr("checked","checked");
	})
}

