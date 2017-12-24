//加载左部，顶部 遮罩层
$(document).ready(function(){
	$('#left').load('/left.html', function() {
		
		$(".menu > li.level1 > a").click(function() {
			$(this).addClass('active').next().show()// 下一个元素显示
			.parent().siblings().children("a").removeClass('active')//父元素的兄弟元素的子元素<a>移除'active'
			.next().hide();//他的下一个元素隐藏
		})
		
		$("ul.level2 a").click(function() {
			$("ul.level2 a").removeClass("active");
			$(this).addClass("active");
		})
		
	});
	
	$("#top").load("/top.html", function() {
		$("#adminName").text($.cookie("adminName"))
	});
	
	/*$('#fileModalHtml').load('/fileModal.html');*/
});

$(".modal-backdrop, .close, .hiddenFade").click(function() {
	$(".modal, .modal-backdrop").css("display", "none");
})

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

//查看图片
function fetchImg(fullFileName) {
	return apphost() + "/ash/doc/fetchImg/" + fullFileName + "/sys";
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

