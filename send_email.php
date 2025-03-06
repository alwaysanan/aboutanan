<?php
header('Content-Type: application/json');

// Terima data JSON
$data = json_decode(file_get_contents('php://input'), true);

// Validasi input
if (!isset($data['name']) || !isset($data['email']) || !isset($data['subject']) || !isset($data['message'])) {
    echo json_encode(['success' => false, 'message' => 'Semua field harus diisi']);
    exit;
}

// Sanitasi input
$name = filter_var($data['name'], FILTER_SANITIZE_STRING);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$subject = filter_var($data['subject'], FILTER_SANITIZE_STRING);
$message = filter_var($data['message'], FILTER_SANITIZE_STRING);

// Validasi email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Email tidak valid']);
    exit;
}

// Email tujuan (ganti dengan email Anda)
$to = "tamzidan01@gmail.com"; // Ganti dengan email Anda

// Persiapkan pesan email
$email_content = "Nama: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Pesan:\n$message";

// Header email
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Kirim email
if (mail($to, $subject, $email_content, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Gagal mengirim email']);
}
?>