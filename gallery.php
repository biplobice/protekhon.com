<?php include("include/header.php"); ?>

			<span class="clear"></span>

		<div id="content">
			<div id="title">
				<div class="padd20">
					<h2>Gallery</h2>
					<p></p>
				</div>
			</div>		
				
			<span class="clear"></span>
	
			<div id="content2">

					<div class="padd30">
						<h3><span class="alt">Photo</span> Gallery</h3>
						<p>
<hr size="1">

<?php
	# SETTINGS
	$max_width = 100;
	$max_height = 100;
	
	function getPictureType($ext) {
		if ( preg_match('/jpg|jpeg/i', $ext) ) {
			return 'jpg';
		} else if ( preg_match('/png/i', $ext) ) {
			return 'png';
		} else if ( preg_match('/gif/i', $ext) ) {
			return 'gif';
		} else {
			return '';
		}
	}
	
	function getPictures() {
		global $max_width, $max_height;
		if ( $handle = opendir("gallery/") ) {
			$lightbox = rand();
			echo '<ul id="pictures">';
			while ( ($file = readdir($handle)) !== false ) {
				if ( !is_dir("gallery/".$file) ) {
					$split = explode('.', $file); 
					$ext = $split[count($split) - 1];
					if ( ($type = getPictureType($ext)) == '' ) {
						continue;
					}
					if ( ! is_dir('gallery/thumbs') ) {
						mkdir('gallery/thumbs');
					}
					if ( ! file_exists('gallery/thumbs/'.$file) ) {
						if ( $type == 'jpg' ) {
							$src = imagecreatefromjpeg("gallery/".$file);
						} else if ( $type == 'png' ) {
							$src = imagecreatefrompng("gallery/".$file);
						} else if ( $type == 'gif' ) {
							$src = imagecreatefromgif("gallery/".$file);
						}
						if ( ($oldW = imagesx($src)) < ($oldH = imagesy($src)) ) {
							$newW = $oldW * ($max_width / $oldH);
							$newH = $max_height;
						} else {
							$newW = $max_width;
							$newH = $oldH * ($max_height / $oldW);
						}
						$new = imagecreatetruecolor($newW, $newH);
						imagecopyresampled($new, $src, 0, 0, 0, 0, $newW, $newH, $oldW, $oldH);
						if ( $type == 'jpg' ) {
							imagejpeg($new, 'gallery/thumbs/'.$file);
						} else if ( $type == 'png' ) {
							imagepng($new, 'gallery/thumbs/'.$file);
						} else if ( $type == 'gif' ) {
							imagegif($new, 'gallerythumbs/'.$file);
						}
						imagedestroy($new);
						imagedestroy($src);
					}
					echo '<li><a href="gallery/'.$file.'" rel="lightbox['.$lightbox.']">';
					echo '<img src="gallery/thumbs/'.$file.'" alt="" />';
					echo '</a></li>';
				}
			}
			echo '</ul>';
		}
	}
?>


<link rel="stylesheet" href="css/lightbox.css" type="text/css" media="screen" />
<style type="text/css">
#pictures li {
	float:left;
	height:<?php echo ($max_height + 10); ?>px;
	list-style:none outside;
	width:<?php echo ($max_width + 10); ?>px;
	text-align:center;
}
img {
	border:0;
	outline:none;
}
</style>


<?php getPictures(); ?>


<script type="text/javascript" src="js/prototype.js"></script>
<script type="text/javascript" src="js/scriptaculous.js?load=effects,builder"></script>
<script type="text/javascript" src="js/lightbox.js"></script>

						</p>
                     </div>
                  
				</div>


<?php include("include/footer.php"); ?>
