<?php
// Gebauer Real Estate – Lead-Empfang (Pop-up & Kontaktformular)
// 1) Speichert jede Anfrage in leads/leads.csv (gesperrt, nur via Hostinger-Dateimanager abrufbar)
// 2) Schickt eine E-Mail an LEAD_TO (unten eintragen)
const LEAD_TO   = '';                                   // z. B. 'ronny@gebauer-property.com'
const LEAD_FROM = 'noreply@gebauer-property.com';

header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }
$in = json_decode(file_get_contents('php://input'), true);
if (!is_array($in)) $in = $_POST;
if (!empty($in['bot'])) { echo '{"ok":true}'; exit; }          // Honeypot
$f = ['ts','name','email','phone','interest','budget','destinations','property','message','source','lang'];
$d = [];
foreach ($f as $k) { $d[$k] = trim(mb_substr(str_replace(["\r","\n"], ' ', (string)($in[$k] ?? '')), 0, 2000)); }
$d['ts'] = date('c');
if ($d['name'] === '' || !filter_var($d['email'], FILTER_VALIDATE_EMAIL)) { http_response_code(422); echo '{"ok":false}'; exit; }
$d['ip'] = $_SERVER['REMOTE_ADDR'] ?? '';

$dir = __DIR__ . '/leads';
if (!is_dir($dir)) @mkdir($dir, 0750, true);
$file = $dir . '/leads.csv';
$new = !file_exists($file);
if ($fh = @fopen($file, 'a')) {
  if (flock($fh, LOCK_EX)) {
    if ($new) { fwrite($fh, "\xEF\xBB\xBF"); fputcsv($fh, array_keys($d), ';'); }
    fputcsv($fh, array_values($d), ';');
    flock($fh, LOCK_UN);
  }
  fclose($fh);
}

if (LEAD_TO !== '') {
  $subj = 'Neue Anfrage Gebauer Real Estate: ' . $d['name'] . ($d['property'] ? ' (' . $d['property'] . ')' : '');
  $body = '';
  foreach ($d as $k => $v) { $body .= str_pad($k, 14) . ': ' . $v . "\n"; }
  $headers = 'From: Gebauer Real Estate <' . LEAD_FROM . ">\r\n" . 'Reply-To: ' . $d['email'] . "\r\n" . "Content-Type: text/plain; charset=utf-8\r\n";
  @mail(LEAD_TO, '=?UTF-8?B?' . base64_encode($subj) . '?=', $body, $headers);
}
echo '{"ok":true}';
