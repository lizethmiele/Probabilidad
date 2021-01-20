$(document).ready(function(){
    $('ul.tabs a:first').addClass('active');
    $('.secciones article').hide();
    $('.secciones article:first').show();

    $('ul.tabs li a').click(function(){
        $('ul.tabs li a').removeClass('active');
        $(this).addClass('active');
        $('.secciones article').hide();

        var activeTab = $(this).attr('href');
        console.log(activeTab);
        $(activeTab).show();
        return true;
    })
})

function valorG(){
    var n1 = parseInt(document.getElementById("n1").value);
    var n2 = parseInt(document.getElementById("n2").value);
    var y1 = parseInt(document.getElementById("n3").value);

    var  p1 = n1/n2, q1 = 1-p1, Py1, Ey1, Vy1, s1, respuestaG1;

    if(document.getElementById("n1").value =="" || document.getElementById("n2").value=="" || document.getElementById("n3").value==""){
        alert('Hay casillas vacías');
        limpiarG();
    }else if(n1>n2){
        limpiarG();
        alert('El valor de n1 no puede ser mayor que el valor de n2');
    }else if(n1<0 || n2<0 || y1<0){
        limpiarG();
        alert('Ninguno de los valores registrados puede ser menor a 0')
    }else{
        Py1 = ((Math.pow(q1, (y1-1)))*p1).toFixed(4);
        Ey1 = (1/p1).toFixed(4);
        Vy1 = ((1-p1)/(Math.pow(p1, 2))).toFixed(4);
        s1 = (Math.sqrt(Vy1)).toFixed(4);
        respuestaG1 = (Py1*100).toFixed(4);

        document.getElementById('PY1').value = "La probabilidad de que la primera compañía auditada con  errores sea la " + y1 + " es: " + respuestaG1 +"%";
        document.getElementById('EY1').value = "La media calculada para dicha probabilidad es: " + Ey1;
        document.getElementById('VY1').value = "La varianza calculada para la probabilidad calculada es: " +Vy1;
        document.getElementById('s1').value = "La desviación estándar para la probabilidad calculada es: " + s1;
        
        graficaG(Py1, (1-Py1));
    }
}

function graficaG(vp1, vg1) {
    let gra1 = document.getElementById("grafica1").getContext("2d");

    var chart1 = new Chart(gra1,{
        type: "pie",
        data:{
            labels:["Probabilidad de que suceda (p)", " Probabilidad de que no suceda (q)"],
            datasets:[
                {
                    data:[vp1, vg1],
                    backgroundColor:[
                        "#84ff63",
                        "#FF6384"
                    ]
                }
            ]
        }
    });
}

function limpiarG() {
    document.getElementById('PY1').value = " ";
    document.getElementById('EY1').value = " ";
    document.getElementById('VY1').value = " ";
    document.getElementById('s1').value = " ";
}

function valorH() {
    var N2 = parseInt(document.getElementById("n4").value);
    var n2 = parseInt(document.getElementById("n6").value);
    var r2 = parseInt(document.getElementById("n5").value);
    var y2 = parseInt(document.getElementById("n7").value);

    var  Py2, Ey2, Vy2, s2, respuestaH2;

    if(document.getElementById("n4").value =="" ||document.getElementById("n5").value=="" || document.getElementById("n6").value=="" || document.getElementById("n7").value==""){
        alert('Hay casillas vacías');
        limpiarH();
    }else if(n2<0 || N2<0 || r2<0 || y2<0){
        alert('Ningun valor puede ser menor que 0');
        limpiarH();
    }else if(y2>r2){
        alert('El valor de n4 no puede ser mayor que el valor de n2');
        limpiarH();
    }else if(n2>N2){
        alert('El valor de n3 no puede ser mayor que el valor de n1');
        limpiarH();
    }else if(((n2-y2)>(N2-r2)) || (n2-y2)<0 || (N2-r2)<0){
        alert('El valor de (n4-n3) no puede ser mayor que el valor de (n1-n2)');
        limpiarH();
    }else{
        Py2 = ((combinacion(r2, y2)*combinacion((N2-r2), (n2-y2)))/combinacion(N2, n2)).toFixed(4);
        Ey2 = ((n2*r2)/N2).toFixed(4);
        Vy2 = (n2*(r2/N2)*((N2-r2)/N2)*((N2-n2)/(N2-1))).toFixed(4);
        s2 = (Math.sqrt(Vy2)).toFixed(4);
        respuestaH2 = (Py2*100).toFixed(4);

        document.getElementById('PY2').value = "La probabilidad de que " + y2 + " maquinas sean defectuosas es: " + respuestaH2 + "%";
        document.getElementById('EY2').value = "La media calculada para dicha probabilidad es: " + Ey2;
        document.getElementById('VY2').value = "La varianza calculada para la probabilidad calculada es: " +Vy2;
        document.getElementById('s2').value = "La desviación estándar para la probabilidad calculada es: " + s2;
    
        graficaH(Py2, (1-Py2));
    }
    
}

function graficaH(vp2, vg2) {
    let gra2 = document.getElementById("grafica2").getContext("2d");

    var chart2 = new Chart(gra2,{
        type: "pie",
        data:{
            labels:["Probabilidad de que suceda (p)", " Probabilidad de que no suceda (q)"],
            datasets:[
                {
                    data:[vp2, vg2],
                    backgroundColor:[
                        "#84ff63",
                        "#FF6384"
                    ]
                }
            ]
        }
    });
}

function limpiarH() {
    document.getElementById('PY2').value = " ";
    document.getElementById('EY2').value = " ";
    document.getElementById('VY2').value = " ";
    document.getElementById('s2').value = " ";
}

function combinacion(x, y) {
    return factorial(x)/(factorial(y)*factorial(x-y));
}

function factorial(n) {
    var total = 1; 
	for(i=1; i<=n; i++) {
		total = total * i; 
	}
	return total;
}