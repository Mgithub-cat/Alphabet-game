class Code{
	constructor(){
		this.char = [['A','img/A.png'],['B','img/B.png'],['C','img/C.png'],['D','img/D.png'],['E','img/E.png'],['F','img/F.png'],['G','img/G.png'],['H','img/H.png'],['I','img/I.png'],['J','img/J.png'],['K','img/K.png'],['L','img/L.png'],['M','img/M.png'],['N','img/N.png'],['O','img/O.png'],['P','img/P.png'],['Q','img/Q.png'],['R','img/R.png'],['S','img/S.png'],['T','img/T.png'],['U','img/U.png'],['V','img/V.png'],['W','img/W.png'],['X','img/X.png'],['Y','img/Y.png'],['Z','img/Z.png']]; //定义产生多少种字母
		this.length = 5; //产生5个字符
		this.current = [];
		this.position = [];
		this.speed = 1;
		this.score = 0;
		this.scoreObj = document.querySelector('.box>p:first-child>span');
		this.gq = 5;
		this.life = 10;
		this.lifeObj = document.querySelector('.box>p:last-child>span');
	}
	start(){ //开始方法
		this.getChars(this.length); //调用getchars方法
		this.keys();
		this.drop();
	}
	getChars(length){ //获取字符方法
		for(let i = 0;i < length;i++){ //遍历并产生字符
			this.getChar();
		}
	}
	checkExist(char){
		return this.current.some(element => element.innerText == char)
	};
	checkPosition(pos){
		return this.position.some(element => Math.abs(element - pos) <= 80);
	};
	getChar(){
		let num = Math.floor(Math.random()*this.char.length);
		let tops = Math.floor(Math.random()*100);
		let lefts = Math.floor((window.innerWidth - 400)*Math.random() + 200);
		let divs = document.createElement('div');
		
		do{
			num = Math.floor(Math.random()*this.char.length);
		}while(this.checkExist(this.char[num][0]));
		do{
			lefts = Math.floor((window.innerWidth - 400)*Math.random() + 200);
		}while(this.checkPosition(lefts));
		divs.style.cssText = `
			width:80px;
			height:80px;
			border-radius:15px;
			position:absolute;
			top:${tops}px;
			left:${lefts}px;
			text-align:center;
			line-height:80px;
			font-size:0px;
			background:url(${this.char[num][1]}) no-repeat center;
		`;
		divs.innerText = this.char[num][0];
		document.body.appendChild(divs);
		this.current.push(divs);
		this.position.push(lefts);
	}
	drop(){
		let that = this; //需要保存this
		this.t = setInterval(function(){
			for(let i = 0;i < that.current.length;i++){
				let tops = that.current[i].offsetTop + that.speed;
				that.current[i].style.top = tops + 'px';
				if(tops >= 500){
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.position.splice(i,1);
					that.getChar();
					that.life--;
					that.lifeObj.innerText = that.life;
					if(that.life <= 0){
						let flag = confirm('restart?');
						if(flag){
							that.restart();
						}else{
							close();
						}
					}
				}
			}
		},100)
	}
	keys(){
		let that = this;
		document.onkeydown = function(e){
			let code = String.fromCharCode(e.keyCode); //返回Unicode编码对应的字符串
			for(let i = 0;i < that.length;i++){
				if(code == that.current[i].innerText){
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.position.splice(i,1);
					that.getChar();
					that.score++;
					that.scoreObj.innerText = that.score;
					if(that.score >= that.gq){
						that.next();
					}
				}
			}
		}
	}
	next(){
		clearInterval(this.t);
		this.current.forEach(element =>{
			document.body.removeChild(element);
		});
		this.current = [];
		this.position = [];
		//this.scoreObj.innerText = 0;
		this.length++;
		this.gq += 10;
		this.getChars(this.length);
		this.drop();
	}
	restart(){
		clearInterval(this.t);
		this.current.forEach(element =>{
			document.body.removeChild(element);
		});
		this.current = [];
		this.position = [];
		this.score = 0;
		this.scoreObj.innerText = this.score;
		this.life = 10;
		this.lifeObj.innerText = this.life;
		//this.gq = 5;
		this.length = 5;
		this.getChars(this.length);
		this.drop();
	}
}