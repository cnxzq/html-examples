;define(["require","controller"
],function(require,base){
	return F.class(base,{
		name:"threedemo",

		bindEvent:function(){
			
		},
		
		loadThree:function(){
			var container;
		    var camera, scene, renderer;
		    var particleMaterial;
		    var raycaster;
		    var mouse;
		    var objects = [];
		    var points = [];
		    init();
		    animate();
			function init() {
				container = document.createElement( 'div' );
				document.body.appendChild( container );
				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( 0, 400, 700 );
				scene = new THREE.Scene();
				var geometry = new THREE.BoxGeometry( 100, 100, 100 );
					for ( var i = 0; i < 10; i ++ ) {
				    var object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, opacity: 0.5 } ) );
				    object.position.x = Math.random() * 800 - 400;
				    object.position.y = Math.random() * 800 - 400;
				    object.position.z = Math.random() * 800 - 400;
				    object.scale.x = Math.random() * 2 + 1;
				    object.scale.y = Math.random() * 2 + 1;
				    object.scale.z = Math.random() * 2 + 1;
				    object.rotation.x = Math.random() * 2 * Math.PI;
				    object.rotation.y = Math.random() * 2 * Math.PI;
				    object.rotation.z = Math.random() * 2 * Math.PI;
				    scene.add( object );
				    objects.push( object );
				}
				var PI2 = Math.PI * 2;
				particleMaterial = new THREE.SpriteCanvasMaterial( {
				    color: 0x000000,
				    program: function ( context ) {
				        context.beginPath();
				        context.arc( 0, 0, 0.5, 0, PI2, true );
				        context.fill();
				    }
				} );
				raycaster = new THREE.Raycaster();
				mouse = new THREE.Vector2();
				renderer = new THREE.CanvasRenderer();
				renderer.setClearColor( 0xf0f0f0 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				window.addEventListener( 'resize', onWindowResize, false );
				var controls = new THREE.OrbitControls(camera);  //camera control
				controls.addEventListener('change', render);
			}

		    function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
		    }
		    
		    function onDocumentTouchStart( event ) {
				event.preventDefault();
				event.clientX = event.touches[0].clientX;
				event.clientY = event.touches[0].clientY;
				onDocumentMouseDown( event );
		    }
		    
		    function onDocumentMouseDown( event ) {
				event.preventDefault();
				mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
				raycaster.setFromCamera( mouse, camera );
				//射线原理拾取目标
				var intersects = raycaster.intersectObjects( objects );
				if ( intersects.length > 0 ) {
				    //创建粒子，便于标识点击位置
				    var particle = new THREE.Sprite( particleMaterial );
				    particle.position.copy( intersects[ 0 ].point );
				    particle.scale.x = particle.scale.y = 1;
				    scene.add( particle );
				    //保存选中点
				    points.push( intersects[ 0 ].point );
				    if( points.length >1 ) {
				        var p2 = points[points.length-1];
				        var p1 = points[points.length-2];
				        //动画的形式画线
				        drawLine( p1, p2);
				    }
				}
		    }

		    function animate() {
		    	requestAnimationFrame( animate );
				render();
		    }

		    function render() {
		    	renderer.render( scene, camera );
		    }
		    
		    function drawLine( p1, p2) {
				var directionVector = new THREE.Vector3();
				var p3 = new THREE.Vector3();
				directionVector.x = p2.x - p1.x;
				directionVector.y = p2.y - p1.y;
				directionVector.z = p2.z - p1.z;
				
				var length = Math.sqrt( directionVector.x * directionVector.x
			    + directionVector.y * directionVector.y
			    + directionVector.z * directionVector.z);
				var text = Math.round( length ) + "m";
				var flag = 1;
				var id = setInterval(function () {
				    if (flag == 11) {
				        clearInterval(id);
				        flag = 1;
				    } else {
				        var geometry = new THREE.Geometry();
				        var material = new THREE.LineBasicMaterial( { opacity:1,color:0x000000 } );
				        geometry.vertices.push(p1);
				        p3.x = p1.x + (directionVector.x/10) * flag;
				        p3.y = p1.y + (directionVector.y/10) * flag;
				        p3.z = p1.z + (directionVector.z/10) * flag;
				        geometry.vertices.push(p1);
				        geometry.vertices.push(p3);
				        var geo = new THREE.Line(geometry, material);
				        scene.add(geo);
				        flag++;
				    }
				}, 10);

				initText( text, p2 );

		    }
		    var font;
		    var loader = new THREE.FontLoader();
		    loader.load('/com.kysoft.service/resource/core/lib/threejs/fonts/optimer_bold.typeface.json',function(response) {
		         font = response;
		    });

		    function initText( wordFont, p1){
				var particleMaterial = new THREE.SpriteCanvasMaterial( {
			    color: 0x000000,
			    program: function ( context ) {
			        context.beginPath();
			        context.font="bold 20px Arial";
			        context.fillStyle="#058";
			        context.transform(-1,0,0,1,0,0);
			        context.rotate(Math.PI);
			        context.fillText( wordFont , 0, 0 );
				    }		 
				} );
 
				var particle = new THREE.Sprite( particleMaterial );
				particle.position.copy( p1 );
				particle.rotation.x = Math.PI/2;
				scene.add( particle );
				
//	            var textGeometry = new THREE.TextGeometry(wordFont,{
//	                "font": font,
//	                "size" : 10,
//	                "height" : 0,
//	                "color" : 0x000000
//	            })
//	            var text = new THREE.Mesh( textGeometry, new THREE.MeshBasicMaterial( { color: 0x000000 } ) );
//	            text.position.x = p1.x + 2;
//	            text.position.y = p1.y + 2;
//	            text.position.z = p1.z + 2;
//	            text.lookAt(camera.position);
//	            scene.add(text);
		    }
		},
		
		onLoad:function(){
			this.bindEvent();
			var _this = this;
			this.loadThree();
		}
	});
});