function canvasApl()
{
	$("#inicio").hide();
	var exibeCanvas = document.getElementById("canvasGame");
	var context = exibeCanvas.getContext("2d");
	var imagemMapeada=new Image();

	imagemMapeada.addEventListener('load', gameLoop , false);
	imagemMapeada.src="imgs/mapa.png";
	
	exibeCanvas.addEventListener('click',eventoClick,false);

	//Variáveis de definição do mapa
	var mapaLinhas = 15;
	var mapaColunas = 15;
	var Mapa = [
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,20,0,0,0,0,0,20,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,20,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,20,0,0,0,0,0,0,0,0]
			   ];
			   
	//Variáveis iniciais do jogo
	var direcao=1;
	var pontosjog=0;
	var pontoscomp=0;
	
	//Desenha o texto no canvas
	function desenhaTexto() 
	{
		context.fillStyle = "rgb(250, 250, 250)";
		context.font = "16px Texto";
		context.textAlign = "left";
		context.textBaseline = "top";
		context.fillText("Jogador: " + pontosjog, 5, 5);
		context.fillText("Computador: " + pontoscomp, 330, 5);
	}

			   
	//Variáveis de definição do tanque1
	var tanque1Frames=[1,2,3,4,5,6,7,8];
	var tanque1Index=0;
	var tanque1Rotation=90;
	var tanque1X=Math.floor(Math.random() * 400);
	var tanque1Y=Math.floor(Math.random() * 400);	

	//Variáveis de definição do tanque2 (inimigo)
	var tanque2Frames=[9,10,11,12,13,14,15,16];
	var tanque2Index=0;
	var tanque2Rotation=90;
	var tanque2X=Math.floor(Math.random() * 400);
	var tanque2Y=Math.floor(Math.random() * 400);

	//Variáveis de definição da bandeira
	var bandeira = [0,21,21,21,21,0];
	var bandeiraIndex=0;
	var bandeiraX=Math.floor(Math.random() * 400);
	var bandeiraY=Math.floor(Math.random() * 400);
			   
