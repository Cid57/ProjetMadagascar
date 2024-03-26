<?php

$to = "cindy.singer@stagiairesmns.fr";
$subject = "Utilisation de mail()";


$message = "<html><body>";
$message .= "<h1>Salut ca va ?</h1>";
$message .= "<p>Tu trouveras toute les vidéos</p>";
$message .= "</html></body>";


$headers = "From: cindy.singer@stagiairesmns.fr\r\n"; // Notez l'utilisation de "\r\n" pour séparer les en-têtes

// Ajout de l'en-tête Content-Type pour spécifier le type de contenu du message
$headers = "Content-Type: text/plain; charset=utf-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo 'Envoyé !';
} else {
    echo 'Erreur d\'envoi';
}
