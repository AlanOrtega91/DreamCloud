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
		$mail->Host = "dclouding.com";
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
}
?>