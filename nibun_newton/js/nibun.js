class nibun{
  constructor( elm1, elm2, elm3, elm4, elm5, elm6 ) {
    this.elm1 = elm1;
    this.elm2 = elm2;
    this.elm3 = elm3;
    this.elm4 = elm4;
    var EPS = 0.001;
    this.elm5 = elm5;
    this.elm6 = elm6;
    let a=0.0,b=1.0;

    this.vc1 = new VCanvas( elm1 );
    this.vc2 = new VCanvas( elm2 );

    this.background();

    elm5.innerHTML = "2分法の近似解：" + 0;
    var nl = new nylon();

   function nibun(a,b) {
      let c;

      do {
        c = (a + b) / 2.0; 
        console.log(c);
        elm5.innerHTML = "2分法の近似解：" + c;
        if (func_y(c) * func_y(a) < 0) b = c; 
        else a = c; 
      } while (Math.abs(a - b) > EPS);
      return c;
    function func_y(x) {
      return Math.pow(x, 3.0) + x - 1.0;
    }
  }

    nl.on( "start", ( key, params ) => {
      nibun(a,b);

    });
    nl.on( "stop", ( key, params ) => {
      this.vc1.cls();
      
    });
    nl.on( "EPS", ( key, params ) => {
      EPS = params["top"];
      this.background();
    });


  }

  background() {
    this.vc1.cls();
    this.vc2.cls();

    this.vc1.scale( -2.2, 2.4, 7.0, -7.0 );
    this.vc2.scale( -2.2, 2.4, 7.0, -7.0 );

    this.vc2.forecolor( 0, 0, 0 );
    this.vc2.beginPath();
    this.vc2.line( -2.2, 0, 2.4, 0 );
    this.vc2.line( 0, 2.4, 0, -2.2 );
    this.vc2.stroke();
    this.vc2.forecolor( 0,0,0 );
    this.vc2.beginPath();
    let x1 = -0.75,x2,y1,y2;
    for(var i=0;i<100;i++){
      y1 = Math.pow(x1, 3.0) + x1 - 1.0;
      x2 = x1 + 0.1;
      y2 = Math.pow(x2, 3.0) + x2 - 1.0
      this.vc2.lineStart(x1,y1);
      this.vc2.lineto(x2,y2);
      x1 = x2
    }this.vc2.stroke();

  }
}

var guisetup = () => {
	var nl = new nylon();
	document.getElementById("start").addEventListener( "click", () => {
		nl.emit( "start", null );
	});
  document.getElementById("stop").addEventListener( "click", () => {
    nl.emit( "stop", null );
  });
  document.getElementById("b02").addEventListener( "click", () => {
    nl.emit( "stop", null );
    nl.emit( "EPS", { "top":0.0001 } );
  });
  document.getElementById("b03").addEventListener( "click", () => {
    nl.emit( "stop", null );
    nl.emit( "EPS", { "top":0.0000001 } );
  });
  document.getElementById("b04").addEventListener( "click", () => {
    nl.emit( "stop", null );
    nl.emit( "EPS", { "top":0.000000001 } );
  });
}

window.addEventListener("load", function(e) {
  guisetup();

  var x = new nibun(
    document.getElementById('graph1'),
    document.getElementById('graph1b'),
    document.getElementById('graph2'),
    document.getElementById('graph2b'),
    document.getElementById('theory'),
    document.getElementById('answer')
   );

});
