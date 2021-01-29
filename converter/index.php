<?php
$title = 'MPC to Regular Converter';
$desc = 'Generate random strands of phyrexian text for use with Card Conjurer, the custom Magic: The Gathering card creator';
include('../globalHTML/header-1.php');
?>
    <h2 class='readable-background header-extension title center margin-bottom-large'>MPC to Regular Converter</h2>
    <style>
        
    </style>
    <div class="layer margin-bottom-large">
        <div class='padding margin-bottom readable-background'>
            <h5 class='margin-bottom padding input-description'>Upload the image that you'd like to convert</h5>
            <input type='file' accept='.png, .svg, .jpg, .jpeg, .bmp' placeholder='File Upload' class='input' oninput='imageLocal(event);'>
        </div>
    </div>
    <div class="readable-background layer margin-bottom-large">
        <h3 class='padding margin-bottom center'>
            Convert MPC-ready cards back into regular sized versions
        </h3>
        <h4 class='padding'>
        	Simply upload your card images (one at a time) and the finished versions will be downloaded automatically.
        </h4>
    </div>
    <script defer src="/converter/converter.js"></script>
<?php include('../globalHTML/footer.php'); ?>