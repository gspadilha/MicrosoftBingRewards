<?php
$baseUrl = "https://www.bing.com/search?q=teste:INDICE:&aqs=edge..69i57.15241j0j1&pglt=675&FORM=ANCMS9&PC=EDGEDB";
$hoje = date('YmdH');
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles.css">
    <title>Microsoft Rewards</title>
</head>

<body>
    <h1><?php echo 'Não esqueça de pressionar CTRL'; ?></h1>

    <?php
    $indiceN = "{$hoje}n-0";

    for ($i = 1; $i <= 36; $i++) {
        $url = str_replace(':INDICE:', $indiceN, $baseUrl);

        echo "<button type='button' class='buttonNormal' data-url='{$baseUrl}'>{$indiceN}</button>";

        $indiceN = "{$hoje}n-{$i}";

        if ($i % 6 === 0) {
            echo '<br/>';
        }
    }
    ?>

    <h1>Mobile</h1>

    <?php
    $indiceP = "{$hoje}p-0";

    for ($i = 1; $i <= 21; $i++) {
        $url = str_replace(':INDICE:', $indiceP, $baseUrl);

        echo "<button type='button' class='buttonMobile' data-url='{$baseUrl}'>{$indiceP}</button>";

        $indiceP = "{$hoje}p-{$i}";

        if ($i % 3 === 0) {
            echo '<br/>';
        }
    }
    ?>
    <script src="./scripts.js"></script>
</body>

</html>
