$(function(){
   //Sacar los mensajes de error
    $("error").hide();

    //Variables que indican valor de estado validacion
	var error_email = false;
  var error_username = false;
	var error_password = false;
	var error_retype_password = false;


  // Cuando se Des-selecciona el Campo para el E-Mail, lo Verifica
	$("#email").focusout(function() {
		check_email();
	});

  // Cuando se Des-selecciona el Campo para el Nombre de Usuario, lo Verifica
  $("#nombre").focusout(function() {
		check_name();
	});

  // Cuando se Des-selecciona el Campo para la Contraseña, lo Verifica
	$("#passwd").focusout(function() {
		check_password();
	});

  // Cuando se Des-selecciona el Campo para la Confirmacion de Contraseña, lo Verifica
	$("#repasswd").focusout(function() {
		check_retype_password();
	});


  // Funcion para Verificar el Correo
  function check_email() {

    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

    if(pattern.test($("#email").val())) {
      $("#erroremail").hide();
    } else {
      $("#erroremail").html("Direccion inválida");
      $("#erroremail").show();
      error_email = true;
    }
  }

  // Funcion para Verificar lel Usuario
	function check_name() {
		var name_length = $("#nombre").val().length;

		if(name_length < 5 || name_length > 20) {
			$("#errornombre").html("Debe tener entre 5 y 20 caracteres");
			$("#errornombre").show();
			error_username = true;
		} else {
			$("#errornombre").hide();
		}
	}

  // Funcion para Verificar la Contraseña
  function check_password() {
  	var password_length = $("#passwd").val().length;

  	if(password_length < 8) {
  		$("#errorpasswd").html("Minimo 8 caracteres");
  		$("#errorpasswd").show();
  		error_password = true;
  	} else {
  		$("#errorpasswd").hide();
  	}
	}

  // Funcion para Verificar la Contraseña
	function check_retype_password() {

		var password = $("#passwd").val();
		var retype_password = $("#repasswd").val();

		if(password !=  retype_password) {
			$("#errorrepasswd").html("Contraseñas no coinciden");
			$("#errorrepasswd").show();
			error_retype_password = true;
		} else {
			$("#errorrepasswd").hide();
		}
	}



  // Funcion para Verificar todo al Momento de Presionar el Botón
	$("#registration_form").submit(function() {
		error_username = false;
		error_password = false;
		error_retype_password = false;
		error_email = false;

		check_username();
		check_password();
		check_retype_password();
		check_email();

		if(error_username == false && error_password == false && error_retype_password == false && error_email == false) {
			return true;
		} else {
			return false;
		}
	});
	
	function check_run() {
		var run_length = $("#run").val().length;
		var campo = $("#run").val();
		if(run_length < 8 || run_length == 0) {
			$("#errorrun").html("Largo Invalido");
			$("#errorrun").show();
			error_run = true;
		} else {
			$("#errorrun").hide();
		
		
			campo = campo.replace('-','');
			campo = campo.replace(/\./g,'');

			var suma = 0;
			var caracteres = "1234567890kK";
			var contador = 0;    
			for (var i=0; i < campo.length; i++){
				u = campo.substring(i, i + 1);
				if (caracteres.indexOf(u) != -1)
				contador ++;
			}
			if ( contador==0 ) { 			
				$("#errorrun").html("No se admiten letras distintas a K");
				$("#errorrun").show();
				error_run = true;
			} else {
				$("#errorrun").hide();
			
			
			var rut = campo.substring(0,campo.length-1)
			var drut = campo.substring( campo.length-1 )
			var dvr = '0';
			var mul = 2;
			
			for (i= rut.length -1 ; i >= 0; i--) {
				suma = suma + rut.charAt(i) * mul
				if (mul == 7){
					mul = 2
				} else	{
					mul++
				}
			}
			res = suma % 11
			if (res==1)	{
				dvr = 'k'
			}else if (res==0) {
				dvr = '0'
			}else {
				dvi = 11-res
				dvr = dvi + ""
			}
			if ( dvr != drut.toLowerCase() ) {
				$("#errorrun").html("Run Invalido");
				$("#errorrun").show();
				error_run = true;
			}else { 
				$("#errorrun").hide();
			}
		}
	}
}
});
