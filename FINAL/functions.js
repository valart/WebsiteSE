function loadset() {
	presets = ["Date of birth", "Citizenship", "Telephone", "Contact address", "Place of birth"]
	for (x in presets)  {
		var row = document.createElement("tr");
		var data0 = document.createElement("td");
		var data1 = document.createElement("td");
		var data2 = document.createElement("td");
		var n = document.getElementById("t1").childElementCount;
		var n1 = n + 1;
		
		row.setAttribute("id", "t1r" + n1);
		
		var input1 = document.createElement("input");
		var input2 = document.createElement("input");

		input1.setAttribute("value", presets[x])
		input1.setAttribute("id", "t1r" + n1 + "c1");
		input2.setAttribute("id", "t1r" + n1 + "c2");
		
		data1.appendChild(input1);
		data2.appendChild(input2);
		row.appendChild(data0);
		row.appendChild(data1);
		row.appendChild(data2);

		var element = document.getElementById("t1");
		element.appendChild(row);
	}
}

var loadFile = function(event) {
	var image = document.getElementById("output");
	try {
		var smth = URL.createObjectURL(event.target.files[0]);
		image.src = smth;
	}
	catch(error) {}
}

function add(tbl) {
	var row = document.createElement("tr");
	var data0 = document.createElement("td");
	var data1 = document.createElement("td");
	var data2 = document.createElement("td");
	var n = document.getElementById("t" + tbl).childElementCount;
	var n1 = n + 1;

	row.setAttribute("id", "t" + tbl + "r" + n1);

	var input1 = document.createElement("input");
	var input2 = document.createElement("input");

	input1.setAttribute("id", "t" + tbl + "r" + n1 + "c1");
	input2.setAttribute("id", "t" + tbl + "r" + n1 + "c2");

	data1.appendChild(input1);
	data2.appendChild(input2);

	row.appendChild(data0);
	row.appendChild(data1);
	row.appendChild(data2);

	var element = document.getElementById("t" + tbl);
	element.appendChild(row);
}

function remove(tbl) {
	var n = document.getElementById("t" + tbl).childElementCount;
	if (n != 1)  {
		var parent = document.getElementById("t" + tbl);
		var child = document.getElementById("t" + tbl + "r" + n);
		parent.removeChild(child);
	}
}

function genHTML() {
	var Name = document.getElementById("Name").value;
	var Sname = document.getElementById("Sname").value;
	var email = document.getElementById("email").value;

	var code = '<!DOCTYPE html> \n\
	<html> \n\
	<head id=pea> \n\
		<button type="button" id="downloadButton" class="generate" onclick="genPDF()">DOWNLOAD MY CV</button> \n\
		<script type="text/javascript" src="functions.js"></script> \n\
		<script type="text/javascript" src="js/jspdf.min.js"></script> \n\
		<script type="text/javascript" src="js/html2canvas.js"></script> \n\
		<meta charset="utf-8"> \n\
		<link rel="stylesheet" href="styleCV.css" /> \n\
	</head> \n\
	\n\
	<body> \n\
	<div class = "Container" id="PDF"> \n\
	<div class="Header"> \n\
		<a>' + Name + '<br>' + Sname + '</a>\n\
	'

	if (document.getElementById("output").src.length != 0) {
		code += '<img src=' + document.getElementById("output").src + ' id="output" class="AvatarImage" alt="' + Name + ' image">'
	}

	code += '<br> \n\
		<p>' + email + '</p> \n\
	</div> \n\
	\n\
	<hr> \n\
	'

	var content = ["PROFILE", "EDUCATION", "LANGUAGES", "SKILLS", "WORK EXPERIENCE", "ACHIVEMENTS"]
	for (tbl in content) {
		t = content.indexOf(content[tbl]) + 1
		n = document.getElementById("t" + t).childElementCount;
		
		if (n > 1) {
			code += '<div class="NewBlock"> \n\
			<div class="Name"> \n\
				<a>' + content[tbl] + '</a> \n\
			</div> \n\
			'
			n1 = n+1
			for (var x = 2; x < n1; x++ ) {
				code += '<div class="Description"> \n\
					<div class="DescriptionName"> \n\
						<a>' + document.getElementById("t" + t + "r"+x+"c1").value + '</a> \n\
					</div>\n \
					<div class="DescriptionText"> \n\
						<a>' + document.getElementById("t" + t + "r"+x+"c2").value + '</a> \n\
					</div> \n\
				</div> \n\
				'
			}
			code += '<br style="clear: both;"><hr>'
		}
	}

	code += '</div> \n\
	<div class="SocialButtons" id=SB> \n\
	'
	var social = ["instagram", "facebook", "twitter"]
	for (s in social) {
		if ((document.getElementById(social[s]).value).length != 0) {
			code += '<a href="' + document.getElementById(social[s]).value + '" id="' + social[s] + '"> \n\
			<img src="images/' + social[s] + '.png" class="' + social[s] + 'Image" alt="' + social[s] + '"> \n\
			</a> \n\
			'
		}		
	}

	code += '<br> \n\
	</div>\n</div>\n</div> \n\
	</body>\n</html> \n\
	'

	var mywindow = window.open('', 'PRINT', 'height=1000,width=910');
	mywindow.document.write(code);
}

function genPDF() {
	var parent = document.body;
	var child = document.getElementById("downloadButton");
	parent.removeChild(child);

	var social = ["instagram", "facebook", "twitter"]
	for (s in social) {
		try {
			var parent = document.getElementById("SB");
			var child = document.getElementById(social[s]);
			parent.removeChild(child);
		}
		catch(error) {}
	}

	html2canvas(document.body, {
		allowTaint : true,
		onrendered: function (canvas) {

			var img = canvas.toDataURL("image/png")
			var doc = new jsPDF();
			doc.addImage(img, "JPEG", 0, 0, 210, 210);
			doc.save("MyCV.pdf");
		}
	});
}