// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag 
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.

// Insere o script analytics na página
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

// Cria o rastreador padrão
ga( 'create', 'UA-12345-6', 'auto' );
console.log( 'created-tracker' );

// Envia a visualização de página padrão
// Obs.: Como definido nas instruções, a visualização enviada deve usar o modelo
// padrão e não deve possuir configuração nenhuma. De acordo com a documentação
// do analytics, o modelo padrão não define o campo 'page', mas esse pode ser
// utilizado para especificar o caminho da página nos relatórios.
ga( 'send', 'pageview' );
console.log( 'sent-pageview' );

// Função genérica que envia os eventos de interação
function sendEvent( eCategory, eAction, eLabel ){
	ga( 'send', {
		hitType : 'event',
		eventCategory : eCategory,
		eventAction : eAction,
		eventLabel : eLabel
	});
	console.log( 'sent-event[eventCategory:' + eCategory + ',eventAction:' + eAction + ',eventLabel:' + eLabel + ']' );
}

// Faz a ligação da função de envio dos eventos de interação com seus respectivos objetos
window.onload = function(){
	// Interação de click no link "Entre em Contato" em todas as páginas
	$( 'nav.menu li.menu-lista-item a.menu-lista-contato' ).on( 'click', function(){
		sendEvent( 'menu', 'entre_em_contato', 'link_externo' );
	});
	// Interação de click no link "Download PDF" em todas as páginas
	$( 'nav.menu li.menu-lista-item a.menu-lista-download' ).on( 'click', function(){
		sendEvent( 'menu', 'download_pdf', 'download_pdf' );
	});
	// Interação de click no botão das montadoras na página "analise"
	$( 'body.analise div.cards-montadoras div.card-montadoras' ).each( function(){
		var jElement = $( this );
		jElement.on( 'click', function(){
			sendEvent( 'analise', 'ver_mais', jElement.attr( 'data-name' ) );
		});
	});
	// Interação de preenchimento dos campos do formulário na página "sobre"
	// Obs.: A interação só é considerada quando há alterações em algum campo do
	// formulário e o novo valor do campo não seja vazio ou somente espaços,
	// devido à interpretação das instruções contidas no arquivo pdf
	$( 'body.sobre form.contato input' ).each( function(){
		var jElement = $( this );
		jElement.on( 'change', function(){
			var filled = false;
			if( ( jElement.prop( 'type' ) == 'text' ) || ( jElement.prop( 'type' ) == 'email' ) || ( jElement.prop( 'type' ) == 'tel' ) ){
				if( jElement.val().trim().length > 0 ){
					filled = true;
				}
			}
			else{
				if( jElement.prop( 'type' ) == 'checkbox' ){
					if( jElement.prop( 'checked' ) ){
						filled = true;
					}
				}
			}
			if( filled ){
				sendEvent( 'contato', jElement.prop( 'id' ), 'preencheu' );
			}
		});
	});
	// Interação de envio de formulário na página "sobre"
	// Obs.: A interação só é considerada quando o popup que confirma o envio
	// do formulário é exibido, devido à interpretação das instruções contidas
	// no arquivo pdf
	$( 'body.sobre form.contato' ).on( 'submit', function(){
		$( 'body' ).addClass( 'waiting-confirmation' );
	});
	$( 'body.sobre div.lightbox' ).on( 'transitionend', function( event ){		
		if( event.originalEvent.propertyName == 'transform' ){
			var jElement = $( 'body.sobre' );
			if( jElement.hasClass( 'waiting-confirmation' ) && jElement.hasClass( 'lightbox-open' ) ){
				jElement.removeClass( 'waiting-confirmation' );
				sendEvent( 'contato', 'enviado', 'enviado' );
			}
		}
	});
}
