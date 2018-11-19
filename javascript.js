
function GenerateHTML () {
	//Repace 
	var templateTekst = '<!DOCTYPE html><html><head><meta charset="utf-8"><link rel="stylesheet" href="styleCV.css" /></head><body><div class="Container"><div class="Header"><a>nimi</a><img src="pilt" class="AvatarImage" alt="Pilt"><p>email</p></div><hr>SISU<div class="SocialButtons"><a href="https://www.instagram.com/artjom.valdas/"><img src="images/instagram.png" class="InstagramImage" alt="Instagram image"></a><a href="https://www.facebook.com/profile.php?id=100002103495335"><img src="images/facebook.png" class="FacebookImage" href="https://www.facebook.com/profile.php?id=100002103495335" alt="Facebook image"></a></div></div></body></html>';//blank cv
	var sisu = "";
	var v,p;

	v = [document.getElementById('s1').value,document.getElementById('s2').value,document.getElementById('s3').value,];
	p = [document.getElementById('s11').value,document.getElementById('s22').value,document.getElementById('s33').value,];
	
	templateTekst = templateTekst.replace("nimi",document.getElementById('nimi').value);
	templateTekst = templateTekst.replace("email",document.getElementById('email').value);
	templateTekst = templateTekst.replace("pilt","images/" + document.getElementById('nimi').value + ".jpg");

	sisu += GenerateBlock(GenerateDualInfo(document.getElementById('blockiNimi').value,v,p));
	//document.getElementById("htmlOut").innerHTML = "Esimene Osa" + ??? +  "Teine osa";
	templateTekst = templateTekst.replace("SISU",sisu);
	//Hide old, show new
	document.getElementById("outCopy").value = templateTekst;
	document.getElementById("outText").innerHTML = templateTekst;

	document.getElementById("main").style.display = "none";
	document.getElementById("generated").style.display = "block";
	}

function GenerateDualInfo (pealkiri,vasak,parem) {
	var s = '<div class="Name"><a>pealkiri</a></div>\n';
	s = s.replace("pealkiri", pealkiri);

	var i = 0;
	for(let a of vasak){
		var n = '<div class="Description"><div class="DescriptionName"><a>vasak</a></div><div class="DescriptionText"><a>parem</a></div></div>';
		n = n.replace("vasak", vasak[i]);
		n = n.replace("parem", parem[i]);
		s = s + "\n" + n;
		i++;
		}

	return s;		
	}

function GenerateMonoInfo (pealkiri,info) {
	var s = '<div class="Name"><a>pealkiri</a></div>\n';
	s = s.replace("pealkiri", pealkiri);

	var i = 0;
	for(let a of vasak){
		var n = '<div class="Description"><div class="DescriptionName"><a>info</a></div></div>';
		n = n.replace("inro", info[i]);
		s = s + "\n" + n;
		i++;
		}

	return s;		
	}

function GenerateBlock (sisu) {
	var s = '<div class="NewBlock">sisu</div><hr>\n';
	s = s.replace("sisu", sisu);
	return s;
	}