<?php
$title = 'Print Page Setup';
$desc = 'Upload card images and download a fully prepared page for printing';
include('../globalHTML/header-1.php');
?>
    <h2 class='readable-background header-extension title center margin-bottom-large'>Print Page Setup</h2>
    <style>
        
    </style>
    <div class="layer">
        <div class='padding margin-bottom readable-background drop-area'>
            <h5 class='margin-bottom padding input-description'>Drag and drop the images that you'd like to print</h5>
            <input type='file' multiple accept='.png, .svg, .jpg, .jpeg, .bmp' placeholder='File Upload' class='input' oninput='uploadFiles(event.target.files, uploadCard);' data-dropFunction='uploadCard' data-otherParams=''>
        </div>
    </div>
    <div class="layer margin-bottom-large center">
        <canvas style='height: auto; max-width:850px; width: 100%;'></canvas>
    </div>
    <div class='readable-background padding layer margin-bottom-large'>
		<h3 class='download padding' onclick='downloadSheet();'>Download your Sheet</h3>
		<h4 class='padding center'>(Can take a few seconds)</h4>
	</div>
    <div class="readable-background layer margin-bottom-large">
        <h3 class='padding margin-bottom center'>
            Want to see your custom cards on the kitchen table?
        </h3>
        <h4 class='padding'>
        	Upload up to nine images, and they will automatically arrange themselves on an 8.5" by 11" sheet, so you can print them at home at up to 600PPI.
        </h4>
    </div>
	<!-- <script defer src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js'></script> -->
    <script defer src="/print/print.js"></script>
<?php include('../globalHTML/footer.php'); ?>