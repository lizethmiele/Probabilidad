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
        alert('El valor de la casilla amarilla no puede ser mayor que el valor de la casilla azul');
    }else if(n1<0 || n2<0 || y1<0){
        limpiarG();
        alert('Ninguno de los valores registrados puede ser menor a 0')
    }else{
        Py1 = ((Math.pow(q1, (y1-1)))*p1).toFixed(4);
        Ey1 = (1/p1).toFixed(4);
        Vy1 = ((1-p1)/(Math.pow(p1, 2))).toFixed(4);
        s1 = (Math.sqrt(Vy1)).toFixed(4);
        respuestaG1 = (Py1*100).toFixed(2);

        document.getElementById('vari1').value = "p = " + (p1).toFixed(2);
        document.getElementById('vari2').value = "q = " + (q1).toFixed(2);
        document.getElementById('vari3').value = "y = " + (y1).toFixed(0);

        document.getElementById('PY1').value = "La probabilidad de que la primera compañía auditada con  errores sea la " + y1 + " es: " + respuestaG1 +"%";
        document.getElementById('EY1').value = "La media calculada para dicha probabilidad es: " + Ey1 + " compañías";
        document.getElementById('VY1').value = "La varianza calculada para esta probabilidad es: " +Vy1 + " compañías";
        document.getElementById('s1').value = "La desviación estándar para la probabilidad calculada es: " + s1 + " compañías";
        
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
    document.getElementById('vari1').value = " ";
    document.getElementById('vari2').value = " ";
    document.getElementById('vari3').value = " ";
    
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
        alert('El valor de la casilla naranja no puede ser mayor que el valor de la casilla azul');
        limpiarH();
    }else if(n2>N2){
        alert('El valor de la casilla verde no puede ser mayor que el valor de la casilla amarilla');
        limpiarH();
    }else if(y2>n2){
        alert('El valor de de la casilla naranja no puede ser mayor que el valor de la casilla verde');
        limpiarH();
    }else if(r2>N2){
        alert('El valor de la casilla azul no puede ser mayor que el valor de la casilla amarilla');
        limpiarH();
    }else if(((n2-y2)>(N2-r2))){
        alert('El valor obtenido al restar el valor de la casilla naranja al valor de la casilla verde (n3-n4) no puede ser mayor que el valor obtenido al restar el valor de la casilla azul al valor de la casilla amarilla (n1-n2)');
        limpiarH();
    }else{
        Py2 = ((combinacion(r2, y2)*combinacion((N2-r2), (n2-y2)))/combinacion(N2, n2)).toFixed(4);
        Ey2 = ((n2*r2)/N2).toFixed(4);
        Vy2 = (n2*(r2/N2)*((N2-r2)/N2)*((N2-n2)/(N2-1))).toFixed(4);
        s2 = (Math.sqrt(Vy2)).toFixed(4);
        respuestaH2 = (Py2*100).toFixed(2);

        document.getElementById('vari4').value = "N = " + (N2).toFixed(0);
        document.getElementById('vari5').value = "n = " + (n2).toFixed(0);
        document.getElementById('vari6').value = "r = " + (r2).toFixed(0);
        document.getElementById('vari7').value = "y = " + (y2).toFixed(0);

        document.getElementById('PY2').value = "La probabilidad de que " + y2 + " maquinas sean defectuosas es: " + respuestaH2 + "%";
        document.getElementById('EY2').value = "La media calculada para dicha probabilidad es: " + Ey2 + " máquinas";
        document.getElementById('VY2').value = "La varianza calculada para esta probabilidad es: " + Vy2 + " máquinas";
        document.getElementById('s2').value = "La desviación estándar para la probabilidad calculada es: " + s2 + " máquinas";
    
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
    document.getElementById('vari4').value = " ";
    document.getElementById('vari5').value = " ";
    document.getElementById('vari6').value = " ";
    document.getElementById('vari7').value = " ";

    document.getElementById('PY2').value = " ";
    document.getElementById('EY2').value = " ";
    document.getElementById('VY2').value = " ";
    document.getElementById('s2').value = " ";
}

function valorB(){
    var n3 = parseInt(document.getElementById("n8").value);
    var p3 = (parseInt(document.getElementById("n9").value))/100;
    var yy3 = parseInt(document.getElementById("n10").value);
    
    var q3 = 1-p3;
    
    var  Py3, Ey3, Vy3, s3, respuestaB3;

    if(document.getElementById("n8").value =="" ||document.getElementById("n9").value=="" || document.getElementById("n10").value==""){
        alert('Hay casillas vacías');
        limpiarB();
    }else if(yy3>n3){
        alert('El valor de la casilla verde no puede ser mayor al valor de la casilla amarilla');
        limpiarB();
    }else if(p3>1){
        alert('El valor del porcentaje no puede ser mayor a 100');
        limpiarB();
    }else{
        Py3 = ((combinacion(n3, yy3))*(Math.pow(p3, yy3))*(Math.pow(q3, (n3-yy3)))).toFixed(4);
        Ey3 = (n3*p3).toFixed(4);
        Vy3 = (n3*p3*q3).toFixed(4);
        s3 = (Math.sqrt(Vy3)).toFixed(4);
        respuestaB3 = (Py3*100).toFixed(4);

        document.getElementById('vari8').value = "n = " + (n3).toFixed(0);
        document.getElementById('vari9').value = "p = " + ((parseFloat(document.getElementById("n9").value))/100).toFixed(3);
        document.getElementById('vari10').value = "q = " + (1-(((parseFloat(document.getElementById("n9").value))/100))).toFixed(3);
        document.getElementById('vari11').value = "y = " + (yy3).toFixed(0);

        document.getElementById('PY3').value = "La probabilidad de que " + yy3 + " fusibles sean defectuosos es: " + respuestaB3 + "%";
        document.getElementById('EY3').value = "La media calculada para dicha probabilidad es: " + Ey3 + " fusibles";
        document.getElementById('VY3').value = "La varianza calculada para esta probabilidad es: " + Vy3 + " fusibles";
        document.getElementById('s3').value = "La desviación estándar para la probabilidad calculada es: " + s3 + " fusibles";
    
        graficaB(Py3, (1-Py3))
    }
}

function graficaB(vp3, vg3) {
    let gra3 = document.getElementById("grafica3").getContext("2d");

    var chart3 = new Chart(gra3,{
        type: "pie",
        data:{
            labels:["Probabilidad de que suceda (p)", " Probabilidad de que no suceda (q)"],
            datasets:[
                {
                    data:[vp3, vg3],
                    backgroundColor:[
                        "#84ff63",
                        "#FF6384"
                    ]
                }
            ]
        }
    });
}

function limpiarB() {
    document.getElementById('vari8').value = " ";
    document.getElementById('vari9').value = " ";
    document.getElementById('vari10').value = " ";
    document.getElementById('vari11').value = " ";

    document.getElementById('PY3').value = " ";
    document.getElementById('EY3').value = " ";
    document.getElementById('VY3').value = " ";
    document.getElementById('s3').value = " ";
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