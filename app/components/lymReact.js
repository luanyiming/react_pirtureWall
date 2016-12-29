var React = require('react');
var ReactDOM = require('react-dom');
var style = require("../css/lymReact.css");
var imgData = require('../imageDatas.json');
//获取图片的url
(function getImgData(img){
	for (var i = 0; i < img.length; i++) {
		var singleImg = img[i];
		singleImg.url = require('../images/' + singleImg.fileName);
		img[i] = singleImg;
	}
})(imgData);
/*获取图片的top,left随机数值*/
function getRangeRandom(low,high){
	return Math.ceil(Math.random() * (high - low) + low);
}
//单个图片组件
var ImgFigure = React.createClass({
	render:function(){
		return(
			<figure className='img_fig'>
				<img src={this.props.data.url} />
				<figcaption>
					<h2 className='img_title'>{this.props.data.title}</h2>
				</figcaption>
			</figure>
		)
	}
})
//舞台组件
var Stage = React.createClass({
	getInitialState:function(){
		return{
			imgsArrangeArr:[]
		}
	},
  	content:{
  		cenPos:{ //中心图片
  			left:0,
  			top:0,
  		},
  		hPosRange:{ //左右分区取值范围
  			leftSecX:[0,0],
  			rightSecX:[0,0],
  			y:[0,0]
  		},
  		vPosRange:{ //上分区取值范围
  			x:[0,0],
  			topY:[0,0]
  		}
  	},
  	//设置每个图片的不同pos位置
  	rearrange:function(centerIndex){
  		var imgsArrangeArr = this.state.imgsArrangeArr,
  			content = this.content,
  			centerPos = content.cenPos,
  			hPosRange = content.hPosRange,
  			vPosRange = content.vPosRange,
  			hPosRangLeftSecX = hPosRange.leftSecX,
  			hPosRangRightSecX = hPosRange.rightSecX,
  			hPosRangeY = hPosRange.y,
  			vPosRangeX = vPosRange.x,
  			vPosRangeTopY = vPosRange.topY,
  			imgsArrangeTopArr = [],
  			topImgNum = Math.ceil(Math.random() * 2), //取0或者1个图片位于上部
  			topImgSpliceIndex = 0,
  			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
  			//布局centerIndex图片剧中 
  			imgsArrangeCenterArr[0].pos = centerPos;
  			//取出上部图片的信息
  			topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
  			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
  			//布局上部的0或者1个图片
  			imgsArrangeTopArr.forEach(function(value,index){
  				imgsArrangeTopArr[index].pos = {
  					left: getRangeRandom(vPosRangeX[0],vPosRangeX[1]),
  					top: getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1])
  				}
  			})
  			//console.log(imgsArrangeTopArr);

  	},
  	//组件加载后计算图片的pos位置
  	componentDidMount :function(){
  		//高版本react不需要使用findDOMNode,获取舞台大小
  		var stageDOM = this.refs.stage, 
  			stageW = stageDOM.scrollWidth,
  			stageH = stageDOM.scrollHeight,
  			halfStageW = Math.ceil(stageW / 2),
  			halfStageH = Math.ceil(stageH / 2);
		//获取单个图片大小
		var imgFigureDOM = ReactDOM.findDOMNode(this.refs.ImgFigure0),
			imgW = imgFigureDOM.scrollWidth,
			imgH = imgFigureDOM.scrollHeight,
			halfImgW = Math.ceil(imgW / 2),
			halfImgH = Math.ceil(imgH / 2);
		//设置中心图片位置
		this.content.cenPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		}
		//计算左右和中心区域的取值范围
		this.content.hPosRange.leftSecX[0] = 0 - halfImgW;
		this.content.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
		this.content.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.content.hPosRange.rightSecX[1] = stageW - halfImgW;
		this.content.hPosRange.y[0] = 0 - halfImgH;
		this.content.hPosRange.y[1] = stageH - halfImgH;
		this.content.vPosRange.topY[0] = 0 - halfImgH;
		this.content.vPosRange.topY[1] = halfStageH - halfImgH * 3;
		this.content.vPosRange.x[0] = halfStageW - imgW;
		this.content.vPosRange.x[1] = halfStageW;
		this.rearrange(0);
		console.log(this.content)

  	},
  render: function () {
  	var controllerUnits = [],
  		imgFigure = [];
	imgData.forEach(function(value,index){
		if (!this.state.imgsArrangeArr[index]) {
			this.state.imgsArrangeArr[index] = {
				pos:{
					left: 0,
					right: 0
				}
			}
		}
		imgFigure.push(<ImgFigure data={value} key={index} ref={'ImgFigure' + index} />);
	}.bind(this));
    return (
  		<section className='stage' ref='stage'>
  			<section className='img_sec'>
  				{imgFigure}
  			</section>
  			<nav></nav>
  		</section>
    );
  }
});

module.exports = Stage;