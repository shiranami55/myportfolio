var Engine = Matter.Engine, //物理シュミレーションおよびレンダリングを管理するコントローラーとなるメソッド
	World = Matter.World, //物理演算領域の作成・操作するメソッドを含む
	Body = Matter.Body, //剛体のモデルを作成・操作するメソッドを含む
	Bodies = Matter.Bodies, //一般的な剛体モデルを作成するメソッドを含む
	Constraint = Matter.Constraint, //制約を作成・操作するメソッドを含む
	Composites = Matter.Composites,
	Common = Matter.Common,
	Vertices = Matter.Vertices, //頂点のセットを作成・操作するメソッドを含む
	MouseConstraint = Matter.MouseConstraint; //マウスの制約を作成するためのメソッドが含む
		
// Matter.jsのEngineを作成
var container = document.getElementById('canvas');
var engine = Engine.create(container, {
	render: { //レンダリングの設定
		options: {
			wireframes: false, //ワイヤーフレームモードをoff
			width: 2000, //canvasのwidth(横幅)
			height: 1000, //canvasのheight(高さ)
			background: 'rgba(0, 0, 0, 0)'
			
		}
	}
});

//壁の生成（初期）
var wall = new Array(4);
create_wall();


//マウス移動時のイベントをBODYタグに登録する
document.body.addEventListener("mousemove", function(e){
 
    //座標を取得する
    var mX = e.pageX;  //X座標
    var mY = e.pageY;  //Y座標
 
	engine.world.gravity.x = (mX - (window.innerWidth/2)) / window.innerWidth;
	engine.world.gravity.y = (mY - (window.innerHeight/2))/ window.innerHeight;
});


// マウス操作を追加
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);




//window幅
var lastInnerWidth = window.innerWidth ;
var lastInnerHeight = window.innerHeight ;
window.addEventListener( "resize", function () {
	// 現在と前回の横幅が違う場合だけ実行
	if ( (lastInnerWidth != window.innerWidth) ||  (lastInnerHeight != window.innerHeight)) {
		// 横幅を記録しておく
		lastInnerWidth = window.innerWidth ;
		lastInnerHeight = window.innerheight;
		//console.log(lastInnerWidth);
		//console.log(lastInnerHeight);
		
		Matter.World.remove(engine.world, wall);
		
		create_wall();
		
	}
} ) ;




create_obj()
//物体を追加する
function create_obj(){
	for (var i = 0; i < 14; i++) {
	var x1 = parseInt(Math.random() * window.innerWidth);//幅
	var y1= parseInt(Math.random() * window.innerHeight);//高さ
	var size1 = 20+parseInt(Math.random() * 80);//大きさ

	var x2 = parseInt(Math.random() * window.innerWidth);//幅
	var y2 = parseInt(Math.random() * window.innerHeight);//高さ
	var size2 = 20+parseInt(Math.random() * 60);//大きさ
	World.add(engine.world, [
		Bodies.circle(x1, y1, size1, { //ボールを追加
			density: Math.random(), // 密度: 単位面積あたりの質量
			frictionAir: Math.random()/10, // 空気抵抗(空気摩擦)
			restitution: 0, // 弾力性
			friction: Math.random(), // 本体の摩擦
			render: { //ボールのレンダリングの設定
				sprite: { //スプライトの設定
					//texture: './images/pronti.png' //スプライトに使うテクスチャ画像を指定
					
				},
				opacity: 0.3
			},
			timeScale: 1 //時間の倍率を設定(1で1倍速)
		}),
		Bodies.rectangle(x2 , y2, size2, size2, { //長方形を追加する
			restitution: 0, // 弾力性
			render: {
				sprite: { //スプライトの設定
					//texture: './images/pronti.png' //スプライトに使うテクスチャ画像を指定
				},
				opacity: 0.3
			}
		})
	]);
	
	}
}



function create_wall(){
	//床を作る
	World.add(engine.world, [
		//上
		wall[0] = Bodies.rectangle(0, -10, window.innerWidth*2, 20, {
		isStatic: true, //固定する
		
		render: {
			fillStyle: '#977559', // 塗りつぶす色: CSSの記述法で指定
			strokeStyle: 'rgba(0, 0, 0, 0)', // 線の色: CSSの記述法で指定
			lineWidth: 0,
			opacity:0
		}
		}),
		//左
		wall[1] = Bodies.rectangle(-10, 0, 20, window.innerHeight*2, {
			isStatic: true, //固定する
			
			render: {
				fillStyle: '#977559', // 塗りつぶす色: CSSの記述法で指定
				strokeStyle: 'rgba(0, 0, 0, 0)', // 線の色: CSSの記述法で指定
				lineWidth: 0,
				opacity:0
			}
		}),
		//下
		wall[2] = Bodies.rectangle(0, window.innerHeight+10, window.innerWidth*2, 20, {
			isStatic: true, //固定する
				
			render: {
				fillStyle: '#977559', // 塗りつぶす色: CSSの記述法で指定				strokeStyle: 'rgba(0, 0, 0, 0)', // 線の色: CSSの記述法で指定
				lineWidth: 0,
				opacity:0
			}
		}),
		//右
		wall[3] = Bodies.rectangle(window.innerWidth+10, 0, 20, window.innerHeight*2, {
			isStatic: true, //固定する
			
			render: {
				fillStyle: '#977559', // 塗りつぶす色: CSSの記述法で指定
				strokeStyle: 'rgba(0, 0, 0, 0)', // 線の色: CSSの記述法で指定
				lineWidth: 0,
				opacity:0
			}
		})
		
	]);
}

 
// 物理シュミレーションを実行
Engine.run(engine);