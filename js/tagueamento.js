// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag 
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.

// ################################################################################
// Gabriel Nascimento de Oliveira
// Data : 27/10/2010
// --------------------------------------------------------------------------------
// IMPORTANTE : Para facilitar a identificação de erros durante o desenvolvimento
// e facilitar a correção do teste, foram adicionados comandos de log ao longo de
// cada etapa do código. Favor "descomentar" esses comandos para fazer uso dos
// mesmos caso deseje.
// ################################################################################

// Insere o script analytics na página
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
/* console.log( 'added-analytics' ); */

// Cria o rastreador padrão
ga( 'create', 'UA-12345-6', 'auto' );
/* console.log( 'created-tracker' ); */

// Envia a visualização de página padrão
// Obs.: Como definido nas instruções, a visualização enviada deve usar o modelo
// padrão e não deve possuir nenhuma configuração. De acordo com a documentação
// do analytics, o modelo padrão não define o campo 'page', mas esse pode ser
// utilizado para especificar o caminho da página nos relatórios.
ga( 'send', 'pageview' );
/* console.log( 'sent-pageview[page:' + document.body.className + ']' ); */

// Função genérica que envia os eventos de interação
function sendEvent( eCategory, eAction, eLabel ){
	ga( 'send', {
		hitType : 'event',
		eventCategory : eCategory,
		eventAction : eAction,
		eventLabel : eLabel
	});
	/* console.log( 'sent-event[eventCategory:' + eCategory + ',eventAction:' + eAction + ',eventLabel:' + eLabel + ']' ); */
}

// Faz a ligação da função de envio dos eventos de interação com seus respectivos objetos
window.onload = function(){
	var jElements;
	// Interação de click no link "Entre em Contato" em todas as páginas
	jElements = document.getElementsByClassName( 'menu-lista-contato' );
	if( jElements.length > 0 ){
		jElements[ 0 ].addEventListener( 'click', function(){
			sendEvent( 'menu', 'entre_em_contato', 'link_externo' );
		});
	}
	// Interação de click no link "Download PDF" em todas as páginas
	jElements = document.getElementsByClassName( 'menu-lista-download' );	
	if( jElements.length > 0 ){
		jElements[ 0 ].addEventListener( 'click', function(){
			sendEvent( 'menu', 'download_pdf', 'download_pdf' );
		});
	}
	// Interação de click no botão das montadoras na página "analise"
	jElements = document.getElementsByClassName( 'card-montadoras' );	
	for( var i = 0; i < jElements.length; i++ ){
		jElements[ i ].addEventListener( 'click', function( event ){
			sendEvent( 'analise', 'ver_mais', event.target.getAttribute( 'data-name' ) );
		});
	}
	// Interação de preenchimento dos campos do formulário na página "sobre"
	// Obs.: A interação só é considerada quando há alterações em algum campo do
	// formulário e o novo valor do campo não seja vazio ou somente espaços,
	// devido à interpretação das instruções contidas no arquivo pdf
	jElements = document.getElementsByClassName( 'contato' );
	if( jElements.length > 0 ){
		jElements = jElements[ 0 ].getElementsByTagName( 'input' );		
		for( var i = 0; i < jElements.length; i++ ){
			jElements[ i ].addEventListener( 'change', function( event ){
				var filled = false;
				if( event.target.id != 'aceito' ){
					if( event.target.value.trim().length > 0 ){
						filled =  true;
					}
				}
				else{
					if( event.target.checked ){
						filled = true;
					}
				}
				if( filled ){
					sendEvent( 'contato', event.target.id, 'preencheu' );
				}
			});
		}
	}
	// Interação de envio de formulário na página "sobre"
	// Obs.: A interação só é considerada quando o popup que confirma o envio
	// do formulário é exibido, devido à interpretação das instruções contidas
	// no arquivo pdf
	jElements = document.getElementsByClassName( 'contato' );
	if( jElements.length > 0 ){
		jElements[ 0 ].addEventListener( 'submit', function( event ){
			document.body.classList.add( 'waiting-confirmation' );
		});
		jElements = document.getElementsByClassName( 'lightbox' );
		if( jElements.length > 0 ){
			jElements[ 0 ].addEventListener( 'transitionend', function( event ){
				if( event.propertyName == 'transform' ){
					if( document.body.classList.contains( 'waiting-confirmation' ) && document.body.classList.contains( 'lightbox-open' ) ){
						document.body.classList.remove( 'waiting-confirmation' );
						sendEvent( 'contato', 'enviado', 'enviado' );
					}
				}
			});
		}
	}
}
