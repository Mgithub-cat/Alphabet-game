class Code{
	constructor(){
		this.char = ['Q','W','E','R','T','Y','U','I','O','P','V']; //定义产生多少种字母
		this.length = 5; //产生5个字符
		this.current = [];
		this.speed = 1;
	}
	start(){ //开始方法
		this.getChars(this.length); //调用getchars方法
	}
	getChars(length){ //获取字符方法
		for(let i = 0;i < length;i++){ //遍历并产生字符
			this.getChar();
			this.drop();
		}
	}
	getChar(){
		let num = Math.floor(Math.random()*this.char.length);
		let tops = Math.floor(Math.random()*100);
		let lefts = Math.floor((window.innerWidth - 400)*Math.random() + 200);
		let divs = document.createElement('div');
		divs.style.cssText = `
			width:80px;
			height:80px;
			background:lightblue;
			border-radius:15px;
			position:absolute;
			top:${tops}px;
			left:${lefts}px;
			text-align:center;
			line-height:80px;
			font-size:36px;
		`;
		divs.innerText = this.char[num];
		document.body.appendChild(divs);
		this.current.push(divs);
	}
	drop(){
		let that = this;
		setInterval(function(){
			for(let i = 0;i < that.current.length;i++){
				let tops = that.current[i].offsetTop + that.speed;
				that.current[i].style.top = tops + 'px';
				if(tops >= 500){
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.getChar();
				}
			} //需要保存this
		},100)
	}
}