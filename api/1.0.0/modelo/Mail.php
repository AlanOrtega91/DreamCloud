<?php
require_once dirname ( __FILE__ ) . "/PHPMailer/PHPMailerAutoload.php";
class Mail {

	static function enviarEmail($asunto,$mensaje,$destino){
		
		//SMTP needs accurate times, and the PHP time zone MUST be set
		//This should be done in your php.ini, but this is how to do it if you don't have access to that
		date_default_timezone_set('Etc/UTC');
		
		//Create a new PHPMailer instance
		$mail = new PHPMailer;
		//Tell PHPMailer to use SMTP
		$mail->isSMTP();
		//Enable SMTP debugging
		// 0 = off (for production use)
		// 1 = client messages
		// 2 = client and server messages
		$mail->SMTPDebug = 0;
		//Ask for HTML-friendly debug output
		$mail->Debugoutput = 'html';
		//Set the hostname of the mail server
		$mail->Host = "as1r2063.servwingu.mx";
		//Set the SMTP port number - likely to be 25, 465 or 587
		$mail->Port = 26;
		//Whether to use SMTP authentication
		$mail->SMTPAuth = true;
		//Username to use for SMTP authentication
		$mail->Username = "dcloudin";
		//Password to use for SMTP authentication
		$mail->Password = 'eYB8P$7!!_A';
		
		$mail->Subject = $asunto;
		$mail->Body    = $mensaje;
		
		$mail->setFrom('no-replay@dclouding.com', 'DreamCloud');
		$mail->addAddress($destino);						// Name is optional
		

		$mail->isHTML(true);                                // Set email format to HTML
		
		
		
		if(!$mail->send()) {
			//echo 'Mailer Error: ' . $mail->ErrorInfo;
		} else {
			//echo "enviado";
		}
	}
	
	static function construirBienvenida($nombre)
	{
		return "<div class='navbar w-nav' data-animation='default' data-collapse='medium' data-duration='400' style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;border-color:#000;border-bottom-style:solid;border-bottom-width:1px;position:relative;background-color:#dddddd;background-image:none;background-repeat:repeat;background-position:top left;background-attachment:scroll;z-index:1000;' >
    <div class='container-4 w-container' style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin-left:auto;margin-right:auto;max-width:940px;' ><a class='brand w-nav-brand' href='dclouding.com' style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;background-color:transparent;position:relative;float:left;text-decoration:none;color:#333333;' ><h1 style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin-right:0;margin-left:0;font-weight:bold;margin-bottom:10px;font-size:38px;line-height:44px;margin-top:20px;' >DreamCloud</h1></a>
      <div class='w-nav-button' style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;float:right;padding-top:18px;padding-bottom:18px;padding-right:18px;padding-left:18px;font-size:24px;display:none;cursor:pointer;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);tap-highlight-color:rgba(0, 0, 0, 0);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;' >
        <div class='w-icon-nav-menu' style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;' ></div>
      </div>
    </div>
  </div>
  <div class='w-container' style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin-left:auto;margin-right:auto;max-width:940px;' >
    <h1 style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin-right:0;margin-left:0;font-weight:bold;margin-bottom:10px;font-size:38px;line-height:44px;margin-top:20px;' >Bienvenido $nombre</h1>
    <p style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin-top:0;margin-bottom:10px;' >Queremos darte la bienvenida a DreamCloud. por favor accede a la siguiente liga para iniciar sesión en tu cuenta.
      <br style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;' ><a href='http://dclouding.com/dreamer/iniciar-sesion.html' target='_blank' style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;background-color:transparent;' >http://dclouding.com/dreamer/iniciar-sesion.html</a>
    </p>
  </div>";
	}
	
	static function contruirMensajeProyecto($titulo, $estado)
	{
		$mensaje = "<div class='navbar w-nav' data-animation='default' data-collapse='medium' data-duration='400' style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;border-color:#000;border-bottom-style:solid;border-bottom-width:1px;position:relative;background-color:#dddddd;background-image:none;background-repeat:repeat;background-position:top left;background-attachment:scroll;z-index:1000;' >
    <div class='container-4 w-container' style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin-left:auto;margin-right:auto;max-width:940px;' ><a class='brand w-nav-brand' href='dclouding.com' style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;background-color:transparent;position:relative;float:left;text-decoration:none;color:#333333;' ><h1 style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin-right:0;margin-left:0;font-weight:bold;margin-bottom:10px;font-size:38px;line-height:44px;margin-top:20px;' >DreamCloud</h1></a>
      <div class='w-nav-button' style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;float:right;padding-top:18px;padding-bottom:18px;padding-right:18px;padding-left:18px;font-size:24px;display:none;cursor:pointer;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);tap-highlight-color:rgba(0, 0, 0, 0);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;' >
        <div class='w-icon-nav-menu' style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;' ></div>
      </div>
    </div>
  </div>
  <div class='w-container' style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin-left:auto;margin-right:auto;max-width:940px;' >
    <p style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin-top:0;margin-bottom:10px;' >
      <br style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;' >Queremos avisarte que el estado de tu trabajo <strong style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-weight:bold;' >$titulo</strong> ha cambiado a <strong style='-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-weight:bold;' >$estado</strong>
    </p>
  </div>";
		return $mensaje;
	}
}
?>