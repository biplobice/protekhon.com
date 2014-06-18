<?php include("include/header.php"); ?>
			<span class="clear"></span>

		<div id="content">
			<div id="title">
				<div class="padd20">
					<h2>Contacts</h2>
					<p>Get In Touch</p>
				</div>
			</div>		
				
			<span class="clear"></span>

			
			<div id="content2">
			<div class="maincol">
				<div id="main" class="subcol2">
					<div class="padd30">
						<h3><span class="alt">Contact</span> form</h3>
						<p class="contactintro">You can get in touch with us on any subject from this site that interests you.</p>	
					
						<div id="error"></div>

						
						<form id="submitform" action="#" method="post">
							<label for="Name">Your name *</label>
							<input type="text" name="name" id="Name" />
					
							<label for="Email">Your email address *</label>
							<input type="text" name="email" id="Email" />
							
							<label for="Message">Message *</label><br />
							<textarea name="message" rows="10" cols="20" id="Message"></textarea>

							
							<p class="required">(*) required field</p>
					
							<input type="submit" name="submit" value="Submit" class="submit-button" />
						</form>
						
					</div>
				</div>
				
				<div id="contactbadge" class="subcol1">
					<div class="padd20">
						<h4>Mailing address</h4>

						<img src="img/badgepic.jpg" alt="icon" />
						<p>Protekhon Group<br />
						House # 1/7/B,<br/>
                        East Basaboo, Sabujbag, <br />
						Dhaka-1214, Bangladesh.<br />
						<br />
						Mobile: +880 172 00 66 775<br />
						Mobile: +880 172 00 88 117<br />

						Phone: +88 (02) 727 5768<br />
                        E-Mail: protekhon@yahoo.com</p>
					</div>
				</div>
			</div>

<?php include("include/latest-news.php"); ?>
<?php include("include/footer.php"); ?>