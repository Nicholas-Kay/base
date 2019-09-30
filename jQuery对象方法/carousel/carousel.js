(function($){
	$.fn.carousel = function() {
		var slider = this;
		var imgList = this.find('.imgList');
		var imgWidth = this.find('.imgList li').eq(0).width(); //每张图片的宽度
		var point = this.find('.pointBox .point');
		var timer = null; //声明一个定时器变量
		var count = 0; //计数器赋初值0

		point.on('click', function(){
			$(this).addClass('active').siblings('span').removeClass('active'); //点击圆点，添加对应的class选择器，其他元素上的移除
			count = $(this).index(); // 获取当前图片的下标
			imgList.animate({
				'left': "-" + imgWidth * count + "px" //计算图片的偏移量
			});
		});

		//左右按钮的控制
		$(".next").stop(true, true).click(function(){
			count++;
			if(count === point.length){
				count = 0;
			}
			point.eq(count).trigger('click'); //取消对应的小圆点的click事件
		});

		$(".prev").stop(true, true).click(function(){
			count--;
			if(count === point.length){
				count = 0;
			}
			point.eq(count).trigger('click'); //取消对应的小圆点的click事件
		});

		//开始定时器
		timer = setInterval(function(){
			count++;
			if(count === point.length){
				count = 0;
			}
			point.eq(count).trigger('click');
		}, 3000);
		
		//鼠标悬停在图片上
		slider.hover(function(){
			$(".next, .prev").animate({
				"opacity": 1,
			},200);
			clearInterval(timer); // 清除定时器，停止轮播
		}, function(){
			$(".next, .prev").animate({
				"opacity": 0,
			}, 500);
			timer = setInterval(function(){
				count++;
				if(count === point.length){
					count = 0;
				}
				point.eq(count).trigger('click');
			}, 3000);
		});
	}
}(jQuery))