//Função GameLoop
	function gameLoop()
	{
		setInterval(desenhaTela, 50);
		setInterval(desenhaTanque1, 50);
		setInterval(desenhaInimigo,50);
		setInterval(desenhaBandeira,50);
		setInterval(desenhaTexto,50);
		setInterval(gameOver,50);
	}
	
	//Função responsável em desenhar o mapa no canvas
	function desenhaTela()
	{
		for (var linha=0;linha<mapaLinhas;linha++) 
		{
			for (var coluna=0;coluna<mapaColunas;coluna++)
			{
				var mapaId = Mapa[linha][coluna];
				var sourceX = Math.floor(mapaId % 8) *32;
				var sourceY = Math.floor(mapaId / 8) *32;
				context.drawImage(imagemMapeada, sourceX,sourceY,32,32,coluna*32,linha*32,32,32);
			}
		}
	}
		 
		
	//Função responsável em desenhar o tanque1 no mapa
	function desenhaTanque1() 
	{
		angleInRadians=tanque1Rotation * Math.PI / 180;
		context.translate(tanque1X+16, tanque1Y+16);
		context.rotate(angleInRadians);

		var sourceX=Math.floor(tanque1Frames[tanque1Index] % 8) *32;
		var sourceY=Math.floor(tanque1Frames[tanque1Index] / 8) *32;
		context.drawImage(imagemMapeada, sourceX, sourceY,32,32,-16,-16,32,32);

		context.setTransform(1,0,0,1,0,0);
		tanque1Index++;

		if (tanque1Index ==tanque1Frames.length) 
		{
			tanque1Index=0;
		}
				
		//Identifica a direção de movimentação 
		if (direcao==1)
		{
			tanque1Rotation=90;
			tanque1X=tanque1X+2;
		}
		if (direcao==2) 
		{
			tanque1Rotation=180;
			tanque1Y=tanque1Y+2;
		}
		if (direcao==3) 
		{
			tanque1Rotation=270;
			tanque1X=tanque1X-2;
		}
		if (direcao==4) 
		{
			tanque1Rotation=0;
			tanque1Y=tanque1Y-2;
		}

		// Limita movimentação
		if (tanque1X>=416) 
		{
			direcao=3;
		}
		if (tanque1X<=0) 
		{	
			direcao=1;
		}
		if (tanque1Y<=0) 
		{
			direcao=2;
		}
		if (tanque1Y>=416) 
		{
			direcao=4;
		}

	}
	
	//Função responsável por desenhar o tanque2 (inimigo) no mapa
	function desenhaInimigo() 
	{
		var angleInRadians2=tanque2Rotation * Math.PI / 180;
		context.translate(tanque2X+16, tanque2Y+16);
		context.rotate(angleInRadians2);
		var InimigoX=Math.floor(tanque2Frames[tanque2Index] % 8) *32;
		var InimigoY=Math.floor(tanque2Frames[tanque2Index] / 8) *32;
		context.drawImage(imagemMapeada, InimigoX,InimigoY,32,32,-16,-16,32,32);
		context.setTransform(1,0,0,1,0,0);
		tanque2Index++;
		
		if (tanque2Index ==tanque2Frames.length) 
		{
			tanque2Index=0;
		}
		
		//Inteligência Artificial
		if (tanque2X>bandeiraX) 
		{
			tanque2X-=1;
			tanque2Rotation=270;
		}
		if (tanque2X<bandeiraX) 
		{
			tanque2X+=1;
			tanque2Rotation=90;
		}
		if (tanque2Y>bandeiraY) 
		{
			tanque2Y-=1;
			tanque2Rotation=0;
		}
		if (tanque2Y<bandeiraY) 
		{
			tanque2Y+=1;
			tanque2Rotation=180;
		}
	}
	
	//Função responsável por desenhar a bandeira no mapa
	function desenhaBandeira() 
	{
		context.translate(bandeiraX+16, bandeiraY+16);
		var BandeiraX=Math.floor(bandeira[bandeiraIndex] % 8) *32;
		var BandeiraY=Math.floor(bandeira[bandeiraIndex] / 8) *32;
		context.drawImage(imagemMapeada,BandeiraX, BandeiraY,32,32,-16,-16,32,32);
		context.setTransform(1,0,0,1,0,0);
		bandeiraIndex++;

		if (bandeiraIndex==bandeira.length)
		{
			bandeiraIndex=0;
		}
		
		//Detecta colisão da bandeira com o inimigo
		if ((bandeiraX==tanque2X) && (bandeiraY==tanque2Y)) 
		{
			pontoscomp++;
			
			bandeiraX=Math.floor(Math.random() * 400);
			bandeiraY=Math.floor(Math.random() * 400);
		}
		
		//Detecta colisão da bandeira com o tanque1
		if (((bandeiraX + 16) > tanque1X && bandeiraX < (tanque1X + 16)) && ((bandeiraY + 16) > tanque1Y && bandeiraY < (tanque1Y + 16))) 
		{
			pontosjog++;
			
			bandeiraX=Math.floor(Math.random() * 400);
			bandeiraY=Math.floor(Math.random() * 400);
		}
	}

	
	//Função executada quando o mapa é clicado
	function eventoClick()
	{
		direcao++;
		if (direcao==5) 
		{
			direcao=1;
		}
	}
	
	//Função GameOver
	function gameOver() 
	{

		if (pontosjog==3) 
		{
			alert ("Você Ganhou");
			pontosjog=0;
			pontoscomp=0;
			window.location.reload();
		}

		if (pontoscomp==3) 
		{
			alert ("Você Perdeu");
			pontosjog=0;
			pontoscomp=0;
			window.location.reload();
		}
	}


} //Fim da função canvasApl()